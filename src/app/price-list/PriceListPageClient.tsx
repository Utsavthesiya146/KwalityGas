"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Tag, Calendar, Info, Flame, Phone, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

interface PriceItem {
  id: string;
  capacity: string;
  amount: number | string | null;
  unit: string;
  isDomestic: boolean;
  notes?: string | null;
}

interface PriceState {
  id: string;
  stateCode: string;
  stateName: string;
  effectiveDate: string;
  wefNotice: string;
  notes?: string | null;
  items: PriceItem[];
}

interface PriceListPageClientProps {
  initialStates: PriceState[];
}

export default function PriceListPageClient({ initialStates }: PriceListPageClientProps) {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("DOMESTIC");

  if (!initialStates || initialStates.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-500">Price list is currently being updated by the administrator.</p>
      </div>
    );
  }

  const activeState = initialStates[selectedStateIndex] || initialStates[0];

  const handleBook = (isDomestic: boolean) => {
    setModalType(isDomestic ? "DOMESTIC" : "COMMERCIAL");
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Official Tariff Schedules</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kwality Gas Price List
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Transparent, government-compliant LPG cylinder refill rates for domestic homes and commercial establishments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* State Selector & Header Notice */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-brand-blue-dark flex items-center gap-2">
              <Calendar className="w-6 h-6 text-brand-orange" />
              <span>
                Kwality Gas Price List For {activeState.stateName} {activeState.effectiveDate} ({activeState.wefNotice})
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select state to view corresponding regional refill tariffs
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
            {initialStates.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setSelectedStateIndex(idx)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  idx === selectedStateIndex
                    ? "bg-brand-blue text-white shadow"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {st.stateName}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-600">
                  <th className="py-4 px-6 font-black">CAPACITY</th>
                  <th className="py-4 px-6 font-black">Segment / Application</th>
                  <th className="py-4 px-6 font-black">Applicable Tax Rules</th>
                  <th className="py-4 px-6 font-black text-right">Amt (In Rs)</th>
                  <th className="py-4 px-6 font-black text-center">Refill Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {activeState.items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-orange-50/50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                    }`}
                  >
                    <td className="py-5 px-6 font-black text-slate-900 flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-orange-100 text-brand-orange">
                        <Flame className="w-4 h-4 fill-brand-orange" />
                      </div>
                      <span className="text-base">{item.capacity}</span>
                    </td>

                    <td className="py-5 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          item.isDomestic
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.isDomestic ? "Domestic Household" : "Commercial / Industrial"}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-xs text-slate-600">
                      {item.isDomestic ? "GST 5% (Subsidized Home Rate)" : "GST 18% (Commercial Rate)"}
                    </td>

                    <td className="py-5 px-6 text-right font-black text-slate-900 text-lg">
                      {formatCurrency(item.amount)}
                    </td>

                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => handleBook(item.isDomestic)}
                        className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm transform hover:-translate-y-0.5"
                      >
                        Book This Refill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Audited 5 Notes */}
          <div className="bg-slate-50 p-8 border-t border-slate-200 space-y-4">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-blue" />
              <span>NOTES & MANDATORY CONDITIONS:-</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">1.</span>
                <span>Delivery charges as applicable based on the location & distance from Dealer shop.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">2.</span>
                <span>
                  <strong>GST:</strong> For Domestic Cylinders <strong>5%</strong> and for others (17 Kgs, 15 Kgs, 5.5 Kgs, 4 Kgs) <strong>18%</strong>. Using Domestic Cylinders for commercial use will be penalized as per law.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">3.</span>
                <span>Applicable price for the product will be based on prevailing price of LPG as per international market and as decided by the company from time to time.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">4.</span>
                <span>The price indicated is subject to change from time to time. Hence, the price as applicable at the time of the dispatch would be charged.</span>
              </p>
              <p className="flex items-start gap-2 font-bold text-slate-900">
                <span className="shrink-0">5.</span>
                <span>The above price is inclusive of all tax.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Booking Strip */}
        <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black">Need Bulk Delivery or Dealer Support?</h3>
            <p className="text-xs text-slate-200">Our customer care desk is active Monday through Saturday 9:30 AM to 5:30 PM.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+918023400459"
              className="flex items-center gap-1.5 bg-white text-brand-blue px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>Office: +91 - 80 - 2340 0459</span>
            </a>
            <a
              href="tel:+917899787101"
              className="flex items-center gap-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Marketing: +91 78997 87101</span>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}

