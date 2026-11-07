"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Loader2, X, ExternalLink, Flame } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category?: { name: string };
  capacity?: string | null;
  shortDesc?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  isDomestic: boolean;
  isCommercial: boolean;
  isIndustrial: boolean;
  features?: string | null;
  specifications?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function ProductsAdminClient({
  initialProducts,
  categories,
}: {
  initialProducts: any[];
  categories: any[];
}) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleOpenAdd = () => {
    setEditingProduct({
      name: "",
      slug: "",
      categoryId: categories[0]?.id || "",
      capacity: "",
      shortDesc: "",
      description: "",
      imageUrl: "/images/corporate/product-cylinder-12kg.jpg",
      isDomestic: true,
      isCommercial: false,
      isIndustrial: false,
      features: "",
      specifications: "",
      displayOrder: products.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setMsg({ text: `Product "${name}" deleted.`, type: "success" });
      }
    } catch (err: any) {
      setMsg({ text: err.message || "Failed to delete product", type: "error" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    setMsg(null);

    const isEdit = Boolean(editingProduct.id);
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      if (isEdit) {
        setProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)));
      } else {
        setProducts((prev) => [...prev, data.product]);
      }

      setMsg({ text: `Product saved successfully!`, type: "success" });
      setIsModalOpen(false);
    } catch (err: any) {
      setMsg({ text: err.message || "Failed to save product", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <Package className="w-6 h-6 text-brand-orange" />
            <span>Product Catalog Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage LPG cylinders, gas water heaters, and accessories shown on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
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

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-6 font-bold">Image</th>
                <th className="py-3.5 px-6 font-bold">Product Name & Capacity</th>
                <th className="py-3.5 px-6 font-bold">Category</th>
                <th className="py-3.5 px-6 font-bold">Target Segments</th>
                <th className="py-3.5 px-6 font-bold">Status</th>
                <th className="py-3.5 px-6 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-6">
                    <div className="relative w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden">
                      <Image
                        src={p.imageUrl || "/images/corporate/product-cylinder-12kg.jpg"}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </td>

                  <td className="py-3 px-6">
                    <p className="font-bold text-slate-900">{p.name}</p>
                    {p.capacity && (
                      <span className="text-[10px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded">
                        {p.capacity}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-6 font-medium text-slate-600">
                    {p.category?.name || "General"}
                  </td>

                  <td className="py-3 px-6">
                    <div className="flex flex-wrap gap-1">
                      {p.isDomestic && <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Domestic</span>}
                      {p.isCommercial && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Commercial</span>}
                      {p.isIndustrial && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Industrial</span>}
                    </div>
                  </td>

                  <td className="py-3 px-6">
                    <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      p.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>

                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-600 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-brand-blue-dark">
                {editingProduct.id ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Capacity / Specification</label>
                  <input
                    type="text"
                    value={editingProduct.capacity || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                    placeholder="e.g. 33.0 Kgs, 17.0 Kgs"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={editingProduct.imageUrl || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    placeholder="/images/corporate/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProduct.isDomestic}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isDomestic: e.target.checked })}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <span>Domestic</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProduct.isCommercial}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isCommercial: e.target.checked })}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <span>Commercial</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProduct.isIndustrial}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isIndustrial: e.target.checked })}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <span>Industrial</span>
                </label>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDesc || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
                <textarea
                  rows={4}
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
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
                  {isSaving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

