"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/home/HeroSlider";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PriceTablePreview from "@/components/home/PriceTablePreview";
import CompanyIntro from "@/components/home/CompanyIntro";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { Truck, ShieldCheck, Leaf, Flame, ArrowRight, Phone, CheckCircle2 } from "lucide-react";

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
      case "Truck": return <Truck className="w-6 h-6 text-brand-orange" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-brand-orange" />;
      case "Leaf": return <Leaf className="w-6 h-6 text-brand-orange" />;
      default: return <Flame className="w-6 h-6 text-brand-orange" />;
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

      {/* 4. Products Showcase & Gas Water Heater with 8 Specifications */}
      <ProductsShowcase products={products} onOpenEnquiry={openEnquiry} />

      {/* 5. Four Core Services Pillars */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-surface text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>Core Service Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-blue-dark tracking-tight">
              Kwality Gas Services & Commitments
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              The main force that drives Kwality Gas is our uncompromising emphasis on quality products and superior customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-cardHover transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getServiceIcon(srv.icon)}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.fullContent || srv.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors"
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

      {/* 6. Dynamic Price List Preview (Karnataka & Tamil Nadu) */}
      <PriceTablePreview initialStates={priceStates} onOpenEnquiry={openEnquiry} />

      {/* 7. Verified Customer Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8. Bottom Enquiry CTA Strip */}
      <section className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-dark text-white py-14 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Connect with Kwality Gas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get in touch with our marketing desk for domestic refills, commercial rates, or industrial cylinder banks.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openEnquiry("DOMESTIC")}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all"
            >
              Domestic Connection
            </button>
            <button
              onClick={() => openEnquiry("COMMERCIAL")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-sm transition-all"
            >
              Commercial / Industrial Quote
            </button>
            <a
              href="tel:+918023400459"
              className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white px-3 py-2 font-semibold"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Office: +91 - 80 - 2340 0459</span>
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

