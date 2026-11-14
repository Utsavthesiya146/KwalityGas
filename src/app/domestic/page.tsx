import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Flame, CheckCircle2, ShieldAlert, ShieldCheck, ArrowRight, Phone, Sparkles, Scale } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
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
      <PageHero
        badge={{
          icon: <Home className="w-3.5 h-3.5" />,
          text: "Household Cooking Gas",
        }}
        title="LPG for Domestic Use"
        description="A clean cooking connection for every household. Safe, efficient, soot-free, and accessible 6 days a week across Karnataka & Tamil Nadu."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Audited Section: Domestic Purpose */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider border border-blue-100/60">
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

          <div className="p-6 bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl border border-blue-100/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-bold text-slate-900 text-sm block">Domestic Cylinder Capacities Available:</span>
              <span className="text-xs text-slate-600">12 Kgs, 5.5 Kgs & 4 Kgs Cook and Light cylinders</span>
            </div>
            <Link
              href="/price-list"
              className="bg-[#1769AA] hover:bg-[#12538A] text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider shadow-xs transition-colors shrink-0"
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
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#F28C28] flex items-center justify-center mb-4 border border-orange-100/60 group-hover:scale-105 transition-transform">
                    <Flame className="w-5 h-5" />
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

        {/* Domestic Cylinder Options Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Choose Your Domestic Household Cylinder
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              All cylinders are electronically weighed and hydro-tested for absolute safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-5 hover:bg-white hover:shadow-cardHover transition-all duration-300 group">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                <Image src="/images/corporate/product-cylinder-12kg.jpg" alt="12kg Domestic Cylinder" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-[#1769AA] transition-colors">12 Kg Cylinder</h3>
                <p className="text-xs text-slate-500 mt-1">Standard Household Primary Supply</p>
              </div>
              <Link
                href="/contact/domestic"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Book 12kg Refill
              </Link>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-5 hover:bg-white hover:shadow-cardHover transition-all duration-300 group">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                <Image src="/images/corporate/product-cylinder-5-5kg.jpg" alt="5.5kg Compact Cylinder" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-[#1769AA] transition-colors">5.5 Kg Cylinder</h3>
                <p className="text-xs text-slate-500 mt-1">Compact & Single Executive Family</p>
              </div>
              <Link
                href="/contact/domestic"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Book 5.5kg Cylinder
              </Link>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-5 hover:bg-white hover:shadow-cardHover transition-all duration-300 group">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                <Image src="/images/corporate/product-cylinder-4kg.jpg" alt="4kg Cook & Light Cylinder" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-[#1769AA] transition-colors">4 Kg Cook & Light</h3>
                <p className="text-xs text-slate-500 mt-1">Portable Stove & Lantern Lighting</p>
              </div>
              <Link
                href="/contact/domestic"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Book 4kg Cylinder
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/15">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Need a Fast Domestic Connection?</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Skip government waiting queues. Contact Kwality Gas marketing desk for same-day documentation and rapid doorstep delivery.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              href="/contact/domestic"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Apply Online
            </Link>
            <a
              href="tel:+917899787101"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl text-xs font-bold transition-all"
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
