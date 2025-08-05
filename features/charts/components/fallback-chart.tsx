"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { generateMockChartData } from "@/lib/scichart-config";

interface FallbackChartProps {
  type: "timeseries" | "heatmap";
  width?: number;
  height?: number;
}

export default function FallbackChart({
  type,
  width = 800,
  height = 400,
}: FallbackChartProps) {
  const data = generateMockChartData();

  if (type === "timeseries") {
    return (
      <div className="w-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Financial Time Series (Demo Mode)
          </h3>
          <p className="text-sm text-muted-foreground">
            Interactive charts loading... Showing sample data
          </p>
        </div>
        <Card className="border rounded-lg" style={{ width, height }}>
          <CardContent className="p-4 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recent Price Movements</h4>
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {data.slice(0, 10).map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-xs p-2 bg-muted/50 rounded"
                    >
                      <span>{item.date}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">${item.price}</span>
                        <div
                          className={`flex items-center ${
                            Number.parseFloat(item.change) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {Number.parseFloat(item.change) >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="ml-1">{item.change}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Advanced Charts Loading</p>
                    <p className="text-sm text-muted-foreground">
                      High-performance WebGL charts will appear here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Heatmap fallback
  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Asset Correlation Heatmap (Demo Mode)
        </h3>
        <p className="text-sm text-muted-foreground">
          Interactive heatmap loading... Showing sample correlation data
        </p>
      </div>
      <Card className="border rounded-lg" style={{ width, height }}>
        <CardContent className="p-4 h-full">
          <div className="grid grid-cols-8 gap-1 h-full">
            {Array.from({ length: 64 }, (_, i) => {
              const correlation = Math.sin(i * 0.3) * Math.cos(i * 0.2);
              const intensity = Math.abs(correlation);
              const isPositive = correlation > 0;
              return (
                <div
                  key={i}
                  className={`rounded-sm flex items-center justify-center text-xs font-mono ${
                    isPositive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  style={{
                    opacity: 0.3 + intensity * 0.7,
                    minHeight: "20px",
                  }}
                  title={`Correlation: ${correlation.toFixed(2)}`}
                >
                  {correlation.toFixed(1)}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Negative Correlation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Positive Correlation</span>
        </div>
      </div>
    </div>
  );
}
