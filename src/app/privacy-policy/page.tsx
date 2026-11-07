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
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Privacy & Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            How Kwality Gas Bottlers Private Limited collects, safeguards, and utilizes customer contact information and transactional supply records.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
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
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1 text-xs">
              <div><strong>Company:</strong> Kwality Gas Bottlers Private Limited</div>
              <div><strong>CIN:</strong> U01120KA2005PTC036860</div>
              <div><strong>Address:</strong> 2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040</div>
              <div><strong>Email:</strong> kwalitygasmarketing@gmail.com</div>
              <div><strong>Phone:</strong> +91 80 2340 0459 / +91 78997 87101</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
