"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, ArrowRight, ShieldCheck, Award, Factory, PhoneCall } from "lucide-react";

interface HeroSliderProps {
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function HeroSlider({ onOpenEnquiry }: HeroSliderProps) {
  const slides = [
    {
      title: "Pure Blue Flame, Highest Fuel Economy",
      subtitle: "Kwality Gas, A Connection For Every Household & Commercial Enterprise",
      description: "State-of-the-art LPG bottling with 30,000 MTPA storage, 8,000 cylinders/day throughput, and Grade 1 rated reliability.",
      image: "/images/original/ban1-1.png",
      tag: "GRADE 1 RATED LPG COMPANY",
    },
    {
      title: "Heavy-Duty Cylinders for Commercial & Industrial Needs",
      subtitle: "Uninterrupted Doorstep Gas Supply Across Karnataka & Tamil Nadu",
      description: "High-performance 33kg, 21kg, and 17kg cylinders engineered for hotels, restaurants (HORECA), bakeries, and industrial furnaces.",
      image: "/images/original/new-slide.png",
      tag: "3 PLANTS: HOSUR • CHENNAI • DHARWAD",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full bg-slate-900 overflow-hidden">
      {/* Background Slides */}
      <div className="relative h-[560px] sm:h-[620px] md:h-[680px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/85 to-brand-blue-dark/40" />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold tracking-wider uppercase">
                    <Flame className="w-3.5 h-3.5 fill-brand-orange" />
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl font-medium text-slate-200 leading-snug">
                    {slide.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Hero CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenEnquiry("DOMESTIC")}
                      className="flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orange-flame hover:brightness-110 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
                    >
                      <Flame className="w-4 h-4 fill-white" />
                      <span>Book Cylinder Refill</span>
                    </button>

                    <Link
                      href="/price-list"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-sm backdrop-blur-sm transition-all"
                    >
                      <span>Check Price List</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href="tel:+917899787101"
                      className="hidden sm:flex items-center gap-2 text-slate-200 hover:text-white text-xs font-semibold px-3 py-3"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <span>Helpline: +91 78997 87101</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 sm:bottom-28 right-8 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-8 bg-brand-orange" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Corporate Highlights Bar */}
      <div className="relative z-30 bg-brand-blue border-t border-brand-blue-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2.5 rounded-xl bg-white/10 text-brand-orange shrink-0">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">30,000</p>
                <p className="text-xs text-slate-300 font-medium">MTPA Storage Facility</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start pt-4 md:pt-0 md:pl-6">
              <div className="p-2.5 rounded-xl bg-white/10 text-amber-400 shrink-0">
                <Flame className="w-6 h-6 fill-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">8,000</p>
                <p className="text-xs text-slate-300 font-medium">Cylinders / Day Bottling</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start pt-4 md:pt-0 md:pl-6">
              <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">3 Plants</p>
                <p className="text-xs text-slate-300 font-medium">Hosur • Chennai • Dharwad</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start pt-4 md:pt-0 md:pl-6">
              <div className="p-2.5 rounded-xl bg-white/10 text-blue-300 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">35+ Years</p>
                <p className="text-xs text-slate-300 font-medium">Industrial Group Heritage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

