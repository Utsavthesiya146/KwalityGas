"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Building2, Factory, Flame } from "lucide-react";

interface CategoriesGridProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function CategoriesGrid({ onOpenEnquiry }: CategoriesGridProps) {
  const categories = [
    {
      title: "HOME & DOMESTIC",
      tagline: "A Clean Cooking Connection for Every Household",
      description: "Convenient, safe, and cleaner fuel for homes. Faster cooking, cooler kitchens, and soot-free cookware with prompt doorstep refill service.",
      sizes: "12 Kgs • 5.5 Kgs • 4 Kgs Refill",
      image: "/images/original/k5.jpg",
      href: "/domestic",
      type: "DOMESTIC" as const,
      icon: Home,
      accentColor: "border-blue-500",
    },
    {
      title: "COMMERCIAL (HORECA)",
      tagline: "High-Heat Consistency for Professional Kitchens",
      description: "Preferred partner for hotels, restaurants, caterers, bakeries, and poultry farms. Uninterrupted supply and dependable blue flame.",
      sizes: "17 Kgs • 21 Kgs • 15 Kgs Refill",
      image: "/images/original/k4.jpg",
      href: "/commercial",
      type: "COMMERCIAL" as const,
      icon: Building2,
      accentColor: "border-brand-orange",
    },
    {
      title: "INDUSTRIAL SOLUTIONS",
      tagline: "Heavy-Duty Fuel for Furnaces & Manufacturing",
      description: "Large capacity 33 Kgs cylinders and custom cylinder bank manifold engineering for high discharge heat processes and industrial manufacturing.",
      sizes: "33.0 Kgs Refill & Manifold Banks",
      image: "/images/original/k3.jpg",
      href: "/industrial",
      type: "INDUSTRIAL" as const,
      icon: Factory,
      accentColor: "border-emerald-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-brand-orange" />
            <span>Core LPG Business Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-blue-dark tracking-tight">
            Tailored LPG Fuel Solutions Across All Segments
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Delivering clean, high-calorific energy with strict quality compliance, reliable refills, and complete safety support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-white rounded-2xl shadow-card hover:shadow-cardHover transition-all duration-300 flex flex-col overflow-hidden group border border-slate-100"
              >
                {/* Image Header */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-white/90 backdrop-blur-sm text-brand-blue shadow">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                      {cat.sizes}
                    </span>
                    <h3 className="text-xl font-black text-white">{cat.title}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">{cat.tagline}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={cat.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors"
                    >
                      <span>Explore Segment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() => onOpenEnquiry(cat.type)}
                      className="px-3.5 py-1.5 rounded-lg bg-brand-orange-light text-brand-orange font-bold text-xs hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                    >
                      Book Refill
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

