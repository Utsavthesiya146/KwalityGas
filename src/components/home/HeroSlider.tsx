"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
  Factory,
  PhoneCall,
  Scale,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Home,
  Check,
} from "lucide-react";

export interface HeroSlideData {
  id?: string;
  slideKey?: string | null;
  title: string;
  subtitle?: string | null;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string | null;
  secondaryLink?: string | null;
  proofPoint1?: string | null;
  proofPoint2?: string | null;
  proofPoint3?: string | null;
  displayOrder?: number;
  isActive?: boolean;
}

interface HeroSliderProps {
  slides?: HeroSlideData[];
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
  autoplayInterval?: number; // milliseconds, default 5500
}

const DEFAULT_SLIDES: HeroSlideData[] = [
  {
    slideKey: "domestic",
    subtitle: "Domestic LPG Solutions",
    title: "Reliable LPG Supply Engineered for Every Household",
    description:
      "Clean, soot-free cooking energy for modern kitchens. Certified 12kg household cylinders, 5.5kg compact, and 4kg Cook & Light cylinders with guaranteed tare weight and tamper-evident safety seals.",
    imageUrl: "/images/corporate/hero-domestic-lpg.jpg",
    ctaText: "Book Domestic Connection",
    ctaLink: "MODAL_DOMESTIC",
    secondaryText: "View Cylinders",
    secondaryLink: "/cylinders",
    proofPoint1: "100% Tested Tare Weight",
    proofPoint2: "Tamper-Evident Safety Seals",
    proofPoint3: "Prompt Doorstep Delivery",
    displayOrder: 1,
    isActive: true,
  },
  {
    slideKey: "commercial",
    subtitle: "Commercial LPG Solutions",
    title: "High-Calorific Clean LPG for Hotels, Bakeries & Commercial Kitchens",
    description:
      "Continuous high-pressure flame engineered for heavy commercial burners, tandoors, and catering operations. Reliable bulk delivery in 17kg and 21kg cylinders with zero soot.",
    imageUrl: "/images/corporate/hero-commercial-lpg.jpg",
    ctaText: "Request Commercial Quote",
    ctaLink: "MODAL_COMMERCIAL",
    secondaryText: "Commercial Range",
    secondaryLink: "/commercial",
    proofPoint1: "Zero Kitchen Soot",
    proofPoint2: "Uninterrupted Delivery Supply",
    proofPoint3: "17kg & 21kg High Heat",
    displayOrder: 2,
    isActive: true,
  },
  {
    slideKey: "industrial",
    subtitle: "Heavy Industrial Energy",
    title: "Bulk LPG Storage & Liquid Off-Take Systems for Heavy Industry",
    description:
      "Specialized 33kg LOT (Liquid Off-Take) & VOT systems with automatic changeover manifolds. Lower operational fuel costs and zero sulphur emissions for foundries and manufacturing plants.",
    imageUrl: "/images/corporate/hero-industrial-lpg.jpg",
    ctaText: "Explore Industrial Solutions",
    ctaLink: "MODAL_INDUSTRIAL",
    secondaryText: "Industrial Systems",
    secondaryLink: "/industrial",
    proofPoint1: "33kg LOT & VOT Cylinders",
    proofPoint2: "Automatic Manifold Banks",
    proofPoint3: "Sulphur-Free Industrial Heat",
    displayOrder: 3,
    isActive: true,
  },
  {
    slideKey: "infrastructure",
    subtitle: "Verified Bottling Infrastructure",
    title: "3 Modern Bottling Hubs with 30,000 MTPA Bulk Storage",
    description:
      "Showcasing verified bottling facilities in Hosur, Chennai, and Dharwad. Operating with 8,000 cylinders/day throughput, automated carousel filling, and PESO safety compliance.",
    imageUrl: "/images/corporate/hero-bottling-plant.jpg",
    ctaText: "Explore Our Infrastructure",
    ctaLink: "/group-company",
    secondaryText: "Plant Facilities",
    secondaryLink: "/gallery",
    proofPoint1: "30,000 MTPA Bulk Storage",
    proofPoint2: "8,000 Cylinders / Day",
    proofPoint3: "PESO & SMPV Certified",
    displayOrder: 4,
    isActive: true,
  },
  {
    slideKey: "safety",
    subtitle: "Safety, Quality & Reliability",
    title: "Grade 1 Rated CARE Certification with Uncompromising Safety Standards",
    description:
      "Every cylinder undergoes rigorous 5-point hydrostatic, tare weight, and valve leakage inspections before dispatch. Certified by CARE MDRA and honored with the International Star for Quality.",
    imageUrl: "/images/corporate/hero-safety-standards.jpg",
    ctaText: "Explore Safety Standards",
    ctaLink: "/safety-features",
    secondaryText: "Safety Protocols",
    secondaryLink: "/safety-devices",
    proofPoint1: "Grade 1 CARE MDRA Rating",
    proofPoint2: "5-Point Valve & Leak Checks",
    proofPoint3: "24/7 Priority Emergency Line",
    displayOrder: 5,
    isActive: true,
  },
];

