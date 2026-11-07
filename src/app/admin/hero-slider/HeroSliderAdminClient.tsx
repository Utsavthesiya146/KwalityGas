"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  Save,
  X,
  Sliders,
  Flame,
  Clock,
  Sparkles,
} from "lucide-react";

export interface HeroSlideItem {
  id: string;
  slideKey?: string | null;
  title: string;
  subtitle?: string | null;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string | null;
  secondaryLink?: string | null;
  proofPoint1?: string | null;
  proofPoint2?: string | null;
  proofPoint3?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface HeroSliderAdminClientProps {
  initialSlides: HeroSlideItem[];
}

const PRESET_IMAGES = [
  { label: "Domestic Luxury Kitchen (New AI)", url: "/images/corporate/hero-domestic-lpg.jpg" },
  { label: "Commercial Restaurant Kitchen (New AI)", url: "/images/corporate/hero-commercial-lpg.jpg" },
  { label: "Industrial Bulk Storage Terminal (New AI)", url: "/images/corporate/hero-industrial-lpg.jpg" },
  { label: "Automated Bottling Plant (New AI)", url: "/images/corporate/hero-bottling-plant.jpg" },
  { label: "Safety Regulators & Testing (New AI)", url: "/images/corporate/hero-safety-standards.jpg" },
  { label: "LPG Delivery Fleet", url: "/images/corporate/service-delivery-truck.jpg" },
  { label: "Industrial Manifold System", url: "/images/corporate/service-manifold-bank.jpg" },
  { label: "Geneva Award 2015 Trophy", url: "/images/brand/kwality-gas-award.jpg" },
];

const PRESET_ACTIONS = [
  { label: "Domestic Booking Modal", value: "MODAL_DOMESTIC" },
  { label: "Commercial Quote Modal", value: "MODAL_COMMERCIAL" },
  { label: "Industrial Solutions Modal", value: "MODAL_INDUSTRIAL" },
  { label: "Domestic Page (/domestic)", value: "/domestic" },
  { label: "Commercial Page (/commercial)", value: "/commercial" },
  { label: "Industrial Page (/industrial)", value: "/industrial" },
  { label: "Cylinders Catalog (/cylinders)", value: "/cylinders" },
  { label: "Live Price List (/price-list)", value: "/price-list" },
  { label: "Safety Standards (/safety-features)", value: "/safety-features" },
  { label: "Company Infrastructure (/group-company)", value: "/group-company" },
  { label: "Plant Gallery (/gallery)", value: "/gallery" },
  { label: "Contact Us (/contact)", value: "/contact" },
];

export default function HeroSliderAdminClient({ initialSlides }: HeroSliderAdminClientProps) {
  const [slides, setSlides] = useState<HeroSlideItem[]>(initialSlides);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "/images/corporate/hero-industrial-lpg.jpg",
    ctaText: "",
    ctaLink: "MODAL_DOMESTIC",
    secondaryText: "",
    secondaryLink: "/price-list",
    proofPoint1: "",
    proofPoint2: "",
    proofPoint3: "",
    isActive: true,
  });

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const openAddModal = () => {
    setEditingSlide(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "/images/corporate/hero-industrial-lpg.jpg",
      ctaText: "Book Refill Now",
      ctaLink: "MODAL_DOMESTIC",
      secondaryText: "View Live Rates",
      secondaryLink: "/price-list",
      proofPoint1: "100% Tested Tare Weight",
      proofPoint2: "3 Modern Bottling Hubs",
      proofPoint3: "Grade 1 CARE MDRA Certified",
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (slide: HeroSlideItem) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description,
      imageUrl: slide.imageUrl,
      ctaText: slide.ctaText,
      ctaLink: slide.ctaLink,
      secondaryText: slide.secondaryText || "",
      secondaryLink: slide.secondaryLink || "",
      proofPoint1: slide.proofPoint1 || "",
      proofPoint2: slide.proofPoint2 || "",
      proofPoint3: slide.proofPoint3 || "",
      isActive: slide.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl || !formData.ctaText || !formData.ctaLink) {
      showToast("error", "Please fill in title, image URL, CTA text, and destination.");
      return;
    }

    setLoading(true);
    try {
      if (editingSlide) {
        // Update
        const res = await fetch("/api/admin/hero-slides", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingSlide.id,
            ...formData,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setSlides(slides.map((s) => (s.id === editingSlide.id ? json.slide : s)));
          showToast("success", "Slide updated successfully!");
          setModalOpen(false);
        } else {
          showToast("error", json.error || "Failed to update slide");
        }
      } else {
        // Create
        const res = await fetch("/api/admin/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setSlides([...slides, json.slide]);
          showToast("success", "New slide added successfully!");
          setModalOpen(false);
        } else {
          showToast("error", json.error || "Failed to create slide");
        }
      }
    } catch (err: any) {
      showToast("error", err.message || "Network request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the slide "${title}"?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/hero-slides?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setSlides(slides.filter((s) => s.id !== id));
        showToast("success", "Slide deleted successfully!");
      } else {
        showToast("error", json.error || "Failed to delete slide");
      }
    } catch (err: any) {
      showToast("error", err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (slide: HeroSlideItem) => {
    const updated = !slide.isActive;
    try {
      const res = await fetch("/api/admin/hero-slides", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: slide.id, isActive: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSlides(slides.map((s) => (s.id === slide.id ? { ...s, isActive: updated } : s)));
        showToast("success", `Slide ${updated ? "enabled" : "disabled"}`);
      }
    } catch {
      showToast("error", "Failed to toggle status");
    }
  };

  const moveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    // Recalculate displayOrders
    const reordered = newSlides.map((s, idx) => ({
      ...s,
      displayOrder: idx + 1,
    }));
    setSlides(reordered);

    try {
      await fetch("/api/admin/hero-slides", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reorder: reordered.map((s) => ({ id: s.id, displayOrder: s.displayOrder })),
        }),
      });
      showToast("success", "Slide order saved");
    } catch {
      showToast("error", "Failed to save slide order");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold transition-all animate-in fade-in slide-in-from-top-2 ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Homepage CMS Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
            Hero Slider Management
          </h1>
          <p className="mt-1 text-slate-500 text-sm max-w-2xl">
            Configure the slides displayed in the interactive multi-slide hero carousel on the public Kwality Gas homepage. Reorder slides, edit copy, change images, and toggle visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-bold transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Slide</span>
          </button>
        </div>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        {slides.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No hero slides found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add your first hero slide to activate the interactive multi-slide carousel.
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#F28C28] text-white px-4 py-2 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
          </div>
        ) : (
          slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                slide.isActive
                  ? "border-slate-200 shadow-xs hover:shadow-md"
                  : "border-slate-200/60 bg-slate-50/60 opacity-70"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                {/* Order Controls & Preview Thumbnail */}
                <div className="flex items-center gap-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => moveOrder(index, "up")}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
                      title="Move slide up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveOrder(index, "down")}
                      disabled={index === slides.length - 1}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
                      title="Move slide down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Slide Order Badge */}
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Slide Content Details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {slide.subtitle && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-50 text-[#F28C28] border border-orange-200">
                          {slide.subtitle}
                        </span>
                      )}
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          slide.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {slide.isActive ? "Active" : "Disabled"}
                      </span>
                    </div>

                    <h3 className="font-black text-[#102A43] text-sm sm:text-base leading-snug">
                      {slide.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                      {slide.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-600 pt-1">
                      <span className="font-semibold text-slate-900">
                        CTA: <span className="text-[#F28C28]">{slide.ctaText}</span> ({slide.ctaLink})
                      </span>
                      {slide.secondaryText && (
                        <span>
                          Sec: <span className="font-semibold">{slide.secondaryText}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => toggleActive(slide)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      slide.isActive
                        ? "border-slate-200 hover:bg-slate-100 text-slate-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                    }`}
                  >
                    {slide.isActive ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => openEditModal(slide)}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#1769AA] transition-colors"
                    title="Edit slide"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(slide.id, slide.title)}
                    className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                    title="Delete slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Slide Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#102A43] text-white p-5 sm:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black tracking-tight">
                  {editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Configure heading, supporting text, CTA actions, and slide photograph.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Badge/Subtitle & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category Badge / Pill
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Domestic LPG Solutions"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Main Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Reliable LPG Supply Engineered for Every Household"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none font-bold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Supporting Narrative Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed explanation of this LPG vertical, capacities, delivery terms and reliability guarantees..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none leading-relaxed"
                />
              </div>

              {/* Image URL & Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Slide Photograph URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/images/corporate/hero-industrial-lpg.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none"
                />

                {/* Quick Presets */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                    Quick Pick Verified Assets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                          formData.imageUrl === preset.url
                            ? "bg-[#102A43] text-white border-[#102A43]"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Live Preview */}
                {formData.imageUrl && (
                  <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="font-bold text-slate-900 block">Selected Asset</span>
                      <span className="font-mono text-[10px] text-slate-500 truncate block max-w-sm">
                        {formData.imageUrl}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary CTA Button Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="e.g. Book Domestic Connection"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary CTA Action / Link *
                  </label>
                  <select
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none bg-white font-medium"
                  >
                    {PRESET_ACTIONS.map((act, idx) => (
                      <option key={idx} value={act.value}>
                        {act.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Secondary CTA Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryText}
                    onChange={(e) => setFormData({ ...formData, secondaryText: e.target.value })}
                    placeholder="e.g. View Cylinders"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Secondary CTA Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryLink}
                    onChange={(e) => setFormData({ ...formData, secondaryLink: e.target.value })}
                    placeholder="e.g. /cylinders"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* 3 Proof Points */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3 Inline Proof Badges (Checkmarks)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={formData.proofPoint1}
                    onChange={(e) => setFormData({ ...formData, proofPoint1: e.target.value })}
                    placeholder="Proof 1: 100% Tested Tare Weight"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] outline-none"
                  />
                  <input
                    type="text"
                    value={formData.proofPoint2}
                    onChange={(e) => setFormData({ ...formData, proofPoint2: e.target.value })}
                    placeholder="Proof 2: 3 Modern Bottling Hubs"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] outline-none"
                  />
                  <input
                    type="text"
                    value={formData.proofPoint3}
                    onChange={(e) => setFormData({ ...formData, proofPoint3: e.target.value })}
                    placeholder="Proof 3: Grade 1 CARE Rating"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1769AA] outline-none"
                  />
                </div>
              </div>

              {/* Visibility Status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#F28C28] focus:ring-[#F28C28] border-slate-300"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Enable this slide in live homepage rotation
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Saving..." : editingSlide ? "Update Slide" : "Create Slide"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

