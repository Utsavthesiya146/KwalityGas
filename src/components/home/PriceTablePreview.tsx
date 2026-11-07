"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Tag, Calendar, ArrowRight, ShieldCheck, Flame, Phone } from "lucide-react";

interface PriceTablePreviewProps {
  initialStates: any[];
  onOpenEnquiry: (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL") => void;
}

export default function PriceTablePreview({ initialStates, onOpenEnquiry }: PriceTablePreviewProps) {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const defaultStates = [
    {
      id: "state-ka",
      stateName: "Karnataka",
      effectiveDate: "Current Tariff Schedule",
      wefNotice: "W.E.F Current Billing Cycle",
      items: [
        { id: "ka-1", capacity: "33 Kg Industrial", amount: 2650, isDomestic: false, notes: "For industrial furnaces & manifold headers" },
        { id: "ka-2", capacity: "21 Kg Commercial", amount: 1720, isDomestic: false, notes: "Continuous high pressure for restaurant ranges" },
        { id: "ka-3", capacity: "17 Kg Commercial", amount: 1390, isDomestic: false, notes: "Standard for hotels, bakeries & cloud kitchens" },
        { id: "ka-4", capacity: "12 Kg Domestic", amount: 960, isDomestic: true, notes: "Domestic household cooking connection" },
        { id: "ka-5", capacity: "5.5 Kg Compact", amount: 480, isDomestic: true, notes: "Compact cylinder for small apartments" },
        { id: "ka-6", capacity: "4 Kg Cook & Light", amount: 370, isDomestic: true, notes: "Portable cylinder with direct burner fitting" },
      ],
    },
    {
      id: "state-tn",
      stateName: "Tamil Nadu",
      effectiveDate: "Current Tariff Schedule",
      wefNotice: "W.E.F Current Billing Cycle",
      items: [
        { id: "tn-1", capacity: "33 Kg Industrial", amount: 2630, isDomestic: false, notes: "Direct Hosur & Chennai plant dispatch" },
        { id: "tn-2", capacity: "21 Kg Commercial", amount: 1710, isDomestic: false, notes: "For commercial kitchens & hotel chains" },
        { id: "tn-3", capacity: "17 Kg Commercial", amount: 1380, isDomestic: false, notes: "Restaurant & commercial canteen standard" },
        { id: "tn-4", capacity: "12 Kg Domestic", amount: 950, isDomestic: true, notes: "Domestic household cooking refill" },
        { id: "tn-5", capacity: "5.5 Kg Compact", amount: 475, isDomestic: true, notes: "Small family compact cylinder" },
        { id: "tn-6", capacity: "4 Kg Cook & Light", amount: 365, isDomestic: true, notes: "Cook & Light portable unit" },
      ],
    },
  ];

  const states = initialStates && initialStates.length > 0 ? initialStates : defaultStates;
  const activeState = states[selectedStateIndex] || states[0];

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Tag className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Transparent Refill Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Live LPG Rates & Cylinder Tariffs
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Check current government-compliant prices for Karnataka and Tamil Nadu. Updated directly by Kwality Gas administration.
            </p>
          </div>

          {/* State Tabs */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            {states.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setSelectedStateIndex(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  idx === selectedStateIndex
                    ? "bg-[#102A43] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {st.stateName}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          {/* Header Strip */}
          <div className="bg-slate-50 px-6 sm:px-8 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-[#F28C28]" />
              <span className="font-bold text-slate-900">{activeState.effectiveDate}</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">{activeState.wefNotice}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live CMS Verified</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-6 sm:px-8">Cylinder Capacity</th>
                  <th className="py-3 px-4">Segment</th>
                  <th className="py-3 px-4">Application Details</th>
                  <th className="py-3 px-4 text-right">Official Price (INR)</th>
                  <th className="py-3 px-6 sm:px-8 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {activeState.items && activeState.items.slice(0, 6).map((item: any) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="py-4 px-6 sm:px-8 font-black text-[#102A43] text-base group-hover:text-[#1769AA] transition-colors">
                      {item.capacity}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.isDomestic
                            ? "bg-orange-50 text-[#F28C28] border border-orange-200"
                            : "bg-blue-50 text-[#1769AA] border border-blue-200"
                        }`}
                      >
                        {item.isDomestic ? "Domestic" : "Commercial"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs max-w-xs">
                      {item.notes || (item.isDomestic ? "Household cooking connection" : "Commercial catering & bakery kitchens")}
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900 text-base text-right font-mono">
                      {item.amount !== null && item.amount !== "" ? (
                        formatCurrency(Number(item.amount))
                      ) : (
                        <span className="text-xs font-semibold text-slate-500">Market Price</span>
                      )}
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-center">
                      <button
                        onClick={() => onOpenEnquiry(item.isDomestic ? "DOMESTIC" : "COMMERCIAL")}
                        className="bg-slate-900 hover:bg-[#F28C28] text-white text-xs font-bold px-4 py-1.5 rounded-lg uppercase tracking-wider transition-colors"
                      >
                        Book Refill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Prices inclusive of standard local bottling statutory taxes. Commercial supplies subject to 18% GST input credit.</span>
            <Link
              href="/price-list"
              className="inline-flex items-center gap-1.5 font-bold text-[#1769AA] hover:text-[#102A43] shrink-0"
            >
              <span>View Full State Tariff Table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
