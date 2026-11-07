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
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Corporate Contact Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Kwality Gas
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Get in touch with our marketing desk for domestic connections, commercial HORECA supply contracts, and industrial manifold engineering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Interactive Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block">
                Send Us a Direct Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43] mt-1">
                Online Enquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select your requirement type below. Our marketing officers will call you back within 2 to 4 business hours.
              </p>
            </div>

            <EnquiryForm defaultType="DOMESTIC" />
          </div>

          {/* Right: Directory & Plant Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Registered & Marketing Offices */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block">
                  Official Corporate Presence
                </span>
                <h3 className="text-lg font-black text-[#102A43] mt-0.5">
                  Kwality Gas Bottlers Pvt Ltd
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Registered Office:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      V M C House, D-41, 3rd Floor, Rajajinagar Industrial Estate, Bangalore – 560 044, Karnataka, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Marketing & Administration Office:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040, Karnataka, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Marketing Team Hotlines:</strong>
                    <span className="text-slate-600 block mt-0.5">
                      <a href="tel:+917899787101" className="text-[#1769AA] font-bold hover:underline">+91 78997 87101</a> / <a href="tel:+919108248073" className="text-[#1769AA] font-bold hover:underline">+91 91082 48073</a> / <a href="tel:+917899787886" className="text-[#1769AA] font-bold hover:underline">+91 78997 87886</a>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Board & Front Desk:</strong>
                    <span className="text-slate-600 block mt-0.5">
                      <a href="tel:+918023400459" className="text-slate-800 font-semibold hover:underline">+91 80 2340 0459</a> / <a href="tel:+918023151130" className="text-slate-800 font-semibold hover:underline">+91 80 2315 1130</a> / <a href="tel:+919606861082" className="text-slate-800 font-semibold hover:underline">+91 96068 61082</a>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Official Emails:</strong>
                    <div className="text-slate-600 space-y-0.5 mt-0.5">
                      <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-600 hover:text-[#1769AA] block">
                        kwalitygasmarketing@gmail.com
                      </a>
                      <a href="mailto:kwalitygas45@gmail.com" className="text-slate-600 hover:text-[#1769AA] block">
                        kwalitygas45@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Operating Hours:</strong>
                    <span className="text-slate-600 block mt-0.5">Monday to Saturday: 9:30 AM – 5:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>CIN: U01120KA2005PTC036860</span>
                <span>Rating: CARE Grade 1</span>
              </div>
            </div>

            {/* Regional Bottling Plants Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wider block">
                  3 Regional Bottling Plants
                </span>
                <h3 className="text-lg font-black text-[#102A43] mt-0.5">
                  Plant Facilities
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block font-bold">1. Hosur Bottling Plant (Tamil Nadu)</strong>
                  <span className="text-slate-500 text-[11px]">SIPCOT Industrial Complex • Primary Carousel Hub</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block font-bold">2. Chennai Bottling Terminal (Tamil Nadu)</strong>
                  <span className="text-slate-500 text-[11px]">Coastal Storage Terminal • Tanker Decanting Gantries</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block font-bold">3. Dharwad Bottling Facility (Karnataka)</strong>
                  <span className="text-slate-500 text-[11px]">North Karnataka Distribution Center • Heavy LOT Hub</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Card */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
                <Radio className="w-4 h-4 animate-pulse text-red-600" />
                <span>24/7 Gas Leakage Emergency Helpline</span>
              </div>
              <p className="text-xs text-red-800">
                For urgent gas leak isolation or pipeline issues, call our dispatch officers immediately:
              </p>
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency: +91 78997 87101</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
