"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, PhoneCall, CheckCircle2, ArrowRight, Flame } from "lucide-react";

export default function HomeSafetySection() {
  const steps = [
    {
      num: "01",
      title: "Close Cylinder Regulator",
      desc: "Immediately turn the regulator switch knob clockwise to the OFF position to stop gas flow at the cylinder neck.",
    },
    {
      num: "02",
      title: "Extinguish Naked Flames",
      desc: "Put out all burning stoves, agarbattis, candles, and avoid lighting matches or cigarette lighters.",
    },
    {
      num: "03",
      title: "Do Not Touch Switches",
      desc: "Do not switch ON or OFF any electrical appliances, lights, or exhaust fans. Even a tiny spark can trigger combustion.",
    },
    {
      num: "04",
      title: "Ventilate the Area",
      desc: "Open all doors and windows wide to let heavy LPG vapour disperse safely into the outdoor ambient air.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Safety First Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Safety is Non-Negotiable at Kwality Gas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every single cylinder leaving our 3 bottling plants undergoes 5 mandatory safety checks: tare weight verification, valve seat pressure test, O-ring seal inspection, hydrostatic pressure rating, and tamper-proof safety seal validation.
            </p>

            {/* Emergency hotline callout */}
            <div className="bg-red-50 border border-red-200/80 rounded-2xl p-5 space-y-2">
              <div className="text-xs font-extrabold uppercase text-red-700 tracking-wider">
                Emergency 24/7 Gas Leakage Desk
              </div>
              <div className="text-sm text-slate-700">
                If you suspect a gas leak or smell ethyl mercaptan, contact our helpline immediately:
              </div>
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency: +91 78997 87101</span>
              </a>
            </div>

            <div>
              <Link
                href="/safety-features"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA] hover:text-[#102A43] transition-colors"
              >
                <span>Read Full LPG Safety Guidelines & Do's and Don'ts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Emergency Protocol Steps (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Immediate Action in Case of Gas Smell</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Protocol 101
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#1769AA]/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#102A43] text-white flex items-center justify-center font-black text-xs mb-3 shadow-xs">
                      {st.num}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Certified by Chief Controller of Explosives (PESO) Standards</span>
                <span className="font-semibold text-emerald-700">100% Tested Cylinders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

