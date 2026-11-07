import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kwality Gas Bottlers Private Limited",
  description:
    "Kwality Gas was conceived to produce and market LPG cooking gas. Backed by an industrial group with 35+ years existence, 3 plants in Hosur, Chennai, and Dharwad, 30,000 MTPA storage, Grade 1 rating.",
};

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const plants = [
    {
      name: "Hosur Plant",
      state: "Tamil Nadu",
      type: "Major Bottling & Storage Terminal",
      highlight: "State-of-the-art carousel bottling with direct access to South Indian highway networks",
      image: "/images/original/p7.jpg",
    },
    {
      name: "Chennai Plant",
      state: "Tamil Nadu",
      type: "Coastal Bulk Storage & Distribution",
      highlight: "Dedicated tanker decanting gantries and express commercial turnaround for Tamil Nadu",
      image: "/images/original/service_details.jpg",
    },
    {
      name: "Dharwad Plant",
      state: "Karnataka",
      type: "North Karnataka Bottling Hub",
      highlight: "Hubli-Dharwad, Belgaum & industrial clusters with heavy 33kg LOT manifold capability",
      image: "/images/original/g2.jpg",
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] opacity-90" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Corporate Profile & 35-Year Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Kwality Gas Bottlers
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            A pioneering Grade 1 Rated LPG bottling and distribution corporation dedicated to delivering clean, eco-friendly energy across South India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Company Background & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase text-[#1769AA] tracking-wider">
                Our Corporate Legacy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] mt-1 tracking-tight">
                Conceived for Every Household & Commercial Enterprise
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Kwality Gas was conceived to produce and market L.P.G. a cooking gas as a domestic fuel for cooking. Backed by an Industrial group that has been in existence for over 35 years.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Kwality Gas Bottlers Private Limited is situated in Bangalore, having 3 advanced plants—2 in Tamil Nadu (Hosur, Chennai) & 1 in Karnataka (Dharwad). It has a storage facility of 30,000 MTPA and a bottling capacity of 8,000 cylinders per day.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Our continuous investments in automated carousel bottling lines, electronic weight checkers, mandatory leak detection test baths, and a certified dealer distribution network ensure that every customer receives 100% accurate weight and supreme safety in every single refill.
            </p>

            {/* Verification badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">CARE Grade 1 Rating</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Highest financial & safety rating (MDRA audit)</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Quality Era Award (Geneva)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Winner of 2015 International Century Award</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Corporate CIN: U01120KA2005PTC036860 | Registered 2005
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <Image
                src="/images/original/kwalit.jpg"
                alt="Kwality Gas Bottling Operations"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-[#F28C28] font-black text-xl">30,000 MTPA</div>
                  <div className="text-xs text-slate-200">High-capacity bulk LPG mounded bullet storage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Plants Deep Dive */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              3 Strategically Positioned Bottling Plants
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Guaranteed uninterrupted fuel security across Karnataka and Tamil Nadu with automated bottling lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plants.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-cardHover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 bg-slate-800">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#102A43]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {p.state}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{p.name}</h3>
                    <p className="text-xs font-semibold text-[#1769AA] mb-2">{p.type}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards and International Recognition */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src="/images/original/kwality-gas-award.jpg"
                  alt="Century International Quality ERA Award Geneva"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>International Accreditation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
                Winner of Century International Quality ERA Award 2015
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Presented in Geneva, Switzerland, the Century International Quality ERA Award recognizes leadership, quality commitment, and innovation in industrial energy bottling. Kwality Gas stood out for its rigorous cylinder weight testing protocols and zero-accident plant track record.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Geneva, Switzerland (March 2015)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ISO 9001:2015 Certified Operations</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PESO Certified Bottling Infrastructure</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Head Office Details */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Registered Corporate Office</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040, Karnataka, India.
            </p>
            <div className="text-xs text-blue-200 pt-1">
              Marketing Hotline: +91 78997 87101 | Office: +91 80 2340 0459 | Email: kwalitygasmarketing@gmail.com
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              Contact Our Executives
            </Link>
            <Link
              href="/gallery"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              View Plant Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
