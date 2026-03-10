"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

interface NPKGaugeProps {
  label: string;
  value: number;
  max: number;
  color: "nitrogen" | "phosphorus" | "potassium" | "zeolite" | "humic";
  unit?: string;
}

const colorConfig = {
  nitrogen: {
    bar: "bg-gradient-to-r from-primary to-primary/80",
    bg: "bg-primary/15",
    text: "text-primary",
    glow: "shadow-primary/30",
    icon: "N",
  },
  phosphorus: {
    bar: "bg-gradient-to-r from-accent to-accent/80",
    bg: "bg-accent/15",
    text: "text-accent-foreground",
    glow: "shadow-accent/30",
    icon: "P",
  },
  potassium: {
    bar: "bg-gradient-to-r from-secondary to-secondary/80",
    bg: "bg-secondary/15",
    text: "text-secondary",
    glow: "shadow-secondary/30",
    icon: "K",
  },
  zeolite: {
    bar: "bg-gradient-to-r from-chart-4 to-chart-4/80",
    bg: "bg-chart-4/15",
    text: "text-chart-4",
    glow: "shadow-chart-4/30",
    icon: "Ze",
  },
  humic: {
    bar: "bg-gradient-to-r from-chart-5 to-chart-5/80",
    bg: "bg-chart-5/15",
    text: "text-chart-5",
    glow: "shadow-chart-5/30",
    icon: "HA",
  },
};

export function NPKGauge({ label, value, max, color, unit = "kg/ha" }: NPKGaugeProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const percentage = Math.min((value / max) * 100, 100);
  const config = colorConfig[color];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedWidth(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage]);

  return (
    <div ref={ref} className="group rounded-xl bg-muted/30 p-4 transition-all duration-300 hover:bg-muted/50">
      <div className="flex items-center gap-4">
        {/* Icon Badge */}
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold transition-all duration-300",
          config.bg,
          config.text,
          "group-hover:scale-110 group-hover:shadow-lg",
          config.glow
        )}>
          {config.icon}
        </div>
        
        <div className="flex-1 space-y-2">
          {/* Label and Value */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{label}</span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-lg font-bold", config.text)}>
                {value.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">{unit}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className={cn("h-2.5 w-full overflow-hidden rounded-full", config.bg)}>
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  config.bar
                )}
                style={{ width: `${animatedWidth}%` }}
              />
            </div>
            
            {/* Percentage Label */}
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>{Math.round(percentage)}%</span>
              <span>{max}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
