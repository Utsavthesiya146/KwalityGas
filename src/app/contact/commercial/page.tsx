import React from "react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { Building2, Phone, Mail, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Requirement | Kwality Gas Bottlers",
  description:
    "Commercial LPG supply enquiry for restaurants, hotels, catering companies, and poultry farms across Karnataka & Tamil Nadu. Call: +91 91080 01989 / +91 91080 01990.",
};

export default function CommercialContactPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Commercial Supply Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Commercial Requirement
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Reliable commercial LPG refill agreements for hotels, restaurants, bakeries, caterers (HORECA), and poultry operations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                Establishment Booking
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
                SEND YOUR MESSAGE
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Provide your establishment details and required commissioning date for priority dispatch.
              </p>
            </div>

            <EnquiryForm initialType="COMMERCIAL" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                  Dedicated Commercial Helpline
                </span>
                <h3 className="text-xl font-black text-brand-blue-dark">
                  CONNECT WITH US
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Head Office Address</h4>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      <strong>V M C House</strong>, D-41, 3rd Floor,<br />
                      Rajaji nagar Industrial Estate,<br />
                      Bangalore – 560 044, Karnataka, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">Call Commercial Representatives</h4>
                    <p className="text-slate-800 font-bold text-base">
                      <a href="tel:+919108001989" className="text-brand-blue hover:text-brand-orange">+91 91080 01989</a>
                    </p>
                    <p className="text-slate-800 font-bold text-base">
                      <a href="tel:+919108001990" className="text-brand-blue hover:text-brand-orange">+91 91080 01990</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">e-mail</h4>
                    <a href="mailto:kwalitygasmarketing@gmail.com" className="text-brand-blue hover:text-brand-orange block font-medium">
                      kwalitygasmarketing@gmail.com
                    </a>
                    <a href="mailto:kwalitygas45@gmail.com" className="text-brand-blue hover:text-brand-orange block font-medium">
                      kwalitygas45@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

