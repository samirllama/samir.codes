"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, Activity, BarChart3 } from "lucide-react";
import TimeSeriesChart from "./time-series-chart";
import HeatmapChart from "./heatmap-chart";

export default function ChartsShowcase() {
  const [activeChart, setActiveChart] = useState<"timeseries" | "heatmap">(
    "timeseries"
  );

  return (
    <section className="py-fluid-xl my-fluid-xl bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-fluid-h2 my-fluid-xl min-w-fit">
            Advanced Financial Analytics
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Powered by SciChart.js - the world&apos;s fastest JavaScript
            charting library for fintech applications
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-background rounded-lg p-1 border">
              <Button
                variant={activeChart === "timeseries" ? "dark" : "ghost"}
                onClick={() => setActiveChart("timeseries")}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Time Series</span>
              </Button>
              <Button
                variant={activeChart === "heatmap" ? "dark" : "ghost"}
                onClick={() => setActiveChart("heatmap")}
                className="flex items-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span>Correlation Heatmap</span>
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {activeChart === "timeseries" ? (
                <TimeSeriesChart width={800} height={400} />
              ) : (
                <HeatmapChart width={800} height={400} />
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-fluid-h3">Real-time Data</h3>
                <p>
                  Stream live market data with millisecond precision and zero
                  latency
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-fluid-h3">High Performance</h3>
                <p>
                  Handle millions of data points with WebGL acceleration and
                  smooth interactions
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-fluid-h3">Advanced Analytics</h3>
                <p>
                  Built-in technical indicators, correlation analysis, and risk
                  metrics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
