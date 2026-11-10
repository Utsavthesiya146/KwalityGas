"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Tag, Sparkles } from "lucide-react";
import { sanitizeImageUrl } from "@/lib/sanitize-image";

interface ProductsShowcaseProps {
  products: any[];
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function ProductsShowcase({ products, onOpenEnquiry }: ProductsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("ALL");

  const defaultProducts = [
    {
      id: "prod-1",
      name: "33 Kg Industrial LOT Cylinder",
      capacity: "33 Kg",
      imageUrl: "/images/corporate/product-cylinder-33kg.jpg",
      shortDesc: "High-discharge liquid off-take cylinder for heavy industrial furnaces, kilns, and centralized manifold banks.",
      isIndustrial: true,
      features: JSON.stringify(["Liquid Off-Take (LOT)", "Tested at 25 kg/cm²", "Zero pressure drop", "High calorific blue flame"]),
    },
    {
      id: "prod-2",
      name: "21 Kg Commercial Cylinder",
      capacity: "21 Kg",
      imageUrl: "/images/corporate/hero-commercial-lpg.jpg",
      shortDesc: "Heavy-duty commercial cooking cylinder designed for high-heat wok burners and busy 24/7 restaurant kitchens.",
      isCommercial: true,
      features: JSON.stringify(["Anti-freezing vaporisation", "Forged brass heavy valve", "High continuous BTU output", "Express doorstep swap"]),
    },
    {
      id: "prod-3",
      name: "17 Kg Commercial Standard",
      capacity: "17 Kg",
      imageUrl: "/images/corporate/product-cylinder-17kg.jpg",
      shortDesc: "The prime fuel standard for commercial bakeries, cloud kitchens, and cafeterias across Karnataka & Tamil Nadu.",
      isCommercial: true,
      features: JSON.stringify(["100% net weight guarantee", "Tested at 25 kg/cm²", "Lower soot emissions", "Direct commercial invoicing"]),
    },
    {
      id: "prod-4",
      name: "12 Kg Domestic Household Cylinder",
      capacity: "12 Kg",
      imageUrl: "/images/corporate/product-cylinder-12kg.jpg",
      shortDesc: "Kwality Gas's flagship domestic household cylinder. Pure blue flame cooking, maximum economy, and fast refill booking.",
      isDomestic: true,
      features: JSON.stringify(["Electronic carousel filled", "Self-closing safety valve", "Tamper-proof security seal", "Leak checked test bath"]),
    },
    {
      id: "prod-5",
      name: "Kwality Gas Water Heater (Geyser)",
      capacity: "6 Liters/min",
      imageUrl: "/images/corporate/product-gas-geyser.jpg",
      shortDesc: "Energy-saving instant gas geyser with 8 safety protection devices, pulse ignition, and winter-summer gas saving switch.",
      isDomestic: true,
      features: JSON.stringify(["Low water pressure start", "Double pulse ignition", "Flame failure device", "12 Months Warranty"]),
    },
    {
      id: "prod-6",
      name: "5.5 Kg Compact Domestic Cylinder",
      capacity: "5.5 Kg",
      imageUrl: "/images/corporate/hero-domestic-lpg.jpg",
      shortDesc: "Convenient compact cylinder for small families, single working professionals, and standby emergency backup.",
      isDomestic: true,
      features: JSON.stringify(["Lightweight 5.5kg net", "Fits modular kitchen units", "Quick documentation process", "Fast exchange booking"]),
    },
  ];

  const prods = products && products.length > 0 ? products : defaultProducts;

  const filtered =
    activeTab === "ALL"
      ? prods
      : activeTab === "DOMESTIC"
      ? prods.filter((p) => p.isDomestic)
      : activeTab === "COMMERCIAL"
      ? prods.filter((p) => p.isCommercial)
      : prods.filter((p) => p.isIndustrial);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100/60">
              <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Certified Products & Appliances</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Products Showcase
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl leading-relaxed">
              Precision-filled LPG cylinders, instant water heaters, and certified gas regulators.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto">
            {(["ALL", "DOMESTIC", "COMMERCIAL", "INDUSTRIAL"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#102A43] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab === "ALL" ? "All Products" : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((item) => {
            let featList: string[] = [];
            try {
              if (item.features) {
                featList = typeof item.features === "string" ? JSON.parse(item.features) : item.features;
              }
            } catch (e) {
              featList = [];
            }

            const isGeyser = (item.slug && item.slug.includes("geyser")) || (item.name && item.name.toLowerCase().includes("geyser")) || (item.name && item.name.toLowerCase().includes("heater"));

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xl font-black text-[#102A43] group-hover:text-[#1769AA] transition-colors truncate">
                      {item.capacity || "Kwality Gas"}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                        item.isIndustrial
                          ? "bg-slate-100 text-slate-800 border border-slate-300"
                          : item.isCommercial
                          ? "bg-blue-50 text-[#1769AA] border border-blue-200"
                          : "bg-orange-50 text-[#F28C28] border border-orange-200"
                      }`}
                    >
                      {item.isIndustrial ? "Industrial" : item.isCommercial ? "Commercial" : "Domestic"}
                    </span>
                  </div>

                  {/* Product Image Stage */}
                  <div className="relative w-full h-52 bg-slate-900 rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-inner group">
                    <Image
                      src={sanitizeImageUrl(item.imageUrl, "/images/corporate/product-cylinder-33kg.jpg")}
                      alt={item.name}
                      fill
                      className={`transition-transform duration-500 ease-out group-hover:scale-105 ${
                        isGeyser ? "object-contain p-3 bg-gradient-to-br from-slate-50 to-blue-50/50" : "object-cover"
                      }`}
                    />
                    {!isGeyser && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug group-hover:text-[#1769AA] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[2.75rem]">
                    {item.shortDesc || item.description}
                  </p>

                  {featList.length > 0 && (
                    <div className="space-y-2 border-t border-slate-100 pt-3.5 mb-5">
                      {featList.slice(0, 3).map((f: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() =>
                      onOpenEnquiry(
                        item.isIndustrial ? "INDUSTRIAL" : item.isCommercial ? "COMMERCIAL" : "DOMESTIC"
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-xs"
                  >
                    <span>Order Refill</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={item.isDomestic ? "/cylinders" : item.isCommercial ? "/commercial" : "/industrial"}
                    className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors shrink-0"
                    title="View Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Catalog Link */}
        <div className="text-center mt-14">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white border border-slate-200/90 hover:border-[#1769AA] text-slate-800 hover:text-[#1769AA] px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-card transition-all duration-200"
          >
            <span>View Complete Products Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
