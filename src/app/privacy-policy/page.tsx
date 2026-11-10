import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kwality Gas Bottlers Private Limited",
  description:
    "Official privacy policy and customer data protection principles of Kwality Gas Bottlers Private Limited.",
};

export const dynamic = "force-dynamic";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#07131F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Privacy & Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            How Kwality Gas Bottlers Private Limited collects, safeguards, and utilizes customer contact information and transactional supply records.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono text-slate-400">Effective Date: Current Calendar Year</span>
            <h2 className="text-xl font-bold text-[#102A43] mt-1">
              Kwality Gas Bottlers Private Limited – Customer Privacy Commitment
            </h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">1. Information Collection</h3>
            <p>
              When you submit an online enquiry, request a domestic LPG refill, or apply for an institutional supply agreement, we collect your name, business name (if commercial), contact telephone number, delivery address, and estimated consumption requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">2. Purpose of Information Use</h3>
            <p>
              Your contact details are strictly utilized to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Process cylinder booking orders and coordinate doorstep delivery routes.</li>
              <li>Issue statutory GST tax invoices and supply compliance receipts.</li>
              <li>Provide urgent gas leakage safety advisories and emergency recall notices.</li>
              <li>Verify customer location and identity to comply with Chief Controller of Explosives (PESO) gas distribution mandates.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">3. Non-Disclosure & Security</h3>
            <p>
              Kwality Gas Bottlers Private Limited does not sell, lease, or monetize customer telephone numbers or addresses to third-party telemarketers. All digital records are stored in secure, encrypted databases with restricted administrative access.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">4. Contacting the Grievance Desk</h3>
            <p>
              If you have inquiries regarding your customer record or wish to update your registered delivery address, please contact our administrative desk:
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
              <div><strong className="text-slate-900">Company:</strong> Kwality Gas Bottlers Private Limited</div>
              <div><strong className="text-slate-900">CIN:</strong> U01120KA2005PTC036860</div>
              <div><strong className="text-slate-900">Address:</strong> 2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040</div>
              <div><strong className="text-slate-900">Email:</strong> <a href="mailto:kwalitygasmarketing@gmail.com" className="text-[#1769AA] hover:underline">kwalitygasmarketing@gmail.com</a></div>
              <div><strong className="text-slate-900">Phone:</strong> +91 80 2340 0459 / +91 78997 87101</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
