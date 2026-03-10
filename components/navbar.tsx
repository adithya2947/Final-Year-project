"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, Sparkles, Home, Brain, BarChart3, Activity, LineChart } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/recommend", label: "Recommendation", icon: Brain },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/monitoring", label: "Monitoring", icon: Activity },
  { href: "/analytics", label: "Analytics", icon: LineChart },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl" 
        : "border-b border-transparent bg-transparent"
    )}>
      <div className="container mx-auto flex h-18 items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-primary/30 blur-lg transition-all group-hover:blur-xl" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg transition-transform group-hover:scale-105">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold text-foreground">TomatoSmart</span>
            <p className="text-xs text-muted-foreground">Smart Agriculture</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/50 bg-muted/30 p-1.5 backdrop-blur-sm lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Button asChild className="gap-2 rounded-full px-6 shadow-lg glow-primary">
            <Link href="/recommend">
              <Sparkles className="h-4 w-4" />
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] border-l border-border/50 bg-background/95 backdrop-blur-xl sm:w-[400px]">
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 pb-8 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">TomatoSmart</span>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium transition-all",
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                        isActive ? "bg-primary/20" : "bg-muted"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Mobile CTA */}
              <div className="mt-auto pb-8">
                <Button asChild className="w-full gap-2 rounded-xl py-6 text-base shadow-lg">
                  <Link href="/recommend" onClick={() => setOpen(false)}>
                    <Sparkles className="h-5 w-5" />
                    Get Recommendation
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
