"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Factory, ShieldCheck, MapPin, Truck, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function PlantInfrastructureSection() {
  const plants = [
    {
      name: "Hosur Bottling Plant",
      location: "SIPCOT Industrial Complex, Tamil Nadu",
      highlight: "Primary High-Capacity Hub",
      desc: "Equipped with state-of-the-art electronic carousels, hydrostatic cylinder test bays, and automated electronic leak detection stations.",
      image: "/images/original/service_style_16.jpg",
    },
    {
      name: "Chennai Bottling Plant",
      location: "Chennai Metro & Coastal Zone",
      highlight: "Strategic Coastal Logistics",
      desc: "Serving northern Tamil Nadu and Andhra border zones with dedicated tanker decanting gantries and express commercial turnaround.",
      image: "/images/original/slide2.jpg",
    },
    {
      name: "Dharwad Bottling Facility",
      location: "North Karnataka Industrial Corridor",
      highlight: "Hub for Karnataka Distribution",
      desc: "Strategically located along key highway corridors to guarantee uninterrupted LPG supply to commercial bakeries and industrial foundries.",
      image: "/images/original/service_style_11.jpg",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102A43] via-slate-900 to-[#102A43] opacity-90" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1769AA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Factory className="w-3.5 h-3.5" />
            <span>Infrastructure & Capacity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            3 High-Capacity Bottling Plants
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Grade 1 Rated bottling infrastructure engineered to guarantee uninterrupted clean energy supply across South India.
          </p>
        </div>

        {/* 4 Stat Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-14">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#F28C28] tracking-tight">30,000</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">MTPA Storage</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Bulk LPG mounded bullets</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">8,000</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">Cylinders / Day</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Automated carousel capacity</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">Grade 1</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">CARE Rating</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Highest financial & safety audit</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#1769AA] tracking-tight">ISO 9001</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">2015 Certified</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Audited quality management</div>
          </div>
        </div>

        {/* 3 Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plants.map((plant, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#1769AA]/50 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-52 bg-slate-800">
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#102A43]/90 text-[#F28C28] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                    {plant.highlight}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#F28C28] transition-colors">
                    {plant.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F28C28] flex-shrink-0" />
                    <span>{plant.location}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {plant.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] group-hover:text-white transition-colors"
                >
                  <span>View Plant Photos</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet & Distribution Strip */}
        <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F28C28] text-white flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Dedicated Logistics Tankers & Doorstep Delivery Fleet
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Direct plant-to-customer logistics guarantees you never run out of gas during peak business hours.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-[#F28C28] hover:text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex-shrink-0"
          >
            <span>Learn About Our Operations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

