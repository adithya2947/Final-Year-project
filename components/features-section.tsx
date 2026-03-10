"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  BarChart3, 
  Sprout, 
  Droplets, 
  Gauge,
  Leaf,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description: "Machine learning models trained on real tomato crop data predict optimal fertilizer amounts for each growth stage.",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Sprout,
    title: "Stage-Specific Guidance",
    description: "Get tailored recommendations for Seedling, Vegetative, Flowering, Fruiting, and Ripening stages.",
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Gauge,
    title: "Real-Time Monitoring",
    description: "Simulated soil condition monitoring with live NPK fluctuation tracking and instant alerts.",
    color: "chart-5",
    gradient: "from-chart-5/20 to-chart-5/5",
  },
  {
    icon: BarChart3,
    title: "Comprehensive Analytics",
    description: "Detailed dashboards showing fertilizer efficiency, yield potential, and nutrient balance analysis.",
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Droplets,
    title: "Soil Health Insights",
    description: "Monitor pH levels, moisture content, and electrical conductivity for optimal growing conditions.",
    color: "chart-4",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
  {
    icon: Leaf,
    title: "Sustainable Farming",
    description: "Optimize fertilizer usage to reduce waste, lower costs, and minimize environmental impact.",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Features
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Everything You Need for </span>
            <span className="text-gradient-primary">Smart Farming</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our platform combines advanced machine learning with agricultural expertise
            to help you grow healthier tomatoes with optimal fertilization.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <Card
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden border-2 bg-card/80 p-2 backdrop-blur-sm transition-all duration-300",
                  isHovered ? "border-primary/30 shadow-xl scale-[1.02]" : "border-transparent shadow-md hover:shadow-lg"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient Background on Hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-opacity duration-300",
                  feature.gradient,
                  isHovered ? "opacity-100" : "opacity-0"
                )} />
                
                <CardHeader className="relative pb-4">
                  <div className={cn(
                    "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
                    isHovered 
                      ? `bg-${feature.color} shadow-lg` 
                      : `bg-${feature.color}/15`
                  )}>
                    <Icon className={cn(
                      "h-7 w-7 transition-colors duration-300",
                      isHovered ? "text-primary-foreground" : `text-${feature.color}`
                    )} />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pb-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className={cn(
                    "mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all duration-300",
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  )}>
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
                
                {/* Corner Accent */}
                <div className={cn(
                  "absolute -right-8 -top-8 h-24 w-24 rounded-full transition-all duration-500",
                  `bg-${feature.color}/10`,
                  isHovered ? "scale-150" : "scale-100"
                )} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
