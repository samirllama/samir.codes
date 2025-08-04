"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { SciChartSurface } from "scichart";
import { initializeSciChart, getChartTheme } from "@/lib/scichart-config";
import { TSciChart } from "scichart/types/TSciChart";
import FallbackChart from "./fallback-chart";

interface TimeSeriesChartProps {
  width?: number;
  height?: number;
}

type SciChartCreateResult = {
  sciChartSurface: SciChartSurface;
  wasmContext: TSciChart;
};

export default function TimeSeriesChart({
  width = 800,
  height = 400,
}: TimeSeriesChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [sciChartSurface, setSciChartSurface] = useState<SciChartSurface>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const initChart = async () => {
      if (!chartRef.current || !mounted) return;

      try {
        setIsLoading(true);
        setHasError(false);

        // Initialize SciChart
        const initialized = await initializeSciChart();
        if (!initialized) {
          throw new Error("Failed to initialize SciChart");
        }

        // Dynamic import to avoid SSR issues
        const {
          SciChartSurface,
          NumericAxis,
          DateTimeNumericAxis,
          FastLineRenderableSeries,
          XyDataSeries,
          EllipsePointMarker,
          SciChartJsNavyTheme,
          EAxisAlignment,
          EAutoRange,
        } = await import("scichart");

        const isDark = resolvedTheme === "dark";
        const themeConfig = getChartTheme(isDark);

        // Create the SciChartSurface with timeout
        const createSurfacePromise = SciChartSurface.create(chartRef.current, {
          theme: isDark ? new SciChartJsNavyTheme() : undefined,
        });

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Chart creation timeout")), 10000)
        );

        const result = (await Promise.race([
          createSurfacePromise,
          timeoutPromise,
        ])) as SciChartCreateResult;
        const { sciChartSurface, wasmContext } = result;

        // Create axes
        const xAxis = new DateTimeNumericAxis(wasmContext, {
          axisTitle: "Time",
          labelStyle: { color: themeConfig.textColor },
        });

        const yAxis = new NumericAxis(wasmContext, {
          axisTitle: "Price ($)",
          axisAlignment: EAxisAlignment.Left,
          autoRange: EAutoRange.Always,
          labelStyle: { color: themeConfig.textColor },
        });

        sciChartSurface.xAxes.add(xAxis);
        sciChartSurface.yAxes.add(yAxis);

        // Generate sample data
        const generateData = () => {
          const data: { x: Date; y: number }[] = [];
          const startDate = new Date(2024, 0, 1);
          let price = 100;

          for (let i = 0; i < 50; i++) {
            const date = new Date(
              startDate.getTime() + i * 24 * 60 * 60 * 1000
            );
            price += (Math.random() - 0.5) * 5;
            data.push({ x: date, y: price });
          }
          return data;
        };

        const lineData = generateData();
        const lineSeries = new XyDataSeries(wasmContext, {
          xValues: lineData.map((d) => d.x.getTime()),
          yValues: lineData.map((d) => d.y),
        });

        const lineRenderableSeries = new FastLineRenderableSeries(wasmContext, {
          dataSeries: lineSeries,
          stroke: "#50C878",
          strokeThickness: 2,
          pointMarker: new EllipsePointMarker(wasmContext, {
            width: 4,
            height: 4,
            fill: "#50C878",
          }),
        });

        sciChartSurface.renderableSeries.add(lineRenderableSeries);
        setSciChartSurface(sciChartSurface);
        setIsLoading(false);
      } catch (error) {
        console.error("Error creating SciChart:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    initChart();

    return () => {
      if (sciChartSurface) {
        try {
          sciChartSurface.delete();
        } catch (error) {
          console.error("Error cleaning up chart:", error);
        }
      }
    };
  }, [mounted, resolvedTheme, sciChartSurface]);

  if (!mounted || isLoading) {
    return (
      <div
        style={{ width, height }}
        className="bg-muted rounded-lg flex items-center justify-center"
      >
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <div className="text-muted-foreground">
            Loading advanced charts...
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return <FallbackChart type="timeseries" width={width} height={height} />;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Financial Time Series</h3>
        <p className="text-sm text-muted-foreground">
          Real-time stock price movements with interactive analysis
        </p>
      </div>
      <div
        ref={chartRef}
        style={{ width, height }}
        className="border rounded-lg bg-background"
      />
    </div>
  );
}
