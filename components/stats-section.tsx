"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingDown, TrendingUp, Layers, Target } from "lucide-react";

const stats = [
  { 
    value: 30, 
    suffix: "%",
    label: "Fertilizer Savings", 
    description: "Average reduction in fertilizer usage",
    icon: TrendingDown,
    color: "primary"
  },
  { 
    value: 25, 
    suffix: "%",
    label: "Yield Increase", 
    description: "Average improvement in crop yield",
    icon: TrendingUp,
    color: "accent"
  },
  { 
    value: 5, 
    suffix: "",
    label: "Growth Stages", 
    description: "Tailored recommendations per stage",
    icon: Layers,
    color: "secondary"
  },
  { 
    value: 98, 
    suffix: "%",
    label: "Accuracy", 
    description: "ML model prediction accuracy",
    icon: Target,
    color: "chart-4"
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-5xl font-bold tracking-tight md:text-6xl">
      {count}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute left-1/4 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-1/4 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                  {/* Icon Badge */}
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-${stat.color}/15 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  
                  {/* Number */}
                  <div className="text-gradient-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  {/* Label */}
                  <div className="mt-2 text-lg font-semibold text-foreground">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-${stat.color}/10 transition-transform duration-500 group-hover:scale-150`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
