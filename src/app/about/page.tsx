import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Factory, Flame, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kwality Gas Bottlers Private Limited",
  description:
    "Kwality Gas was conceived to produce and market LPG cooking gas. Backed by an industrial group with 35+ years existence, 3 plants in Hosur, Chennai, and Dharwad, 30,000 MTPA storage, Grade 1 rating.",
};

export default function AboutPage() {
  const plants = [
    { name: "Hosur Plant", state: "Tamil Nadu", type: "Major Bottling & Bulk Storage", highlight: "Strategically located on Karnataka-TN industrial corridor" },
    { name: "Chennai Plant", state: "Tamil Nadu", type: "Coastal Bulk Storage & Distribution", highlight: "Catering to northern Tamil Nadu commercial & domestic hubs" },
    { name: "Dharwad Plant", state: "Karnataka", type: "North Karnataka Bottling Hub", highlight: "Serving Hubli-Dharwad, Belgaum & surrounding rural markets" },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-dark opacity-90" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Corporate Profile & 35-Year Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Kwality Gas Bottlers
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            A pioneering Grade 1 Rated LPG bottling and marketing company dedicated to delivering clean, eco-friendly energy across South India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Company Background & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
              Conceived for Every Household & Commercial Enterprise
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Kwality Gas was conceived to produce and market L.P.G. a cooking gas as a domestic fuel for cooking. Backed by an Industrial group that has been in existence for over 35 years.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Kwality Gas Bottlers Private Limited is situated in Bangalore, having 3 advanced plants—2 in Tamil Nadu (Hosur, Chennai) & 1 in Karnataka (Dharwad). It has a storage facility of 30,000 MTPA and a bottling capacity of 8,000 cylinders per day.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Our continuous investments in automated carousel bottling lines, electronic weight checkers, mandatory leak detection test baths, and a certified dealer distribution network ensure that every customer receives 100% accurate weight and supreme safety in every single refill.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Grade 1 Credit Rating</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Rating Agency: MDRA (DOI 29-04-2017)</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Business Excellence Award</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Winner of 2015 National Achievement Award</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <Image
                src="/images/original/kwalit.jpg"
                alt="Kwality Gas Bottling Operations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-brand-orange uppercase">Operations Excellence</span>
                  <p className="text-sm font-semibold">Automated Bottling Line & Storage Infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Bottling Plants */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
              Our 3 Advanced Bottling Facilities
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Strategically positioned across Karnataka and Tamil Nadu for optimal regional supply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <div
                key={plant.name}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-brand-blue-surface text-brand-blue text-[10px] font-bold uppercase mb-3">
                    {plant.state}
                  </div>
                  <h4 className="text-lg font-black text-brand-blue-dark mb-1">{plant.name}</h4>
                  <p className="text-xs font-bold text-brand-orange mb-3">{plant.type}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{plant.highlight}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Certified Safe Bottling Facility</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Group Link */}
        <div className="bg-brand-blue text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Group Company</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">The Bangalore Tin Works</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Manufacturers of Quality Tin Containers located at #M-10, 3rd Cross, Lakshminarayan Puram, Bangalore - 560 021.
            </p>
          </div>

          <Link
            href="/group-company"
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow transition-all shrink-0"
          >
            Learn About Sister Company
          </Link>
        </div>
      </div>
    </div>
  );
}

