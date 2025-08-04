"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { initializeSciChart, getChartTheme } from "@/lib/scichart-config";
import FallbackChart from "./fallback-chart";

interface HeatmapChartProps {
  width?: number;
  height?: number;
}

export default function HeatmapChart({
  width = 800,
  height = 400,
}: HeatmapChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [sciChartSurface, setSciChartSurface] = useState<any>();
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

        const initialized = await initializeSciChart();
        if (!initialized) {
          throw new Error("Failed to initialize SciChart");
        }

        const {
          SciChartSurface,
          NumericAxis,
          UniformHeatmapDataSeries,
          UniformHeatmapRenderableSeries,
          HeatmapColorMap,
          SciChartJsNavyTheme,
          EAxisAlignment,
        } = await import("scichart");

        const isDark = resolvedTheme === "dark";
        const themeConfig = getChartTheme(isDark);

        const createSurfacePromise = SciChartSurface.create(chartRef.current, {
          theme: isDark ? new SciChartJsNavyTheme() : undefined,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Chart creation timeout")), 10000)
        );

        const { sciChartSurface, wasmContext } = (await Promise.race([
          createSurfacePromise,
          timeoutPromise,
        ])) as any;

        const xAxis = new NumericAxis(wasmContext, {
          axisTitle: "Time Periods",
          titleStyle: { color: themeConfig.textColor },
          labelStyle: { color: themeConfig.textColor },
        });

        const yAxis = new NumericAxis(wasmContext, {
          axisTitle: "Assets",
          axisAlignment: EAxisAlignment.Left,
          titleStyle: { color: themeConfig.textColor },
          labelStyle: { color: themeConfig.textColor },
        });

        sciChartSurface.xAxes.add(xAxis);
        sciChartSurface.yAxes.add(yAxis);

        // Generate correlation data
        const width = 15;
        const height = 10;
        const data: number[] = [];

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const correlation =
              Math.sin(x * 0.3) * Math.cos(y * 0.2) +
              Math.random() * 0.3 -
              0.15;
            data.push(Math.max(-1, Math.min(1, correlation)));
          }
        }

        const heatmapDataSeries = new UniformHeatmapDataSeries(wasmContext, {
          xStart: 0,
          xStep: 1,
          yStart: 0,
          yStep: 1,
          xSize: width,
          ySize: height,
          zValues: data,
        });

        const colorMap = new HeatmapColorMap({
          minimum: -1,
          maximum: 1,
          gradientStops: [
            { offset: 0, color: "#FF4444" },
            { offset: 0.5, color: "#FFFFFF" },
            { offset: 1, color: "#44FF44" },
          ],
        });

        const heatmapSeries = new UniformHeatmapRenderableSeries(wasmContext, {
          dataSeries: heatmapDataSeries,
          colorMap,
          useLinearTextureFiltering: false,
          opacity: 0.8,
        });

        sciChartSurface.renderableSeries.add(heatmapSeries);
        setSciChartSurface(sciChartSurface);
        setIsLoading(false);
      } catch (error) {
        console.error("Error creating heatmap:", error);
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
          console.error("Error cleaning up heatmap:", error);
        }
      }
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || isLoading) {
    return (
      <div
        style={{ width, height }}
        className="bg-muted rounded-lg flex items-center justify-center"
      >
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <div className="text-muted-foreground">Loading heatmap...</div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return <FallbackChart type="heatmap" width={width} height={height} />;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Asset Correlation Heatmap</h3>
        <p className="text-sm text-muted-foreground">
          Real-time correlation analysis between financial instruments
        </p>
      </div>
      <div
        ref={chartRef}
        style={{ width, height }}
        className="border rounded-lg bg-background"
      />
      <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Negative Correlation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border rounded"></div>
          <span>No Correlation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Positive Correlation</span>
        </div>
      </div>
    </div>
  );
}
