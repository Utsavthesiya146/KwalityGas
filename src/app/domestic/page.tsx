import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Flame, CheckCircle2, ShieldAlert, ShieldCheck, ArrowRight, Phone, Sparkles, Scale } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG for Domestic Use | 12kg, 5.5kg & 4kg Household Cylinders | Kwality Gas",
  description:
    "Kwality Gas domestic cooking gas for households: 12kg, 5.5kg, and 4kg cylinders. Pure blue flame, soot-free cooking, safe handling, and fast doorstep deliveries.",
};

export const dynamic = "force-dynamic";

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
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Household Cooking Gas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG for Domestic Use
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            A clean cooking connection for every household. Safe, efficient, soot-free, and accessible 6 days a week across Karnataka & Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Audited Section: Domestic Purpose */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider">
            <span>Official Mission & Purpose</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Domestic Purpose
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            The main domestic uses of LPG are with respect to cooking and most of all heating. It is as good for powering standalone stoves.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            One main reason behind LPG being a popular choice of fuel in domestic uses is that it promises a low level of fuel consumption. LPG equipment’s do not demand high maintenance and it also has a narrow range with respect to flammability. LPG has played a revolutionary role when it comes to changing the face of Domestic fuels used for Cooking and Heating.
          </p>

          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-bold text-slate-900 text-sm block">Domestic Cylinder Capacities Available:</span>
              <span className="text-xs text-slate-600">12 Kgs, 5.5 Kgs & 4 Kgs Cook and Light cylinders</span>
            </div>
            <Link
              href="/price-list"
              className="bg-[#1769AA] hover:bg-[#12538A] text-white text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-xs transition-colors shrink-0"
            >
              Check Domestic Price
            </Link>
          </div>
        </div>

        {/* 6 Advantages of Domestic LPG Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Advantages of Domestic LPG Over Other Fuels
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Why thousands of households rely on Kwality Gas for their daily cooking and heating needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domesticBenefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center mb-4">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
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

        {/* Domestic Cylinder Options Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Choose Your Domestic Household Cylinder
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              All cylinders are electronically weighed and hydro-tested for absolute safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="relative w-36 h-44 mx-auto">
                <Image src="/images/original/p5.jpg" alt="12kg Domestic Cylinder" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">12 Kg Cylinder</h3>
                <p className="text-xs text-slate-500 mt-1">Standard Household Primary Supply</p>
              </div>
              <Link
                href="/contact/domestic"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Book 12kg Refill
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="relative w-36 h-44 mx-auto">
                <Image src="/images/original/dom1.png" alt="5.5kg Compact Cylinder" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">5.5 Kg Cylinder</h3>
                <p className="text-xs text-slate-500 mt-1">Compact & Single Executive Family</p>
              </div>
              <Link
                href="/contact/domestic"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Book 5.5kg Cylinder
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="relative w-36 h-44 mx-auto">
                <Image src="/images/original/dar17.png" alt="4kg Cook & Light Cylinder" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">4 Kg Cook & Light</h3>
                <p className="text-xs text-slate-500 mt-1">Portable Stove & Lantern Lighting</p>
              </div>
              <Link
                href="/contact/domestic"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Book 4kg Cylinder
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Need a Fast Domestic Connection?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Skip government waiting queues. Contact Kwality Gas marketing desk for same-day documentation and rapid doorstep delivery.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact/domestic"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all"
            >
              Apply Online
            </Link>
            <a
              href="tel:+917899787101"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3 rounded-xl text-xs font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-[#F28C28]" />
              <span>Call: +91 78997 87101</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
