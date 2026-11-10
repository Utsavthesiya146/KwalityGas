import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Flame,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Phone,
  Wrench,
  Gauge,
  Sparkles,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial LPG Solutions | 33kg LOT/VOT & Multi-Cylinder Manifolds | Kwality Gas",
  description:
    "Industrial LPG solutions for manufacturing, metal treatment, ceramics, and foundries. 33kg Liquid Off-Take (LOT) cylinders, VOT manifolds, turn-key pipeline design, and reliable bulk fuel supply.",
};

export const dynamic = "force-dynamic";

export default function IndustrialPage() {
  const industrialBenefits = [
    { title: "Instant High Heat & Precision Control", desc: "Allows precision electronic temperature control required for aerospace heat treatment, annealing, and powder curing." },
    { title: "Zero Sulphur & Pure Clean Combustion", desc: "Contains negligible sulphur, preventing acid corrosion of expensive furnace refractories and catalytic converters." },
    { title: "Liquid Off-Take (LOT) Technology", desc: "Extracts LPG as liquid through dip tubes, feeding external vaporisers to deliver tremendous volume without freezing." },
    { title: "Direct Replacement for Furnace Oil & Diesel", desc: "Reduces burner maintenance, eliminates fuel soot cleaning cycles, and complies with statutory pollution norms." },
    { title: "Turn-Key PESO Pipeline Engineering", desc: "Our certified engineering team designs, fabricates, and commissions safe multi-cylinder manifold systems." },
    { title: "Dedicated Industrial Bulk Supply", desc: "Assured supply directly backed by our 30,000 MTPA storage and dedicated road transport fleet." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <PageHero
        badge={{
          icon: <Factory className="w-3.5 h-3.5" />,
          text: "Heavy Industrial Thermal Energy",
        }}
        title="Industrial LPG Solutions"
        description="High-output thermal energy engineering for factories, foundries, glass bending, automotive paint booths, and multi-cylinder industrial manifold banks."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Industrial Overview */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider border border-blue-100/60">
            <span>Heavy Manufacturing Support</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Advanced LOT & VOT Manifold Systems
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Industrial thermal processes demand massive discharge rates that single vaporising cylinders cannot sustain. Kwality Gas specializes in 33kg Liquid Off-Take (LOT) cylinders equipped with internal dip tubes. Liquid LPG is withdrawn and fed to high-efficiency dry or water-bath vaporisers, delivering thousands of cubic meters of vaporised gas per hour with zero drop in line pressure.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Our technical engineering division assists industrial plants with layout design, PESO regulatory approvals, automatic changeover valves, slam-shut emergency safety devices, and regular hydrostatic testing.
          </p>

          <div className="p-6 bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl border border-blue-100/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-bold text-slate-900 text-sm block">Industrial Cylinder Capacities:</span>
              <span className="text-xs text-slate-600">33 Kg Heavy LOT/VOT Cylinders & Multi-Cylinder Headers</span>
            </div>
            <Link
              href="/contact/industrial"
              className="bg-[#1769AA] hover:bg-[#12538A] text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider shadow-xs transition-colors shrink-0"
            >
              Request Industrial Consultation
            </Link>
          </div>
        </div>

        {/* 6 Industrial Advantages */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Advantages of Kwality Industrial LPG
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Clean, controllable, and cost-saving industrial fuel for heavy manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrialBenefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mb-4 border border-slate-200 group-hover:scale-105 transition-transform">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-[#1769AA] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industrial 33kg Showcase Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner group flex items-center justify-center">
                <Image
                  src="/images/corporate/product-cylinder-33kg.jpg"
                  alt="33kg Industrial LPG Cylinder"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200">
                <span>Heavy Duty Specification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
                33 Kg Heavy-Duty LOT / VOT Cylinder
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Engineered specifically for industrial furnaces, hot-dip galvanising baths, powder coating tunnels, and steam boilers. Built with high-tensile steel, heavy forged safety valves, and high-flow siphon tubes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-900 block">Hydrostatic Test</span>
                  <span className="text-slate-500 text-[11px]">25 kg/cm² pressure tested</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-900 block">Valve Type</span>
                  <span className="text-slate-500 text-[11px]">LOT with safety relief valve</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-900 block">Tare Weight Accuracy</span>
                  <span className="text-slate-500 text-[11px]">Stamped on footring & neck</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-900 block">Gas Quality</span>
                  <span className="text-slate-500 text-[11px]">Grade 1 certified high calorific</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact/industrial"
                  className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <span>Request Industrial Supply Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/safety-devices"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3.5 rounded-xl font-semibold text-xs transition-all"
                >
                  View Manifold Safety Hardware
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial CTA */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/15">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Need an Industrial Manifold Installation?</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Our chartered fuel engineers provide turn-key pipeline layout, vaporiser sizing, and safety valve commissioning.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              href="/contact/industrial"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Contact Industrial Desk
            </Link>
            <a
              href="tel:+917899787101"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl text-xs font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-[#F28C28]" />
              <span>Direct: +91 78997 87101</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
