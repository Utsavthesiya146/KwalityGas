"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, X, Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  designation?: string | null;
  companyName: string;
  quote: string;
  location?: string | null;
  avatarUrl?: string | null;
  rating: number;
  isVerified: boolean;
  displayOrder: number;
  isActive: boolean;
}

export default function TestimonialsAdminClient({
  initialTestimonials,
}: {
  initialTestimonials: any[];
}) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleOpenAdd = () => {
    setEditingItem({
      clientName: "",
      designation: "Proprietor",
      companyName: "",
      quote: "",
      location: "Bangalore",
      avatarUrl: "",
      rating: 5,
      isVerified: true,
      displayOrder: testimonials.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingItem({ ...t });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setMsg({ text: `Testimonial from "${name}" deleted.`, type: "success" });
      }
    } catch (err: any) {
      setMsg({ text: err.message || "Failed to delete", type: "error" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);
    setMsg(null);

    const isEdit = Boolean(editingItem.id);
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save testimonial");

      if (isEdit) {
        setTestimonials((prev) => prev.map((t) => (t.id === data.testimonial.id ? data.testimonial : t)));
      } else {
        setTestimonials((prev) => [...prev, data.testimonial]);
      }

      setMsg({ text: `Testimonial saved successfully!`, type: "success" });
      setIsModalOpen(false);
    } catch (err: any) {
      setMsg({ text: err.message || "Failed to save testimonial", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-brand-orange" />
            <span>Testimonial Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage authentic customer reviews displayed on the public testimonials page and homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
            msg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          {msg.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                {t.isVerified && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Verified Customer
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-3">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-gradient-to-br from-[#102A43] to-[#1769AA] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {t.avatarUrl && !t.avatarUrl.includes("original") && !t.avatarUrl.includes("testi") ? (
                    <Image src={t.avatarUrl} alt={t.clientName} fill className="object-cover" />
                  ) : (
                    <span>
                      {t.clientName
                        .split(" ")
                        .map((n: string) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.companyName}</h4>
                  <p className="text-[11px] text-slate-500">{t.clientName} {t.designation ? `(${t.designation})` : ""}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-slate-600 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.clientName)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-brand-blue-dark">
                {editingItem.id ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client / Owner Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.clientName || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Establishment *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.companyName || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={editingItem.designation || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    placeholder="e.g. Proprietor / Director"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Gandhi Bazar, Bangalore"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Avatar Image Path</label>
                  <input
                    type="text"
                    value={editingItem.avatarUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, avatarUrl: e.target.value })}
                    placeholder="/images/corporate/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Quote Statement *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingItem.isVerified}
                    onChange={(e) => setEditingItem({ ...editingItem, isVerified: e.target.checked })}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <span>Mark as Verified Customer</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-brand-orange text-white font-bold hover:bg-brand-orange-hover shadow disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

