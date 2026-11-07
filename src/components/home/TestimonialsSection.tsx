"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: any[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const defaultTestimonials = [
    {
      id: "t1",
      clientName: "Sunitha K.",
      designation: "Home Customer",
      companyName: "Vijayanagar Resident",
      quote: "Kwality Gas has been a dependable companion for our kitchen. The gas delivery is exceptionally prompt, and the blue flame cooks food without leaving soot on my vessels.",
      rating: 5,
      avatarUrl: "/images/original/testi_1.jpg",
      isVerified: true,
    },
    {
      id: "t2",
      clientName: "Rajesh V.",
      designation: "Director",
      companyName: "Coastal Spice Restaurant",
      quote: "In the restaurant industry, running out of fuel during dinner rush is a nightmare. Kwality Gas ensures uninterrupted supply with their heavy 21kg commercial cylinders. Highly recommended!",
      rating: 5,
      avatarUrl: "/images/original/testi_2.jpg",
      isVerified: true,
    },
    {
      id: "t3",
      clientName: "Anand M.",
      designation: "Proprietor",
      companyName: "Anand Sweets & Bakery",
      quote: "The heat output from Kwality Gas cylinders is consistent and clean. It has lowered our fuel consumption by 15% compared to our previous supplier.",
      rating: 5,
      avatarUrl: "/images/original/testi_3.jpg",
      isVerified: true,
    },
  ];

  const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Verified Customer Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Trusted by Over 50,000 Consumers
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Authentic feedback from domestic households, restaurant owners, and industrial plant heads across South India.
            </p>
          </div>

          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:text-[#102A43] transition-colors self-start md:self-auto shrink-0"
          >
            <span>Read All Verified Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 bg-slate-100 shrink-0">
                      <Image
                        src={t.avatarUrl || "/images/original/testi_1.jpg"}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#1769AA] transition-colors">
                        {t.clientName}
                      </h3>
                      <p className="text-[11px] text-[#1769AA] font-semibold">
                        {t.designation} {t.companyName ? `• ${t.companyName}` : ""}
                      </p>
                    </div>
                  </div>

                  <Quote className="w-7 h-7 text-slate-200 group-hover:text-[#F28C28]/40 transition-colors shrink-0" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{t.location || "Karnataka / TN"}</span>
                {t.isVerified && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Customer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
