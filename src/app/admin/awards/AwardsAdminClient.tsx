"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Save, Edit2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AwardsAdminClient({ initialAwards }: { initialAwards: any[] }) {
  const [awards, setAwards] = useState(initialAwards);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleUpdate = async (id: string, field: string, val: any) => {
    setAwards((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: val } : a))
    );
  };

  const handleSave = async (award: any) => {
    setIsSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/awards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(award),
      });
      if (res.ok) {
        setMsg(`Award "${award.title}" saved successfully!`);
      }
    } catch (err: any) {
      alert("Failed to save award");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <Award className="w-6 h-6 text-brand-orange" />
            <span>Awards & Industry Certifications</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage official recognitions (such as the Business Excellence & Achievement Awards 2015).
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <div className="space-y-6">
        {awards.map((award) => (
          <div key={award.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Award Title</label>
                <input
                  type="text"
                  value={award.title}
                  onChange={(e) => handleUpdate(award.id, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Year</label>
                <input
                  type="text"
                  value={award.year}
                  onChange={(e) => handleUpdate(award.id, "year", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Issuing Body / Authority</label>
                <input
                  type="text"
                  value={award.issuingBody || ""}
                  onChange={(e) => handleUpdate(award.id, "issuingBody", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Certificate Image Path</label>
                <input
                  type="text"
                  value={award.certificateImg || ""}
                  onChange={(e) => handleUpdate(award.id, "certificateImg", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-slate-700 mb-1">Award Description</label>
              <textarea
                rows={3}
                value={award.description || ""}
                onChange={(e) => handleUpdate(award.id, "description", e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
              />
            </div>

            {/* Photos Preview */}
            <div className="grid grid-cols-2 gap-4">
              {award.certificateImg && (
                <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image src={award.certificateImg} alt="Certificate" fill className="object-contain p-2" />
                </div>
              )}
              {award.trophyImg && (
                <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image src={award.trophyImg} alt="Trophy" fill className="object-contain p-2" />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave(award)}
                disabled={isSaving}
                className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Award Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

