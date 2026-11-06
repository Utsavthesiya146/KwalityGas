import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Flame, ShieldCheck, ArrowRight, Tag, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Cylinders Range | Kwality Gas",
  description:
    "Kwality Gas cylinders available in 33kg, 21kg, 17kg, 15kg, 12kg, 5.5kg, and 4kg capacities for domestic, commercial, and industrial consumers across South India.",
};

export const revalidate = 0;

export default async function CylindersPage() {
  const cylinders = await prisma.product.findMany({
    where: {
      category: { slug: "cylinders" },
      isActive: true,
    },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-brand-orange" />
            <span>Capacity Range (2 Kgs to 33 Kgs)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG Cylinders Catalog
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Precision-filled, electronically weighed, and leak-tested LPG cylinders designed for every scale of thermal and cooking energy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Intro Highlight Box */}
        <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-orange-light uppercase tracking-wider">
              Audited Available Capacities
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Kwality Gas is Available in Following Capacities and Segments:
            </h2>
            <ul className="text-xs sm:text-sm text-slate-200 space-y-1">
              <li>• <strong>15 Kgs, 17 Kgs & 33 Kgs</strong> for commercial and industries.</li>
              <li>• <strong>12 Kgs & 15 Kgs</strong> for Domestic consumers.</li>
              <li>• <strong>5.5 Kgs</strong> for Small Families.</li>
              <li>• <strong>4 Kgs</strong> for Cook and Light Cylinder.</li>
            </ul>
          </div>

          <Link
            href="/price-list"
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow transition-all shrink-0"
          >
            View Live Price Tariff
          </Link>
        </div>

        {/* Cylinder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cylinders.map((cyl) => {
            const specs = cyl.specifications ? JSON.parse(cyl.specifications) : {};
            return (
              <div
                key={cyl.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-64 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
                    <Image
                      src={cyl.imageUrl || "/images/original/dom2.png"}
                      alt={cyl.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                    {cyl.capacity && (
                      <span className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-black px-3 py-1 rounded-full shadow">
                        {cyl.capacity}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-brand-blue-dark">{cyl.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cyl.description || cyl.shortDesc}</p>
                    </div>

                    {/* Specs List */}
                    {Object.keys(specs).length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {Object.entries(specs).slice(0, 3).map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-medium">{k}:</span>
                            <span className="text-slate-800 font-bold">{v as string}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0 flex items-center justify-between gap-3">
                  <Link
                    href="/price-list"
                    className="text-xs font-bold text-brand-blue hover:text-brand-orange"
                  >
                    Check Refill Rate
                  </Link>

                  <Link
                    href={`/contact${cyl.isIndustrial ? "/industrial" : cyl.isCommercial ? "/commercial" : ""}`}
                    className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                  >
                    Order Refill
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

