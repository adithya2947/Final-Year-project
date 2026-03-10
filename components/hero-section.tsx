"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Leaf, Droplets, Thermometer, Sun, Sprout } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Rich Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/5 to-secondary/8" />
      
      {/* Decorative Circles */}
      <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/20 to-transparent blur-3xl" />
      <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/15 to-transparent blur-2xl" />
      
      {/* Grain Texture Overlay */}
      <div className="bg-grain pointer-events-none absolute inset-0" />
      
      {/* Floating Agricultural Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute left-[10%] top-[20%] transition-all duration-1000 ${mounted ? "opacity-60" : "opacity-0"}`}>
          <div className="animate-float h-3 w-3 rounded-full bg-primary/40" />
        </div>
        <div className={`absolute right-[15%] top-[30%] transition-all delay-300 duration-1000 ${mounted ? "opacity-60" : "opacity-0"}`}>
          <div className="animate-float-delayed h-4 w-4 rounded-full bg-accent/50" />
        </div>
        <div className={`absolute left-[20%] bottom-[30%] transition-all delay-500 duration-1000 ${mounted ? "opacity-60" : "opacity-0"}`}>
          <div className="animate-float h-2 w-2 rounded-full bg-secondary/40" />
        </div>
        <div className={`absolute right-[25%] bottom-[20%] transition-all delay-700 duration-1000 ${mounted ? "opacity-60" : "opacity-0"}`}>
          <div className="animate-float-delayed h-3 w-3 rounded-full bg-primary/30" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <Sprout className="h-4 w-4" />
              <span>Smart Agriculture Platform</span>
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">AI</span>
            </div>
            
            <h1 className={`text-4xl font-bold leading-tight tracking-tight text-foreground transition-all delay-150 duration-700 md:text-5xl lg:text-6xl ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <span className="text-balance">Optimize Your </span>
              <span className="relative">
                <span className="text-gradient-primary">Tomato Crop</span>
                <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent/60" />
                </svg>
              </span>
              <span className="text-balance"> with AI-Powered Fertilizer Recommendations</span>
            </h1>
            
            <p className={`max-w-xl text-lg leading-relaxed text-muted-foreground transition-all delay-300 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              Harness the power of machine learning to determine optimal N, P, K, Zeolite, 
              and Humic Acid applications for every growth stage of your tomato plants.
            </p>
            
            <div className={`flex flex-col gap-4 sm:flex-row transition-all delay-500 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <Button asChild size="lg" className="gap-2 rounded-full px-8 shadow-lg glow-primary">
                <Link href="/recommend">
                  Get Fertilizer Plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 px-8">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className={`flex flex-wrap items-center gap-6 pt-4 transition-all delay-700 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">5 Growth Stages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                  <Sun className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">98% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15">
                  <Droplets className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">Real-time Data</span>
              </div>
            </div>
          </div>

          {/* Enhanced Visual */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* Outer Glow Ring */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-2xl transition-all duration-1000 ${mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
              
              {/* Animated Orbit Rings */}
              <div className={`absolute inset-0 rounded-full border-2 border-dashed border-primary/25 transition-all duration-1000 ${mounted ? "scale-100 opacity-100 animate-[spin_30s_linear_infinite]" : "scale-90 opacity-0"}`} />
              <div className={`absolute inset-6 rounded-full border-2 border-dashed border-accent/30 transition-all delay-150 duration-1000 ${mounted ? "scale-100 opacity-100 animate-[spin_25s_linear_infinite_reverse]" : "scale-90 opacity-0"}`} />
              <div className={`absolute inset-12 rounded-full border-2 border-dashed border-secondary/35 transition-all delay-300 duration-1000 ${mounted ? "scale-100 opacity-100 animate-[spin_20s_linear_infinite]" : "scale-90 opacity-0"}`} />
              
              {/* Center Plant Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`relative transition-all duration-700 ${mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl" />
                  
                  {/* Main Circle */}
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-2xl">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/90 to-primary" />
                    <Leaf className="relative z-10 h-16 w-16 text-primary-foreground drop-shadow-md" />
                  </div>
                  
                  {/* Inner Ring Glow */}
                  <div className="absolute -inset-2 rounded-full border-4 border-primary/30 animate-pulse-glow" />
                </div>
              </div>
              
              {/* Floating Nutrient Cards */}
              <div className={`absolute left-0 top-1/4 transition-all delay-500 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <div className="animate-float flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card/90 shadow-xl backdrop-blur-sm">
                  <span className="text-lg font-bold text-primary">N</span>
                  <span className="text-[10px] text-muted-foreground">Nitrogen</span>
                </div>
              </div>
              
              <div className={`absolute right-0 top-1/3 transition-all delay-600 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <div className="animate-float-delayed flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-accent/20 bg-card/90 shadow-xl backdrop-blur-sm">
                  <span className="text-lg font-bold text-accent-foreground">P</span>
                  <span className="text-[10px] text-muted-foreground">Phosphorus</span>
                </div>
              </div>
              
              <div className={`absolute bottom-1/4 left-8 transition-all delay-700 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <div className="animate-float flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-secondary/30 bg-card/90 shadow-xl backdrop-blur-sm">
                  <span className="text-lg font-bold text-secondary">K</span>
                  <span className="text-[10px] text-muted-foreground">Potassium</span>
                </div>
              </div>
              
              <div className={`absolute bottom-1/3 right-8 transition-all delay-800 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <div className="animate-float-delayed flex h-14 w-14 items-center justify-center rounded-2xl border border-chart-5/20 bg-card/90 shadow-xl backdrop-blur-sm">
                  <Droplets className="h-6 w-6 text-chart-5" />
                </div>
              </div>
              
              <div className={`absolute bottom-12 left-1/3 transition-all delay-900 duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <div className="animate-float flex h-14 w-14 items-center justify-center rounded-2xl border border-chart-4/20 bg-card/90 shadow-xl backdrop-blur-sm">
                  <Thermometer className="h-6 w-6 text-chart-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full text-background" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <path d="M0 120L48 110C96 100 192 80 288 73.3C384 67 480 73 576 76.7C672 80 768 80 864 73.3C960 67 1056 53 1152 50C1248 47 1344 53 1392 56.7L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}
