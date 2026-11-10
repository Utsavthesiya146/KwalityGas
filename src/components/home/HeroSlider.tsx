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
  Pause,
  Play,
  Sparkles,
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

const SLIDE_NAV_LABELS = [
  { key: "domestic", label: "Domestic LPG", short: "Domestic" },
  { key: "commercial", label: "Commercial Kitchens", short: "Commercial" },
  { key: "industrial", label: "Heavy Industry", short: "Industrial" },
  { key: "infrastructure", label: "Bottling Plants", short: "Plants" },
  { key: "safety", label: "Safety & Quality", short: "Safety" },
];

export default function HeroSlider({
  slides: propSlides,
  onOpenEnquiry,
  autoplayInterval = 6000,
}: HeroSliderProps) {
  const activeSlides = (propSlides && propSlides.length > 0 ? propSlides : DEFAULT_SLIDES).filter(
    (s) => s.isActive !== false
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check reduced motion preference
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

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
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
    <div className="w-full relative bg-[#040A12] text-white overflow-hidden">
      {/* =========================================================================
          HERO STAGE: FULL-WIDTH CINEMATIC IMMERSIVE CANVAS
          ========================================================================= */}
      <section
        className="relative w-full min-h-[660px] sm:min-h-[700px] lg:min-h-[740px] xl:min-h-[780px] flex flex-col justify-between overflow-hidden select-none outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Kwality Gas Corporate Overview Slideshow"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* -----------------------------------------------------------------------
            BACKGROUND LAYER: PHOTOGRAPHIC BACKDROPS WITH DYNAMIC CROSS-FADE
            ----------------------------------------------------------------------- */}
        <div className="absolute inset-0 z-0">
          {activeSlides.map((slide, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={slide.id || slide.slideKey || idx}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isCurrent
                    ? "opacity-100 scale-100 z-10 pointer-events-auto"
                    : "opacity-0 scale-105 z-0 pointer-events-none"
                }`}
                aria-hidden={!isCurrent}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center lg:object-[center_right] select-none"
                  sizes="100vw"
                  quality={90}
                />
              </div>
            );
          })}

          {/* ART-DIRECTED CINEMATIC SCRIMS & GRADIENTS */}
          {/* 1. Desktop Horizontal Editorial Scrim (Deep solid dark on text side, crystal clear on photography side) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, #040A12 0%, #040A12 36%, rgba(4,10,18,0.92) 50%, rgba(4,10,18,0.65) 66%, rgba(4,10,18,0.2) 85%, rgba(4,10,18,0.05) 100%)",
            }}
          />

          {/* 2. Tablet / Mobile Scrim (Vertical gradient to guarantee flawless text contrast while keeping photo visible) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,10,18,0.94) 0%, rgba(4,10,18,0.85) 45%, rgba(4,10,18,0.7) 70%, rgba(4,10,18,0.95) 100%)",
            }}
          />

          {/* 3. Subtle Top Vignette for seamless header blending */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#040A12] via-[#040A12]/60 to-transparent z-20 pointer-events-none" />

          {/* 4. Subtle Bottom Vignette for seamless dock & metrics bar blending */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#040A12] via-[#040A12]/80 to-transparent z-20 pointer-events-none" />

          {/* 5. Brand Warmth Glow Ambient Accent (Very subtle, high-end energy feel) */}
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#F28C28]/8 rounded-full blur-[120px] pointer-events-none z-20" />
        </div>

        {/* -----------------------------------------------------------------------
            FOREGROUND CONTENT LAYER: EDITORIAL TEXT & ACTION BUTTONS
            ----------------------------------------------------------------------- */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 sm:pt-16 lg:pt-20 pb-8 flex-1 flex flex-col justify-center">
          <div className="w-full lg:w-[62%] xl:w-[56%] space-y-5 sm:space-y-6">
            {/* Top Eyebrow / Category Badge & Numerical Counter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[#F28C28] text-xs font-bold tracking-wider uppercase shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-[#F28C28] shrink-0" />
                <span>{currentSlide.subtitle || "Grade 1 Rated • CARE MDRA Certified"}</span>
              </div>

              {/* Minimalist Corporate Slide Number */}
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-white/[0.05] px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
                <span className="text-[#F28C28]">0{currentIndex + 1}</span>
                <span className="text-slate-500">/</span>
                <span>0{activeSlides.length}</span>
              </div>
            </div>

            {/* Main Headline: Bold, High-Stature Energy Brand Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[72px] sm:min-h-[96px] lg:min-h-[120px] flex items-center">
              {currentSlide.title}
            </h1>

            {/* Supporting Description: Refined Width & Excellent Readability */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-sm min-h-[50px] sm:min-h-[64px] lg:min-h-[76px]">
              {currentSlide.description}
            </p>

            {/* Integrated CTA Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md">
              {currentSlide.ctaLink.startsWith("MODAL_") ? (
                <button
                  type="button"
                  onClick={() => handleCtaClick(currentSlide.ctaLink)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#F28C28] via-[#EA580C] to-[#D97706] hover:from-[#E65100] hover:to-[#C2410C] text-white px-7 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(242,140,40,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(242,140,40,0.6)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={currentSlide.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#F28C28] via-[#EA580C] to-[#D97706] hover:from-[#E65100] hover:to-[#C2410C] text-white px-7 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(242,140,40,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(242,140,40,0.6)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {currentSlide.secondaryText && currentSlide.secondaryLink && (
                <Link
                  href={currentSlide.secondaryLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-6 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                >
                  <span>{currentSlide.secondaryText}</span>
                </Link>
              )}
            </div>

            {/* Direct Official Helpline */}
            <div className="pt-1">
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors group"
              >
                <div className="w-6 h-6 rounded-full bg-[#F28C28]/20 flex items-center justify-center text-[#F28C28] group-hover:bg-[#F28C28] group-hover:text-white transition-all">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <span>Helpline: <strong className="text-white">+91 78997 87101</strong></span>
              </a>
            </div>

            {/* 3 Executive Proof Points with Verification Badges */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs text-slate-200">
              {currentSlide.proofPoint1 && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">{currentSlide.proofPoint1}</span>
                </div>
              )}
              {currentSlide.proofPoint2 && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">{currentSlide.proofPoint2}</span>
                </div>
              )}
              {currentSlide.proofPoint3 && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">{currentSlide.proofPoint3}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            FLOATING EXECUTIVE NAVIGATION ARROWS (Placed on Desktop Right)
            ----------------------------------------------------------------------- */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
          <button
            type="button"
            onClick={goToPrev}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#F28C28] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#F28C28] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* -----------------------------------------------------------------------
            BOTTOM SLIDE NAVIGATION BAR: MULTI-SEGMENT PROGRESS CONTROLS
            ----------------------------------------------------------------------- */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 pt-2">
          <div className="bg-black/40 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Desktop / Tablet Segmented Slide Tabs */}
            <div className="grid grid-cols-5 gap-2 w-full md:w-auto md:flex-1">
              {activeSlides.map((slide, idx) => {
                const isCurrent = idx === currentIndex;
                const navMeta = SLIDE_NAV_LABELS[idx] || { label: slide.slideKey || `Slide ${idx + 1}`, short: `0${idx + 1}` };
                return (
                  <button
                    key={slide.id || idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`relative text-left p-2 sm:p-2.5 rounded-xl transition-all duration-300 overflow-hidden group ${
                      isCurrent
                        ? "bg-white/[0.12] border border-white/25 shadow-md"
                        : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/5"
                    }`}
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    aria-current={isCurrent ? "true" : "false"}
                  >
                    {/* Top Progress Line Indicator */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isCurrent
                            ? "bg-[#F28C28] w-full"
                            : "bg-transparent w-0 group-hover:w-1/3 group-hover:bg-white/30"
                        }`}
                        style={{
                          transitionDuration: isCurrent && !isPaused ? `${autoplayInterval}ms` : "300ms",
                        }}
                      />
                    </div>

                    {/* Tab Text: Number & Section Title */}
                    <div className="flex items-center justify-between text-[11px] leading-tight">
                      <span className={`font-mono font-bold ${isCurrent ? "text-[#F28C28]" : "text-slate-400 group-hover:text-slate-200"}`}>
                        0{idx + 1}
                      </span>
                      <span className={`font-bold truncate hidden sm:inline ml-1.5 ${isCurrent ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {navMeta.short}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile / Tablet Compact Arrow Controls & Autoplay State */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-2 md:pt-0 md:pl-4">
              {/* Autoplay Pulse Indicator */}
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
                <span className="font-mono text-[10px] tracking-wide uppercase text-slate-400">
                  {isPaused ? "Paused" : "Live Autoplay"}
                </span>
              </div>

              {/* Mobile Prev / Next Buttons */}
              <div className="flex lg:hidden items-center gap-1.5">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F28C28] text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F28C28] text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CORPORATE CREDIBILITY BAR: 4 SOLID ENERGY PILLARS
          ========================================================================= */}
      <div className="relative z-30 bg-[#06121E] border-t border-b border-white/10 py-5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white text-xs">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 shadow-xs hover:border-[#F28C28]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#F28C28]/15 border border-[#F28C28]/30 flex items-center justify-center text-[#F28C28] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <strong className="block font-bold text-white text-xs sm:text-sm">100% Certified Tare Weight</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">Zero-tolerance digital verification</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <strong className="block font-bold text-white text-xs sm:text-sm">3 Modern Bottling Hubs</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">Hosur • Chennai • Dharwad</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 shadow-xs hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="block font-bold text-white text-xs sm:text-sm">Grade 1 Rating by CARE</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">Highest safety audit score</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 shadow-xs hover:border-sky-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <strong className="block font-bold text-white text-xs sm:text-sm">Pure Blue-Flame LPG</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">Clean burning with zero soot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