export default function HeroSlider({
  slides: propSlides,
  onOpenEnquiry,
  autoplayInterval = 5500,
}: HeroSliderProps) {
  const activeSlides = (propSlides && propSlides.length > 0 ? propSlides : DEFAULT_SLIDES).filter(
    (s) => s.isActive !== false
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused || prefersReducedMotion || activeSlides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, prefersReducedMotion, activeSlides.length, autoplayInterval, goToNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Keep paused during drag
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold 50px
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }

    setTouchStart(null);
    setIsPaused(false);
  };

  // Execute CTA action
  const handleCtaClick = (link: string) => {
    if (link === "MODAL_DOMESTIC") {
      onOpenEnquiry("DOMESTIC");
    } else if (link === "MODAL_COMMERCIAL") {
      onOpenEnquiry("COMMERCIAL");
    } else if (link === "MODAL_INDUSTRIAL") {
      onOpenEnquiry("INDUSTRIAL");
    }
  };

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <section
      className="relative w-full bg-[#0A192F] text-white overflow-hidden select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Kwality Gas Corporate Overview Slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Ambient Lighting Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Main 50/50 Balanced Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-16 min-h-[580px] lg:min-h-[520px] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Corporate Narrative & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            {/* Top Pill Bar with Category Badge & Slide Counter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/15">
                <Flame className="w-3.5 h-3.5 fill-[#F28C28] shrink-0" />
                <span>{currentSlide.subtitle || "Grade 1 Rated • CARE MDRA Certified"}</span>
              </div>

              {/* Slide Counter Badge */}
              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span className="text-white">0{currentIndex + 1}</span>
                <span>/</span>
                <span>0{activeSlides.length}</span>
              </div>
            </div>

            {/* Main Headline with Smooth Transition */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] break-words transition-opacity duration-300 min-h-[64px] sm:min-h-[88px] lg:min-h-[110px] flex items-center">
              {currentSlide.title}
            </h1>

            {/* Short Supporting Description */}
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl break-words min-h-[48px] sm:min-h-[60px] lg:min-h-[72px]">
              {currentSlide.description}
            </p>

            {/* Two Clear CTA Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
              {currentSlide.ctaLink.startsWith("MODAL_") ? (
                <button
                  type="button"
                  onClick={() => handleCtaClick(currentSlide.ctaLink)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={currentSlide.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {currentSlide.secondaryText && currentSlide.secondaryLink && (
                <Link
                  href={currentSlide.secondaryLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
                >
                  <span>{currentSlide.secondaryText}</span>
                </Link>
              )}
            </div>

            {/* Helpline Link */}
            <div className="pt-1">
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Helpline: +91 78997 87101</span>
              </a>
            </div>

            {/* 3 Quick Inline Proof Points */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 text-xs text-slate-300">
              {currentSlide.proofPoint1 && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{currentSlide.proofPoint1}</span>
                </div>
              )}
              {currentSlide.proofPoint2 && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{currentSlide.proofPoint2}</span>
                </div>
              )}
              {currentSlide.proofPoint3 && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{currentSlide.proofPoint3}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: High-Quality LPG Photograph with Overlaid Controls (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl aspect-[4/3] bg-slate-900 group">
              {/* Slide Images */}
              {activeSlides.map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentIndex
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-transparent to-transparent" />
                </div>
              ))}

              {/* Previous / Next Arrow Controls floating on the image */}
              <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A192F]/70 hover:bg-[#F28C28] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A192F]/70 hover:bg-[#F28C28] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#0A192F]/85 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/15 text-xs z-20">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white flex items-center gap-1.5 truncate">
                    <Factory className="w-3.5 h-3.5 text-[#F28C28] shrink-0" />
                    <span className="truncate">{currentSlide.subtitle || "Kwality Gas Bottlers"}</span>
                  </span>
                  <span className="text-[#F28C28] font-bold shrink-0 ml-2">
                    Slide {currentIndex + 1} of {activeSlides.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Slider Indicator Controls below image on mobile/desktop */}
            <div className="mt-4 flex items-center justify-between gap-4">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? "w-8 h-2.5 bg-[#F28C28]"
                        : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>

              {/* Pause / Autoplay Indicator & Slide Title */}
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">
                  {isPaused ? "Paused on hover" : "Autoplay active"}
                </span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="font-mono text-white text-[10px] uppercase font-bold">
                  {currentSlide.slideKey || `Slide ${currentIndex + 1}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Key Value Bar */}
      <div className="relative z-30 bg-[#081624] border-t border-white/10 py-3.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-white text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28] shrink-0">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">100% Certified Tare Weight</strong>
              <span className="text-slate-400 text-[11px]">Zero-tolerance digital verification</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Factory className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">3 Modern Bottling Hubs</strong>
              <span className="text-slate-400 text-[11px]">Hosur • Chennai • Dharwad</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">Grade 1 Rating by CARE</strong>
              <span className="text-slate-400 text-[11px]">Highest safety audit score</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="block font-bold text-slate-100">Pure Blue-Flame LPG</strong>
              <span className="text-slate-400 text-[11px]">Clean burning with zero soot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
