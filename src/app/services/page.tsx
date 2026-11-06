import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck, Leaf, Flame, CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Commitments | Kwality Gas",
  description:
    "Kwality Gas services: Unmatched timely delivery network, well-trained workforce, commitment to rural environmental protection, and transition to superior blue flame LPG.",
};

export default function ServicesPage() {
  const pillars = [
    {
      title: "SERVICE & TIMELY DELIVERY",
      subtitle: "Unmatched Delivery Network Across Karnataka & Tamil Nadu",
      content:
        "The main force that drives Kwality Gas is its emphasis on quality product, quality service. It means delivering products to customers on time everytime, wherever they may be located, training manpower to always perform beyond expectations and maintaining an unmatched network.",
      image: "/images/original/service_style_11.jpg",
      icon: Truck,
      highlight: "Doorstep delivery accessible 7 days a week, 15 hours a day",
    },
    {
      title: "SERVICE NO COMPROMISE",
      subtitle: "Skilled Technical Workforce & Rigorous Safety Standards",
      content:
        "The company’s work force is well trained in every aspect of LPG distribution, maintenance and safety. They are also kept abreast of international trends in the market and oriented to be receptive to the customer’s needs.",
      image: "/images/original/service_style_12.jpg",
      icon: ShieldCheck,
      highlight: "Trained in electronic leak testing, cylinder valve inspections, and safety mounting",
    },
    {
      title: "COMMITTED TO THE ENVIRONMENT",
      subtitle: "Protecting Forest Wealth & Slashing Greenhouse Smoke",
      content:
        "Making LPG available in rural areas and in the process reduce deforestation and pollution. Creating and implementing indirect employment opportunities thereby contributing directly & indirectly to the welfare of the society.",
      image: "/images/original/BBOQ8.png",
      icon: Leaf,
      highlight: "Replacing hazardous firewood smoke and particulate pollution in rural kitchens",
    },
    {
      title: "THE FUTURE FUELLED WITH PROMISE",
      subtitle: "Transitioning Legacy Industrial & Commercial Heating",
      content:
        "The end result being to replace traditional fuels like wood, furnace oil, kerosene, LDO/HDO with a Definitely superior alternative: Kwality LPG.",
      image: "/images/original/service_style_16.jpg",
      icon: Flame,
      highlight: "Higher thermal calorific value, cleaner burner nozzles, and minimal soot emissions",
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Dedicated Service Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Services & Commitments
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Delivering quality products on time every time, backed by skilled manpower, customer care, and environmental responsibility.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* 4 Detailed Service Pillars */}
        <div className="space-y-12">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 1;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}>
                  {/* Image (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Text (7 cols) */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.subtitle}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
                      {item.title}
                    </h2>

                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {item.content}
                    </p>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs text-slate-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
                      >
                        <span>Connect with Our Service Team</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

