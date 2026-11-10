"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Plus, Minus, Flame, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { sanitizeImageUrl } from "@/lib/sanitize-image";

interface ProductItem {
  id: string;
  name: string;
  capacity?: string | null;
  imageUrl?: string | null;
  shortDesc?: string | null;
  description?: string | null;
  isIndustrial?: boolean;
  isCommercial?: boolean;
  isDomestic?: boolean;
}

export default function ProductsGridClient({ products }: { products: ProductItem[] }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

  const getQty = (id: string) => quantities[id] || 1;
  const setQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const getPrice = (prod: ProductItem) => {
    const cap = (prod.capacity || "").toLowerCase();
    if (cap.includes("17")) return 2595;
    if (cap.includes("4.0") || cap.includes("4kg")) return 617;
    return null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((prod) => {
        const price = getPrice(prod);
        const resolvedImage = sanitizeImageUrl(prod.imageUrl, "/images/corporate/product-cylinder-33kg.jpg");
        const qty = getQty(prod.id);

        return (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-cardHover hover:border-[#1769AA]/40 transition-all duration-300 group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xl font-black text-[#102A43] group-hover:text-[#1769AA] transition-colors">
                  {prod.capacity || "LPG"}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    prod.isIndustrial
                      ? "bg-slate-100 text-slate-800 border border-slate-300"
                      : prod.isCommercial
                      ? "bg-blue-50 text-[#1769AA] border border-blue-200"
                      : "bg-orange-50 text-[#F28C28] border border-orange-200"
                  }`}
                >
                  {prod.isIndustrial ? "Industrial" : prod.isCommercial ? "Commercial" : "Domestic"}
                </span>
              </div>

              {/* Product Visual */}
              <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-100 shadow-inner group">
                <Image
                  src={resolvedImage}
                  alt={prod.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug group-hover:text-[#1769AA] transition-colors">
                {prod.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[2.5rem]">
                {prod.shortDesc || prod.description}
              </p>
            </div>

            {/* E-Commerce Shopping Controls */}
            <div className="pt-3.5 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                {/* Quantity Controls */}
                <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQty(prod.id, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-slate-900">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(prod.id, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={() =>
                    addToCart(
                      {
                        id: prod.id,
                        name: prod.name,
                        capacity: prod.capacity,
                        imageUrl: resolvedImage,
                        price,
                        orderType: prod.isIndustrial ? "INDUSTRIAL" : prod.isCommercial ? "COMMERCIAL" : "DOMESTIC",
                      },
                      qty
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-[#1769AA] py-2 rounded-xl font-bold text-xs transition-colors"
                  title="Add to cart"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Order via WhatsApp & Enquiry */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    addToCart(
                      {
                        id: prod.id,
                        name: prod.name,
                        capacity: prod.capacity,
                        imageUrl: resolvedImage,
                        price,
                        orderType: prod.isIndustrial ? "INDUSTRIAL" : prod.isCommercial ? "COMMERCIAL" : "DOMESTIC",
                      },
                      qty
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#102A43] hover:bg-[#F28C28] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>Order Refill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={
                    prod.isIndustrial
                      ? "/contact/industrial"
                      : prod.isCommercial
                      ? "/contact/commercial"
                      : "/contact/domestic"
                  }
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors shrink-0"
                  title="Direct Enquiry Form"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
