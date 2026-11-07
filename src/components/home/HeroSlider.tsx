"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
  Factory,
  PhoneCall,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface HeroSliderProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function HeroSlider({ onOpenEnquiry }: HeroSliderProps) {
  const slides = [
    {
      title: "Pure Blue Flame, Highest Fuel Economy",
      subtitle: "Kwality Gas – A Connection for Every Household & Commercial Enterprise",
      description: "Grade 1 Rated LPG bottling enterprise with 30,000 MTPA storage, 8,000 cylinders/day throughput, and guaranteed on-time doorstep delivery.",
      image: "/images/original/ban1-1.png",
      tag: "GRADE 1 RATED LPG COMPANY • CARE MDRA AUDITED",
      primaryCta: { text: "Book Domestic Connection", type: "DOMESTIC" as const },
      secondaryLink: { text: "Check Live Rates", href: "/price-list" },
    },
    {
      title: "Heavy-Duty Cylinders for Commercial & Industrial Needs",
      subtitle: "Uninterrupted Fuel Security Across Karnataka & Tamil Nadu",
      description: "High-performance 33kg LOT/VOT, 21kg, and 17kg cylinders engineered for hotels, restaurants (HORECA), bakeries, and industrial furnaces.",
      image: "/images/original/new-slide.png",
      tag: "3 PLANTS: HOSUR • CHENNAI • DHARWAD",
      primaryCta: { text: "Request Commercial Quote", type: "COMMERCIAL" as const },
      secondaryLink: { text: "View Cylinders Range", href: "/cylinders" },
    },
    {
      title: "Kwality Gas Water Heater (Instant Gas Geyser)",
      subtitle: "Safe, Continuous Hot Water Powered by Clean LPG",
      description: "Built with 8 advanced safety devices, low water pressure starting, double ignition pulse, and seasonal winter-summer gas saving switch.",
      image: "/images/original/p7.jpg",
      tag: "8 BUILT-IN SAFETY DEVICES • 12 MONTHS WARRANTY",
      primaryCta: { text: "Order Gas Geyser", type: "DOMESTIC" as const },
      secondaryLink: { text: "Explore Water Heater", href: "/gas-water-heater" },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full bg-[#102A43] overflow-hidden">
      {/* Background Slides Container */}
      <div className="relative h-[580px] sm:h-[640px] md:h-[700px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Dark Vignette Gradient */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102A43]/95 via-[#102A43]/85 to-[#102A43]/45" />
            </div>

            {/* Slide Text Content */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-6">
                  {/* Tag badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-black tracking-wider uppercase backdrop-blur-xs border border-white/10">
                    <Flame className="w-3.5 h-3.5 fill-[#F28C28]" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-xl font-bold text-[#F28C28]">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Call-to-action buttons */}
                  <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenEnquiry(slide.primaryCta.type)}
                      className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <Link
                      href={slide.secondaryLink.href}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider backdrop-blur-xs transition-all"
                    >
                      <span>{slide.secondaryLink.text}</span>
                    </Link>

                    <a
                      href="tel:+917899787101"
                      className="hidden sm:inline-flex items-center gap-2 text-white hover:text-[#F28C28] px-3 py-2 text-xs font-bold transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-[#F28C28]" />
                      <span>+91 78997 87101</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-xs border border-white/15 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 px-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-[#F28C28]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-xs border border-white/15 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Key Value Bar */}
      <div className="relative z-30 bg-[#0B1D2F] border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 text-white text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold">100% Tested Tare Weight</strong>
              <span className="text-slate-400 text-[11px]">Digital scale verified</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Factory className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold">3 Regional Bottling Hubs</strong>
              <span className="text-slate-400 text-[11px]">Hosur, Chennai & Dharwad</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold">Grade 1 Rated by CARE</strong>
              <span className="text-slate-400 text-[11px]">Highest safety audit score</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold">Pure Blue Flame Fuel</strong>
              <span className="text-slate-400 text-[11px]">Soot-free & clean burning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
