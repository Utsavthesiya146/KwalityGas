"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Save, CheckCircle2, ExternalLink } from "lucide-react";

export default function PagesAdminClient({ initialPages }: { initialPages: any[] }) {
  const [pages, setPages] = useState(initialPages);
  const [msg, setMsg] = useState<string | null>(null);

  const handleUpdate = (id: string, field: string, val: any) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const handleSave = async (page: any) => {
    try {
      const res = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (res.ok) {
        setMsg(`Page "${page.slug}" updated successfully!`);
      }
    } catch (err) {
      alert("Failed to update page");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-orange" />
            <span>Pages & Content Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Edit page titles, descriptions, and publishing status for all 15 rebuilt public routes.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <div className="space-y-4">
        {pages.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 uppercase">/{p.slug === "home" ? "" : p.slug}</span>
                <span className="text-[10px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                  {p.slug}
                </span>
              </div>
              <Link
                href={`/${p.slug === "home" ? "" : p.slug}`}
                target="_blank"
                className="text-xs font-bold text-slate-500 hover:text-brand-orange flex items-center gap-1"
              >
                <span>Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => handleUpdate(p.id, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Excerpt</label>
                <textarea
                  rows={2}
                  value={p.description || ""}
                  onChange={(e) => handleUpdate(p.id, "description", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave(p)}
                className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Page Info</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

