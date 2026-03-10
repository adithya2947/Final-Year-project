"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Leaf, Droplets, FlaskConical, Target, Award, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

const fertilizerEfficiency = [
  { stage: "Seedling", efficiency: 85, target: 90 },
  { stage: "Vegetative", efficiency: 92, target: 90 },
  { stage: "Flowering", efficiency: 88, target: 90 },
  { stage: "Fruiting", efficiency: 94, target: 90 },
  { stage: "Ripening", efficiency: 90, target: 90 },
];

const nutrientDistribution = [
  { name: "Nitrogen", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Phosphorus", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Potassium", value: 30, color: "hsl(var(--chart-3))" },
  { name: "Zeolite", value: 7, color: "hsl(var(--chart-4))" },
  { name: "Humic Acid", value: 3, color: "hsl(var(--chart-5))" },
];

const soilHealthData = [
  { metric: "N Balance", value: 85 },
  { metric: "P Balance", value: 78 },
  { metric: "K Balance", value: 82 },
  { metric: "pH Level", value: 90 },
  { metric: "Moisture", value: 75 },
  { metric: "EC Level", value: 88 },
];

const yieldAnalysis = [
  { month: "Jan", actual: 0, potential: 0 },
  { month: "Feb", actual: 0, potential: 0 },
  { month: "Mar", actual: 2.5, potential: 3.0 },
  { month: "Apr", actual: 5.2, potential: 5.5 },
  { month: "May", actual: 8.4, potential: 9.0 },
  { month: "Jun", actual: 12.1, potential: 12.5 },
  { month: "Jul", actual: 15.8, potential: 16.0 },
  { month: "Aug", actual: 14.2, potential: 15.0 },
  { month: "Sep", actual: 10.5, potential: 11.0 },
  { month: "Oct", actual: 6.3, potential: 7.0 },
  { month: "Nov", actual: 2.1, potential: 2.5 },
  { month: "Dec", actual: 0, potential: 0 },
];

const impactMetrics = [
  { label: "Fertilizer Cost Savings", value: 28, unit: "%" },
  { label: "Yield Improvement", value: 22, unit: "%" },
  { label: "Water Efficiency", value: 15, unit: "%" },
  { label: "Carbon Footprint Reduction", value: 18, unit: "%" },
];

export default function AnalyticsPage() {
  const [timeRange] = useState("season");

  const calculateSoilHealthScore = () => {
    const totalScore = soilHealthData.reduce((acc, item) => acc + item.value, 0);
    return Math.round(totalScore / soilHealthData.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Advanced insights and analysis for optimizing your tomato crop.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Soil Health Score
              </CardTitle>
              <Award className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{calculateSoilHealthScore()}%</div>
              <Progress value={calculateSoilHealthScore()} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Fertilizer Efficiency
              </CardTitle>
              <Target className="h-5 w-5 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">90%</div>
              <Progress value={90} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Above 90% target
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Yield Potential
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">96%</div>
              <Progress value={96} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Near optimal conditions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cost Savings
              </CardTitle>
              <BarChart3 className="h-5 w-5 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28%</div>
              <Progress value={28} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                vs traditional methods
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="efficiency" className="space-y-6">
          <TabsList>
            <TabsTrigger value="efficiency">Fertilizer Efficiency</TabsTrigger>
            <TabsTrigger value="distribution">Nutrient Distribution</TabsTrigger>
            <TabsTrigger value="health">Soil Health</TabsTrigger>
            <TabsTrigger value="yield">Yield Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="efficiency">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Fertilizer Efficiency by Growth Stage</CardTitle>
                <CardDescription>
                  Compare actual uptake efficiency against targets for each stage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fertilizerEfficiency}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="efficiency"
                        fill="hsl(var(--chart-1))"
                        name="Efficiency %"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="target"
                        fill="hsl(var(--chart-2))"
                        name="Target %"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Nutrient Distribution</CardTitle>
                <CardDescription>
                  Breakdown of nutrient application by type.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutrientDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {nutrientDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    {nutrientDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-muted-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Soil Health Analysis</CardTitle>
                <CardDescription>
                  Comprehensive soil health metrics across key indicators.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilHealthData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Soil Health"
                        dataKey="value"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yield">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Yield Analysis</CardTitle>
                <CardDescription>
                  Actual yield vs potential yield throughout the season.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yieldAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="actual"
                        fill="hsl(var(--chart-1))"
                        name="Actual (tons/ha)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="potential"
                        fill="hsl(var(--chart-2) / 0.5)"
                        name="Potential (tons/ha)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Impact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-heading">Smart Farming Impact</CardTitle>
            <CardDescription>
              Measurable improvements from using AI-powered fertilizer recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-heading text-2xl font-bold text-primary">
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                  <p className="font-medium text-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-heading">AI Recommendations</CardTitle>
            <CardDescription>
              Personalized suggestions based on your analytics data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/20">
                  <Leaf className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <h4 className="font-medium">Optimize Nitrogen Application</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Consider splitting nitrogen applications into 3 doses during the vegetative stage
                    for improved uptake efficiency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/20">
                  <Droplets className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <h4 className="font-medium">Adjust Irrigation Schedule</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Increase watering frequency during flowering stage to maintain optimal 45-55%
                    soil moisture for better phosphorus uptake.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/20">
                  <FlaskConical className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <h4 className="font-medium">Increase Humic Acid Application</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Adding 20% more humic acid during fruiting stage can improve nutrient absorption
                    and fruit quality based on current soil EC levels.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
