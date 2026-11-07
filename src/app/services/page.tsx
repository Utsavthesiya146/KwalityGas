import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Truck,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Wrench,
  Users,
  Settings,
  Sparkles,
  Award,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kwality Gas Services | Delivery, Pipeline Engineering & Safety Audits",
  description:
    "Explore Kwality Gas services: guaranteed on-time cylinder delivery, commercial manifold pipeline engineering, free on-site safety audits, and 24/7 emergency customer care.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicesPage() {
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("ServicesPage fetch error:", err);
  }

  const defaultServices = [
    {
      id: "srv-1",
      title: "Guaranteed Prompt Doorstep Delivery",
      icon: "Truck",
      shortDesc: "Dedicated delivery tanker fleet and cylinder transport logistics operating 6 days a week across Karnataka and Tamil Nadu.",
      fullContent: "Our expansive distribution fleet ensures you never run out of cooking fuel. With strategically located regional bottling hubs in Hosur, Chennai, and Dharwad, we guarantee prompt delivery turnaround for domestic homes, restaurants, and factory shifts.",
      image: "/images/original/service_style_11.jpg",
    },
    {
      id: "srv-2",
      title: "Commercial Pipeline & Manifold Installation",
      icon: "Wrench",
      shortDesc: "Turn-key design, fabrication, and testing of multi-cylinder LPG manifold headers for hotels, bakeries, and industrial furnaces.",
      fullContent: "Our certified gas engineers design custom manifold banks with auto-changeover regulators, slam-shut emergency valves, and pressure reducing stations. Fully compliant with Chief Controller of Explosives (PESO) and Indian Fire Department standards.",
      image: "/images/original/service_style_12.jpg",
    },
    {
      id: "srv-3",
      title: "Free On-Site Safety Audits & Staff Training",
      icon: "ShieldCheck",
      shortDesc: "Preventative safety check-ups for commercial kitchens, pressure testing, and practical training for kitchen staff on leak protocols.",
      fullContent: "We conduct periodic on-site safety inspections checking cylinder footring stability, regulator O-ring health, and pipe integrity. We train your kitchen personnel on immediate emergency protocols, eliminating hazardous blind spots.",
      image: "/images/original/service_style_16.jpg",
    },
    {
      id: "srv-4",
      title: "24/7 Breakdown & Gas Leak Emergency Desk",
      icon: "Phone",
      shortDesc: "Round-the-clock emergency assistance helpline with rapid technician dispatch for gas odor or pressure anomalies.",
      fullContent: "Gas safety does not adhere to office hours. Our emergency response team is available 24/7 at +91 78997 87101 to guide you through emergency isolation procedures and dispatch qualified technicians immediately.",
      image: "/images/original/service_details.jpg",
    },
  ];

  const services = dbServices.length > 0 ? dbServices : defaultServices;

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Comprehensive Energy Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Services & Engineering Commitments
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            From seamless domestic doorstep deliveries to turn-key industrial manifold pipeline fabrication and 24/7 safety emergency support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Value Statement */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase text-[#1769AA] tracking-wider">
            Customer-Centric Energy Solutions
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Safety, Reliability & Quality in Every Drop of Fuel
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The main force that drives Kwality Gas is our uncompromising emphasis on quality products and superior customer care. We treat every customer relationship as a lasting partnership backed by 35+ years of industrial legacy.
          </p>
        </div>

        {/* 4 Core Services Pillars Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-56 bg-slate-800">
                  <Image
                    src={srv.imageUrl || srv.image || "/images/original/service_style_11.jpg"}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#102A43]/90 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-sm border border-white/10">
                    Pillar 0{idx + 1}
                  </div>
                </div>

                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#F28C28]">
                    {srv.shortDesc}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {srv.fullContent || srv.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:text-[#F28C28] transition-colors"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Certified Team
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Hotline Strip */}
        <div className="bg-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Need Technical Support or Pipeline Maintenance?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Our service engineering desk assists commercial and industrial clients with routine maintenance, pressure calibration, and emergency callouts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+917899787101"
              className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Helpline: +91 78997 87101</span>
            </a>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3 rounded-xl text-xs font-bold transition-all"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
