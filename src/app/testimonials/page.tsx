import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Star, Quote, CheckCircle2, MessageSquare, ArrowRight, Building, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Verified Reviews | Kwality Gas",
  description:
    "Read real testimonials from restaurants, distributors, manufacturing plants, laboratories, and domestic customers who trust Kwality Gas for prompt on-time deliveries and certified tare weight.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TestimonialsPage() {
  let dbTestimonials: any[] = [];
  try {
    dbTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("TestimonialsPage data fetch error:", err);
  }

  const defaultTestimonials = [
    {
      id: "t1",
      clientName: "Sunitha K.",
      designation: "Home Customer",
      companyName: "Vijayanagar Resident",
      quote: "Kwality Gas has been a dependable companion for our kitchen. The gas delivery is exceptionally prompt, and the blue flame cooks food without leaving soot on my vessels.",
      rating: 5,
      location: "Bangalore, Karnataka",
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
      location: "Indiranagar, Bangalore",
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
      location: "Hosur, Tamil Nadu",
      avatarUrl: "/images/original/testi_3.jpg",
      isVerified: true,
    },
    {
      id: "t4",
      clientName: "Manjunath B.",
      designation: "Operations Head",
      companyName: "Precision Engineering",
      quote: "We use 33kg LOT cylinders for our powder coating curing oven. The uniform thermal output and zero pressure drop have improved our coating finish significantly.",
      rating: 5,
      location: "Dharwad, Karnataka",
      avatarUrl: "/images/original/testi_4.jpg",
      isVerified: true,
    },
    {
      id: "t5",
      clientName: "S. Ramesh",
      designation: "Plant Manager",
      companyName: "Apex Metal Coating",
      quote: "Kwality Gas team assisted us with PESO compliant manifold piping. Their certified engineers conducted thorough safety inspections and provided complete test certificates.",
      rating: 5,
      location: "Chennai, Tamil Nadu",
      avatarUrl: "/images/original/testi_5.jpg",
      isVerified: true,
    },
    {
      id: "t6",
      clientName: "Dr. Priya Rao",
      designation: "Laboratory Director",
      companyName: "Bio-Pharma Analytical Labs",
      quote: "We require ultra-clean LPG for our precision analytical burners. Kwality Gas delivers factory-sealed cylinders with zero impurities and exact certified tare weight.",
      rating: 5,
      location: "Electronic City, Bangalore",
      avatarUrl: "/images/original/testi_6.jpg",
      isVerified: true,
    },
    {
      id: "t7",
      clientName: "Venkatesh G.",
      designation: "Managing Partner",
      companyName: "Sri Krishna Grand Hotels",
      quote: "Operating multiple kitchen outlets requires reliable logistics. Kwality Gas provides scheduled daily deliveries and dedicated account billing. Best LPG partner in South India.",
      rating: 5,
      location: "Bangalore & Mysore",
      avatarUrl: "/images/original/testi_07.jpg",
      isVerified: true,
    },
    {
      id: "t8",
      clientName: "Farhan Ahmed",
      designation: "Executive Chef",
      companyName: "Royal Banquet & Caterers",
      quote: "The 17kg and 15kg commercial cylinders are easy for our banquet crew to shift during outdoor live food stalls. Excellent flame quality and immediate customer care response.",
      rating: 5,
      location: "Vellore & Hosur",
      avatarUrl: "/images/original/testi_09.jpg",
      isVerified: true,
    },
  ];

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Real Customer Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What Our Clients Say About Kwality Gas
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Hear from restaurant directors, manufacturing heads, commercial bakeries, and domestic households across Karnataka and Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Testimonials Grid (All 8 verified reviews) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Avatar, Name & Verified Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 bg-slate-100 flex-shrink-0">
                      <Image
                        src={t.avatarUrl || "/images/original/testi_1.jpg"}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#1769AA] transition-colors">
                        {t.clientName}
                      </h3>
                      <p className="text-xs text-[#1769AA] font-semibold">
                        {t.designation} {t.companyName ? `• ${t.companyName}` : ""}
                      </p>
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-slate-200 group-hover:text-[#F28C28]/40 transition-colors shrink-0" />
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom location & verified badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>{t.location || "South India"}</span>
                </span>
                {t.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Customer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Join Thousands of Satisfied Consumers</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Experience the reliability of pure blue flame cooking, exact net weight verification, and friendly customer care.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all"
            >
              Get In Touch
            </Link>
            <Link
              href="/price-list"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3 rounded-xl text-xs font-bold transition-all"
            >
              View Refill Prices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
