"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  Droplets,
  Gauge,
  Timer,
  Award,
} from "lucide-react";

interface GasWaterHeaterShowcaseProps {
  onOpenEnquiry: (type: "DOMESTIC") => void;
}

export default function GasWaterHeaterShowcase({ onOpenEnquiry }: GasWaterHeaterShowcaseProps) {
  const specs = [
    {
      icon: <Droplets className="w-5 h-5 text-[#1769AA]" />,
      title: "Low Water Pressure Starting",
      desc: "Starts smoothly even at ultra-low water head pressure, ideal for upper apartments.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#F28C28]" />,
      title: "Double Ignition Pulse",
      desc: "Instant automatic electrical pulse ignition eliminates pilot flame gas waste.",
    },
    {
      icon: <Gauge className="w-5 h-5 text-[#1769AA]" />,
      title: "Over Pressure Protection",
      desc: "Automatic safety relief valve discharges excess pressure to safeguard plumbing.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "Flame Failure Safety Device",
      desc: "Instantly and automatically shuts off LPG flow if the burner flame is extinguished.",
    },
    {
      icon: <Flame className="w-5 h-5 text-[#F28C28]" />,
      title: "Anti-Dry Combustion Device",
      desc: "Protects pure copper heat exchanger from overheating if water supply ceases.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Winter-Summer Gas Saver",
      desc: "Seasonal knob adjusts burner banks to save up to 40% fuel in warmer weather.",
    },
    {
      icon: <Timer className="w-5 h-5 text-purple-600" />,
      title: "20-Minute Safety Shut-off",
      desc: "Automated shut-off timer prevents continuous unmonitored operation hazards.",
    },
    {
      icon: <Award className="w-5 h-5 text-[#1769AA]" />,
      title: "12 Months Warranty",
      desc: "Backed by Kwality Gas customer care and replacement guarantee.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Imagery & Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-8 border border-slate-200 shadow-card">
              <div className="absolute top-4 right-4 bg-[#F28C28] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                8 Safety Devices
              </div>

              <div className="relative w-full h-80 sm:h-96">
                <Image
                  src="/images/original/p6-ne.png"
                  alt="Kwality Gas Water Heater Geyser"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Specs highlight strip */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200/80 text-center">
                <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <div className="text-sm font-black text-[#102A43]">Instant</div>
                  <div className="text-[10px] text-slate-500">Hot Water</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <div className="text-sm font-black text-[#F28C28]">40% Gas</div>
                  <div className="text-[10px] text-slate-500">Saving Switch</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <div className="text-sm font-black text-emerald-600">1 Year</div>
                  <div className="text-[10px] text-slate-500">Warranty</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Authentic Specifications (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Energy Appliance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
                Kwality Gas Water Heater (Geyser)
              </h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Engineered for maximum thermal efficiency and complete domestic safety. Replaces high electricity bills with instant, continuous hot water powered by Kwality LPG.
              </p>
            </div>

            {/* 8 Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((sp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 hover:bg-white hover:border-[#1769AA]/40 hover:shadow-xs transition-all flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-100">
                    {sp.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {sp.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      {sp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry("DOMESTIC")}
                className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Order Gas Geyser / Enquire
              </button>
              <Link
                href="/gas-water-heater"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Read Full Technical Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

