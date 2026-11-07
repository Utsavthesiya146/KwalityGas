import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Flame,
  CheckCircle2,
  ArrowRight,
  Package,
  Wrench,
  AlertCircle,
  Phone,
} from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Accessories, Regulators & IS 9573 Rubber Hoses | Kwality Gas",
  description:
    "Official Kwality Gas accessories: domestic click-on regulators, commercial high-pressure adjustable regulators, IS 9573 steel wire braided rubber hoses, copper pigtails, and brass manifold adapters.",
};

export const dynamic = "force-dynamic";

export default function AccessoriesPage() {
  const accessories = [
    {
      title: "Domestic Click-On LPG Regulator",
      category: "Domestic Household",
      image: "/images/original/r1.jpg",
      rating: "25.6 mm Standard Neck",
      desc: "Precision calibrated low-pressure regulator with quick-fit click-on collar and self-closing security ball check. Engineered for 12kg, 5.5kg, and 4kg domestic cylinders.",
      specs: [
        "Operating pressure: 2.8 kPa (28 mbar)",
        "Flow rate: 1.5 kg/hr maximum",
        "Zinc die-cast body with brass nozzle",
        "Complies with IS 9798 standards",
      ],
    },
    {
      title: "Commercial High-Pressure Adjustable Regulator",
      category: "Commercial Kitchens & Burners",
      image: "/images/original/r2.jpg",
      rating: "High-Discharge Heavy-Duty",
      desc: "Equipped with high-precision top adjustment dial to regulate gas pressure between 0.5 to 2.0 bar for commercial Chinese wok ranges, tandoors, and bulk boiling cauldrons.",
      specs: [
        "Discharge capacity: 0 - 6.0 kg/hr",
        "Pressure gauge mounting port",
        "Forged heavy brass connector",
        "Smooth variable flame control",
      ],
    },
    {
      title: "IS 9573 Steel Wire Braided Rubber Hose (Suraksha)",
      category: "Mandatory Safety Tubing",
      image: "/images/original/r3.jpg",
      rating: "IS 9573:1998 Type 4",
      desc: "Triple-layer safety tubing with central high-tensile steel wire mesh braid. Rodent-proof, puncture-proof, flame-retardant, and resistant to atmospheric ozone cracking.",
      specs: [
        "Tested burst pressure > 35 kg/cm²",
        "Reinforced steel wire braid layer",
        "Fire-retardant outer synthetic rubber",
        "Recommended replacement: 5 years",
      ],
    },
    {
      title: "High-Pressure Copper & SS Wire Pigtails",
      category: "Manifold Cylinder Banks",
      image: "/images/original/s1.jpg",
      rating: "Heavy-Duty Manifold Connecting",
      desc: "Flexible annealed copper and braided stainless steel pigtail assemblies used to link 33kg LOT/VOT cylinders directly to the main commercial manifold header pipe.",
      specs: [
        "Working pressure: 250 PSI",
        "High flexibility with anti-kink coil",
        "Precision machined brass union nuts",
        "Zero leakage under constant vibration",
      ],
    },
    {
      title: "Industrial 2-Way & 4-Way Manifold Headers",
      category: "Centralized Gas Banks",
      image: "/images/original/s2.jpg",
      rating: "Heavy Seamless Pipe Sch 80",
      desc: "Prefabricated heavy-gauge steel manifold headers complete with isolating ball valves, non-return check valves, and master emergency slam-shut mounting plates.",
      specs: [
        "Seamless ASTM A106 Grade B pipe",
        "Tested up to 30 kg/cm² hydrostatic",
        "Anti-corrosive industrial epoxy finish",
        "Auto-changeover regulator compatible",
      ],
    },
    {
      title: "Heavy-Duty Forged Brass Ball Valves & Adaptors",
      category: "Pipeline Accessories",
      image: "/images/original/s3.jpg",
      rating: "Gas Certified PN 40",
      desc: "Full-bore quarter-turn brass ball valves with Teflon (PTFE) seals engineered specifically for volatile LPG liquid and vapour service in kitchen piping lines.",
      specs: [
        "PTFE heavy-duty gland packing",
        "Quarter-turn rapid on/off handle",
        "Rated PN 40 (40 bar pressure)",
        "Zero gas seep guaranteed",
      ],
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>Genuine Quality Accessories</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LPG Regulators, Hoses & Hardware
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            BIS-certified brass regulators, IS 9573 steel wire braided rubber hoses, high-pressure pigtails, and manifold hardware for domestic households and commercial hospitality kitchens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Safety Warning Card */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/80 mb-14 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 text-sm">
              Beware of Counterfeit Regulators and Substandard Hoses:
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Never use ordinary garden vinyl or plastic pipes for LPG installations. Unapproved hoses crack, harden, and invite rodent attacks within months. Always insist on genuine Kwality Gas IS 9573 reinforced steel braided hoses and calibrated brass regulators to ensure complete kitchen safety.
            </p>
          </div>
        </div>

        {/* 6 Accessories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {accessories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all group"
            >
              <div>
                <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden mb-4 border border-slate-100 flex items-center justify-center p-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold uppercase text-[#F28C28] tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {item.rating}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-[#1769AA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                  {item.specs.map((sp, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href="tel:+917899787101"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#F28C28] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Order Genuine Parts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Order Hardware Enquiry Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-[#102A43]">
                Order Certified LPG Hardware & Spares
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Tell us which cylinders, regulators, or hoses your facility requires. We dispatch genuine factory-sealed parts directly to your doorstep.
              </p>
            </div>
            <EnquiryForm defaultType="DOMESTIC" />
          </div>
        </div>
      </div>
    </div>
  );
}

