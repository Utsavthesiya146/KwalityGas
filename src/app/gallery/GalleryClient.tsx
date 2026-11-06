"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Images, Eye, X, Flame } from "lucide-react";

interface GalleryClientProps {
  categories: any[];
  initialImages: any[];
}

export default function GalleryClient({ categories, initialImages }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeImage, setActiveImage] = useState<any | null>(null);

  const filteredImages =
    selectedCategory === "ALL"
      ? initialImages
      : initialImages.filter((img) => img.categoryId === selectedCategory);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Images className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Photo Gallery & Accessories
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Explore authentic images of Kwality Gas products, domestic regulators, certified accessories, and bottling plant operations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === "ALL"
                ? "bg-brand-blue text-white shadow"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            All Photos ({initialImages.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-brand-blue text-white shadow"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat.name} ({cat.images?.length || 0})
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-cardHover transition-all overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 w-full bg-slate-50 flex items-center justify-center p-3">
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100">
                <h3 className="font-bold text-xs text-slate-900">{img.title}</h3>
                {img.category && (
                  <span className="text-[10px] text-brand-orange font-semibold block mt-0.5">
                    {img.category.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[65vh] w-full bg-slate-50 rounded-2xl overflow-hidden mb-4">
              <Image
                src={activeImage.imageUrl}
                alt={activeImage.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">{activeImage.title}</h3>
              {activeImage.description && (
                <p className="text-xs text-slate-600">{activeImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

