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
      clientName: "Mr. S. Nagaraj",
      designation: "Proprietor",
      companyName: "Perfect Flame Gas",
      location: "Gandhi Bazar, Bangalore",
      quote: "Associated with Kwality for more than 15 years & have been only growing along with Kwality & has never looked back. Very innovative company with excellent product basket & customer oriented service. Because of Kwality has been able to build & maintain a big network of dealers & retain all of them for many years. Quality & on-time service is the Mantra for success of Kwality & Perfect Flame.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t2",
      clientName: "Mr. Mahadevappa",
      designation: "Proprietor",
      companyName: "Sri Venkateshwara Fine-Chem Laboratory",
      location: "Bangalore",
      quote: "Kwality marketing team is a very customer friendly team who are there 24 hours ready to serve & never lets me down. Also very competitive & dependable supply on time & every time. They value customer needs and are there always to support and take care of needs any time.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t3",
      clientName: "Quality Closures",
      designation: "Industrial Partner",
      companyName: "Quality Closures",
      location: "Machohalli, Bangalore-North",
      quote: "Very Happy with Kwality gas for their technical support & guidance & uninterrupted on time supplies & with 33 kgs cylinders, saved lot of time by not changing cylinders often & more production & no down time. Has been able to save time and get higher productivity. Supply on time and every time has been Kwality's Philosophy. 3 Cheers to Kwality team.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t4",
      clientName: "Mr. Rajendra Bhat",
      designation: "Director",
      companyName: "S L V Corner-Veg Restaurant",
      location: "Gandhi Bazar, Bangalore",
      quote: "As a channel partner for supply of LPG to run our kitchens, Kwality gas is very dependable & has never let us down. No need to follow up or remind for supplies. Very Good quality with pure Blue Flames and company takes care of any support required by their Excellent Marketing Team. We can always count on them for any additional requirement.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t5",
      clientName: "Mr. R. J. Mehta",
      designation: "Managing Director",
      companyName: "Silcore Industries",
      location: "Magadi Road, Bangalore",
      quote: "Kwality Team has supported us both for Technical & also for putting up the cylinder bank. Kwality takes care of all my LPG requirement of Furnace for my manufacturing of Stampings for Transformers and have never been let down any time. Additional demands on short notice also taken care by their Excellent Customer supportive Marketing team.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t6",
      clientName: "Mrs. Saloni",
      designation: "Working Professional",
      companyName: "Residential Customer",
      location: "Bangalore",
      quote: "A very Happy Kwality Customer for last several years. Kwality has never let me or my family down. They are always there with their delivery even at last minute call & my kids & husband have never starved. My kitchen is 24 hours ready with Kwality gas ever ready. No tension whatsoever of running out of Gas when Kwality Gas is with her 24 x 7.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t7",
      clientName: "Mr. Tony",
      designation: "Owner",
      companyName: "China Pearl - Chinese & Italian Restaurant",
      location: "Banaswadi, Bangalore",
      quote: "Happy to be with Kwality Gas as our LPG supplier. Very Dependable company for Timely supplies & Technical support and always can count on them for my restaurant kitchen requirements.",
      rating: 5,
      avatarUrl: "",
      isVerified: true,
    },
    {
      id: "t8",
      clientName: "Mr. Krupashankar",
      designation: "Proprietor",
      companyName: "Sri Balaji Enterprises",
      location: "Chamarajpet, Bangalore",
      quote: "Distributor for Kwality more than a decade. Privileged to be a distributor of Kwality Gas who value Service, on time delivery first time & every time & fully transparent dealings. Proud to be Kwality team member & growing with company continuously. Has been catering to more than 45+ dealers in & around Bangalore.",
      rating: 5,
      avatarUrl: "",
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
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#1769AA]/20 bg-gradient-to-br from-[#102A43] to-[#1769AA] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                      {t.avatarUrl && !t.avatarUrl.includes("original") && !t.avatarUrl.includes("testi") ? (
                        <Image
                          src={t.avatarUrl}
                          alt={t.clientName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span>
                          {t.clientName
                            .split(" ")
                            .map((n: string) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                      )}
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
