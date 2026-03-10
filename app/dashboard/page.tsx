"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StageTimeline } from "@/components/stage-timeline";
import { SoilCard } from "@/components/soil-card";
import { generateHistoricalData, getStageFromDay } from "@/lib/fertilizer-data";
import { Gauge, Sprout, Calendar, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function DashboardPage() {
  const [currentDay, setCurrentDay] = useState(35);
  const [historicalData, setHistoricalData] = useState<ReturnType<typeof generateHistoricalData>>([]);

  useEffect(() => {
    setHistoricalData(generateHistoricalData(60));
    
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev >= 120 ? 1 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentStage = getStageFromDay(currentDay);
  const currentData = historicalData[Math.min(currentDay - 1, historicalData.length - 1)];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
        <div className="bg-grain absolute inset-0" />
      </div>
      
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Dashboard
          </span>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Crop Growth </span>
            <span className="text-gradient-primary">Dashboard</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Monitor your tomato crop progress and nutrient levels in real-time.
          </p>
        </div>

        {/* Current Status Badges */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/80 px-5 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Day</p>
              <p className="text-lg font-bold text-foreground">Day {currentDay}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/80 px-5 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
              <Sprout className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Growth Stage</p>
              <p className="text-lg font-bold text-foreground">{currentStage}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/80 px-5 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="text-lg font-bold text-foreground">{Math.round((currentDay / 120) * 100)}%</p>
            </div>
          </div>
        </div>

        {/* Stage Timeline */}
        <div className="mb-10">
          <StageTimeline currentStage={currentStage} />
        </div>

        {/* Quick Stats */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SoilCard
            title="Nitrogen Level"
            value={currentData?.nitrogen || 45}
            unit="ppm"
            icon={<span className="text-base font-bold">N</span>}
            trend="stable"
          />
          <SoilCard
            title="Phosphorus Level"
            value={currentData?.phosphorus || 35}
            unit="ppm"
            icon={<span className="text-base font-bold">P</span>}
            trend="up"
          />
          <SoilCard
            title="Potassium Level"
            value={currentData?.potassium || 40}
            unit="ppm"
            icon={<span className="text-base font-bold">K</span>}
            trend="stable"
          />
          <SoilCard
            title="Growth Progress"
            value={Math.round((currentDay / 120) * 100)}
            unit="%"
            icon={<Gauge className="h-full w-full" />}
            trend="up"
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="npk" className="space-y-6">
          <TabsList className="h-12 rounded-2xl bg-muted/50 p-1.5">
            <TabsTrigger value="npk" className="rounded-xl px-6">NPK Levels</TabsTrigger>
            <TabsTrigger value="nitrogen" className="rounded-xl px-6">Nitrogen</TabsTrigger>
            <TabsTrigger value="phosphorus" className="rounded-xl px-6">Phosphorus</TabsTrigger>
            <TabsTrigger value="potassium" className="rounded-xl px-6">Potassium</TabsTrigger>
          </TabsList>

          <TabsContent value="npk">
            <Card className="border-2 border-transparent bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">NPK Levels Over Time</CardTitle>
                <CardDescription>
                  Track nitrogen, phosphorus, and potassium levels throughout the growth cycle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData.slice(0, currentDay)}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        label={{ value: 'Day', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        label={{ value: 'ppm', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px',
                          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="nitrogen" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={3}
                        dot={false}
                        name="Nitrogen"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="phosphorus" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={3}
                        dot={false}
                        name="Phosphorus"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="potassium" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={3}
                        dot={false}
                        name="Potassium"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nitrogen">
            <Card className="border-2 border-transparent bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Nitrogen Levels</CardTitle>
                <CardDescription>
                  Detailed view of nitrogen levels and trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData.slice(0, currentDay)}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="nitrogen" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1) / 0.2)"
                        strokeWidth={3}
                        name="Nitrogen (ppm)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phosphorus">
            <Card className="border-2 border-transparent bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Phosphorus Levels</CardTitle>
                <CardDescription>
                  Detailed view of phosphorus levels and trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData.slice(0, currentDay)}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="phosphorus" 
                        stroke="hsl(var(--chart-2))" 
                        fill="hsl(var(--chart-2) / 0.2)"
                        strokeWidth={3}
                        name="Phosphorus (ppm)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="potassium">
            <Card className="border-2 border-transparent bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Potassium Levels</CardTitle>
                <CardDescription>
                  Detailed view of potassium levels and trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData.slice(0, currentDay)}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="potassium" 
                        stroke="hsl(var(--chart-3))" 
                        fill="hsl(var(--chart-3) / 0.2)"
                        strokeWidth={3}
                        name="Potassium (ppm)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stage-Based Requirements */}
        <Card className="mt-10 border-2 border-transparent bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Stage-Based Nutrient Requirements</CardTitle>
            <CardDescription>
              Recommended nutrient levels for each growth stage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-4 text-left font-semibold text-foreground">Stage</th>
                    <th className="px-4 py-4 text-center font-semibold text-foreground">Days</th>
                    <th className="px-4 py-4 text-center font-semibold text-primary">N (kg/ha)</th>
                    <th className="px-4 py-4 text-center font-semibold text-accent-foreground">P (kg/ha)</th>
                    <th className="px-4 py-4 text-center font-semibold text-secondary">K (kg/ha)</th>
                    <th className="px-4 py-4 text-center font-semibold text-chart-4">Zeolite</th>
                    <th className="px-4 py-4 text-center font-semibold text-chart-5">Humic Acid</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { stage: "Seedling", days: "1-14", n: 30, p: 45, k: 25, z: 5, h: 2, active: currentStage === "Seedling" },
                    { stage: "Vegetative", days: "15-35", n: 80, p: 50, k: 60, z: 10, h: 3, active: currentStage === "Vegetative" },
                    { stage: "Flowering", days: "36-55", n: 60, p: 80, k: 90, z: 12, h: 4, active: currentStage === "Flowering" },
                    { stage: "Fruiting", days: "56-85", n: 50, p: 70, k: 120, z: 15, h: 5, active: currentStage === "Fruiting" },
                    { stage: "Ripening", days: "86-120", n: 30, p: 40, k: 100, z: 8, h: 3, active: currentStage === "Ripening" },
                  ].map((row) => (
                    <tr 
                      key={row.stage} 
                      className={`border-b border-border transition-colors ${row.active ? "bg-primary/10" : "hover:bg-muted/30"}`}
                    >
                      <td className="px-4 py-4">
                        <span className={`font-medium ${row.active ? "text-primary" : "text-foreground"}`}>
                          {row.stage}
                        </span>
                        {row.active && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            Current
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center text-muted-foreground">{row.days}</td>
                      <td className="px-4 py-4 text-center font-medium">{row.n}</td>
                      <td className="px-4 py-4 text-center font-medium">{row.p}</td>
                      <td className="px-4 py-4 text-center font-medium">{row.k}</td>
                      <td className="px-4 py-4 text-center font-medium">{row.z}</td>
                      <td className="px-4 py-4 text-center font-medium">{row.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
