import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  PhoneCall,
  ArrowRight,
  HelpCircle,
  FileText,
  LifeBuoy,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Safety Features & Emergency Guidelines | Kwality Gas",
  description:
    "Official Kwality Gas LPG safety handbook: safe cylinder handling, regulator fitting procedures, rubber tube inspection, emergency gas leak protocols, and 24/7 hotline numbers.",
};

export const dynamic = "force-dynamic";

export default function SafetyFeaturesPage() {
  const handlingRules = [
    { rule: "Always Keep Cylinders Upright", desc: "Never store or use an LPG cylinder horizontally. Operating a cylinder on its side allows dangerous liquid LPG to enter burners directly." },
    { rule: "Ground Level Ventilation", desc: "Since LPG is heavier than air, it settles in lower spaces. Keep cylinders in well-ventilated ground spaces, never in basements or sealed trenches." },
    { rule: "Distance from Heat Sources", desc: "Keep cylinders at least 1 meter away from heat sources, electric hot plates, open fireplaces, or flammable chemicals." },
    { rule: "Mandatory Safety Cap When Not In Use", desc: "Always seal disconnected cylinder valves with their factory plastic safety cap and tether string." },
  ];

  const emergencySteps = [
    { num: "01", title: "Close Cylinder Regulator Switch", desc: "Immediately turn the regulator control switch knob to the horizontal OFF position." },
    { num: "02", title: "Extinguish All Naked Flames", desc: "Put out cooking stoves, incense sticks (agarbatti), candles, and ensure no smoking in the vicinity." },
    { num: "03", title: "Do NOT Operate Any Electrical Switches", desc: "Do NOT switch ON or OFF any lights, ceiling fans, or kitchen appliances. Electrical arcing can ignite the gas." },
    { num: "04", title: "Open All Doors & Windows Wide", desc: "Allow fresh outdoor ambient air to enter and displace the heavy LPG vapors outside." },
    { num: "05", title: "Evacuate & Call Kwality Helpline", desc: "Move outside to open air and dial our 24/7 Emergency Gas Leak Desk immediately at +91 78997 87101." },
  ];

  const dosAndDonts = {
    dos: [
      "Check the safety seal and tare weight upon taking delivery from our delivery personnel.",
      "Use soap solution or water bubbles to test for valve leakage — NEVER use a burning matchstick.",
      "Always use BIS-approved IS 9573 steel wire braided rubber hoses (Suraksha tube).",
      "Replace your gas tubing every 5 years even if no visible wear is apparent.",
      "Turn off the regulator knob every night before sleeping or when leaving home.",
    ],
    donts: [
      "Do NOT strike matches or lighters near a disconnected cylinder or suspected leak area.",
      "Do NOT store spare full cylinders inside closed cupboards, bedrooms, or bathrooms.",
      "Do NOT tilt, roll, or drag cylinders across rough pavement or stairs.",
      "Do NOT use ordinary vinyl, plastic, or garden garden hoses for LPG connections.",
      "Do NOT attempt to repair or tamper with cylinder valves or regulators yourself.",
    ],
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#07131F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Comprehensive Safety Handbook</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            LPG Safety Features & Protocols
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Safety is built into every cylinder we bottle. Follow these certified statutory guidelines to ensure zero accidents in your kitchen.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Emergency Leak Callout Banner */}
        <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-red-500/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 mt-1 shadow-inner">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-red-200 block mb-1">
                Immediate Emergency Assistance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                Smell Gas? Follow Emergency Isolation Immediately
              </h2>
              <p className="text-xs sm:text-sm text-red-100 mt-2 max-w-2xl leading-relaxed">
                Ethyl mercaptan odorant is added to LPG so even microscopic leaks are instantly detectable. Turn off the regulator and dial our emergency desk:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+917899787101"
              className="bg-white text-red-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 24/7 Desk: +91 78997 87101</span>
            </a>
          </div>
        </div>

        {/* 5-Step Action Protocol */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-wider block mb-1">
              Statutory Action Steps
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
              What to Do in the Event of a Gas Leak
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Stay calm and follow these 5 certified procedures in sequence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {emergencySteps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:bg-white hover:border-[#1769AA]/40 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#102A43] text-white flex items-center justify-center font-black text-xs mb-3.5 shadow-xs group-hover:bg-[#F28C28] transition-colors">
                    {st.num}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug group-hover:text-[#1769AA] transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cylinder Handling Rules Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-[#1769AA] uppercase tracking-wider block mb-1">
              Precautionary Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
              Safe Cylinder Handling & Storage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Mandatory storage rules for domestic homes, restaurants, and commercial bakeries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {handlingRules.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1769AA] flex items-center justify-center mb-5 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-[#1769AA] transition-colors">
                    {item.rule}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-200/90 shadow-card space-y-5">
            <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span>Safety Do's</span>
            </div>
            <ul className="space-y-3.5">
              {dosAndDonts.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50/60 rounded-3xl p-8 border border-red-200/90 shadow-card space-y-5">
            <div className="flex items-center gap-2.5 text-red-800 font-extrabold text-lg">
              <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span>Safety Don'ts</span>
            </div>
            <ul className="space-y-3.5">
              {dosAndDonts.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Safety Hardware Links */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-black text-[#102A43] text-xl tracking-tight">Need Approved Safety Equipment?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Upgrade to automatic gas leak detectors, auto shutoff solenoid valves, and certified IS 9573 rubber hoses.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/safety-devices"
              className="bg-[#1769AA] hover:bg-[#12538A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
            >
              View Safety Devices
            </Link>
            <Link
              href="/accessories"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Order IS 9573 Hose
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
