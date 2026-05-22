import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    if (!event) {
      return NextResponse.json({ error: "Missing event name" }, { status: 400 });
    }

    // 1. Extract geo-location and client IP headers from Vercel Edge Runtime
    let city = request.headers.get("x-vercel-ip-city");
    let country = request.headers.get("x-vercel-ip-country");
    let region = request.headers.get("x-vercel-ip-country-region");
    let ip = request.headers.get("x-forwarded-for");

    // 2. Local environment mocking for production parity
    if (process.env.NODE_ENV === "development") {
      city = city || "Austin";
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
      // We print a warning in local console but return 202 to avoid throwing frontend exceptions
      return NextResponse.json(
        { success: false, warning: "Broker URL not configured" },
        { status: 202 }
      );
    }

    // 3. Format Redpanda Kafka JSON schema exactly as expected by proxy and Go consumer
    const kafkaPayload = {
      records: [
        {
          key: (properties && (properties.userId || properties.sessionId)) || "anonymous",
          value: {
            event: event,
            timestamp: new Date().toISOString(),
            location: geo,
            properties: {
              ...(properties || {}),
              ip: ip || "unknown", // Retain IP in properties where it won't break strict Go structs
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error in custom analytics route:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
