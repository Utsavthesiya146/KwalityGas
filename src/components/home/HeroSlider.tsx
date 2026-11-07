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
  Home,
  Briefcase,
  Building2,
  CheckCircle2,
  BadgeCheck,
  Send,
} from "lucide-react";

interface HeroSliderProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function HeroSlider({ onOpenEnquiry }: HeroSliderProps) {
  const slides = [
    {
      title: "Pure Blue Flame, Highest Fuel Economy",
      tagline: "Industrial-Grade LPG Bottling & Doorstep Delivery Across South India",
      description: "ISO 9001:2015 certified, Grade 1 Rated LPG bottling enterprise with 30,000 MTPA storage, 8,000 cylinders/day throughput, and guaranteed on-time cylinder refills.",
      image: "/images/original/kwalit.jpg",
      tag: "GRADE 1 RATED LPG COMPANY • CARE MDRA AUDITED",
      primaryCta: { text: "Book Domestic Connection", type: "DOMESTIC" as const },
      secondaryLink: { text: "Check Live Rates", href: "/price-list" },
    },
    {
      title: "Heavy-Duty 33kg LOT & 21kg Commercial LPG",
      tagline: "Uninterrupted Fuel Security for HORECA & Industrial Furnaces",
      description: "Custom-engineered multi-cylinder manifold systems, automatic changeover valves, and high-vaporization VOT/LOT solutions for high-volume commercial kitchens and heat treatment plants.",
      image: "/images/original/new-slide.png",
      tag: "3 BOTTLING PLANTS: HOSUR • CHENNAI • DHARWAD",
      primaryCta: { text: "Request Commercial Quote", type: "COMMERCIAL" as const },
      secondaryLink: { text: "View Cylinders Range", href: "/cylinders" },
    },
    {
      title: "Instant Gas Water Heaters with 8 Safety Features",
      tagline: "Safe, Fast, & Eco-Friendly Hot Water Powered by Clean LPG",
      description: "Engineered with automatic 20-minute timer protection, low water pressure ignition pulse, dry burning protection, and seasonal winter/summer gas-saving switch.",
      image: "/images/original/slide1.jpg",
      tag: "8 BUILT-IN SAFETY DEVICES • 12 MONTHS WARRANTY",
      primaryCta: { text: "Order Gas Geyser", type: "DOMESTIC" as const },
      secondaryLink: { text: "Explore Water Heater", href: "/gas-water-heater" },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-[#081624] overflow-hidden text-white">
      {/* Background Slides Container */}
      <div className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] w-full flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Controlled Cinematic Grade */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center filter brightness-[0.82] contrast-[1.08] scale-100 transition-transform duration-10000 ease-out"
              />
              {/* Dual Gradient Overlay: Dark navy on the left for crisp text readability; subtle fade to the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#081624]/98 via-[#081624]/85 to-[#081624]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081624] via-transparent to-black/30" />
            </div>
          </div>
        ))}

        {/* Content Container (2-Column Hero on Large Screens) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Description & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              
              {/* Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F28C28] text-xs font-black tracking-wider uppercase backdrop-blur-md border border-white/15 shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-[#F28C28]" />
                <span>{slides[currentSlide].tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-sm">
                {slides[currentSlide].title}
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-xl font-extrabold text-[#F28C28] leading-snug">
                {slides[currentSlide].tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal">
                {slides[currentSlide].description}
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry(slides[currentSlide].primaryCta.type)}
                  className="inline-flex items-center gap-2.5 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <span>{slides[currentSlide].primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href={slides[currentSlide].secondaryLink.href}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xs transition-all hover:border-white/40"
                >
                  <span>{slides[currentSlide].secondaryLink.text}</span>
                </Link>

                <a
                  href="tel:+917899787101"
                  className="inline-flex items-center gap-2 text-white hover:text-[#F28C28] px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#F28C28]" />
                  <span>24/7 Hotline: +91 78997 87101</span>
                </a>
              </div>

              {/* 3-Segment Quick Triggers */}
              <div className="pt-2 flex items-center gap-2 flex-wrap text-xs text-slate-300">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Instant Booking:</span>
                <button
                  onClick={() => onOpenEnquiry("DOMESTIC")}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1 border border-white/10"
                >
                  <Home className="w-3 h-3 text-[#F28C28]" />
                  <span>Domestic 12kg</span>
                </button>
                <button
                  onClick={() => onOpenEnquiry("COMMERCIAL")}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1 border border-white/10"
                >
                  <Briefcase className="w-3 h-3 text-blue-400" />
                  <span>Commercial 17/21kg</span>
                </button>
                <button
                  onClick={() => onOpenEnquiry("INDUSTRIAL")}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1 border border-white/10"
                >
                  <Factory className="w-3 h-3 text-emerald-400" />
                  <span>Industrial 33kg LOT</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Quick Booking & Rate Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/30 space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#1769AA] uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5 text-[#F28C28]" />
                      Direct Order Request
                    </span>
                    <h3 className="text-lg font-black text-[#102A43] tracking-tight mt-0.5">
                      Fast Cylinder Refill & Booking
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#F28C28] flex items-center justify-center font-bold">
                    <Send className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#F28C28] flex items-center justify-center font-black">
                        12k
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-bold">Domestic LPG Refill</strong>
                        <span className="text-slate-500 text-[11px]">Bangalore & Karnataka Doorstep</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry("DOMESTIC")}
                      className="px-3 py-1.5 rounded-lg bg-[#F28C28] text-white font-bold hover:bg-[#D9771A] transition-all"
                    >
                      Book
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1769AA] flex items-center justify-center font-black">
                        17k
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-bold">Commercial 17kg / 21kg</strong>
                        <span className="text-slate-500 text-[11px]">Hotels, Restaurants & Bakeries</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry("COMMERCIAL")}
                      className="px-3 py-1.5 rounded-lg bg-[#1769AA] text-white font-bold hover:bg-[#12538A] transition-all"
                    >
                      Quote
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                        33k
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-bold">Industrial 33kg LOT/VOT</strong>
                        <span className="text-slate-500 text-[11px]">Manifold Banks & Heat Furnaces</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry("INDUSTRIAL")}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
                    >
                      Survey
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>CARE Grade 1 Audited Enterprise</span>
                  </div>
                  <Link
                    href="/price-list"
                    className="font-bold text-[#1769AA] hover:text-[#12538A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Price Schedule</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-12 z-30 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
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
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Key Value Bar */}
      <div className="relative z-30 bg-[#06121E] border-t border-white/10 py-5 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-white text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F28C28] shrink-0 border border-white/10">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-black text-white text-xs sm:text-sm">CARE Grade 1 Rating</strong>
              <span className="text-slate-400 text-[11px]">Highest LPG Safety & Credit Standard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#1769AA] shrink-0 border border-white/10">
              <Factory className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-black text-white text-xs sm:text-sm">30,000 MTPA Storage</strong>
              <span className="text-slate-400 text-[11px]">3 Plants: Hosur, Chennai, Dharwad</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-black text-white text-xs sm:text-sm">8,000 Cylinders / Day</strong>
              <span className="text-slate-400 text-[11px]">Pure Blue Flame Fuel Economy</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0 border border-white/10">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-black text-white text-xs sm:text-sm">Geneva Quality Era 2015</strong>
              <span className="text-slate-400 text-[11px]">International Business Excellence</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
