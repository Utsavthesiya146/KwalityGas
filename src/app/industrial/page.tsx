import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Factory, Flame, CheckCircle2, ShieldCheck, ArrowRight, Settings, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG for Industrial | Kwality Gas Bottlers",
  description:
    "Kwality Gas industrial fuel solutions with 33kg heavy-duty cylinders and cylinder bank manifold setups for furnaces, powder coating, metal heat treatment, and factory operations.",
};

export default function IndustrialPage() {
  const industrialApplications = [
    { title: "Furnaces & Transformer Stampings", desc: "Stable high-temperature furnace firing for metal heat treatment and electrical core manufacturing without soot deposits." },
    { title: "Powder Coating & Curing Ovens", desc: "Even heat distribution ensures uniform paint curing and blemish-free finishes on industrial metal parts." },
    { title: "Fine-Chemical & Pharmaceutical Heating", desc: "Precise temperature regulation with zero contamination, ideal for sensitive chemical reactor vessels." },
    { title: "Closure & Container Manufacturing", desc: "High discharge capability powers continuous automated metal tin and closure manufacturing plants." },
    { title: "Food Processing & Commercial Roasters", desc: "Clean blue flame meets strict food safety and hygiene guidelines for grain drying, tea drying, and coffee roasting." },
    { title: "Ceramics & Glass Annealing", desc: "Clean sulfur-free combustion avoids discoloration and stress cracks in fine glassware and ceramic tiles." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Factory className="w-3.5 h-3.5" />
            <span>High-Energy Industrial Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG for Industrial
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Reliable, high-calorific thermal fuel for factories, manufacturing lines, and heavy-duty industrial furnace operations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Audited Section: Industrial Purpose */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span>Official Purpose & Industrial Scope</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
            Industrial Purpose
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            The main Industrial uses of LPG are with respect to cooking and most of all heating. It is as good for powering standalone stoves.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            One main reason behind LPG being a popular choice of fuel in Industrial uses is that it promises a low level of fuel consumption. LPG equipment’s do not demand high maintenance and it also has a narrow range with respect to flammability. LPG has played a revolutionary role when it comes to changing the face of Domestic fuels used for Cooking and Heating.
          </p>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Audited Heavy-Duty Flagship Cylinder
              </span>
              <p className="text-base font-black text-slate-900">
                Industrial Cylinder Range: 33 Kgs Heavy-Duty Refill
              </p>
            </div>
            <Link
              href="/contact/industrial"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all shrink-0"
            >
              Submit Industrial Requirement
            </Link>
          </div>
        </div>

        {/* 33 Kgs Cylinder Feature & Manifold Engineering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs h-80 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-4">
              <Image
                src="/images/original/1433.png"
                alt="33 Kgs Industrial Cylinder"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
              Flagship Industrial Fuel Carrier
            </span>
            <h3 className="text-2xl font-black text-brand-blue-dark">
              Why Switch to 33 Kgs Industrial Cylinders?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              As reported by our industrial client <em>Quality Closures</em>, moving from traditional 17 Kgs cylinders to 33 Kgs cylinders saves immense operational time by eliminating frequent cylinder replacements, boosting plant productivity, and maintaining uninterrupted production runs.
            </p>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Turnkey Manifold Bank Installation:</span>
                <span>Our engineering team designs and installs multi-cylinder manifold banks for seamless gas draw.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Short-Notice Demand Surge:</span>
                <span>Supported by 30,000 MTPA storage, sudden industrial demand spikes are delivered on time without production delays.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Zero Furnace Downtime:</span>
                <span>Continuous reliable deliveries guarantee furnaces never go cold.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/contact/industrial"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow"
              >
                Request Industrial Technical Assessment
              </Link>
            </div>
          </div>
        </div>

        {/* Industrial Applications Grid */}
        <div>
          <h3 className="text-2xl font-black text-brand-blue-dark mb-6 text-center">
            Industrial Thermal Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrialApplications.map((app, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-sm text-slate-900">{app.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

