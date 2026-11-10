import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Flame,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Phone,
  UtensilsCrossed,
  Clock,
  Sparkles,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial LPG for Hotels & Restaurants (HORECA) | 17kg, 21kg & 33kg | Kwality Gas",
  description:
    "Kwality Gas commercial LPG solutions for hotels, restaurants, caterers, cloud kitchens, and bakeries. High continuous pressure, zero soot, bulk invoicing, and express delivery across South India.",
};

export const dynamic = "force-dynamic";

export default function CommercialPage() {
  const commercialBenefits = [
    { title: "High Thermal Efficiency", desc: "Pure propane-butane blend produces an ultra-hot blue flame, cooking orders faster and reducing food preparation wait time." },
    { title: "Zero Kitchen Soot", desc: "Clean burning gas leaves no black carbon residue on cooking vessels, reducing kitchen scrubbing labor and keeping utensils spotless." },
    { title: "Continuous High Pressure", desc: "Engineered to prevent cylinder freezing even during peak hours of multi-burner commercial cooking." },
    { title: "Cost Effective vs Electricity & Diesel", desc: "Delivers maximum heat output per rupee compared to high commercial electricity tariffs and messy diesel fuel." },
    { title: "Cooler Working Atmosphere", desc: "Concentrated burner heat reduces ambient kitchen temperatures, improving the comfort and productivity of cooking staff." },
    { title: "Scheduled Daily Deliveries", desc: "Dedicated commercial delivery fleet ensures your restaurant or hotel kitchen never runs dry during lunch or dinner rush." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-[#06121E] via-[#0B1D2F] to-[#102A43] text-white py-18 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3.5 border border-white/15 shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>HORECA & Hospitality Energy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Commercial LPG Gas
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            High-efficiency clean cooking energy tailored for hotels, restaurants, banquet halls, cloud kitchens, and commercial bakeries across Karnataka & Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Commercial Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider border border-blue-100/60">
            <span>Commercial Energy Solutions</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Uninterrupted Energy for Commercial Kitchens
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Commercial kitchens demand high-pressure gas flow that can power continuous high-heat wok burners, tandoor ovens, and deep fryers simultaneously. Kwality Gas provides certified 17kg, 21kg, and 33kg commercial cylinders designed to withstand heavy thermal loads without freezing or pressure slump.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Whether you operate a boutique café, a cloud kitchen hub, or a luxury hotel banquet, our commercial team offers customized delivery schedules, emergency replenishment desks, and multi-cylinder manifold engineering.
          </p>

          <div className="p-6 bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl border border-blue-100/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-bold text-slate-900 text-sm block">Commercial Capacities:</span>
              <span className="text-xs text-slate-600">17 Kgs, 21 Kgs, and 33 Kgs Commercial & Industrial Cylinders</span>
            </div>
            <Link
              href="/price-list"
              className="bg-[#1769AA] hover:bg-[#12538A] text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider shadow-xs transition-colors shrink-0"
            >
              View Commercial Rates
            </Link>
          </div>
        </div>

        {/* 6 Commercial Advantages Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Advantages of Kwality Commercial LPG
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              High performance and cost savings tailored for high-volume commercial food businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialBenefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1769AA] flex items-center justify-center mb-4 border border-blue-100/60 group-hover:scale-105 transition-transform">
                    <UtensilsCrossed className="w-5 h-5" />
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

        {/* Commercial Cylinder Options */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Commercial Cylinder Range
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select the optimal capacity for your commercial cooking volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-5 hover:bg-white hover:shadow-cardHover transition-all duration-300 group">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                <Image src="/images/corporate/product-cylinder-17kg.jpg" alt="17kg Commercial Cylinder" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-[#1769AA] transition-colors">17 Kg Cylinder</h3>
                <p className="text-xs text-slate-500 mt-1">Restaurants, Cafés & Fast Food Stalls</p>
              </div>
              <Link
                href="/contact/commercial"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Request 17kg Quote
              </Link>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-5 hover:bg-white hover:shadow-cardHover transition-all duration-300 group">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                <Image src="/images/corporate/hero-commercial-lpg.jpg" alt="21kg Commercial Cylinder" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-[#1769AA] transition-colors">21 Kg Cylinder</h3>
                <p className="text-xs text-slate-500 mt-1">High-Heat Chinese Woks & Hotel Kitchens</p>
              </div>
              <Link
                href="/contact/commercial"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Request 21kg Quote
              </Link>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-5 hover:bg-white hover:shadow-cardHover transition-all duration-300 group">
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                <Image src="/images/corporate/product-cylinder-33kg.jpg" alt="33kg Commercial Cylinder" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-[#1769AA] transition-colors">33 Kg Manifold Bank</h3>
                <p className="text-xs text-slate-500 mt-1">Multi-Cylinder Centralized Kitchen Manifolds</p>
              </div>
              <Link
                href="/contact/commercial"
                className="block w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Request Manifold Setup
              </Link>
            </div>
          </div>
        </div>

        {/* Commercial CTA Strip */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/15">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Switch Your Commercial Supply to Kwality Gas</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Enjoy guaranteed delivery slots, dedicated billing accounts, certified tare weights, and free quarterly pipeline maintenance check-ups.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              href="/contact/commercial"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Get Commercial Quote
            </Link>
            <a
              href="tel:+917899787101"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl text-xs font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-[#F28C28]" />
              <span>Hotline: +91 78997 87101</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
