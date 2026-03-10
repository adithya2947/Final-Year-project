"use client";

import { Leaf, Mail, MapPin, Sprout, BarChart3, Activity, Brain } from "lucide-react";
import Link from "next/link";

const navigation = {
  platform: [
    { name: "Home", href: "/", icon: Sprout },
    { name: "Recommendation", href: "/recommend", icon: Brain },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Monitoring", href: "/monitoring", icon: Activity },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Research Papers", href: "#" },
    { name: "Best Practices", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted/50" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">TomatoSmart</span>
                <p className="text-xs text-muted-foreground">AI-Powered Agriculture</p>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Harness the power of machine learning to optimize fertilizer usage and grow healthier tomato crops sustainably.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@tomatosmart.ai</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Agricultural Innovation Hub</span>
              </div>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h3>
            <ul className="space-y-4">
              {navigation.platform.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/15">
                        <Icon className="h-4 w-4" />
                      </div>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter CTA */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the latest agricultural insights and platform updates.
            </p>
            <div className="rounded-2xl border border-border bg-card/50 p-4">
              <div className="flex items-center gap-3">
                <Sprout className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Smart Farming Tips</p>
                  <p className="text-xs text-muted-foreground">Weekly insights delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TomatoSmart. Built with AI for smarter farming.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
