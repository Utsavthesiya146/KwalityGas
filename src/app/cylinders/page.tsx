import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { sanitizeProduct } from "@/lib/sanitize-image";
import {
  Flame,
  ShieldCheck,
  ArrowRight,
  Tag,
  Phone,
  CheckCircle2,
  Scale,
  Gauge,
  Sparkles,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Cylinders Range (2kg to 33kg) | Kwality Gas",
  description:
    "Kwality Gas cylinders available in 33kg, 21kg, 17kg, 15kg, 12kg, 5.5kg, and 4kg capacities for domestic, commercial, and industrial consumers across South India.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CylindersPage() {
  let dbCylinders: any[] = [];
  try {
    const rawCylinders = await prisma.product.findMany({
      where: {
        category: { slug: "cylinders" },
        isActive: true,
      },
      orderBy: { displayOrder: "asc" },
    });
    dbCylinders = rawCylinders.map(sanitizeProduct);
  } catch (err) {
    console.error("CylindersPage data fetch error:", err);
  }

  // Comprehensive static fallback catalog if DB is empty
  const defaultCylinders = [
    {
      id: "cyl-33",
      name: "33 Kg Industrial Cylinder (LOT / VOT)",
      capacity: "33 Kg",
      imageUrl: "/images/corporate/product-cylinder-33kg.jpg",
      shortDesc: "Engineered for high-rate thermal discharge in furnaces, foundries, industrial powder coating, and heavy manifold banks.",
      isIndustrial: true,
      features: JSON.stringify(["Liquid Off-Take (LOT) valve", "Vapour Off-Take (VOT) compatible", "Zero pressure drop during high flow", "High calorific blue flame"]),
    },
    {
      id: "cyl-21",
      name: "21 Kg Commercial High-Output Cylinder",
      capacity: "21 Kg",
      imageUrl: "/images/corporate/hero-commercial-lpg.jpg",
      shortDesc: "High-capacity commercial cylinder designed for 24-hour restaurant kitchens, high-pressure Chinese ranges, and live event caterers.",
      isCommercial: true,
      features: JSON.stringify(["Anti-freezing vaporisation", "Forged brass heavy valve", "High continuous BTU output", "Express doorstep swap"]),
    },
    {
      id: "cyl-17",
      name: "17 Kg Commercial Standard Cylinder",
      capacity: "17 Kg",
      imageUrl: "/images/corporate/product-cylinder-17kg.jpg",
      shortDesc: "The prime fuel source for commercial bakeries, cloud kitchens, hotel kitchens, and canteens across Karnataka & Tamil Nadu.",
      isCommercial: true,
      features: JSON.stringify(["100% net weight guarantee", "Tested at 25 kg/cm²", "Lower soot emissions", "Direct commercial invoicing"]),
    },
    {
      id: "cyl-15",
      name: "15 Kg Multi-Purpose Commercial Cylinder",
      capacity: "15 Kg",
      imageUrl: "/images/corporate/hero-commercial-lpg.jpg",
      shortDesc: "Convenient ergonomic commercial cylinder ideal for roadside eateries, mobile food trucks, and small tea cafeterias.",
      isCommercial: true,
      features: JSON.stringify(["Sturdy footring base", "Easy manual shifting", "Grade 1 certified gas", "Competitive commercial pricing"]),
    },
    {
      id: "cyl-12",
      name: "12 Kg Domestic Cooking Gas Cylinder",
      capacity: "12 Kg",
      imageUrl: "/images/corporate/product-cylinder-12kg.jpg",
      shortDesc: "Kwality Gas's flagship domestic household cylinder. Pure blue flame cooking, maximum economy, and instant refill booking.",
      isDomestic: true,
      features: JSON.stringify(["Electronic carousel filled", "Self-closing safety valve", "Tamper-proof security seal", "Leak checked test bath"]),
    },
    {
      id: "cyl-5",
      name: "5.5 Kg Compact Domestic Cylinder",
      capacity: "5.5 Kg",
      imageUrl: "/images/corporate/hero-domestic-lpg.jpg",
      shortDesc: "Convenient compact cylinder for single professionals, nuclear apartments, student hostels, and backup emergency supply.",
      isDomestic: true,
      features: JSON.stringify(["Lightweight 5.5kg net", "Fits modular kitchen units", "Quick documentation process", "Fast exchange booking"]),
    },
    {
      id: "cyl-4",
      name: "4 Kg Cook & Light Cylinder",
      capacity: "4 Kg",
      imageUrl: "/images/corporate/hero-domestic-lpg.jpg",
      shortDesc: "Equipped with direct-fit stove fixtures and emergency light lantern burners. Ideal for outdoor catering, lighting, and camping.",
      isDomestic: true,
      features: JSON.stringify(["Direct burner mounting", "Lantern light compatible", "Heavy-duty steel carry handle", "Compact portable design"]),
    },
    {
      id: "cyl-2",
      name: "2 Kg Micro Portable Cylinder",
      capacity: "2 Kg",
      imageUrl: "/images/corporate/product-cylinder-12kg.jpg",
      shortDesc: "Ultra-compact cylinder for precision laboratory burners, jewellery melting, micro soldering, and lightweight camping stoves.",
      isDomestic: true,
      features: JSON.stringify(["Precision flame needle valve", "Factory pressure tested", "Ultra-portable weight", "Safe indoor laboratory use"]),
    },
  ];

  const cylinders = dbCylinders.length > 0 ? dbCylinders : defaultCylinders;

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Capacity Range (2 Kgs to 33 Kgs)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG Cylinders Catalog
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Precision-filled, electronically weighed, and leak-tested LPG cylinders designed for every scale of thermal and cooking energy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* Intro Highlight Box */}
        <div className="bg-[#1769AA] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-[#F28C28] bg-white px-3 py-1 rounded-full shadow-xs">
              Audited Available Capacities
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Kwality Gas is Available in the Following Segments:
            </h2>
            <ul className="text-xs sm:text-sm text-blue-100 space-y-1.5">
              <li>• <strong>15 Kgs, 17 Kgs, 21 Kgs & 33 Kgs</strong> for commercial hotels, restaurants & industrial plants.</li>
              <li>• <strong>12 Kgs & 15 Kgs</strong> for Domestic household consumers.</li>
              <li>• <strong>5.5 Kgs</strong> for Small Families & Working Professionals.</li>
              <li>• <strong>4 Kgs</strong> for Cook & Light Portable Applications.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/price-list"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white text-xs font-bold px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-md transition-all"
            >
              Check Live State Prices
            </Link>
            <Link
              href="/contact/commercial"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold px-5 py-3.5 rounded-xl uppercase tracking-wider transition-all"
            >
              Commercial Bulk Quote
            </Link>
          </div>
        </div>

        {/* Cylinder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cylinders.map((cyl) => {
            let featList: string[] = [];
            try {
              if (cyl.features) {
                featList = typeof cyl.features === "string" ? JSON.parse(cyl.features) : cyl.features;
              }
            } catch (e) {
              featList = [];
            }

            return (
              <div
                key={cyl.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#102A43] tracking-tight group-hover:text-[#1769AA] transition-colors">
                      {cyl.capacity || "LPG"}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                        cyl.isIndustrial
                          ? "bg-slate-100 text-slate-800 border border-slate-300"
                          : cyl.isCommercial
                          ? "bg-blue-50 text-[#1769AA] border border-blue-200"
                          : "bg-orange-50 text-[#F28C28] border border-orange-200"
                      }`}
                    >
                      {cyl.isIndustrial ? "Industrial" : cyl.isCommercial ? "Commercial" : "Domestic"}
                    </span>
                  </div>

                  <div className="relative w-full h-48 bg-slate-50 rounded-xl overflow-hidden mb-4 border border-slate-100 flex items-center justify-center p-3">
                    <Image
                      src={cyl.imageUrl || "/images/corporate/product-cylinder-33kg.jpg"}
                      alt={cyl.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                    {cyl.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cyl.shortDesc || cyl.description}
                  </p>

                  {featList.length > 0 && (
                    <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                      {featList.slice(0, 4).map((f: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href={
                      cyl.isIndustrial
                        ? "/contact/industrial"
                        : cyl.isCommercial
                        ? "/contact/commercial"
                        : "/contact/domestic"
                    }
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#F28C28] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Order / Connection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality and Testing Standards */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center mx-auto sm:mx-0">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Electronic Weight Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero tolerance for under-filling. Every single cylinder is cross-checked on certified digital load cells before passing out the bottling gate.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center mx-auto sm:mx-0">
                <Gauge className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Hydrostatic & Pneumatic Bath Tests</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% of cylinders are submerged in illuminated water inspection baths to verify that the valve seat, spindle, and neck O-ring have zero micro-leakage.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">BIS & PESO Statutory Compliance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manufactured and tested strictly as per IS 3196 (Part 1, 2 & 3) specifications, stamped with statutory 5-year periodic testing dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
