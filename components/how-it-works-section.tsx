"use client";

import { cn } from "@/lib/utils";
import { FlaskConical, Sprout, Brain, LineChart, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter Soil Conditions",
    description: "Input your current soil N, P, K levels, pH, moisture, and temperature readings from your field.",
    icon: FlaskConical,
    color: "primary",
  },
  {
    number: "02",
    title: "Select Crop Stage",
    description: "Choose the current growth stage of your tomato plants from seedling to ripening for precise recommendations.",
    icon: Sprout,
    color: "accent",
  },
  {
    number: "03",
    title: "Get AI Recommendations",
    description: "Our ML model analyzes your data and provides precise fertilizer recommendations with confidence scores.",
    icon: Brain,
    color: "secondary",
  },
  {
    number: "04",
    title: "Apply & Monitor",
    description: "Apply the recommended fertilizers and track your soil conditions over time with our real-time dashboard.",
    icon: LineChart,
    color: "chart-5",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
      
      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-0 bottom-1/3 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Get Started in </span>
            <span className="text-gradient-primary">Four Simple Steps</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our intuitive process makes it easy to optimize your tomato crop
            fertilization with AI-powered recommendations.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connection Line for Desktop */}
          <div className="absolute left-1/2 top-24 hidden h-[calc(100%-12rem)] w-1 -translate-x-1/2 lg:block">
            <div className="h-full w-full rounded-full bg-gradient-to-b from-primary via-accent to-secondary opacity-20" />
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-secondary" 
                 style={{ 
                   maskImage: "linear-gradient(to bottom, black 10%, transparent 10%, transparent 35%, black 35%, transparent 35%, transparent 60%, black 60%, transparent 60%, transparent 85%, black 85%)",
                   WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 10%, transparent 35%, black 35%, transparent 35%, transparent 60%, black 60%, transparent 60%, transparent 85%, black 85%)"
                 }} />
          </div>

          <div className="space-y-8 lg:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={step.number}
                  className={cn(
                    "relative flex flex-col items-center gap-8 lg:flex-row",
                    !isEven && "lg:flex-row-reverse"
                  )}
                >
                  {/* Content Card */}
                  <div className={cn(
                    "flex-1 lg:max-w-md",
                    isEven ? "lg:text-right" : "lg:text-left"
                  )}>
                    <div className={cn(
                      "group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl",
                      isEven ? "lg:mr-8" : "lg:ml-8"
                    )}>
                      {/* Step Number Badge */}
                      <div className={cn(
                        "mb-4 inline-flex items-center gap-2",
                        isEven ? "lg:flex-row-reverse" : ""
                      )}>
                        <span className={`rounded-full bg-${step.color}/15 px-3 py-1 text-sm font-medium text-${step.color}`}>
                          Step {step.number}
                        </span>
                        <ArrowRight className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1",
                          isEven && "lg:rotate-180 lg:group-hover:-translate-x-1 lg:group-hover:translate-x-0"
                        )} />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      
                      {/* Corner Decoration */}
                      <div className={cn(
                        "absolute -top-8 h-24 w-24 rounded-full transition-transform duration-500 group-hover:scale-150",
                        `bg-${step.color}/10`,
                        isEven ? "-right-8" : "-left-8"
                      )} />
                    </div>
                  </div>

                  {/* Center Circle with Icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="relative">
                      {/* Outer Glow */}
                      <div className={`absolute inset-0 rounded-full bg-${step.color}/30 blur-xl`} />
                      
                      {/* Main Circle */}
                      <div className={cn(
                        "relative flex h-20 w-20 items-center justify-center rounded-full shadow-xl",
                        `bg-gradient-to-br from-${step.color} to-${step.color}/80`
                      )}>
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      
                      {/* Pulse Ring */}
                      <div className={`absolute inset-0 rounded-full border-4 border-${step.color}/30 animate-pulse-glow`} />
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
