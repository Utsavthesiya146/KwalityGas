"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Briefcase, Factory, ArrowRight, CheckCircle2, Flame, ShieldCheck } from "lucide-react";

interface CategoriesGridProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function CategoriesGrid({ onOpenEnquiry }: CategoriesGridProps) {
  const categories = [
    {
      id: "domestic",
      title: "LPG for Domestic",
      subtitle: "For Modern Households & Apartments",
      description: "Clean, soot-free cooking fuel. Available in 12kg household cylinders, 5.5kg compact cylinders for small families, and 4kg Cook & Light cylinders.",
      capacities: ["12 Kg", "5.5 Kg", "4 Kg"],
      icon: <Home className="w-5 h-5 text-[#F28C28]" />,
      image: "/images/corporate/hero-domestic-lpg.jpg",
      href: "/domestic",
      type: "DOMESTIC" as const,
      accentBorder: "group-hover:border-orange-300",
      badge: "Fast Doorstep Delivery",
    },
    {
      id: "commercial",
      title: "LPG for Commercial",
      subtitle: "Hotels, Restaurants, Bakeries & Caterers",
      description: "High-pressure continuous gas supply engineered for high-heat commercial burners, tandoors, cloud kitchens, and institutional canteens.",
      capacities: ["17 Kg", "21 Kg", "33 Kg"],
      icon: <Briefcase className="w-5 h-5 text-[#1769AA]" />,
      image: "/images/corporate/hero-commercial-lpg.jpg",
      href: "/commercial",
      type: "COMMERCIAL" as const,
      accentBorder: "group-hover:border-blue-300",
      badge: "Zero Kitchen Soot",
    },
    {
      id: "industrial",
      title: "LPG for Industrial",
      subtitle: "Heavy Furnaces & Multi-Cylinder Banks",
      description: "Specialized 33kg LOT (Liquid Off-Take) & VOT cylinders, automatic changeover manifolds, and engineering consultation for manufacturing plants.",
      capacities: ["33 Kg LOT", "33 Kg VOT", "Manifolds"],
      icon: <Factory className="w-5 h-5 text-slate-800" />,
      image: "/images/corporate/hero-industrial-lpg.jpg",
      href: "/industrial",
      type: "INDUSTRIAL" as const,
      accentBorder: "group-hover:border-slate-400",
      badge: "Sulphur-Free Flame",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100/60">
            <Flame className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Tailored Energy Verticals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#102A43] tracking-tight">
            LPG Business Categories
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether for your kitchen stove, high-volume restaurant burners, or heavy industrial furnace lines, Kwality Gas delivers certified clean energy.
          </p>
        </div>

        {/* 3 Large Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-cardHover ${cat.accentBorder} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
            >
              <div>
                {/* Visual Top Preview with cinematic photography */}
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-white/95 text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md border border-white/60">
                    {cat.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#F28C28] font-bold">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[4rem]">
                    {cat.description}
                  </p>

                  {/* Capacities Pill list */}
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                      Available Capacities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.capacities.map((cap, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-7 pt-0 flex items-center gap-3">
                <Link
                  href={cat.href}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-[#102A43] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>Explore Segment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(cat.type)}
                  className="px-4 py-3 bg-orange-50 hover:bg-[#F28C28] text-[#F28C28] hover:text-white border border-orange-200 hover:border-transparent rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Book Refill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
