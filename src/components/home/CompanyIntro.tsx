"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, ShieldCheck, Flame, ArrowRight, Eye, X } from "lucide-react";

export default function CompanyIntro() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const advantages = [
    { key: "A", title: "Eco-Friendly & Non-Polluting", desc: "Clean blue flame fuel that burns cleanly without toxic soot or hazardous residues." },
    { key: "B", title: "Cost-Effective & High Efficiency", desc: "Superior calorific value gives maximum thermal energy per rupee spent." },
    { key: "C", title: "Faster Cooking & Instant Heat", desc: "The burner reaches working temperatures more quickly, cooking food faster and saving precious time." },
    { key: "D", title: "Minimal Heat Wastage", desc: "Direct focused heat transfer ensures concentrated thermal energy to pans and vessels." },
    { key: "E", title: "Cooler Working Kitchens", desc: "Significantly reduced radiant heat keeps domestic and restaurant kitchens cooler." },
    { key: "F", title: "Cleaner Cookware & Utensils", desc: "Clean combustion eliminates black soot on pots, pans, and kitchen surfaces." },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-surface text-brand-blue text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>About Kwality Gas Bottlers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue-dark tracking-tight leading-tight">
              WELCOME to Kwality Gas
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              Kwality Gas was conceived to produce and market L.P.G. a cooking gas as a domestic fuel for cooking. Backed by an Industrial group that has been in existence for over 35 years. Kwality Gas Bottlers Private Limited is situated in Bangalore, having 3 plants—2 in Tamil Nadu (Hosur, Chennai) & 1 in Karnataka (Dharwad). It has a storage facility of 30,000 MTPA and a bottling capacity of 8,000 cylinders per day.
            </p>

            {/* Sub-card: Connection for Every Household */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div>
                <h3 className="text-xl font-bold text-brand-blue-dark flex items-center gap-2">
                  <Flame className="w-5 h-5 text-brand-orange fill-brand-orange" />
                  <span>Kwality Gas, A Connection For Every Household:</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  It is the company’s dream to provide every household with a safe, affordable, and clean cooking gas connection.
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-black uppercase text-brand-orange tracking-widest mb-3">
                  Key Advantages of Kwality LPG:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {advantages.map((adv) => (
                    <div key={adv.key} className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <span className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {adv.key}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{adv.title}</h5>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{adv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow"
              >
                <span>Full Company Profile & Plants</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/group-company"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-orange transition-colors"
              >
                <span>Sister Company: The Bangalore Tin Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Awards Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-brand-blue-surface to-white p-6 rounded-3xl border border-blue-100 shadow-xl space-y-5">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-brand-orange" />
                <div>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest block">
                    Verified Industry Recognition
                  </span>
                  <h3 className="text-lg font-black text-brand-blue-dark">
                    BUSINESS EXCELLENCE & ACHIEVEMENT AWARDS 2015
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Awarded to Kwality Gas Bottlers Private Limited in recognition of outstanding LPG distribution service, strict safety compliance, and Grade 1 MDRA credit rating.
              </p>

              {/* Award Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setActiveCert("/images/original/kwality-gas-certificate.jpg")}
                  className="relative h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-sm bg-slate-50"
                >
                  <Image
                    src="/images/original/kwality-gas-certificate.jpg"
                    alt="Business Excellence Certificate 2015"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                    <Eye className="w-4 h-4" />
                    <span>View Certificate</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveCert("/images/original/kwality-gas-award.jpg")}
                  className="relative h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-sm bg-slate-50"
                >
                  <Image
                    src="/images/original/kwality-gas-award.jpg"
                    alt="Kwality Gas Achievement Award Trophy 2015"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                    <Eye className="w-4 h-4" />
                    <span>View Trophy</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Grade 1 Rating certified by MDRA (DOI 29-04-2017)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveCert(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[85vh] bg-white rounded-2xl p-4 overflow-hidden">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-[70vh] w-full">
              <Image src={activeCert} alt="Kwality Award Full" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

