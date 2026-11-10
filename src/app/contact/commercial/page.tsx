import React from "react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { Briefcase, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial LPG Requirement | Kwality Gas Bottlers",
  description:
    "Commercial LPG supply enquiry for restaurants, hotels, catering companies, and cloud kitchens across Karnataka & Tamil Nadu. Marketing Hotline: +91 78997 87101.",
};

export const dynamic = "force-dynamic";

export default function CommercialContactPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#07131F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Commercial Supply Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Commercial LPG Requirement
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Reliable commercial LPG refill agreements for hotels, restaurants, bakeries, caterers (HORECA), and industrial kitchens.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
            <div className="mb-8">
              <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-wider block">
                Commercial Establishment Registration
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] mt-1 tracking-tight">
                Commercial Quote Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Provide your establishment details and monthly cylinder consumption for custom commercial rates.
              </p>
            </div>

            <EnquiryForm defaultType="COMMERCIAL" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-extrabold text-[#1769AA] uppercase tracking-wider block">
                  Priority Commercial Desk
                </span>
                <h3 className="text-xl font-black text-[#102A43] mt-1 tracking-tight">
                  Commercial Accounts Support
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#F28C28]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Marketing Hotline:</strong>
                    <a href="tel:+917899787101" className="text-[#1769AA] font-bold hover:underline block mt-0.5 text-xs">
                      +91 78997 87101
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#1769AA]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Head Office Landline:</strong>
                    <a href="tel:+918023400459" className="text-slate-700 font-semibold hover:underline block mt-0.5 text-xs">
                      +91 80 2340 0459
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#F28C28]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Email:</strong>
                    <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-600 hover:text-[#1769AA] block mt-0.5 text-xs transition-colors">
                      kwalitygasmarketing@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Bangalore Corporate Office:</strong>
                    <span className="text-slate-600 block mt-0.5 text-xs leading-relaxed">
                      2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040.
                    </span>
                  </div>
                </div>
              </div>

              {/* Commercial perks */}
              <div className="pt-5 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full GST Input Tax Credit (ITC) billing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Scheduled weekly or daily replenishment slots</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free quarterly regulator & pipeline inspection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
