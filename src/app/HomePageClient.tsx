"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/home/HeroSlider";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import CompanyIntro from "@/components/home/CompanyIntro";
import CylinderCapacitiesShowcase from "@/components/home/CylinderCapacitiesShowcase";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import GasWaterHeaterShowcase from "@/components/home/GasWaterHeaterShowcase";
import PlantInfrastructureSection from "@/components/home/PlantInfrastructureSection";
import PriceTablePreview from "@/components/home/PriceTablePreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeSafetySection from "@/components/home/HomeSafetySection";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { Truck, ShieldCheck, Leaf, Flame, ArrowRight, Phone, CheckCircle2, Clock } from "lucide-react";

interface HomePageClientProps {
  priceStates: any[];
  products: any[];
  testimonials: any[];
  services: any[];
  awards: any[];
}

export default function HomePageClient({
  priceStates,
  products,
  testimonials,
  services,
  awards,
}: HomePageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("DOMESTIC");

  const openEnquiry = (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL" = "DOMESTIC") => {
    setModalType(type);
    setModalOpen(true);
  };

  const getServiceIcon = (iconName: string | null) => {
    switch (iconName) {
      case "Truck": return <Truck className="w-6 h-6 text-[#F28C28]" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-[#F28C28]" />;
      case "Leaf": return <Leaf className="w-6 h-6 text-[#F28C28]" />;
      default: return <Flame className="w-6 h-6 text-[#F28C28]" />;
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Slider */}
      <HeroSlider onOpenEnquiry={openEnquiry} />

      {/* 2. LPG Categories (Home, Commercial, Industrial) */}
      <CategoriesGrid onOpenEnquiry={openEnquiry} />

      {/* 3. Company Introduction & 6 Advantages & Awards 2015 */}
      <CompanyIntro />

      {/* 4. Complete Cylinder Capacities Showcase (2kg to 33kg) */}
      <CylinderCapacitiesShowcase onOpenEnquiry={openEnquiry} />

      {/* 5. Products Showcase (Appliances & Accessories) */}
      <ProductsShowcase products={products} onOpenEnquiry={openEnquiry} />

      {/* 6. Kwality Gas Water Heater Dedicated Section */}
      <GasWaterHeaterShowcase onOpenEnquiry={openEnquiry} />

      {/* 7. Plant Infrastructure & Capacity (3 Plants, 30,000 MTPA, 8,000 Cylinders/day) */}
      <PlantInfrastructureSection />

      {/* 8. Four Core Services Pillars */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Core Service Commitments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Engineering Support & Uninterrupted Supply
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              The driving force behind Kwality Gas is our uncompromising emphasis on safety compliance, certified cylinder weights, and superior customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-100">
                    {getServiceIcon(srv.icon)}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-[#1769AA] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.fullContent || srv.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1769AA] hover:text-[#F28C28] transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Dynamic Price List Preview (Karnataka & Tamil Nadu) */}
      <PriceTablePreview initialStates={priceStates} onOpenEnquiry={openEnquiry} />

      {/* 10. Verified Customer Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 11. Safety Features & Gas Leak Procedures */}
      <HomeSafetySection />

      {/* 12. Bottom Enquiry CTA Strip */}
      <section className="bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Partner with Kwality Gas?
            </h3>
            <p className="text-sm text-slate-200 max-w-xl">
              Get in touch with our commercial and domestic marketing desks for express cylinder delivery, institutional rates, or pipeline manifold installation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openEnquiry("DOMESTIC")}
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
            >
              Domestic Connection
            </button>
            <button
              onClick={() => openEnquiry("COMMERCIAL")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Commercial / Industrial Quote
            </button>
            <a
              href="tel:+918023400459"
              className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white px-3 py-2 font-semibold"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Office: +91 80 2340 0459</span>
            </a>
          </div>
        </div>
      </section>

      {/* Shared Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}
