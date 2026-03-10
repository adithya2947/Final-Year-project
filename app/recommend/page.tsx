"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NPKGauge } from "@/components/npk-gauge";
import { StageTimeline } from "@/components/stage-timeline";
import { Spinner } from "@/components/ui/spinner";
import { Leaf, FlaskConical, Sparkles, CheckCircle2, AlertTriangle, Droplets, Thermometer } from "lucide-react";

interface Prediction {
  recommended_N: number;
  recommended_P: number;
  recommended_K: number;
  zeolite: number;
  humic_acid: number;
  confidence: number;
}

export default function RecommendPage() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [formData, setFormData] = useState({
    stage: "vegetative",
    soil_N: "45",
    soil_P: "30",
    soil_K: "35",
    pH: "6.5",
    moisture: "45",
    temperature: "25",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setPrediction(data.prediction);
      }
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="bg-grain absolute inset-0" />
      </div>
      
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            AI Recommendations
          </span>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Get Your </span>
            <span className="text-gradient-primary">Fertilizer Plan</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Enter your soil conditions and crop stage to get AI-powered fertilizer recommendations.
          </p>
        </div>

        {/* Stage Timeline */}
        <div className="mb-10">
          <StageTimeline currentStage={formData.stage} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card className="border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                  <FlaskConical className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Soil Conditions</CardTitle>
                  <CardDescription>
                    Enter your current soil readings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Crop Stage */}
                <div className="space-y-2">
                  <Label htmlFor="stage" className="text-sm font-medium">Crop Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => handleChange("stage", value)}
                  >
                    <SelectTrigger id="stage" className="h-12 rounded-xl border-2 bg-background/50">
                      <SelectValue placeholder="Select growth stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seedling">Seedling (Day 1-14)</SelectItem>
                      <SelectItem value="vegetative">Vegetative (Day 15-35)</SelectItem>
                      <SelectItem value="flowering">Flowering (Day 36-55)</SelectItem>
                      <SelectItem value="fruiting">Fruiting (Day 56-85)</SelectItem>
                      <SelectItem value="ripening">Ripening (Day 86-120)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* NPK Inputs */}
                <div className="rounded-xl bg-muted/30 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/15 text-xs font-bold text-primary">NPK</span>
                    Nutrient Levels
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="soil_N" className="text-xs text-muted-foreground">Nitrogen (ppm)</Label>
                      <Input
                        id="soil_N"
                        type="number"
                        value={formData.soil_N}
                        onChange={(e) => handleChange("soil_N", e.target.value)}
                        min="0"
                        max="200"
                        className="h-11 rounded-xl border-2 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soil_P" className="text-xs text-muted-foreground">Phosphorus (ppm)</Label>
                      <Input
                        id="soil_P"
                        type="number"
                        value={formData.soil_P}
                        onChange={(e) => handleChange("soil_P", e.target.value)}
                        min="0"
                        max="200"
                        className="h-11 rounded-xl border-2 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soil_K" className="text-xs text-muted-foreground">Potassium (ppm)</Label>
                      <Input
                        id="soil_K"
                        type="number"
                        value={formData.soil_K}
                        onChange={(e) => handleChange("soil_K", e.target.value)}
                        min="0"
                        max="200"
                        className="h-11 rounded-xl border-2 bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Environmental Inputs */}
                <div className="rounded-xl bg-muted/30 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Thermometer className="h-4 w-4 text-chart-4" />
                    Environmental Conditions
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="pH" className="text-xs text-muted-foreground">Soil pH</Label>
                      <Input
                        id="pH"
                        type="number"
                        step="0.1"
                        value={formData.pH}
                        onChange={(e) => handleChange("pH", e.target.value)}
                        min="4"
                        max="9"
                        className="h-11 rounded-xl border-2 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="moisture" className="text-xs text-muted-foreground">Moisture (%)</Label>
                      <Input
                        id="moisture"
                        type="number"
                        value={formData.moisture}
                        onChange={(e) => handleChange("moisture", e.target.value)}
                        min="0"
                        max="100"
                        className="h-11 rounded-xl border-2 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="text-xs text-muted-foreground">Temperature (C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={formData.temperature}
                        onChange={(e) => handleChange("temperature", e.target.value)}
                        min="0"
                        max="50"
                        className="h-11 rounded-xl border-2 bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="h-12 w-full gap-2 rounded-xl text-base shadow-lg glow-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="h-5 w-5" />
                      Analyzing Soil Data...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Get AI Recommendation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className={`border-2 bg-card/80 backdrop-blur-sm transition-all duration-300 ${prediction ? "border-primary/30 shadow-xl" : "border-transparent"}`}>
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${prediction ? "bg-primary" : "bg-primary/15"}`}>
                  <Leaf className={`h-6 w-6 ${prediction ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div>
                  <CardTitle className="text-xl">Recommended Fertilizer Plan</CardTitle>
                  <CardDescription>
                    {prediction
                      ? `AI prediction with ${prediction.confidence}% confidence`
                      : "Enter your soil conditions to get recommendations"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-6">
                  {/* Confidence Badge */}
                  <div className="flex items-center gap-2 rounded-xl bg-primary/10 p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">
                      High Confidence Prediction: {prediction.confidence}%
                    </span>
                  </div>
                  
                  {/* NPK Gauges */}
                  <div className="space-y-3">
                    <NPKGauge
                      label="Nitrogen (N)"
                      value={prediction.recommended_N}
                      max={100}
                      color="nitrogen"
                      unit="kg/ha"
                    />
                    <NPKGauge
                      label="Phosphorus (P)"
                      value={prediction.recommended_P}
                      max={100}
                      color="phosphorus"
                      unit="kg/ha"
                    />
                    <NPKGauge
                      label="Potassium (K)"
                      value={prediction.recommended_K}
                      max={150}
                      color="potassium"
                      unit="kg/ha"
                    />
                    <NPKGauge
                      label="Zeolite"
                      value={prediction.zeolite}
                      max={20}
                      color="zeolite"
                      unit="kg/ha"
                    />
                    <NPKGauge
                      label="Humic Acid"
                      value={prediction.humic_acid}
                      max={10}
                      color="humic"
                      unit="kg/ha"
                    />
                  </div>

                  {/* Guidelines */}
                  <div className="rounded-xl border border-accent/20 bg-accent/10 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent-foreground" />
                      <h4 className="font-semibold text-foreground">Application Guidelines</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        Apply fertilizers in the early morning or late evening
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        Ensure adequate soil moisture before application
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        Split applications recommended for better uptake
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        Retest soil after 2 weeks for adjustment
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/50">
                    <Droplets className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">No Prediction Yet</h3>
                  <p className="mt-2 max-w-xs text-muted-foreground">
                    Fill in the soil conditions form and click &quot;Get AI Recommendation&quot; to see your personalized fertilizer plan.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
