import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Factory,
  Globe,
  Briefcase,
  Users,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Company & Industrial Heritage | Kwality Gas",
  description:
    "Kwality Gas Bottlers Private Limited is backed by an industrial group with over 35 years of engineering existence, operating high-capacity infrastructure across South India.",
};

export const dynamic = "force-dynamic";

export default function GroupCompanyPage() {
  const groupHighlights = [
    {
      title: "35+ Years Industrial Heritage",
      desc: "Founded on four decades of precision engineering, industrial logistics, and high-pressure gas distribution in South India.",
    },
    {
      title: "30,000 MTPA Bulk Storage",
      desc: "Massive strategic bulk storage infrastructure across Tamil Nadu and Karnataka, shielding regional consumers from fuel volatility.",
    },
    {
      title: "Grade 1 Rating by CARE (MDRA)",
      desc: "Audited and awarded Grade 1 standing for exceptional financial stability, flawless safety compliance, and operational excellence.",
    },
    {
      title: "International Quality Recognition",
      desc: "Winner of the Century International Quality ERA Award (Geneva, Switzerland 2015) for leadership in clean energy bottling.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Industrial Heritage & Synergy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Group Company
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Backed by a multi-disciplinary industrial group that has been driving manufacturing and energy infrastructure for over 35 years.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Corporate Profile */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold uppercase text-[#1769AA] tracking-wider">
                Built on Foundations of Trust & Engineering
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
                Over 35 Years of Engineering Excellence
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Kwality Gas Bottlers Private Limited represents the energy distribution arm of an established industrial group in existence for over 35 years. Our group's collective expertise spans high-pressure mechanical engineering, logistics fleet management, and statutory energy compliance.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating three large-scale bottling and storage hubs in Hosur, Chennai, and Dharwad, our parent group ensures financial resilience, state-of-the-art technological adoption, and deep supply relationships with national and international LPG refiners.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono">
                Corporate Identification Number (CIN): U01120KA2005PTC036860
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
                <Image
                  src="/images/corporate/hero-bottling-plant.jpg"
                  alt="Industrial Plant Infrastructure"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groupHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-cardHover transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Contact CTA */}
        <div className="bg-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Partner with Kwality Gas Enterprise</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Explore distributorships, institutional supply agreements, or large-scale industrial bulk energy contracts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all"
            >
              Contact Corporate Desk
            </Link>
            <Link
              href="/about"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3 rounded-xl text-xs font-bold transition-all"
            >
              Read About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
