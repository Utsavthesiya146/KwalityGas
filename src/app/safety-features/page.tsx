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
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Comprehensive Safety Handbook</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG Safety Features & Protocols
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Safety is built into every cylinder we bottle. Follow these certified statutory guidelines to ensure zero accidents in your kitchen.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Emergency Leak Callout Banner */}
        <div className="bg-red-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 mt-1">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-red-200">
                Immediate Emergency Assistance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Smell Gas? Follow Emergency Isolation Immediately
              </h2>
              <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-2xl">
                Ethyl mercaptan odorant is added to LPG so even microscopic leaks are instantly detectable. Turn off the regulator and dial our emergency desk:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+917899787101"
              className="bg-white text-red-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 24/7 Desk: +91 78997 87101</span>
            </a>
          </div>
        </div>

        {/* 5-Step Action Protocol */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              What to Do in the Event of a Gas Leak
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Stay calm and follow these 5 certified procedures in sequence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {emergencySteps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:bg-white hover:border-[#1769AA]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#102A43] text-white flex items-center justify-center font-black text-xs mb-3 shadow-xs">
                    {st.num}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
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
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Safe Cylinder Handling & Storage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Mandatory storage rules for domestic homes, restaurants, and commercial bakeries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {handlingRules.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-cardHover transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {item.rule}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Safety Do's</span>
            </div>
            <ul className="space-y-3">
              {dosAndDonts.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50/50 rounded-3xl p-8 border border-red-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-red-800 font-extrabold text-lg">
              <XCircle className="w-6 h-6 text-red-600 shrink-0" />
              <span>Safety Don'ts</span>
            </div>
            <ul className="space-y-3">
              {dosAndDonts.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Safety Hardware Links */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-lg">Need Approved Safety Equipment?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Upgrade to automatic gas leak detectors, auto shutoff solenoid valves, and certified IS 9573 rubber hoses.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/safety-devices"
              className="bg-[#1769AA] hover:bg-[#12538A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              View Safety Devices
            </Link>
            <Link
              href="/accessories"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Order IS 9573 Hose
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
