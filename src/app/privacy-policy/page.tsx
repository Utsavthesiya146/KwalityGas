import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Lock, Eye, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kwality Gas Bottlers",
  description:
    "Kwality Gas data protection principles, information collection, user tracking, and customer information handling policies.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Our strict commitment to safeguarding your privacy and customer information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-blue-dark flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-orange" />
              <span>Introduction</span>
            </h2>
            <p>
              Welcome to Kwality Gas! Our commitment to safeguarding your privacy is reflected in this Privacy Policy. It elucidates the methods by which we collect, utilize, and secure your personal information as you engage with Kwality Gas services, refill booking platforms, and dealer interactions.
            </p>
          </section>

          {/* Data Protection Principles */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-black text-brand-blue-dark flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Data Protection Principles</span>
            </h2>
            <p>Kwality Gas stands by the following core data protection principles:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>Information is gathered only for legitimate cylinder delivery, commercial contracts, and safety dispatch purposes.</li>
              <li>Data is processed fairly, lawfully, and transparently.</li>
              <li>Personal and establishment details are accurate and maintained with the option for customers to update their records.</li>
              <li>Customer contact details are never rented, sold, or shared with third-party advertisers.</li>
            </ul>
          </section>

          {/* Information We Collect */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-black text-brand-blue-dark flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-blue" />
              <span>Information We Collect</span>
            </h2>
            <p>
              We collect information you provide directly through our domestic booking forms, commercial quote requests, and industrial assessment inquiries:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>Contact Information:</strong> Customer name, establishment name, contact person, mobile number, and email address.</li>
              <li><strong>Delivery Information:</strong> Physical residential or factory delivery address, landmark, and district.</li>
              <li><strong>Order Details:</strong> Cylinder size requirements (e.g. 12kg, 17kg, 33kg), estimated consumption pattern, and scheduled date.</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-black text-brand-blue-dark">
              How We Use Your Information
            </h2>
            <p>
              Your information is exclusively utilized to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>Process cylinder deliveries and assign nearest authorized distributors.</li>
              <li>Verify customer identity and maintain accurate statutory cylinder tracking records.</li>
              <li>Communicate dispatch schedules, safety advisories, and updated price lists.</li>
              <li>Respond to technical customer queries and emergency gas leak calls.</li>
            </ul>
          </section>

          {/* User Tracking & Security */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-black text-brand-blue-dark flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-orange" />
              <span>User Tracking & Cookies</span>
            </h2>
            <p>
              Our website uses essential functional cookies and secure sessions to ensure site navigation stability and protect administrative interfaces. We do not use intrusive cross-site tracking pixels or invasive advertising trackers.
            </p>
          </section>

          {/* Contact Us for Privacy Queries */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mt-6 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Questions Regarding This Privacy Policy?
            </h4>
            <p className="text-xs text-slate-600">
              For any questions or privacy inquiries, contact our legal and administrative desk at:
            </p>
            <p className="text-xs font-semibold text-brand-blue">
              Kwality Gas Bottlers Private Limited • V M C House, D-41, 3rd Floor, Rajaji nagar Industrial Estate, Bangalore – 560 044 • Email: <a href="mailto:kwalitygasmarketing@gmail.com" className="underline">kwalitygasmarketing@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

