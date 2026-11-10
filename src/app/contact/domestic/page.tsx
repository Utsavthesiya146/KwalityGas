import React from "react";
import Link from "next/link";
import {
  Home,
  CheckCircle2,
  FileText,
  Phone,
  ShieldCheck,
  Clock,
  ArrowRight,
  Flame,
  Truck,
} from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import PageHero from "@/components/shared/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Domestic LPG Connection | Book 12kg & 5.5kg Cylinders | Kwality Gas",
  description:
    "Apply for a new domestic Kwality Gas connection. Instant booking for 12kg and 5.5kg cylinders with minimal documentation, doorstep delivery, and free safety inspection across Karnataka & Tamil Nadu.",
};

export const dynamic = "force-dynamic";

export default function DomesticContactPage() {
  const steps = [
    {
      num: "1",
      title: "Submit Online Request",
      desc: "Fill in your delivery address, preferred cylinder capacity (12kg or 5.5kg), and phone number.",
    },
    {
      num: "2",
      title: "Quick Documentation",
      desc: "Provide standard identity proof (Aadhaar / Voter ID) and residential address proof.",
    },
    {
      num: "3",
      title: "Doorstep Delivery & Setup",
      desc: "Our delivery representative delivers the certified cylinder, fits the regulator, and performs a leak test.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <PageHero
        badge={{
          icon: <Home className="w-3.5 h-3.5" />,
          text: "Domestic Household Onboarding",
        }}
        title="Book a New Domestic LPG Connection"
        description="Hassle-free household gas connections without lengthy waitlists. Get your 12kg or 5.5kg cylinder delivered directly to your kitchen in 24 to 48 hours."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Requirements & Advantages (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick 3-step process */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
              <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#F28C28]" />
                </div>
                <span>Simple 3-Step Connection</span>
              </h3>
              <div className="space-y-4">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F28C28] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-orange-200 shadow-2xs">
                      {st.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{st.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
              <h3 className="font-black text-slate-900 text-base mb-4 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[#1769AA]" />
                </div>
                <span>Documents Required</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Aadhaar Card / Voter ID / Passport (Any 1)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Electricity Bill / Rent Agreement / Gas connection NOC</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>1 Passport Size Photograph</span>
                </li>
              </ul>
            </div>

            {/* Helpline Card */}
            <div className="bg-gradient-to-br from-[#07131F] via-[#102A43] to-[#07131F] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <h4 className="font-black text-white text-base mb-1.5 tracking-tight">
                  Prefer to Book via Phone?
                </h4>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  Our domestic booking desk is open Monday to Saturday, 9:00 AM to 6:30 PM.
                </p>
                <div className="space-y-2.5">
                  <a
                    href="tel:+917899787101"
                    className="flex items-center gap-2.5 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hotline: +91 78997 87101</span>
                  </a>
                  <a
                    href="tel:+918023400459"
                    className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all hover:border-white/40"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Office: +91 80 2340 0459</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Domestic Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
              <div className="mb-8">
                <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-wider">
                  Express Registration
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] mt-1 tracking-tight">
                  Domestic Connection Form
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  Please provide your contact details and address. We will verify and confirm delivery slot.
                </p>
              </div>

              <EnquiryForm defaultType="DOMESTIC" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

