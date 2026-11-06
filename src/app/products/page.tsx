import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Tag, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Gas Water Heaters | Kwality Gas",
  description:
    "Explore Kwality Gas products: Kwality Gas Water Heater (Gas Geyser), domestic LPG cylinders (12kg, 5.5kg, 4kg), commercial cylinders (17kg, 21kg), and 33kg industrial cylinders.",
};

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { displayOrder: "asc" },
  });

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
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-brand-orange" />
            <span>Official Product Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kwality Gas Products
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Clean energy solutions engineered for households, restaurants, commercial caterers, and heavy industrial furnaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* SECTION 1: KWALITY GAS WATER HEATER */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-4">
                <Image
                  src="/images/original/gas.jpg"
                  alt="Kwality Gas Water Heater (Gas Geyser)"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                Eco-Friendly Heating Product
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
                Water Heater (Gas Heater)
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Initially we have launched <strong className="text-slate-900">“Kwality Gas Water Heater”</strong> which again is an eco friendly product. Engineered to deliver piping hot water on demand with exceptional fuel efficiency and multi-stage safety controls.
              </p>

              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-3">
                  Special Features & Safety Mechanisms:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {waterHeaterSpecs.map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                        <p className="text-[11px] text-slate-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/contact"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow"
                >
                  Enquire / Order Water Heater
                </Link>
                <a
                  href="tel:+917899787101"
                  className="text-xs font-semibold text-slate-700 hover:text-brand-orange"
                >
                  Call: +91 78997 87101
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PRODUCTS RANGE (LPG CYLINDER) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
              Products Range (LPG Cylinder)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold uppercase tracking-wider text-brand-orange">
              KWALITY GAS IS AVAILABLE IN FOLLOWING CAPACITIES AND SEGMENTS
            </p>
            <p className="text-xs text-slate-500 mt-1">
              15 Kgs, 17 Kgs & 33 Kgs for commercial and industries • 12 Kgs & 15 Kgs for Domestic consumers • 5.5 Kgs for Small Families • 4 Kgs for Cook and Light Cylinder
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-50 rounded-xl overflow-hidden mb-4 border border-slate-100">
                    <Image
                      src={prod.imageUrl || "/images/original/dom2.png"}
                      alt={prod.name}
                      fill
                      className="object-contain p-4"
                    />
                    {prod.capacity && (
                      <span className="absolute top-3 right-3 bg-brand-blue text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                        {prod.capacity}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1">{prod.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{prod.shortDesc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {prod.isDomestic && (
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Domestic
                      </span>
                    )}
                    {prod.isCommercial && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Commercial
                      </span>
                    )}
                    {prod.isIndustrial && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Industrial
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/price-list`}
                    className="text-xs font-bold text-brand-blue hover:text-brand-orange"
                  >
                    Check Rate
                  </Link>

                  <Link
                    href="/contact"
                    className="text-xs font-bold bg-brand-orange text-white px-3.5 py-1.5 rounded-lg hover:bg-brand-orange-hover transition-colors shadow-sm"
                  >
                    Book Refill
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: DOMESTIC & COMMERCIAL SEGMENTS (AUDITED VERBATIM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DOMESTIC SEGMENT */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span>Household Consumers</span>
            </div>
            <h3 className="text-2xl font-black text-brand-blue-dark">DOMESTIC SEGMENT</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              LPG is a far superior fuel compared to traditional fuels and offers many advantages. From the customer’s point of view it is convenient, safe, a cleaner and better fuel, is healthy and easy to use.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              From the government’s point of view it helps in preservation of the forest wealth, reduces health hazards, reduces the dependence on fossil fuels and electricity and is an environmental friendly fuel.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium text-brand-blue">
              Kwality Gas will focus on this segment and will strive to reach into the rural markets. The accent on service will be reflected in prompt deliveries at the customer’s doorstep being accessible 7 days a week, 15 hours a day and a dealer network that is ever receptive to the customer’s needs.
            </p>

            <div className="pt-2">
              <Link
                href="/domestic"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
              >
                <span>Read Domestic Portal & Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* COMMERCIAL SEGMENT */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span>HORECA & Poultry</span>
            </div>
            <h3 className="text-2xl font-black text-brand-blue-dark">COMMERCIAL SEGMENT</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              In the commercial segment, Kwality Gas commitment and positive attitude to the changing requirements of customers will make it the preferred choice in this segment.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In this context, Kwality Gas has always identified newer areas where LPG can be offered as a better alternative to conventional fuels, and has provided value added services, be it to hotels, restaurants & caterers (HORECA) or poultry and many other small commercial establishments that require better and clean fuels.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium text-slate-900">
              Uninterrupted refills, technical advice on commercial manifold banks, and transparent volume billing.
            </p>

            <div className="pt-2">
              <Link
                href="/commercial"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
              >
                <span>Read Commercial Portal & Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

