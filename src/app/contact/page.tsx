import React from "react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building,
  Factory,
  Radio,
  ExternalLink,
  PhoneCall,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Regional Offices | Kwality Gas Bottlers",
  description:
    "Contact Kwality Gas Bottlers Pvt Ltd. Head Office: Vijayanagar Bangalore. Plants in Hosur, Chennai, and Dharwad. Marketing Hotline: +91 78997 87101, Office: +91 80 2340 0459.",
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#07131F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Building className="w-3.5 h-3.5" />
            <span>Corporate Contact Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Contact Kwality Gas
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Get in touch with our marketing desk for domestic connections, commercial HORECA supply contracts, and industrial manifold engineering.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Interactive Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
            <div className="mb-8">
              <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-wider block">
                Send Us a Direct Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] mt-1 tracking-tight">
                Online Enquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Select your requirement type below. Our marketing officers will call you back within 2 to 4 business hours.
              </p>
            </div>

            <EnquiryForm defaultType="DOMESTIC" />
          </div>

          {/* Right: Directory & Plant Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Registered & Marketing Offices */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-wider block">
                  Official Corporate Presence
                </span>
                <h3 className="text-xl font-black text-[#102A43] mt-1 tracking-tight">
                  Kwality Gas Bottlers Pvt Ltd
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#F28C28]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Registered Office:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5 text-xs">
                      V M C House, D-41, 3rd Floor, Rajajinagar Industrial Estate, Bangalore – 560 044, Karnataka, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4 text-[#1769AA]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Marketing & Administration Office:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5 text-xs">
                      2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040, Karnataka, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Marketing Team Hotlines:</strong>
                    <span className="text-slate-600 block mt-0.5 text-xs font-medium">
                      <a href="tel:+917899787101" className="text-[#1769AA] font-bold hover:underline">+91 78997 87101</a> / <a href="tel:+919108248073" className="text-[#1769AA] font-bold hover:underline">+91 91082 48073</a> / <a href="tel:+917899787886" className="text-[#1769AA] font-bold hover:underline">+91 78997 87886</a>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#1769AA]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Board & Front Desk:</strong>
                    <span className="text-slate-600 block mt-0.5 text-xs">
                      <a href="tel:+918023400459" className="text-slate-800 font-semibold hover:underline">+91 80 2340 0459</a> / <a href="tel:+918023151130" className="text-slate-800 font-semibold hover:underline">+91 80 2315 1130</a> / <a href="tel:+919606861082" className="text-slate-800 font-semibold hover:underline">+91 96068 61082</a>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#F28C28]" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Official Emails:</strong>
                    <div className="text-slate-600 space-y-0.5 mt-0.5 text-xs">
                      <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-600 hover:text-[#1769AA] block transition-colors">
                        kwalitygasmarketing@gmail.com
                      </a>
                      <a href="mailto:kwalitygas45@gmail.com" className="text-slate-600 hover:text-[#1769AA] block transition-colors">
                        kwalitygas45@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs sm:text-sm">Operating Hours:</strong>
                    <span className="text-slate-600 block mt-0.5 text-xs">Monday to Saturday: 9:30 AM – 5:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>CIN: U01120KA2005PTC036860</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Rating: CARE Grade 1</span>
              </div>
            </div>

            {/* Regional Bottling Plants Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-extrabold text-[#1769AA] uppercase tracking-wider block">
                  3 Regional Bottling Plants
                </span>
                <h3 className="text-xl font-black text-[#102A43] mt-1 tracking-tight">
                  Plant Facilities
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <strong className="text-slate-900 block font-bold text-xs sm:text-sm">1. Hosur Bottling Plant (Tamil Nadu)</strong>
                  <span className="text-slate-500 text-[11px] block mt-0.5">SIPCOT Industrial Complex • Primary Carousel Hub</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <strong className="text-slate-900 block font-bold text-xs sm:text-sm">2. Chennai Bottling Terminal (Tamil Nadu)</strong>
                  <span className="text-slate-500 text-[11px] block mt-0.5">Coastal Storage Terminal • Tanker Decanting Gantries</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <strong className="text-slate-900 block font-bold text-xs sm:text-sm">3. Dharwad Bottling Facility (Karnataka)</strong>
                  <span className="text-slate-500 text-[11px] block mt-0.5">North Karnataka Distribution Center • Heavy LOT Hub</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Card */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/90 rounded-3xl p-6 sm:p-7 space-y-3 text-center sm:text-left shadow-xs">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-red-700 font-extrabold text-xs uppercase tracking-wider">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <Radio className="w-4 h-4 text-red-600" />
                <span>24/7 Gas Leakage Emergency Helpline</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                For urgent gas leak isolation or pipeline issues, call our dispatch officers immediately:
              </p>
              <div>
                <a
                  href="tel:+917899787101"
                  className="inline-flex items-center gap-2 text-xs font-black text-white bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Emergency: +91 78997 87101</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
