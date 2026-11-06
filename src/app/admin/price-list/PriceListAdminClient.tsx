"use client";

import React, { useState } from "react";
import { Tag, Save, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";

interface PriceItem {
  id?: string;
  capacity: string;
  amount: string;
  unit: string;
  isDomestic: boolean;
  notes?: string | null;
  displayOrder: number;
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

export default function PriceListAdminClient({ initialStates }: { initialStates: PriceState[] }) {
  const [states, setStates] = useState<PriceState[]>(initialStates);
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentState = states[activeStateIndex];

  const handleStateMetaChange = (field: "effectiveDate" | "wefNotice" | "notes", value: string) => {
    setStates((prev) => {
      const next = [...prev];
      next[activeStateIndex] = {
        ...next[activeStateIndex],
        [field]: value,
      };
      return next;
    });
  };

  const handleItemChange = (index: number, field: keyof PriceItem, value: any) => {
    setStates((prev) => {
      const next = [...prev];
      const items = [...next[activeStateIndex].items];
      items[index] = { ...items[index], [field]: value };
      next[activeStateIndex] = { ...next[activeStateIndex], items };
      return next;
    });
  };

  const handleAddItem = () => {
    setStates((prev) => {
      const next = [...prev];
      const items = [
        ...next[activeStateIndex].items,
        {
          capacity: "New Cylinder Capacity",
          amount: "",
          unit: "Refill",
          isDomestic: false,
          notes: "",
          displayOrder: next[activeStateIndex].items.length + 1,
        },
      ];
      next[activeStateIndex] = { ...next[activeStateIndex], items };
      return next;
    });
  };

  const handleDeleteItem = async (index: number) => {
    const item = currentState.items[index];
    if (item.id) {
      if (!confirm(`Are you sure you want to delete "${item.capacity}" from ${currentState.stateName} price list?`)) {
        return;
      }
      try {
        await fetch(`/api/admin/price-list?itemId=${item.id}`, { method: "DELETE" });
      } catch (err) {
        console.error(err);
      }
    }

    setStates((prev) => {
      const next = [...prev];
      const items = next[activeStateIndex].items.filter((_, i) => i !== index);
      next[activeStateIndex] = { ...next[activeStateIndex], items };
      return next;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/price-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stateId: currentState.id,
          effectiveDate: currentState.effectiveDate,
          wefNotice: currentState.wefNotice,
          notes: currentState.notes,
          items: currentState.items,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update price list");

      setSuccessMsg(`Successfully saved ${currentState.stateName} price list! Updates are live on the website.`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save prices");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <Tag className="w-6 h-6 text-brand-orange" />
            <span>Dynamic Price List Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update cylinder refill rates, WEF dates, and tax conditions for Karnataka & Tamil Nadu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/price-list"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-orange bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Price Page</span>
          </Link>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-bold">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* State Switcher */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
        {states.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => {
              setActiveStateIndex(idx);
              setSuccessMsg(null);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              idx === activeStateIndex
                ? "bg-brand-blue text-white shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {st.stateName} Refill Tariff
          </button>
        ))}
      </div>

      {/* State Metadata Editor */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-black text-brand-blue-dark uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-orange" />
          <span>State Header & Date Information ({currentState.stateName})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Effective Month / Year
            </label>
            <input
              type="text"
              value={currentState.effectiveDate}
              onChange={(e) => handleStateMetaChange("effectiveDate", e.target.value)}
              placeholder="e.g. October, 2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              With Effect From (WEF) Notice
            </label>
            <input
              type="text"
              value={currentState.wefNotice}
              onChange={(e) => handleStateMetaChange("wefNotice", e.target.value)}
              placeholder="e.g. WEF 06-10-2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Condition Notes & Delivery Regulations (Preserved 5 Points)
          </label>
          <textarea
            rows={4}
            value={currentState.notes || ""}
            onChange={(e) => handleStateMetaChange("notes", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20 resize-none"
          />
        </div>
      </div>

      {/* Pricing Table Item Editor */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-brand-blue-dark uppercase tracking-wider">
              Cylinder Capacity Refill Prices
            </h3>
            <p className="text-xs text-slate-500">Leave amount empty for &ldquo;Contact for Quote&rdquo;</p>
          </div>

          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 bg-brand-orange text-white text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-brand-orange-hover transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Capacity Row</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-6 font-bold">Capacity Title</th>
                <th className="py-3.5 px-6 font-bold">Amount (₹)</th>
                <th className="py-3.5 px-6 font-bold">Domestic 5% GST?</th>
                <th className="py-3.5 px-6 font-bold">Notes</th>
                <th className="py-3.5 px-6 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentState.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      value={item.capacity}
                      onChange={(e) => handleItemChange(idx, "capacity", e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-bold text-slate-900"
                    />
                  </td>

                  <td className="py-3 px-6">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={item.amount}
                        onChange={(e) => handleItemChange(idx, "amount", e.target.value)}
                        placeholder="Quote"
                        className="w-32 pl-7 pr-2.5 py-1.5 rounded-lg border border-slate-200 font-black text-slate-900"
                      />
                    </div>
                  </td>

                  <td className="py-3 px-6">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={item.isDomestic}
                        onChange={(e) => handleItemChange(idx, "isDomestic", e.target.checked)}
                        className="w-4 h-4 text-brand-orange rounded"
                      />
                      <span>{item.isDomestic ? "Domestic (5%)" : "Commercial (18%)"}</span>
                    </label>
                  </td>

                  <td className="py-3 px-6">
                    <input
                      type="text"
                      value={item.notes || ""}
                      onChange={(e) => handleItemChange(idx, "notes", e.target.value)}
                      placeholder="e.g. Quote on request"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600"
                    />
                  </td>

                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleDeleteItem(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete this row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
