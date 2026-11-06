"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  designation?: string | null;
  companyName: string;
  location?: string | null;
  quote: string;
  avatarUrl?: string | null;
  rating: number;
  isVerified: boolean;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-brand-blue-dark text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Happy Customers
          </h2>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm">
            Discover why leading restaurants, manufacturing plants, laboratories, and families rely on Kwality Gas
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl relative">
          <Quote className="w-16 h-16 text-brand-orange/20 absolute top-6 right-6 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Avatar Image */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-brand-orange shrink-0 bg-slate-800 shadow-xl">
              <Image
                src={current.avatarUrl || "/images/original/testi_1.jpg"}
                alt={current.clientName}
                fill
                className="object-cover"
              />
            </div>

            {/* Testimonial Quote & Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                {current.isVerified && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Customer
                  </span>
                )}
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed italic">
                “{current.quote}”
              </p>

              {/* Author */}
              <div>
                <h4 className="text-lg font-black text-white">{current.companyName}</h4>
                <p className="text-xs text-brand-orange font-semibold">
                  {current.clientName} {current.designation && `• ${current.designation}`}
                </p>
                {current.location && (
                  <p className="text-[11px] text-slate-400">{current.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Review {activeIndex + 1} of {testimonials.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-full bg-white/10 hover:bg-brand-orange text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-full bg-white/10 hover:bg-brand-orange text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* View All Testimonials CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg"
          >
            <span>Read All Verified Client Testimonials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

