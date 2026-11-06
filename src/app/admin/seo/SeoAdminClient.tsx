"use client";

import React, { useState } from "react";
import { Search, Save, CheckCircle2, Globe, ExternalLink } from "lucide-react";

export default function SeoAdminClient({ initialSeoList }: { initialSeoList: any[] }) {
  const [seoList, setSeoList] = useState(initialSeoList);
  const [selectedSlug, setSelectedSlug] = useState(initialSeoList[0]?.pageSlug || "home");
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const currentSeo = seoList.find((s) => s.pageSlug === selectedSlug) || seoList[0];

  const handleUpdate = (field: string, val: any) => {
    setSeoList((prev) =>
      prev.map((s) => (s.pageSlug === selectedSlug ? { ...s, [field]: val } : s))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSeo),
      });
      if (res.ok) {
        setMsg(`SEO settings for "/${currentSeo.pageSlug}" saved successfully!`);
      }
    } catch (err) {
      alert("Failed to save SEO");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <Search className="w-6 h-6 text-brand-orange" />
            <span>Search Engine Optimization & Open Graph</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize meta titles, meta descriptions, and keywords to rank for LPG queries across Bangalore & South India.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Page Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        {seoList.map((s) => (
          <button
            key={s.pageSlug}
            onClick={() => {
              setSelectedSlug(s.pageSlug);
              setMsg(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSlug === s.pageSlug
                ? "bg-brand-blue text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            /{s.pageSlug}
          </button>
        ))}
      </div>

      {/* Editor Card */}
      {currentSeo && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-black text-sm text-brand-blue-dark">
              SEO Parameters for: /{currentSeo.pageSlug}
            </h3>
            <span className="text-xs text-slate-400">Canonical: {currentSeo.canonicalUrl}</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Meta Title (Recommended: 50-60 characters)
              </label>
              <input
                type="text"
                value={currentSeo.metaTitle || ""}
                onChange={(e) => handleUpdate("metaTitle", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Length: {currentSeo.metaTitle?.length || 0} characters
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Meta Description (Recommended: 140-160 characters)
              </label>
              <textarea
                rows={3}
                value={currentSeo.metaDescription || ""}
                onChange={(e) => handleUpdate("metaDescription", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 resize-none"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Length: {currentSeo.metaDescription?.length || 0} characters
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Target SEO Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={currentSeo.metaKeywords || ""}
                onChange={(e) => handleUpdate("metaKeywords", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Open Graph Title</label>
                <input
                  type="text"
                  value={currentSeo.ogTitle || ""}
                  onChange={(e) => handleUpdate("ogTitle", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={currentSeo.canonicalUrl || ""}
                  onChange={(e) => handleUpdate("canonicalUrl", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Google Search Snippet Preview */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Google Search Result Snippet Preview
            </span>
            <p className="text-xs text-emerald-700">{currentSeo.canonicalUrl || "https://kwalitygas.com"}</p>
            <h4 className="text-sm font-bold text-blue-700 hover:underline cursor-pointer">
              {currentSeo.metaTitle}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2">
              {currentSeo.metaDescription}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save SEO Settings"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

