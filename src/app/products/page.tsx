import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { sanitizeProduct } from "@/lib/sanitize-image";
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Tag, Phone, Sparkles, Package, Wrench } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kwality Gas Products | LPG Cylinders, Gas Water Heaters & Industrial Valves",
  description:
    "Explore Kwality Gas products: Kwality Gas Water Heater (Gas Geyser), domestic LPG cylinders (12kg, 5.5kg, 4kg), commercial cylinders (17kg, 21kg), 33kg industrial cylinders, and safety devices.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  let dbProducts: any[] = [];
  try {
    const raw = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    });
    dbProducts = raw.map(sanitizeProduct);
  } catch (err) {
    console.error("ProductsPage data fetch error:", err);
  }

  const waterHeaterSpecs = [
    { title: "Low Water Pressure Starting", desc: "Starts smoothly even in multi-story apartments and areas with low water head pressure." },
    { title: "Double Ignition Pin, Automatic Electrical Pulse", desc: "Reliable, instantaneous ignition without pilot flame waste or manual matches." },
    { title: "Over Water Pressure Protection Device", desc: "Safety relief valve prevents plumbing pressure damage during peak flow." },
    { title: "Flame Failure Safety Device", desc: "Automatically cuts off gas flow instantly if burner flame is extinguished." },
    { title: "Anti-Dry Combustion Protection Device", desc: "Protects internal copper heat exchanger from overheating when water flow ceases." },
    { title: "Winter-Summer Switch Option For Gas Saving", desc: "Dual seasonal burner control saves up to 40% gas during warmer months." },
    { title: "20-Minute Safety Timer", desc: "Automatic shut-off timer prevents continuous operation hazards." },
    { title: "12 Months Comprehensive Warranty", desc: "Backed by Kwality Gas customer care and replacement guarantee." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-[#06121E] via-[#0B1D2F] to-[#102A43] text-white py-18 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3.5 border border-white/15 shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-[#F28C28]" />
            <span>Official Product Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kwality Gas Products & Equipment
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Clean thermal energy solutions engineered for households, restaurants, commercial caterers, and heavy industrial furnaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/cylinders"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0 border border-orange-100 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#1769AA] transition-colors">
                LPG Cylinders
              </div>
              <div className="text-xs text-slate-500">2kg to 33kg range</div>
            </div>
          </Link>

          <Link
            href="/gas-water-heater"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#1769AA] transition-colors">
                Gas Water Heater
              </div>
              <div className="text-xs text-slate-500">8 safety devices included</div>
            </div>
          </Link>

          <Link
            href="/safety-devices"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#1769AA] transition-colors">
                Safety Devices
              </div>
              <div className="text-xs text-slate-500">Gas detectors & shutoffs</div>
            </div>
          </Link>

          <Link
            href="/accessories"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#1769AA] transition-colors">
                Accessories
              </div>
              <div className="text-xs text-slate-500">IS 9573 hoses & regulators</div>
            </div>
          </Link>
        </div>

        {/* Featured Section: Kwality Gas Water Heater */}
        <div id="water-heater" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm h-80 sm:h-96 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-3xl p-6 border border-slate-100 shadow-inner flex items-center justify-center">
                <Image
                  src="/images/corporate/product-gas-geyser.jpg"
                  alt="Kwality Gas Water Heater with 8 Safety Features"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#F28C28] text-xs font-bold uppercase tracking-wider border border-orange-100/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Energy Saver</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                Kwality Gas Water Heater (Gas Geyser)
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Engineered with 8 multi-stage safety protection devices, pure oxygen-free copper heat exchanger, and automatic electrical pulse ignition. Reduces water heating energy expenses by up to 60% compared to electric storage geysers.
              </p>

              {/* 8 Features compact list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {waterHeaterSpecs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold">{spec.title}</strong>
                      <span className="text-slate-500 text-[11px] leading-snug">{spec.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/gas-water-heater"
                  className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <span>Explore Water Heater Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact/domestic"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-xl font-semibold text-xs transition-all"
                >
                  Order Geyser Refill
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cylinder Lineup Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
                LPG Cylinder Capacities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                From micro 2kg portable cylinders to heavy-duty 33kg liquid off-take industrial installations.
              </p>
            </div>
            <Link
              href="/cylinders"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:text-[#102A43] shrink-0"
            >
              <span>View Full Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(dbProducts.length > 0 ? dbProducts : [
              { id: "1", name: "33kg Industrial Cylinder", capacity: "33 Kg", imageUrl: "/images/corporate/product-cylinder-33kg.jpg", shortDesc: "LOT/VOT for high-consumption industrial furnaces and manifolds.", isIndustrial: true },
              { id: "2", name: "21kg Commercial Cylinder", capacity: "21 Kg", imageUrl: "/images/corporate/hero-commercial-lpg.jpg", shortDesc: "Continuous high-pressure cooking for large restaurants and hotels.", isCommercial: true },
              { id: "3", name: "17kg Commercial Cylinder", capacity: "17 Kg", imageUrl: "/images/corporate/product-cylinder-17kg.jpg", shortDesc: "Standard fuel for caterers, cloud kitchens, and bakeries.", isCommercial: true },
              { id: "4", name: "15kg Commercial Cylinder", capacity: "15 Kg", imageUrl: "/images/corporate/hero-commercial-lpg.jpg", shortDesc: "Manageable ergonomics for fast food joints and tea stalls.", isCommercial: true },
              { id: "5", name: "12kg Domestic Cylinder", capacity: "12 Kg", imageUrl: "/images/corporate/product-cylinder-12kg.jpg", shortDesc: "Flagship domestic cooking gas cylinder for households.", isDomestic: true },
              { id: "6", name: "5.5kg Domestic Cylinder", capacity: "5.5 Kg", imageUrl: "/images/corporate/hero-domestic-lpg.jpg", shortDesc: "Compact cylinder for small families and single executives.", isDomestic: true },
              { id: "7", name: "4kg Cook & Light Cylinder", capacity: "4 Kg", imageUrl: "/images/corporate/product-cylinder-12kg.jpg", shortDesc: "Direct burner and emergency lighting attachment support.", isDomestic: true },
              { id: "8", name: "2kg Micro Cylinder", capacity: "2 Kg", imageUrl: "/images/corporate/hero-domestic-lpg.jpg", shortDesc: "Ultra-portable cylinder for laboratories and jewellery soldering.", isDomestic: true },
            ]).map((prod: any) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-xl font-black text-[#102A43] group-hover:text-[#1769AA] transition-colors">
                      {prod.capacity || "LPG"}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        prod.isIndustrial
                          ? "bg-slate-100 text-slate-800 border border-slate-300"
                          : prod.isCommercial
                          ? "bg-blue-50 text-[#1769AA] border border-blue-200"
                          : "bg-orange-50 text-[#F28C28] border border-orange-200"
                      }`}
                    >
                      {prod.isIndustrial ? "Industrial" : prod.isCommercial ? "Commercial" : "Domestic"}
                    </span>
                  </div>

                  <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-100 shadow-inner group">
                    <Image
                      src={prod.imageUrl || "/images/corporate/product-cylinder-33kg.jpg"}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug group-hover:text-[#1769AA] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[2.5rem]">
                    {prod.shortDesc || prod.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100">
                  <Link
                    href={
                      prod.isIndustrial
                        ? "/contact/industrial"
                        : prod.isCommercial
                        ? "/contact/commercial"
                        : "/contact/domestic"
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>Order / Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
