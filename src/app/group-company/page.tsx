import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Phone, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Company | The Bangalore Tin Works",
  description:
    "Learn about our sister entity The Bangalore Tin Works, manufacturers of quality tin containers at Lakshminarayan Puram, Bangalore-560 021.",
};

export default function GroupCompanyPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Industrial Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Group Company
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Backed by a multi-decade industrial group with a rich legacy in precision engineering and metal packaging.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 sm:p-12 space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
              Sister Manufacturing Entity
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
              THE BANGALORE TIN WORKS
            </h2>
            <p className="text-sm font-bold text-slate-700">
              (Manufacturers of Quality Tin Containers)
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            The Bangalore Tin Works is an established packaging manufacturing facility specializing in high-grade metal containers, tin packaging, and industrial closures for food, paints, chemicals, and industrial lubricants. Together with Kwality Gas Bottlers, the group represents over 35 years of engineering manufacturing excellence in Karnataka.
          </p>

          {/* Contact Details Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
              Works Address & Contact Directory:
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-slate-800 font-medium">
                  #M-10, 3rd Cross, Lakshminarayan Puram,<br />
                  Bangalore – 560 021, Karnataka, India.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <div className="space-y-1">
                  <p className="text-slate-800">
                    <span className="font-semibold text-slate-600">Phone 1:</span>{" "}
                    <a href="tel:+918023325035" className="hover:text-brand-orange font-bold">+91 080 2332 5035</a>
                  </p>
                  <p className="text-slate-800">
                    <span className="font-semibold text-slate-600">Phone 2:</span>{" "}
                    <a href="tel:+918023507265" className="hover:text-brand-orange font-bold">+91 080 2350 7265</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-orange"
            >
              <span>Back to Kwality Gas Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all"
            >
              Contact Kwality Gas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

