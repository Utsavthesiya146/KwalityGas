import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Flame, CheckCircle2, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG for Commercial (HORECA & Poultry) | Kwality Gas",
  description:
    "Kwality Gas commercial LPG supply for hotels, restaurants, caterers (HORECA), bakeries, and poultry farms. 15kg, 17kg, and 21kg commercial cylinders with uninterrupted refills.",
};

export default function CommercialPage() {
  const commercialSectors = [
    { title: "Hotels & Multi-Cuisine Restaurants", desc: "High discharge burners, faster boiling, cooler kitchens, and consistent pressure during peak lunch/dinner rushes." },
    { title: "Outdoor Caterers & Event Kitchens", desc: "Rugged 17kg and 21kg cylinders with quick connection regulators for mobile kitchens and banquets." },
    { title: "Bakeries & Sweet Manufacturing", desc: "Accurate flame temperature control essential for baked pastries, boiling sugar syrups, and confectionery." },
    { title: "Poultry Farms & Brooders", desc: "Reliable space heating for chick brooding sheds, maintaining stable ambient warmth with clean emissions." },
    { title: "Industrial Canteens & Hostels", desc: "Economical high-volume cooking with dedicated commercial supply agreements and doorstep delivery." },
    { title: "Food Courts & Fast Food Kiosks", desc: "Compact footprint with maximum safety compliance for modern mall kitchen layouts." },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Commercial Energy Supply (HORECA)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG for Commercial
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            The preferred clean fuel partner for hotels, restaurants, catering businesses, and poultry operations across Karnataka & Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Audited Section: Commercial Purpose */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>Official Purpose & Capabilities</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
            COMMERCIAL PURPOSE
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            The main Commercial uses of LPG are with respect to cooking and most of all heating. It is as good for powering standalone stoves.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            One main reason behind LPG being a popular choice of fuel in Commercial uses is that it promises a low level of fuel consumption. LPG equipment’s do not demand high maintenance and it also has a narrow range with respect to flammability. LPG has played a revolutionary role when it comes to changing the face of Domestic fuels used for Cooking and Heating.
          </p>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                Audited Commercial Cylinders
              </span>
              <p className="text-base font-black text-slate-900">
                Commercial Cylinder Range: 15kg, 17kg, and 21kg Refill
              </p>
            </div>
            <Link
              href="/contact/commercial"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all shrink-0"
            >
              Submit Commercial Requirement
            </Link>
          </div>
        </div>

        {/* Sectors Served Grid */}
        <div>
          <h3 className="text-2xl font-black text-brand-blue-dark mb-6 text-center">
            Key Commercial Sectors Powered by Kwality Gas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialSectors.map((sector, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <h4 className="font-bold text-sm text-slate-900">{sector.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Commercial Booking CTA */}
        <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Commercial Supply Agreement</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Need a Consistent Daily/Weekly Refill Supply?</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Our dedicated commercial desk assists with manifold piping, volume discount contracts, and 24/7 delivery emergency backup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact/commercial"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow transition-all"
            >
              Commercial Booking Form
            </Link>
            <a
              href="tel:+919108001990"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-3.5 rounded-xl border border-white/20"
            >
              Call Commercial Desk: +91 91080 01990
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

