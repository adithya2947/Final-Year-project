"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoilCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "stable";
  className?: string;
}

export function SoilCard({
  title,
  value,
  unit,
  icon,
  trend,
  className,
}: SoilCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  
  const trendConfig = {
    up: { color: "text-primary", bg: "bg-primary/10", label: "Rising" },
    down: { color: "text-chart-4", bg: "bg-chart-4/10", label: "Falling" },
    stable: { color: "text-muted-foreground", bg: "bg-muted", label: "Stable" },
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden border-2 border-transparent bg-card/90 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl",
      className
    )}>
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {typeof value === "number" ? value.toFixed(1) : value}
              </span>
              <span className="text-base text-muted-foreground">{unit}</span>
            </div>
            
            {/* Trend Badge */}
            {trend && (
              <div className="pt-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  trendConfig[trend].bg,
                  trendConfig[trend].color
                )}>
                  <TrendIcon className="h-3 w-3" />
                  {trendConfig[trend].label}
                </span>
              </div>
            )}
          </div>
          
          {/* Icon Container */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg">
            {icon}
          </div>
        </div>
      </CardContent>
      
      {/* Decorative Corner */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
    </Card>
  );
}
