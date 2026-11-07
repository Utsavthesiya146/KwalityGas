"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Images, Eye, X, Flame, Sparkles, Factory, ShieldCheck, Tag } from "lucide-react";
import { sanitizeImageUrl } from "@/lib/sanitize-image";

interface GalleryClientProps {
  categories: any[];
  initialImages: any[];
}

export default function GalleryClient({ categories, initialImages }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeImage, setActiveImage] = useState<any | null>(null);

  const defaultImages = [
    { id: "img-1", title: "Bulk Storage & Bottling Plant", imageUrl: "/images/corporate/hero-industrial-lpg.jpg", categoryName: "Plants & Facilities", description: "30,000 MTPA bulk storage facility with mounded LPG bullets." },
    { id: "img-2", title: "Automated Carousel Bottling", imageUrl: "/images/corporate/hero-bottling-plant.jpg", categoryName: "Plants & Facilities", description: "High-speed electronic carousel bottling 8,000 cylinders per day." },
    { id: "img-3", title: "33kg Industrial LOT Cylinders", imageUrl: "/images/corporate/product-cylinder-33kg.jpg", categoryName: "Cylinders Range", description: "Heavy-duty 33kg liquid off-take cylinders ready for dispatch." },
    { id: "img-4", title: "21kg Commercial High-Output Cylinders", imageUrl: "/images/corporate/hero-commercial-lpg.jpg", categoryName: "Cylinders Range", description: "Commercial cylinders engineered for 24/7 restaurant kitchens." },
    { id: "img-5", title: "17kg Commercial Standard Cylinders", imageUrl: "/images/corporate/product-cylinder-17kg.jpg", categoryName: "Cylinders Range", description: "Standard commercial cylinders for bakeries and catering." },
    { id: "img-6", title: "Kwality Gas Water Heater (Geyser)", imageUrl: "/images/corporate/product-gas-geyser.jpg", categoryName: "Appliances", description: "Instant gas water geyser with 8 safety protection devices." },
    { id: "img-7", title: "Domestic Regulators & Accessories", imageUrl: "/images/corporate/hero-safety-standards.jpg", categoryName: "Accessories", description: "Certified click-on domestic regulators with self-closing check valve." },
    { id: "img-8", title: "Commercial Manifold Bank Infrastructure", imageUrl: "/images/corporate/service-manifold-bank.jpg", categoryName: "Accessories", description: "Heavy seamless manifold headers with multi-cylinder connection pigtails." },
    { id: "img-9", title: "IS 9573 Steel Braided Rubber Hose", imageUrl: "/images/corporate/hero-safety-standards.jpg", categoryName: "Accessories", description: "Rodent-proof, flame-retardant high pressure gas tubing." },
    { id: "img-10", title: "Quality ERA Award 2015 (Geneva)", imageUrl: "/images/brand/kwality-gas-award.jpg", categoryName: "Awards & Events", description: "Century International Quality ERA Award presented in Geneva, Switzerland." },
    { id: "img-11", title: "LPG Express Transport Logistics", imageUrl: "/images/corporate/service-delivery-truck.jpg", categoryName: "Plants & Facilities", description: "Dedicated fleet of Kwality Gas transport trucks ensuring on-time delivery across South India." },
    { id: "img-12", title: "Comprehensive LPG Safety Inspection", imageUrl: "/images/corporate/service-safety-audit.jpg", categoryName: "Plants & Facilities", description: "Certified safety engineers conducting periodic pipeline inspections and gas leak audits." },
  ];

  const images = initialImages && initialImages.length > 0 ? initialImages : defaultImages;

  const filteredImages =
    selectedCategory === "ALL"
      ? images
      : images.filter((img) => img.categoryId === selectedCategory || img.categoryName === selectedCategory);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Images className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Photo Gallery & Infrastructure
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Explore authentic images of Kwality Gas bottling plants, cylinder capacities, water heaters, certified safety accessories, and international awards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === "ALL"
                ? "bg-[#102A43] text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            All Photos ({images.length})
          </button>

          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#102A43] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))
          ) : (
            ["Plants & Facilities", "Cylinders Range", "Appliances", "Accessories", "Awards & Events"].map((catName) => (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === catName
                    ? "bg-[#102A43] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {catName}
              </button>
            ))
          )}
        </div>

        {/* Image Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={sanitizeImageUrl(img.imageUrl, "/images/corporate/hero-bottling-plant.jpg")}
                  alt={img.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5 text-[#1769AA]" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-[#102A43]/85 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-xs">
                  {img.category?.name || img.categoryName || "Kwality Gas"}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#1769AA] transition-colors line-clamp-1">
                  {img.title}
                </h3>
                {img.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {img.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-96 sm:h-[480px] w-full bg-slate-900">
              <Image
                src={sanitizeImageUrl(activeImage.imageUrl, "/images/corporate/hero-bottling-plant.jpg")}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white space-y-1">
              <span className="text-[11px] font-extrabold uppercase text-[#F28C28] tracking-wider">
                {activeImage.category?.name || activeImage.categoryName || "Kwality Gas Gallery"}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{activeImage.title}</h3>
              {activeImage.description && (
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {activeImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
