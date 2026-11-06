"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Tag, ShieldCheck, Flame, ArrowRight, Info } from "lucide-react";

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

interface PriceTablePreviewProps {
  initialStates: PriceState[];
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function PriceTablePreview({ initialStates, onOpenEnquiry }: PriceTablePreviewProps) {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  if (!initialStates || initialStates.length === 0) return null;

  const activeState = initialStates[selectedStateIndex] || initialStates[0];

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Transparent Refill Rates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-blue-dark tracking-tight">
              Kwality Gas LPG Refill Price List
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Active verified tariff with prevailing international rate alignment
            </p>
          </div>

          {/* State Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {initialStates.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setSelectedStateIndex(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  idx === selectedStateIndex
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st.stateName} Refill
              </button>
            ))}
          </div>
        </div>

        {/* Price Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header notice */}
          <div className="bg-brand-blue-surface px-6 py-4 border-b border-brand-blue-light/20 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-brand-blue-dark font-bold text-sm sm:text-base">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <span>
                Kwality Gas Price List For {activeState.stateName} {activeState.effectiveDate} ({activeState.wefNotice})
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Inclusive of applicable taxes
            </span>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6 font-bold">Cylinder Capacity / Refill Description</th>
                  <th className="py-3.5 px-6 font-bold">Category</th>
                  <th className="py-3.5 px-6 font-bold text-right">Amount (In ₹)</th>
                  <th className="py-3.5 px-6 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {activeState.items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-orange-50/40 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-brand-orange" />
                      <span>{item.capacity}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.isDomestic
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.isDomestic ? "Domestic (5% GST)" : "Commercial / Ind (18% GST)"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => onOpenEnquiry(item.isDomestic ? "DOMESTIC" : "COMMERCIAL")}
                        className="inline-flex items-center gap-1 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
                      >
                        Book Refill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes Footer */}
          <div className="bg-slate-50 p-6 border-t border-slate-200 space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-blue" />
              <span>Official Terms & Delivery Notes:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
              <p>1. Delivery charges applicable based on location & distance from Dealer shop.</p>
              <p>2. GST: For Domestic Cylinders 5% and for others (17 Kgs, 15 Kgs, 5.5 Kgs, 4 Kgs) 18%. Commercial misuse penalized under law.</p>
              <p>3. Applicable price based on prevailing international market LPG rates as decided from time to time.</p>
              <p>4. Subject to change; the price applicable at the time of dispatch will be charged.</p>
              <p className="md:col-span-2 font-semibold text-slate-800">5. All prices shown are inclusive of all taxes.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/price-list"
            className="inline-flex items-center gap-2 font-bold text-sm text-brand-blue hover:text-brand-orange transition-colors"
          >
            <span>View Full Price List with Detailed Capacity Specs & Tax Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

