"use client";

import { cn } from "@/lib/utils";
import { Sprout, Leaf, Flower2, Apple, Sun, Check } from "lucide-react";

const stages = [
  { name: "Seedling", days: "1-14", icon: Sprout, color: "primary" },
  { name: "Vegetative", days: "15-35", icon: Leaf, color: "primary" },
  { name: "Flowering", days: "36-55", icon: Flower2, color: "accent" },
  { name: "Fruiting", days: "56-85", icon: Apple, color: "chart-4" },
  { name: "Ripening", days: "86-120", icon: Sun, color: "secondary" },
];

interface StageTimelineProps {
  currentStage: string;
}

export function StageTimeline({ currentStage }: StageTimelineProps) {
  const currentIndex = stages.findIndex(
    (s) => s.name.toLowerCase() === currentStage.toLowerCase()
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm">
      {/* Background Decoration */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/5" />
      
      <div className="relative overflow-x-auto pb-2">
        <div className="flex min-w-max items-center justify-between gap-2">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index === currentIndex;
            const isPast = index < currentIndex;
            const isFuture = index > currentIndex;

            return (
              <div key={stage.name} className="flex items-center">
                <div className="group flex flex-col items-center">
                  {/* Circle with Icon */}
                  <div className="relative">
                    {/* Glow Effect for Active */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse-glow" />
                    )}
                    
                    <div
                      className={cn(
                        "relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isActive && "border-primary bg-primary text-primary-foreground shadow-lg scale-110",
                        isPast && "border-primary/50 bg-primary/20 text-primary",
                        isFuture && "border-muted-foreground/30 bg-muted text-muted-foreground"
                      )}
                    >
                      {isPast ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    
                    {/* Pulse Ring for Active */}
                    {isActive && (
                      <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-ping" style={{ animationDuration: "2s" }} />
                    )}
                  </div>
                  
                  {/* Stage Name */}
                  <span
                    className={cn(
                      "mt-3 text-sm font-semibold transition-colors",
                      isActive && "text-primary",
                      isPast && "text-primary/70",
                      isFuture && "text-muted-foreground"
                    )}
                  >
                    {stage.name}
                  </span>
                  
                  {/* Days Badge */}
                  <span 
                    className={cn(
                      "mt-1 rounded-full px-2 py-0.5 text-xs",
                      isActive && "bg-primary/15 text-primary font-medium",
                      isPast && "bg-muted text-muted-foreground",
                      isFuture && "text-muted-foreground"
                    )}
                  >
                    Day {stage.days}
                  </span>
                </div>
                
                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="relative mx-3 w-12 md:w-16 lg:w-24">
                    {/* Background Line */}
                    <div className="h-1 w-full rounded-full bg-muted" />
                    
                    {/* Progress Line */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-1 rounded-full bg-primary transition-all duration-500",
                        isPast ? "w-full" : isActive ? "w-1/2" : "w-0"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
