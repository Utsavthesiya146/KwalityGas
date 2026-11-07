import React from "react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { Factory, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial LPG Requirement & Manifold Consultation | Kwality Gas",
  description:
    "Industrial LPG supply and manifold engineering consultation for factories, furnaces, and manufacturing plants across Karnataka & Tamil Nadu. Hotline: +91 78997 87101.",
};

export const dynamic = "force-dynamic";

export default function IndustrialContactPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Factory className="w-3.5 h-3.5" />
            <span>Industrial Engineering Division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Industrial LPG Requirement
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            High-output thermal engineering for factories, foundries, heat treatment, powder curing ovens, and multi-cylinder industrial manifold banks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block">
                Industrial Plant Requirement
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] mt-1">
                Industrial Consultation Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Share your factory location, equipment thermal load, and estimated monthly LPG metric tonnage.
              </p>
            </div>

            <EnquiryForm defaultType="INDUSTRIAL" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wider block">
                  Industrial Technical Desk
                </span>
                <h3 className="text-lg font-black text-[#102A43] mt-0.5">
                  Engineering & Pipeline Consultation
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Industrial Desk Hotline:</strong>
                    <a href="tel:+917899787101" className="text-[#1769AA] font-bold hover:underline block mt-0.5">
                      +91 78997 87101
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Bangalore Office Landline:</strong>
                    <a href="tel:+918023400459" className="text-slate-700 font-semibold hover:underline block mt-0.5">
                      +91 80 2340 0459
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Email:</strong>
                    <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-600 hover:text-[#1769AA] block mt-0.5">
                      kwalitygasmarketing@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Plant Network:</strong>
                    <span className="text-slate-600 block mt-0.5">
                      Hosur Bottling Plant (TN) • Chennai Terminal (TN) • Dharwad Plant (KA)
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical deliverables */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>33kg LOT/VOT manifold layout & vaporiser sizing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>PESO statutory drawings & testing documentation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Priority bulk road tanker & cylinder bank logistics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
