"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Tag, Sparkles } from "lucide-react";

interface CylinderCapacitiesShowcaseProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function CylinderCapacitiesShowcase({ onOpenEnquiry }: CylinderCapacitiesShowcaseProps) {
  const [activeSegment, setActiveSegment] = useState<"ALL" | "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("ALL");

  const cylinders = [
    {
      capacity: "33 Kg",
      segment: "INDUSTRIAL",
      tag: "Heavy Industrial / LOT",
      title: "33kg Heavy-Duty Industrial Cylinder",
      desc: "Designed for high-consumption industrial furnaces, powder coating, foundries, and multi-cylinder manifold banks with Liquid Off-Take (LOT) & Vapour Off-Take (VOT).",
      image: "/images/original/p1.jpg",
      specs: ["High discharge rate", "Liquid & Vapour Off-Take", "Tested up to 25 kg/cm²", "Zero residue guarantee"],
    },
    {
      capacity: "21 Kg",
      segment: "COMMERCIAL",
      tag: "HORECA Large Kitchens",
      title: "21kg Commercial High-Capacity Cylinder",
      desc: "Ideal for high-heat Chinese burners, large hotel cooking ranges, tandoors, and institutional caterers needing continuous high-pressure gas without freezing.",
      image: "/images/original/p2.jpg",
      specs: ["Continuous peak pressure", "Heavy-duty brass valve", "Anti-freezing vaporisation", "Daily replenishment"],
    },
    {
      capacity: "17 Kg",
      segment: "COMMERCIAL",
      tag: "Commercial Standard",
      title: "17kg Commercial Restaurant Cylinder",
      desc: "The standard choice for cafeterias, cloud kitchens, fast food chains, and bakeries. Provides maximum thermal efficiency and clean burning blue flame.",
      image: "/images/original/p3.jpg",
      specs: ["Pure blue flame", "Low soot & clean cooking", "Cost saving vs PNG/Diesel", "Doorstep express delivery"],
    },
    {
      capacity: "15 Kg",
      segment: "COMMERCIAL",
      tag: "Commercial Compact",
      title: "15kg Commercial Cylinder",
      desc: "Optimal for mobile catering units, outdoor live counters, and medium tea/snack establishments looking for manageable ergonomics and high calorific value.",
      image: "/images/original/p4.jpg",
      specs: ["Easy maneuvering", "Sturdy base footring", "Grade 1 certified gas", "Available across Karnataka & TN"],
    },
    {
      capacity: "12 Kg",
      segment: "DOMESTIC",
      tag: "Domestic Household Primary",
      title: "12kg Domestic Household Cylinder",
      desc: "Kwality Gas's flagship domestic cylinder engineered for household cooking. Delivers uniform pressure, total safety compliance, and rapid booking refills.",
      image: "/images/original/p5.jpg",
      specs: ["Instant booking & delivery", "Compact domestic footring", "Self-closing safety valve", "100% weight assurance"],
    },
    {
      capacity: "5.5 Kg",
      segment: "DOMESTIC",
      tag: "Compact Household",
      title: "5.5kg Domestic Cylinder",
      desc: "Convenient for small families, single working professionals, students, and as a dependable standby backup cylinder for domestic kitchens.",
      image: "/images/original/dom1.png",
      specs: ["Lightweight handling", "Fits compact kitchen cabinets", "No lengthy documentation", "Quick exchange scheme"],
    },
    {
      capacity: "4 Kg",
      segment: "DOMESTIC",
      tag: "Cook & Light / Portable",
      title: "4kg Cook & Light Cylinder",
      desc: "Equipped with specialized direct-screw burner support and light attachments. Ideal for small outdoor cooking, weekend camping, and domestic lighting.",
      image: "/images/original/dar17.png",
      specs: ["Direct burner compatible", "Emergency light fixture", "Portable steel handle", "Complete safety seal"],
    },
    {
      capacity: "2 Kg",
      segment: "DOMESTIC",
      tag: "Micro Portable",
      title: "2kg Mini Cylinder",
      desc: "Ultra-compact cylinder for laboratory burners, jewellery soldering, mobile welding, and light portable camping stoves.",
      image: "/images/original/dars2.png",
      specs: ["Ultra-portable ergonomics", "Precision pressure flow", "Factory sealed & stamped", "Safe for laboratory use"],
    },
  ];

  const filtered = activeSegment === "ALL" ? cylinders : cylinders.filter((c) => c.segment === activeSegment);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Flame className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Complete Capacity Range</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              LPG Cylinders for Every Requirement
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              From compact 2kg and 4kg domestic cylinders to 33kg heavy-duty industrial liquid and vapour off-take installations.
            </p>
          </div>

          {/* Segment Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            {(["ALL", "DOMESTIC", "COMMERCIAL", "INDUSTRIAL"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSegment(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSegment === tab
                    ? "bg-[#102A43] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab === "ALL" ? "All Capacities" : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Cylinder Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((cyl, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 group"
            >
              <div>
                {/* Top Badge & Capacity */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#102A43] tracking-tight group-hover:text-[#1769AA] transition-colors">
                    {cyl.capacity}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      cyl.segment === "DOMESTIC"
                        ? "bg-orange-50 text-[#F28C28] border border-orange-200"
                        : cyl.segment === "COMMERCIAL"
                        ? "bg-blue-50 text-[#1769AA] border border-blue-200"
                        : "bg-slate-100 text-slate-800 border border-slate-300"
                    }`}
                  >
                    {cyl.segment}
                  </span>
                </div>

                {/* Cylinder Image */}
                <div className="relative w-full h-48 bg-slate-50 rounded-xl overflow-hidden mb-4 border border-slate-100 flex items-center justify-center p-3">
                  <Image
                    src={cyl.image}
                    alt={cyl.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Titles & Description */}
                <div className="text-xs font-bold text-[#F28C28] uppercase tracking-wider mb-1">
                  {cyl.tag}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                  {cyl.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cyl.desc}
                </p>

                {/* Specs bullets */}
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                  {cyl.specs.map((sp, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenEnquiry(cyl.segment as "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL")}
                  className="w-full bg-slate-900 hover:bg-[#F28C28] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Book / Enquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Looking for Manifold Design or Custom Bulk Supply?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Our certified gas engineers design multi-cylinder manifold systems with auto changeover valves for commercial hotels and industrial plants.
              </p>
            </div>
          </div>
          <Link
            href="/cylinders"
            className="inline-flex items-center gap-2 bg-[#1769AA] hover:bg-[#12538A] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex-shrink-0"
          >
            <span>View Full Cylinder Specs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

