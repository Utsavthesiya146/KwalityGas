"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  capacity?: string | null;
  shortDesc?: string | null;
  imageUrl?: string | null;
  features?: string | null;
}

interface ProductsShowcaseProps {
  products: ProductItem[];
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function ProductsShowcase({ products, onOpenEnquiry }: ProductsShowcaseProps) {
  // Gas Water Heater highlight
  const waterHeaterFeatures = [
    "Low water pressure starting",
    "Double ignition pin, automatic electrical pulse ignition device",
    "Over water pressure protection device",
    "Flame failure safety device",
    "Anti-dry combustion protection device",
    "Winter-summer switch option for gas saving",
    "20-minute safety timer",
    "12 months comprehensive warranty",
  ];

  // Original gallery strip images: p1 to p6
  const galleryStrip = [
    { src: "/images/original/p1.jpg", title: "Industrial Plant Cylinders" },
    { src: "/images/original/p2.jpg", title: "High-Discharge Manifold Line" },
    { src: "/images/original/p3.jpg", title: "Bulk Commercial Storage" },
    { src: "/images/original/p4.jpg", title: "Bottling Precision Refills" },
    { src: "/images/original/p5.jpg", title: "Certified Domestic Cylinders" },
    { src: "/images/original/p6-ne.png", title: "Kwality Gas Fleet Delivery" },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-brand-orange" />
            <span>Product Basket & Innovations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-blue-dark tracking-tight">
            See Our Products
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            High performance cylinders, eco-friendly instant water heaters, and certified gas safety devices
          </p>
        </div>

        {/* Featured Flagship Product: Kwality Gas Water Heater */}
        <div id="water-heater" className="mb-16 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/original/gas.jpg"
                  alt="Kwality Gas Water Heater (Gas Geyser)"
                  fill
                  className="object-contain p-2"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Eco-Friendly Geyser
                </div>
              </div>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                  New Product Launch
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
                  Water Heater (Gas Heater)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                  Initially we have launched <strong className="text-slate-900">“Kwality Gas Water Heater”</strong> which again is an eco friendly product engineered for instant hot water, fuel saving, and domestic safety.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-brand-blue-dark tracking-wider mb-3">
                  Special Features & Safety Mechanisms:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {waterHeaterFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium uppercase text-[11px]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry("DOMESTIC")}
                  className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow"
                >
                  <Flame className="w-4 h-4" />
                  <span>Enquire For Gas Water Heater</span>
                </button>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-blue px-4 py-3"
                >
                  <span>View All Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cylinder Range Quick Cards */}
        <div className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-brand-blue-dark">LPG Cylinders & Capacities</h3>
            <Link href="/cylinders" className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1">
              <span>View All 7 Capacities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 4).map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative h-44 w-full bg-slate-50 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={prod.imageUrl || "/images/original/dom2.png"}
                    alt={prod.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  {prod.capacity && (
                    <span className="absolute top-2 right-2 bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {prod.capacity}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{prod.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{prod.shortDesc}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/cylinders"
                    className="text-[11px] font-bold text-brand-blue hover:text-brand-orange"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => onOpenEnquiry("DOMESTIC")}
                    className="text-[10px] font-bold bg-brand-orange text-white px-2.5 py-1 rounded-md hover:bg-brand-orange-hover transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentic Original Product Gallery Strip (p1-p6) */}
        <div>
          <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4 text-center">
            Kwality Gas Bottling Operations & Cylinders In Action
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {galleryStrip.map((item, index) => (
              <div
                key={index}
                className="relative h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white group"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] font-bold text-white leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

