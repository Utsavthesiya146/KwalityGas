import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Zap,
  Activity,
  Phone,
  Radio,
  FileCheck,
} from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Safety Devices & Automatic Shut-Off Valves | Kwality Gas",
  description:
    "Industrial and commercial LPG safety devices: catalytic gas leak detectors, emergency slam-shut valves, excess flow check valves, flame failure controllers, and commercial manifold safety systems.",
};

export const dynamic = "force-dynamic";

export default function SafetyDevicesPage() {
  const devices = [
    {
      title: "Automatic Gas Leak Detector & Solenoid Shut-Off",
      category: "Commercial Kitchens & Bakeries",
      image: "/images/corporate/hero-safety-standards.jpg",
      desc: "Microprocessor-based catalytic sensor detects LPG concentrations at 10% LEL (Lower Explosive Limit), triggers a 95dB audiovisual siren, and activates an instantaneous magnetic solenoid valve to shut down gas flow at the manifold.",
      features: [
        "Instant solenoid cut-off (< 1 second)",
        "95 dB high-decibel audible alarm",
        "Dual relay outputs for exhaust fans",
        "Zero false alarms with catalytic sensor",
      ],
    },
    {
      title: "Emergency Slam-Shut Manifold Valve",
      category: "Industrial Manifolds & Furnaces",
      image: "/images/corporate/service-manifold-bank.jpg",
      desc: "Fail-safe mechanical slam-shut safety valve mounted on 33kg LOT/VOT manifold headers. Automatically trips closed during upstream line rupture, over-pressure, or structural hose severance.",
      features: [
        "Manual reset preventer",
        "Rated up to 25 bar pressure",
        "Spring-loaded mechanical trip",
        "PESO approved cast steel body",
      ],
    },
    {
      title: "Excess Flow Check Valve (EFCV)",
      category: "Cylinder Bank Protection",
      image: "/images/corporate/hero-safety-standards.jpg",
      desc: "Fitted between pigtails and manifold header pipes. If an operator disconnects a pressurized hose or if a burner pipe breaks, the EFCV instantly seals itself to prevent high-pressure liquid LPG release.",
      features: [
        "Heavy forged brass construction",
        "Automatic self-sealing ball check",
        "Surge-resistant calibration",
        "Compliant with IS 6912 standards",
      ],
    },
    {
      title: "Flame Failure Safety Controller",
      category: "Commercial Ranges & Tandoors",
      image: "/images/corporate/hero-commercial-lpg.jpg",
      desc: "Thermo-electric flame sensor paired with a pilot solenoid. In the event of flame extinction due to liquid spillage or air drafts, gas flow to the main burner is shut off in under 2 seconds.",
      features: [
        "Fast 2-second cutoff response",
        "Withstands 800°C burner temperature",
        "Pilot flame monitoring circuit",
        "Eliminates kitchen gas accumulation",
      ],
    },
    {
      title: "Hydrostatic Safety Relief Valve (SRV)",
      category: "Liquid Off-Take Pipelines",
      image: "/images/corporate/service-manifold-bank.jpg",
      desc: "Installed between blocked sections of liquid LPG pipelines to relieve trapped hydrostatic thermal expansion, venting safe excess vapour back into the header before pipe deformation occurs.",
      features: [
        "Factory calibrated release setting",
        "Corrosion-resistant stainless steel spring",
        "Viton synthetic sealing seats",
        "Mandatory for LOT manifold sections",
      ],
    },
    {
      title: "Digital Manometer & Pressure Gauges",
      category: "Pipeline Monitoring",
      image: "/images/corporate/service-safety-audit.jpg",
      desc: "Stainless steel oil-filled pressure gauge with dual kg/cm² and PSI scales, offering vibration-free pressure monitoring for primary and secondary stage regulators in industrial furnace lines.",
      features: [
        "Glycerin filled for needle dampening",
        "Zero to 25 kg/cm² scale",
        "Stainless steel SS304 casing",
        "Clear safety zone color indicators",
      ],
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Industrial Protection Systems</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG Safety Devices & Control Valves
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Certified safety instrumentation engineered to prevent gas leaks, automate emergency shutoffs, and safeguard commercial kitchens and industrial furnace pipelines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold uppercase text-[#1769AA] tracking-wider">
                PESO & BIS Safety Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
                Zero-Compromise LPG Safety Engineering
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kwality Gas not only delivers genuine certified LPG cylinders, but our engineering division also equips hotels, commercial restaurants (HORECA), cloud kitchens, and industrial factories with turn-key safety protection devices. From auto-shutoff solenoid systems to slam-shut valves, we eliminate combustible hazards before they begin.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free On-Site Safety Audits</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PESO Certified Installation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Annual Maintenance Contracts</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="font-bold text-emerald-950 text-sm">
                24/7 Pipeline Emergency Support
              </h4>
              <p className="text-xs text-emerald-800">
                Experiencing pressure drops or regulator faults? Call our emergency field engineers:
              </p>
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 78997 87101</span>
              </a>
            </div>
          </div>
        </div>

        {/* 6 Devices Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {devices.map((dev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all group"
            >
              <div>
                <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden mb-4 border border-slate-100 flex items-center justify-center p-3">
                  <Image
                    src={dev.image}
                    alt={dev.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="text-[11px] font-extrabold uppercase text-[#1769AA] tracking-wider mb-1">
                  {dev.category}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-[#1769AA] transition-colors">
                  {dev.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {dev.desc}
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                  {dev.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href="tel:+917899787101"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#F28C28] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Request Safety Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Pipeline Audit Request Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-[#102A43]">
                Schedule a Commercial Safety Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Our certified gas technicians inspect your pipeline integrity, regulator pressure calibration, and auto-shutoff sensors with zero kitchen downtime.
              </p>
            </div>
            <EnquiryForm defaultType="COMMERCIAL" />
          </div>
        </div>
      </div>
    </div>
  );
}

