"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  Tag,
  Calendar,
  Info,
  Flame,
  Phone,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
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

  const defaultStates: PriceState[] = [
    {
      id: "state-ka",
      stateCode: "KA",
      stateName: "Karnataka",
      effectiveDate: "October, 2026",
      wefNotice: "WEF 06-10-2026",
      notes: "Delivery charges applicable based on location & distance. Domestic GST 5%, Commercial/Industrial 18%. Price subject to prevailing international LPG rates and dispatch schedule.",
      items: [
        { id: "ka-1", capacity: "33.0 Kgs Refill", amount: 5037, unit: "Refill", isDomestic: false, notes: "For industrial furnaces & heavy manifold banks" },
        { id: "ka-2", capacity: "21.0 Kgs Refill", amount: 3205, unit: "Refill", isDomestic: false, notes: "High pressure for commercial kitchens & bakeries" },
        { id: "ka-3", capacity: "17.0 Kgs Refill", amount: 2595, unit: "Refill", isDomestic: false, notes: "Standard for hotels, restaurants & caterers (HORECA)" },
        { id: "ka-4", capacity: "15.0 Kgs Refill", amount: null, unit: "Refill", isDomestic: false, notes: "Quote on request based on dispatch volume" },
        { id: "ka-5", capacity: "12.0 Kgs Refill (Domestic)", amount: 1702, unit: "Refill", isDomestic: true, notes: "Domestic household cooking connection refill" },
        { id: "ka-6", capacity: "5.5 Kgs Refill", amount: null, unit: "Refill", isDomestic: true, notes: "Quote on request for compact household setups" },
        { id: "ka-7", capacity: "4.0 Kgs Refill", amount: 617, unit: "Refill", isDomestic: true, notes: "Cook & Light portable cylinder refill" },
      ],
    },
    {
      id: "state-tn",
      stateCode: "TN",
      stateName: "Tamil Nadu",
      effectiveDate: "February, 2026",
      wefNotice: "WEF 03-02-2026",
      notes: "Direct dispatch from Hosur & Chennai bottling terminals. Domestic GST 5%, Commercial/Industrial 18%. Prices based on prevailing international LPG rates.",
      items: [
        { id: "tn-1", capacity: "33.0 Kgs Refill", amount: 5050, unit: "Refill", isDomestic: false, notes: "Direct Hosur & Chennai terminal dispatch" },
        { id: "tn-2", capacity: "21.0 Kgs Refill", amount: 3220, unit: "Refill", isDomestic: false, notes: "Commercial kitchens, restaurants & food courts" },
        { id: "tn-3", capacity: "17.0 Kgs Refill", amount: 2610, unit: "Refill", isDomestic: false, notes: "HORECA standard commercial refill" },
        { id: "tn-4", capacity: "15.0 Kgs Refill", amount: null, unit: "Refill", isDomestic: false, notes: "Quote on request for commercial canteens" },
        { id: "tn-5", capacity: "12.0 Kgs Refill (Domestic)", amount: 1715, unit: "Refill", isDomestic: true, notes: "Domestic cooking cylinder refill" },
        { id: "tn-6", capacity: "5.5 Kgs Refill", amount: null, unit: "Refill", isDomestic: true, notes: "Quote on request for compact cylinders" },
        { id: "tn-7", capacity: "4.0 Kgs Refill", amount: 625, unit: "Refill", isDomestic: true, notes: "Cook & Light portable unit refill" },
      ],
    },
  ];

  const states = initialStates && initialStates.length > 0 ? initialStates : defaultStates;
  const activeState = states[selectedStateIndex] || states[0];

  const handleBook = (isDomestic: boolean) => {
    setModalType(isDomestic ? "DOMESTIC" : "COMMERCIAL");
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#102A43] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Official Tariff Schedules</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kwality Gas Price List
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Transparent, government-compliant LPG rates for Karnataka and Tamil Nadu. Updated dynamically by the company administration.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* State Selection Tabs & Notice Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Select Your Region
              </span>
              <div className="flex items-center gap-2">
                {states.map((st, idx) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStateIndex(idx)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${idx === selectedStateIndex
                        ? "bg-[#102A43] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                  >
                    {st.stateName}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
              <Calendar className="w-4 h-4 text-[#F28C28] shrink-0" />
              <div>
                <strong className="text-slate-900 block font-bold">{activeState.effectiveDate}</strong>
                <span className="text-slate-500 text-[11px]">{activeState.wefNotice}</span>
              </div>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-4">Cylinder Capacity</th>
                  <th className="py-3 px-4">Segment</th>
                  <th className="py-3 px-4">Application Details</th>
                  <th className="py-3 px-4 text-right">Official Price (INR)</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {activeState.items && activeState.items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="py-4 px-4 font-black text-[#102A43] text-base group-hover:text-[#1769AA] transition-colors">
                      {item.capacity}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${item.isDomestic
                            ? "bg-orange-50 text-[#F28C28] border border-orange-200"
                            : "bg-blue-50 text-[#1769AA] border border-blue-200"
                          }`}
                      >
                        {item.isDomestic ? "Domestic" : "Commercial / Ind."}
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
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleBook(item.isDomestic)}
                        className="bg-slate-900 hover:bg-[#F28C28] text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-colors"
                      >
                        Book Refill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statutory Tax Condition Notes */}
          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#102A43] uppercase tracking-wider">
              <Info className="w-4 h-4 text-[#F28C28]" />
              <span>Official Commercial Terms & Statutory Conditions</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700 leading-relaxed font-medium">
              <li>
                <span className="font-semibold text-slate-900">Delivery Charges:</span> As applicable based on the location & distance from the Dealer shop.
              </li>
              <li>
                <span className="font-semibold text-slate-900">GST Compliance:</span> For Domestic Cylinders 5% and for others (17 Kgs, 15 Kgs, 5.5 Kgs, 4 Kgs) 18%. Using Domestic Cylinders for commercial use will be penalized as per law.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Market Indexation:</span> Applicable price for the product will be based on the prevailing price of LPG as per international market and as decided by the company from time to time.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Dispatch Price:</span> The price indicated is subject to change from time to time. Hence, the price as applicable at the time of the dispatch would be charged.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Tax Inclusivity:</span> The above published price schedule is inclusive of all taxes.
              </li>
            </ol>
            {activeState.notes && (
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Regional Dispatch Note: {activeState.notes}
              </p>
            )}
          </div>
        </div>

        {/* Commercial & Bulk Quote Callout */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#102A43] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Require Institutional or High-Volume Pricing?</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              We offer contracted monthly commercial tariffs for industrial plants, multi-outlet restaurant chains, and factory canteens.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setModalType("COMMERCIAL");
                setModalOpen(true);
              }}
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all"
            >
              Request Commercial Tariff
            </button>
            <a
              href="tel:+917899787101"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3 rounded-xl text-xs font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-[#F28C28]" />
              <span>Marketing: +91 78997 87101</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}
