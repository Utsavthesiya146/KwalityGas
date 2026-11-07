"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
  Factory,
  PhoneCall,
  Scale,
  CheckCircle2,
} from "lucide-react";

interface HeroSliderProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function HeroSlider({ onOpenEnquiry }: HeroSliderProps) {
  return (
    <section className="relative w-full bg-[#0A192F] text-white overflow-hidden">
      {/* Subtle Ambient Lighting Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Main 50/50 Balanced Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Corporate Narrative & Clear CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/15">
              <Flame className="w-3.5 h-3.5 fill-[#F28C28]" />
              <span>Grade 1 Rated • CARE MDRA Certified</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] break-words">
              Industrial-Grade LPG Bottling & Distribution Across South India
            </h1>

            {/* Short Supporting Description */}
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl break-words">
              Operating 3 modern bottling hubs in Hosur, Chennai, and Dharwad with 30,000 MTPA bulk storage and 8,000 cylinders/day throughput. We provide certified pure blue-flame LPG with guaranteed tare weight for domestic households, commercial kitchens, and industrial manufacturing.
            </p>

            {/* Two Clear CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
              <button
                onClick={() => onOpenEnquiry("DOMESTIC")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Book Cylinder Refill</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/price-list"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
              >
                <span>View Live Rates</span>
              </Link>
            </div>

            <div className="pt-1">
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Helpline: +91 78997 87101</span>
              </a>
            </div>

            {/* 3 Quick Inline Proof Points */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>30,000 MTPA Bulk Storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>8,000 Cylinders / Day</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Tested Tare Weight</span>
              </div>
            </div>
          </div>

          {/* Right Column: One Relevant, High-Quality LPG Industrial Photograph (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl aspect-[4/3] bg-slate-900 group">
              <Image
                src="/images/original/service_style_16.jpg"
                alt="Kwality Gas Bottling Plant Bullets & Infrastructure"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />
              
              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A192F]/85 backdrop-blur-md p-3 rounded-xl border border-white/15 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-[#F28C28]" />
                    LPG Bulk Mounded Storage Bullets
                  </span>
                  <span className="text-[#F28C28] font-bold">30,000 MTPA</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Kwality Gas Bottlers Private Limited • Automated Bottling Infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Key Value Bar */}
      <div className="relative z-30 bg-[#081624] border-t border-white/10 py-3.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-white text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28] shrink-0">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">100% Certified Tare Weight</strong>
              <span className="text-slate-400 text-[11px]">Zero-tolerance digital verification</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Factory className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">3 Modern Bottling Hubs</strong>
              <span className="text-slate-400 text-[11px]">Hosur • Chennai • Dharwad</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">Grade 1 Rating by CARE</strong>
              <span className="text-slate-400 text-[11px]">Highest safety audit score</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">Pure Blue-Flame LPG</strong>
              <span className="text-slate-400 text-[11px]">Clean burning with zero soot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
