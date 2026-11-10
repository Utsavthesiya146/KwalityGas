import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Factory,
  Scale,
  Sparkles,
} from "lucide-react";

export default function CompanyIntro() {
  const advantages = [
    {
      title: "Grade 1 Rating by CARE (MDRA)",
      desc: "Audited and awarded Grade 1 standing for financial resilience, exceptional safety protocols, and operational transparency.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: "Pure High-Calorific Blue Flame",
      desc: "Delivers maximum heat transfer with zero carbon soot, keeping kitchen vessels bright and saving up to 15% on monthly fuel bills.",
      icon: <Flame className="w-5 h-5 text-[#F28C28]" />,
    },
    {
      title: "Electronic Weight Verification",
      desc: "Zero tolerance for under-filling. Every single cylinder is digitally weighed and stamped with certified tare weight before dispatch.",
      icon: <Scale className="w-5 h-5 text-[#1769AA]" />,
    },
    {
      title: "3 High-Capacity Bottling Hubs",
      desc: "Facilities in Hosur, Chennai, and Dharwad with 30,000 MTPA storage capacity and 8,000 cylinders/day throughput.",
      icon: <Factory className="w-5 h-5 text-[#102A43]" />,
    },
    {
      title: "Century International Quality Award",
      desc: "Winner of the prestigious Quality ERA Award presented in Geneva, Switzerland (2015) for excellence in clean energy bottling.",
      icon: <Award className="w-5 h-5 text-amber-500" />,
    },
    {
      title: "PESO & BIS Mandatory Compliance",
      desc: "Manufactured strictly as per IS 3196 standards, inspected in illuminated water test baths for 100% leak-proof reliability.",
      icon: <CheckCircle2 className="w-5 h-5 text-purple-600" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visuals & Award (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 h-96 sm:h-[440px] group">
              <Image
                src="/images/corporate/hero-bottling-plant.jpg"
                alt="Kwality Gas Bottling Line"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/95 via-[#081624]/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F28C28] text-white text-[11px] font-black uppercase tracking-wider mb-2.5 self-start shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  <span>Geneva Award Winner 2015</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Over 35 Years of Engineering Heritage
                </h3>
                <p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-normal">
                  Backed by an industrial group dedicated to South India's energy and infrastructure security.
                </p>
              </div>
            </div>

            {/* Quick Plant Stat Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:shadow-cardHover transition-all">
                <div className="text-2xl font-black text-[#102A43]">30,000 MTPA</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Bulk Storage Facility</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:shadow-cardHover transition-all">
                <div className="text-2xl font-black text-[#F28C28]">8,000 / Day</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Bottling Capacity</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 6 Advantages (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100/60">
                <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Why Kwality Gas Stands Out</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
                A Name Synonymous with Quality & Fuel Safety
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Kwality Gas Bottlers Private Limited was conceived to produce and market LPG as a premier domestic and commercial fuel. Headquartered in Bangalore, we operate 3 advanced bottling plants—2 in Tamil Nadu (Hosur, Chennai) and 1 in Karnataka (Dharwad).
              </p>
            </div>

            {/* 6 Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advantages.map((adv, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#1769AA]/40 hover:shadow-cardHover transition-all duration-200 flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 mt-0.5 border border-slate-100 group-hover:scale-105 transition-transform">
                    {adv.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#1769AA] transition-colors">
                      {adv.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-[#1769AA] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/group-company"
                className="text-xs font-bold text-[#1769AA] hover:text-[#102A43] transition-colors"
              >
                Learn About Our Group Companies &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
