import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Star, Quote, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Partner Reviews | Kwality Gas",
  description:
    "Read real testimonials from restaurants, distributors, manufacturing plants, laboratories, and domestic customers who trust Kwality Gas for prompt on-time deliveries.",
};

export const revalidate = 0;

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Real Customer Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            WHAT OUR CLIENTS SAY
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Hear from our channel partners, restaurant directors, manufacturing managing directors, and domestic households.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-cardHover transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <Quote className="w-20 h-20 text-slate-100 absolute top-4 right-4 pointer-events-none group-hover:text-orange-50 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* Star Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testi.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {testi.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Review
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                  “{testi.quote}”
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4 relative z-10">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-orange shrink-0 bg-slate-100">
                  <Image
                    src={testi.avatarUrl || "/images/original/testi_1.jpg"}
                    alt={testi.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-brand-blue-dark">{testi.companyName}</h3>
                  <p className="text-xs font-semibold text-brand-orange">
                    {testi.clientName} {testi.designation ? `(${testi.designation})` : ""}
                  </p>
                  {testi.location && (
                    <p className="text-[11px] text-slate-400">{testi.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-brand-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl font-black">Experience the Kwality Gas Blue Flame Difference</h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Join thousands of satisfied restaurants, factory plants, and homes enjoying timely doorstep deliveries.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow transition-all"
            >
              <span>Get Connected With Kwality Gas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

