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
  Phone,
  Check,
  AlertTriangle,
} from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kwality Gas Water Heater (Gas Geyser) | 8 Safety Features & 12M Warranty",
  description:
    "Official Kwality Gas Water Heater (Gas Geyser). Built with 8 advanced safety devices, low water pressure starting, pulse ignition, flame failure device, winter-summer gas saving switch, and 12-month warranty.",
};

export const dynamic = "force-dynamic";

export default function GasWaterHeaterPage() {
  const specs = [
    {
      num: "01",
      icon: <Droplets className="w-5 h-5 text-[#1769AA]" />,
      title: "Low Water Pressure Starting",
      desc: "Starts reliably even with low head water pressure (0.015 - 0.8 MPa), making it ideal for upper-floor apartment living and overhead low tanks without requiring booster pumps.",
    },
    {
      num: "02",
      icon: <Zap className="w-5 h-5 text-[#F28C28]" />,
      title: "Double Ignition Pin, Automatic Electrical Pulse",
      desc: "Two electronic ignition spark pins produce an instantaneous pulse spark as soon as the hot water tap is opened. Eliminates standing pilot flames and manual match lighting.",
    },
    {
      num: "03",
      icon: <Gauge className="w-5 h-5 text-[#1769AA]" />,
      title: "Over Water Pressure Protection Device",
      desc: "Built-in safety valve automatically discharges excess pressure if water line pressure exceeds maximum safe rating, preventing pipe bursting and heat exchanger fatigue.",
    },
    {
      num: "04",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "Flame Failure Safety Device",
      desc: "Thermo-electric sensor constantly monitors burner flame. If the flame is extinguished by wind or gas draft, gas supply is shut off automatically in less than 2 seconds.",
    },
    {
      num: "05",
      icon: <Flame className="w-5 h-5 text-[#F28C28]" />,
      title: "Anti-Dry Combustion Protection Device",
      desc: "Automatic cut-off shuts the gas valve if water supply suddenly stops while burner is active, protecting the pure copper heat exchanger from thermal melting or burnout.",
    },
    {
      num: "06",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Winter-Summer Switch Option For Gas Saving",
      desc: "Dual seasonal selection knob switches between 3-burner (summer) and 6-burner (winter) modes, saving up to 40% LPG consumption during moderate weather.",
    },
    {
      num: "07",
      icon: <Timer className="w-5 h-5 text-purple-600" />,
      title: "20-Minute Safety Timer",
      desc: "An internal digital safety timer automatically turns off the water heater after 20 minutes of continuous hot water flow, preventing unattended oxygen depletion hazards.",
    },
    {
      num: "08",
      icon: <Award className="w-5 h-5 text-[#1769AA]" />,
      title: "12 Months Comprehensive Warranty",
      desc: "Backed by Kwality Gas customer care, genuine spare parts availability, and free replacement support for internal manufacturing defects during the 1-year guarantee period.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#07131F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Household Energy Appliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Kwality Gas Water Heater (Gas Geyser)
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Instant continuous hot water engineered with 8 multi-stage safety protection devices, pure copper heat exchangers, and dual seasonal gas saving switches.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Product Hero Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <div className="relative w-full h-80 sm:h-96">
                  <Image
                    src="/images/corporate/product-gas-geyser.jpg"
                    alt="Kwality Gas Water Heater with 8 Safety Features"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pure Oxygen-Free Copper Heat Exchanger</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Overview & Quick Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase text-[#F28C28] tracking-wider block">
                  Model: Kwality Instant-Flow 6L
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] mt-1 tracking-tight">
                  Energy-Efficient Domestic Hot Water
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  The Kwality Gas Water Heater provides instant, uninterrupted hot water for your entire household. Unlike conventional electric geysers that require 20 minutes of preheating and consume excessive electricity, the Kwality LPG Geyser generates hot water on demand in seconds while saving you up to 60% on monthly heating expenses.
                </p>
              </div>

              {/* Comparison Matrix */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3.5">
                  Why Switch from Electric Geysers to Kwality Gas Geyser?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="space-y-1">
                    <div className="font-bold text-[#102A43] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Instant On-Demand Flow</span>
                    </div>
                    <p className="text-slate-500 pl-5.5 leading-relaxed">No waiting for tanks to heat up</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-[#102A43] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Up to 60% Cost Reduction</span>
                    </div>
                    <p className="text-slate-500 pl-5.5 leading-relaxed">LPG costs far less per liter than electricity</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-[#102A43] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Works During Power Cuts</span>
                    </div>
                    <p className="text-slate-500 pl-5.5 leading-relaxed">Operates on 2x D-size batteries & LPG</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-[#102A43] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Standing Heat Loss</span>
                    </div>
                    <p className="text-slate-500 pl-5.5 leading-relaxed">Only burns gas while water is running</p>
                  </div>
                </div>
              </div>

              {/* Direct helpline */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="tel:+917899787101"
                  className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Order: +91 78997 87101</span>
                </a>
                <span className="text-xs text-slate-500 font-medium">Free installation guidance included</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Authentic Safety Features Grid */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Multi-Stage Protection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              8 Standard Safety Devices
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              Your family's safety is built directly into every component of the Kwality Gas Water Heater.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((sp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      {sp.icon}
                    </div>
                    <span className="text-xs font-black text-slate-300 font-mono group-hover:text-[#1769AA] transition-colors">
                      {sp.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-[#1769AA] transition-colors">
                    {sp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Installation Notice */}
        <div className="bg-amber-50/90 rounded-3xl p-6 sm:p-8 border border-amber-200/90 mb-16 flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-900 text-sm">
              Important Mandatory Installation Notice:
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Always install gas water heaters in well-ventilated areas (such as a utility balcony, kitchen with exterior ventilation, or bathroom equipped with an active exhaust vent). Never seal exhaust outlets. Always use approved IS 9573 steel wire braided rubber hoses and genuine Kwality LPG regulators.
            </p>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-wider block mb-1">
                Direct Booking
              </span>
              <h3 className="text-2xl font-black text-[#102A43] tracking-tight">
                Order Your Kwality Gas Geyser
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Fill out the quick form below. Our customer care desk will contact you to confirm delivery, cylinder connection, and technician dispatch.
              </p>
            </div>
            <EnquiryForm defaultType="DOMESTIC" />
          </div>
        </div>
      </div>
    </div>
  );
}

