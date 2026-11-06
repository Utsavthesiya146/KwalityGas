import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Flame, CheckCircle2, ShieldAlert, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG for Domestic Use | Kwality Gas",
  description:
    "Kwality Gas domestic cooking gas for households: 12kg, 5.5kg, and 4kg cylinders. Pure blue flame, soot-free cooking, safe handling, and fast doorstep deliveries.",
};

export default function DomesticPage() {
  const domesticBenefits = [
    { title: "Low Fuel Consumption", desc: "Promises high thermal efficiency and low fuel wastage, lowering family cooking expenses." },
    { title: "Low Equipment Maintenance", desc: "LPG stoves and certified regulators require minimal upkeep compared to kerosene or solid fuels." },
    { title: "Narrow Flammability Range", desc: "Strict narrow explosion limits make LPG one of the safest household fuels when handled correctly." },
    { title: "Soot-Free Utensils", desc: "No carbon soot deposits on vessels, keeping kitchen utensils bright and easy to clean." },
    { title: "Cooler Domestic Kitchen", desc: "Focused radiant heat cooks food faster while keeping ambient room temperature comfortable." },
    { title: "Eco-Friendly Fuel", desc: "Significantly reduces deforestation and harmful indoor smoke pollution." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Household Cooking Gas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG for Domestic
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            A clean cooking connection for every household. Safe, efficient, and accessible 7 days a week.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Audited Section: Domestic Purpose */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <span>Official Mission & Purpose</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
            Domestic Purpose
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            The main domestic uses of LPG are with respect to cooking and most of all heating. It is as good for powering standalone stoves.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            One main reason behind LPG being a popular choice of fuel in domestic uses is that it promises a low level of fuel consumption. LPG equipment’s do not demand high maintenance and it also has a narrow range with respect to flammability. LPG has played a revolutionary role when it comes to changing the face of Domestic fuels used for Cooking and Heating.
          </p>

          <div className="p-4 bg-brand-blue-surface rounded-2xl border border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                Audited Range
              </span>
              <p className="text-base font-black text-brand-blue-dark">
                Domestic Cylinder Range: 12kg, 5.5kg and 4kg
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all shrink-0"
            >
              Apply For Domestic Connection
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div>
          <h3 className="text-2xl font-black text-brand-blue-dark mb-6 text-center">
            Benefits of LPG for Cooking & Home Safety
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domesticBenefits.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Precautions Summary */}
        <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Safety & Precautions For Home</h3>
              <p className="text-xs text-slate-300">Essential rules for handling cylinders in residential kitchens</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-200">
            <div className="p-4 bg-white/10 rounded-xl space-y-2">
              <h5 className="font-bold text-white text-sm">1. Vertical Position</h5>
              <p>Cylinders must strictly be kept upright on level ground. Never lay a cylinder flat on its side or store in unventilated enclosed cupboards.</p>
            </div>

            <div className="p-4 bg-white/10 rounded-xl space-y-2">
              <h5 className="font-bold text-white text-sm">2. Approved Rubber Tubing</h5>
              <p>Use only ISI marked reinforced rubber hose with a max length of 1.5 meters. Inspect regularly for cracks and replace after expiry.</p>
            </div>

            <div className="p-4 bg-white/10 rounded-xl space-y-2">
              <h5 className="font-bold text-white text-sm">3. In Case of Gas Leak</h5>
              <p>Do NOT operate any electrical switches. Turn regulator knob clockwise to OFF. Open all doors & windows. Call Fire Brigade at <strong>101</strong>.</p>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center flex-wrap gap-4 border-t border-white/20">
            <Link
              href="/safety-features"
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5"
            >
              <span>Read Full Step-by-Step Regulator Mounting & Safety Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="tel:+918023400459"
              className="text-xs font-semibold text-slate-200"
            >
              Emergency Helpline: +91 - 80 - 2340 0459
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

