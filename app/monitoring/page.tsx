"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SoilCard } from "@/components/soil-card";
import { Droplets, Thermometer, FlaskConical, Gauge, RefreshCw, Activity, Wifi, WifiOff } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SoilReading {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pH: number;
  moisture: number;
  temperature: number;
  ec: number;
  timestamp: string;
}

export default function MonitoringPage() {
  const [currentReading, setCurrentReading] = useState<SoilReading | null>(null);
  const [history, setHistory] = useState<SoilReading[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchReading = useCallback(async () => {
    try {
      const response = await fetch("/api/soil");
      const data = await response.json();
      if (data.success) {
        setCurrentReading(data.data);
        setHistory((prev) => [...prev.slice(-19), data.data]);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch soil reading:", error);
    }
  }, []);

  useEffect(() => {
    fetchReading();

    if (isLive) {
      const interval = setInterval(fetchReading, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive, fetchReading]);

  const getStatusBadge = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) {
      return <Badge className="bg-primary/15 text-primary border-0">Optimal</Badge>;
    } else if (value < min * 0.8 || value > max * 1.2) {
      return <Badge variant="destructive" className="border-0">Critical</Badge>;
    }
    return <Badge className="bg-accent/15 text-accent-foreground border-0">Warning</Badge>;
  };

  const chartData = history.map((reading, index) => ({
    time: index + 1,
    N: reading.nitrogen,
    P: reading.phosphorus,
    K: reading.potassium,
  }));

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-chart-5/5 via-background to-primary/5" />
        <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-chart-5/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="bg-grain absolute inset-0" />
      </div>
      
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-4 inline-block rounded-full bg-chart-5/15 px-4 py-1.5 text-sm font-medium text-chart-5">
              Live Monitoring
            </span>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              <span className="text-balance">Soil </span>
              <span className="text-gradient-primary">Monitoring</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Real-time simulated soil condition monitoring for optimal crop growth.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isLive ? "default" : "outline"}
              onClick={() => setIsLive(!isLive)}
              className="gap-2 rounded-xl"
            >
              {isLive ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              {isLive ? "Live" : "Paused"}
            </Button>
            <Button variant="outline" onClick={fetchReading} className="gap-2 rounded-xl">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mb-10 flex items-center gap-4 rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm">
          <div className="relative">
            <div className={`h-4 w-4 rounded-full ${isLive ? "bg-primary" : "bg-muted-foreground"}`} />
            {isLive && (
              <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-primary/50" />
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">
              {isLive ? "Live Connection Active" : "Connection Paused"}
            </span>
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          {isLive && (
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Activity className="h-4 w-4 animate-pulse text-primary" />
              <span className="text-sm font-medium text-primary">Auto-refresh: 3s</span>
            </div>
          )}
        </div>

        {/* Main NPK Metrics */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SoilCard
            title="Nitrogen (N)"
            value={currentReading?.nitrogen || 0}
            unit="ppm"
            icon={<span className="text-base font-bold">N</span>}
            trend={history.length > 1 && history[history.length - 1]?.nitrogen > history[history.length - 2]?.nitrogen ? "up" : "down"}
          />
          <SoilCard
            title="Phosphorus (P)"
            value={currentReading?.phosphorus || 0}
            unit="ppm"
            icon={<span className="text-base font-bold">P</span>}
            trend={history.length > 1 && history[history.length - 1]?.phosphorus > history[history.length - 2]?.phosphorus ? "up" : "down"}
          />
          <SoilCard
            title="Potassium (K)"
            value={currentReading?.potassium || 0}
            unit="ppm"
            icon={<span className="text-base font-bold">K</span>}
            trend={history.length > 1 && history[history.length - 1]?.potassium > history[history.length - 2]?.potassium ? "up" : "down"}
          />
          <SoilCard
            title="Soil pH"
            value={currentReading?.pH || 0}
            unit=""
            icon={<FlaskConical className="h-full w-full" />}
            trend="stable"
          />
        </div>

        {/* Environmental Metrics */}
        <div className="mb-10 grid gap-5 sm:grid-cols-3">
          <Card className="group border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-chart-5/20 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Soil Moisture
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-5/15 transition-all group-hover:scale-110 group-hover:bg-chart-5 group-hover:shadow-lg">
                <Droplets className="h-5 w-5 text-chart-5 group-hover:text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-4xl font-bold text-foreground">{currentReading?.moisture || 0}</span>
                  <span className="ml-1 text-base text-muted-foreground">%</span>
                </div>
                {currentReading && getStatusBadge(currentReading.moisture, 40, 60)}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full overflow-hidden rounded-full bg-chart-5/15">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-chart-5 to-chart-5/80 transition-all duration-500"
                    style={{ width: `${currentReading?.moisture || 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Dry</span>
                  <span>Optimal: 40-60%</span>
                  <span>Wet</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-chart-4/20 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Temperature
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/15 transition-all group-hover:scale-110 group-hover:bg-chart-4 group-hover:shadow-lg">
                <Thermometer className="h-5 w-5 text-chart-4 group-hover:text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-4xl font-bold text-foreground">{currentReading?.temperature || 0}</span>
                  <span className="ml-1 text-base text-muted-foreground">C</span>
                </div>
                {currentReading && getStatusBadge(currentReading.temperature, 20, 30)}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full overflow-hidden rounded-full bg-chart-4/15">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-chart-4 to-chart-4/80 transition-all duration-500"
                    style={{ width: `${Math.min(100, ((currentReading?.temperature || 0) / 40) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Cold</span>
                  <span>Optimal: 20-30C</span>
                  <span>Hot</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-secondary/20 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Electrical Conductivity
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 transition-all group-hover:scale-110 group-hover:bg-secondary group-hover:shadow-lg">
                <Gauge className="h-5 w-5 text-secondary group-hover:text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-4xl font-bold text-foreground">{currentReading?.ec || 0}</span>
                  <span className="ml-1 text-base text-muted-foreground">dS/m</span>
                </div>
                {currentReading && getStatusBadge(currentReading.ec, 1.0, 2.0)}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full overflow-hidden rounded-full bg-secondary/15">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-secondary to-secondary/80 transition-all duration-500"
                    style={{ width: `${Math.min(100, ((currentReading?.ec || 0) / 3) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Optimal: 1.0-2.0</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live NPK Chart */}
        <Card className="mb-10 border-2 border-transparent bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Live NPK Readings</CardTitle>
                <CardDescription>
                  Real-time fluctuation of soil NPK levels over the last 20 readings.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)"
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="N"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Nitrogen"
                  />
                  <Line
                    type="monotone"
                    dataKey="P"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Phosphorus"
                  />
                  <Line
                    type="monotone"
                    dataKey="K"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Potassium"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Optimal Ranges Reference */}
        <Card className="border-2 border-transparent bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Optimal Soil Condition Ranges</CardTitle>
            <CardDescription>
              Reference values for healthy tomato crop growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Nitrogen (N)", range: "40-60 ppm", color: "primary" },
                { label: "Phosphorus (P)", range: "30-50 ppm", color: "accent" },
                { label: "Potassium (K)", range: "35-55 ppm", color: "secondary" },
                { label: "Soil pH", range: "6.0-6.8", color: "chart-4" },
                { label: "Moisture", range: "40-60%", color: "chart-5" },
                { label: "Temperature", range: "20-30 C", color: "chart-4" },
              ].map((item) => (
                <div 
                  key={item.label} 
                  className={`rounded-2xl border border-${item.color}/20 bg-${item.color}/5 p-5 transition-all hover:border-${item.color}/40 hover:shadow-md`}
                >
                  <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-${item.color}/15`}>
                    <div className={`h-3 w-3 rounded-full bg-${item.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground">{item.label}</h4>
                  <p className="mt-1 text-lg font-bold text-muted-foreground">{item.range}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
