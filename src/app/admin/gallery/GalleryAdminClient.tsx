"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Images, Plus, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function GalleryAdminClient({
  initialImages,
  categories,
}: {
  initialImages: any[];
  categories: any[];
}) {
  const [images, setImages] = useState<any[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({
    title: "",
    imageUrl: "/images/corporate/",
    categoryId: categories[0]?.id || "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete image "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
        setMsg(`Image "${title}" removed.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setImages((prev) => [...prev, data.image]);
      setMsg("Image added successfully!");
      setIsModalOpen(false);
      setNewImage({ title: "", imageUrl: "/images/corporate/", categoryId: categories[0]?.id || "", description: "" });
    } catch (err: any) {
      alert(err.message || "Failed to add image");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <Images className="w-6 h-6 text-brand-orange" />
            <span>Gallery & Media Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage photo gallery items, equipment photos, and bottling plant snapshots.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-44 w-full bg-slate-50 p-2">
              <Image src={img.imageUrl} alt={img.title} fill className="object-contain p-2" />
            </div>
            <div className="p-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900 truncate max-w-[130px]">{img.title}</h4>
                <span className="text-[10px] text-slate-500">{img.category?.name}</span>
              </div>
              <button
                onClick={() => handleDelete(img.id, img.title)}
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-brand-blue-dark">Add Photo to Gallery</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="e.g. Domestic LPG Regulator"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newImage.categoryId}
                  onChange={(e) => setNewImage({ ...newImage, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Path / URL *</label>
                <input
                  type="text"
                  required
                  value={newImage.imageUrl}
                  onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange-hover"
                >
                  {isSaving ? "Saving..." : "Add Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

