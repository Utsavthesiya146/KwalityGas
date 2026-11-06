import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, ShieldCheck, AlertTriangle, PhoneCall, CheckCircle2, Flame, Wrench, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Features & Emergency Guidelines | Kwality Gas",
  description:
    "Essential LPG cylinder safety tips: connecting filled cylinders, mounting pressure regulators, rubber hose ISI rules, and gas leak emergency procedures. Fire Brigade Helpline: 101.",
};

export default function SafetyFeaturesPage() {
  const mountingSteps = [
    {
      step: 1,
      title: "Vertical Placement",
      desc: "Cylinder must strictly be kept in a Vertical Position only on level ground. Never tilt, roll, or lay cylinder flat on its side.",
    },
    {
      step: 2,
      title: "Removing Safety Cap",
      desc: "To remove the safety cap, press it down, pull the cord & keeping it pulled, lift the cap off the valve of the cylinder.",
    },
    {
      step: 3,
      title: "Inspect Internal Sealing Ring",
      desc: "Check whether sealing ring is in place inside the cylinder valve by feeling the same with the help of your little finger. Do not use cylinder if the ring is missing. Put back safety cap & contact distributor for replacement.",
    },
    {
      step: 4,
      title: "Ensure Switch is OFF",
      desc: "Ensure the switch knob of the pressure regulator is strictly in the OFF position before mounting.",
    },
    {
      step: 5,
      title: "Pull Bush & Mount Vertically",
      desc: "Grip regulator and pull up the plastic bush. Place regulator vertically on valve and press it down till its edge touches the hexagon of the valve with a gentle swivel.",
    },
    {
      step: 6,
      title: "Lock with Audible Click",
      desc: "Release the black plastic bush and press it down firmly until you hear a distinct CLICK sound. The regulator is now safely locked.",
    },
  ];

  const rubberTubeRules = [
    "It must be of approved quality (Mandatory ISI Mark).",
    "It should be as short as possible. Maximum length should be about 1.5 meters.",
    "It should be easily accessible for visual inspection at all times.",
    "Keep it away from heat, open flames, and sharp corners.",
    "Push it so as to cover the full length of the stove nozzle.",
    "Make sure it does not get heated by the burner, and is never looped or twisted.",
    "Clean it with wet cloth only. Don’t use soap or grease to ease the tube over nozzle.",
    "Replace tubing immediately on completion of recommended warranty period.",
  ];

  const leakRules = [
    { title: "DO NOT Operate Electrical Switches", desc: "Never switch ON or OFF any lights, fans, exhaust fans, or home appliances (a spark can ignite gas)." },
    { title: "Ensure Stove Knobs are OFF", desc: "Check and ensure all burner knobs on the cooking stove are turned to the OFF position." },
    { title: "NEVER Strike a Match", desc: "Do NOT light a matchstick, lighter, or candle—not even to detect or search for the source of leak." },
    { title: "Switch OFF Pressure Regulator", desc: "Immediately switch OFF the pressure regulator by turning the knob clockwise to the OFF position." },
    { title: "Ventilate Immediately", desc: "Open all doors and windows wide to allow gas to disperse into the open atmosphere." },
    { title: "Detach Regulator If Experienced", desc: "An experienced person can detach the regulator and firmly fix the safety cap back onto the cylinder valve." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Compromise on Safety</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Safety Features & Guidelines
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Certified procedures for safe handling, connecting, inspecting, and emergency response for Kwality Gas cylinders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* EMERGENCY HIGHLIGHT BANNER */}
        <div className="bg-rose-700 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border-2 border-rose-500">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                <AlertTriangle className="w-10 h-10 text-amber-300 animate-bounce" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-amber-200">
                  Critical Emergency Protocol
                </span>
                <h2 className="text-2xl sm:text-3xl font-black">
                  IN CASE OF EMERGENCY (GAS LEAK):-
                </h2>
                <p className="text-xs sm:text-sm text-rose-100 max-w-2xl">
                  If you smell gas odor, act immediately without panic. Disconnect source and ensure ventilation.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0">
              <span className="text-xs font-bold text-amber-200 uppercase tracking-widest block mb-1">
                National Emergency Help
              </span>
              <p className="text-3xl font-black text-white tracking-wider">CALL 101</p>
              <p className="text-[11px] text-rose-100 mt-1 font-medium">Fire Brigade Emergency Helpline</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-rose-600/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leakRules.map((rule, idx) => (
              <div key={idx} className="p-3.5 bg-black/20 rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{rule.title}</span>
                </h4>
                <p className="text-[11px] text-rose-100 leading-snug">{rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-rose-900/40 rounded-xl text-xs text-rose-100">
            <strong>Persistent Smell:</strong> Call your Kwality Gas Distributor during office hours. For emergencies after office hours or on holidays, call your nearest emergency service cell immediately.
          </div>
        </div>

        {/* STEP-BY-STEP REGULATOR MOUNTING GUIDE */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
              Step-by-Step Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
              To Mount the Regulator on the Filled Cylinder
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Carry out the following exact verified steps every time you change or connect a cylinder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mountingSteps.map((item) => (
              <div
                key={item.step}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-cardHover transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-brand-orange text-white font-black text-sm flex items-center justify-center shadow">
                    0{item.step}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Golden Rules Box */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1.5 font-medium">
            <p>• Cylinder must NOT be exposed to direct sunlight for long time.</p>
            <p>• Cylinder must NOT be kept in closed cupboard, shelf, or pit.</p>
            <p>• No articles, cloths, or utensils must be kept on the top of the cylinder.</p>
          </div>
        </div>

        {/* ABOUT THE RUBBER TUBING */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <Wrench className="w-7 h-7 text-brand-orange shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-blue-dark">
                ABOUT THE RUBBER TUBING:-
              </h3>
              <p className="text-xs text-slate-500">Inspection & replacement standards for household gas hoses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {rubberTubeRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

