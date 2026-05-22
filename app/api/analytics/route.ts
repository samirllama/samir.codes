// /app/api/analytics/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

interface IncomingAnalyticsBody {
  event?: string;
  properties?: Record<string, unknown> & {
    userId?: string;
    sessionId?: string;
  };
}

interface KafkaRecord {
  key: string;
  value: {
    event: string;
    timestamp: string;
    location: {
      city: string;
      country: string;
      region: string;
    };
    properties: {
      ip: string;
      [key: string]: unknown;
    };
  };
}

interface KafkaPayload {
  records: KafkaRecord[];
}

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 500);

  try {
    let body: IncomingAnalyticsBody;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json() as IncomingAnalyticsBody;
    } else {
      const rawText = await request.text();
      body = JSON.parse(rawText || "{}") as IncomingAnalyticsBody;
    }

    const { event, properties } = body;

    if (!event) {
      return NextResponse.json({ error: "Missing event name" }, { status: 400 });
    }

    let city = request.headers.get("x-vercel-ip-city");
    let country = request.headers.get("x-vercel-ip-country");
    let region = request.headers.get("x-vercel-ip-country-region");
    let ip = request.headers.get("x-forwarded-for");

    if (process.env.NODE_ENV === "development") {
      city = city || "Gas City";
      country = country || "US";
      region = region || "TX";
      ip = ip || "127.0.0.1";
    }

    const geo = {
      city: city ? decodeURIComponent(city) : "unknown",
      country: country || "unknown",
      region: region || "unknown",
    };

    const brokerUrl = process.env.ANALYTICS_BROKER_URL;
    if (!brokerUrl) {
      console.warn("ANALYTICS_BROKER_URL is not configured in env variables.");
      return NextResponse.json(
        { success: false, warning: "Broker URL not configured" },
        { status: 202 }
      );
    }

    const kafkaPayload: KafkaPayload = {
      records: [
        {
          key: (properties && (properties.userId || properties.sessionId)) || "anonymous",
          value: {
            event: event,
            timestamp: new Date().toISOString(),
            location: geo,
            properties: {
              ...(properties || {}),
              ip: ip || "unknown",
            },
          },
        },
      ],
    };

    const response = await fetch(brokerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.kafka.json.v2+json",
      },
      body: JSON.stringify(kafkaPayload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Redpanda proxy returned error status ${response.status}: ${errorText}`);
      return NextResponse.json(
        { success: false, error: "Failed to dispatch to Redpanda broker" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Record<string, unknown> | null | undefined;
    const isTimeout = err?.name === "AbortError" || (err?.message && String(err.message).includes("abort"));
    const errorMessage = isTimeout
      ? "Broker connection timed out (500ms limit reached)"
      : error instanceof Error ? error.message : "Internal Server Error";

    console.error("Gracefully caught error in custom analytics Edge route:", errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 202 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
