"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  User,
  FileText,
  AlertCircle,
  MessageSquare
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"CART" | "CHECKOUT" | "SUCCESS">("CART");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<{
    orderNumber: string;
    whatsappUrl: string;
    customerPhone: string;
  } | null>(null);

  // Checkout Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderType, setOrderType] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("DOMESTIC");
  const [notes, setNotes] = useState("");

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = customerName.trim();
    const cleanPhone = customerPhone.replace(/\D/g, "");
    const trimmedAddress = deliveryAddress.trim();

    if (!trimmedName) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!trimmedAddress || trimmedAddress.length < 8) {
      setErrorMsg("Please enter a complete delivery address with landmark and city.");
      return;
    }
    if (items.length === 0) {
      setErrorMsg("Your cart is empty. Add a product to proceed.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: trimmedName,
        customerPhone: cleanPhone,
        deliveryAddress: trimmedAddress,
        orderType,
        notes: notes.trim() || undefined,
        items: items.map((i) => ({
          productId: i.id,
          productName: i.name,
          capacity: i.capacity || "Standard",
          quantity: i.quantity,
          unitPrice: i.price || null,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save order to database. Please try again.");
      }

      // Order successfully persisted in DB!
      setSuccessData({
        orderNumber: data.orderNumber,
        whatsappUrl: data.whatsappUrl,
        customerPhone: cleanPhone,
      });

      clearCart();
      setStep("SUCCESS");

      // Open WhatsApp automatically in a new tab
      if (typeof window !== "undefined" && data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err: any) {
      console.error("Order submission error:", err);
      setErrorMsg(err.message || "Failed to process order request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep("CART");
    setErrorMsg("");
    setSuccessData(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={resetAndClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#F28C28] flex items-center justify-center border border-orange-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Shopping Cart</span>
                  {totalCount > 0 && (
                    <span className="bg-[#F28C28] text-white text-xs px-2 py-0.5 rounded-full font-extrabold">
                      {totalCount}
                    </span>
                  )}
                </h2>
                <p className="text-[11px] text-slate-300">Official WhatsApp Cylinder Booking</p>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {step === "CART" && (
              <>
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-800">Your Cart is Empty</h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        Browse our certified LPG cylinders, instant gas water heaters, and accessories.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-[#F28C28] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>Explore Products</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-semibold text-slate-500">Selected Items ({items.length})</span>
                      <button
                        onClick={clearCart}
                        className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-3 divide-y divide-slate-100">
                      {items.map((item) => (
                        <div key={item.id} className="pt-3 first:pt-0 flex gap-3.5 items-center">
                          {/* Image */}
                          <div className="relative w-16 h-16 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-200">
                            <Image
                              src={item.imageUrl || "/images/corporate/product-cylinder-33kg.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              {item.capacity && (
                                <span className="inline-block px-1.5 py-0.5 rounded-md bg-blue-50 text-[#1769AA] text-[10px] font-bold">
                                  {item.capacity}
                                </span>
                              )}
                              {item.price ? (
                                <span className="text-xs font-bold text-slate-700">₹{item.price}</span>
                              ) : (
                                <span className="text-[10px] text-slate-400">Price confirmed on WhatsApp</span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-slate-200 text-slate-600 rounded-l-lg transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-2.5 text-xs font-bold text-slate-900">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-slate-200 text-slate-600 rounded-r-lg transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-auto"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quality & Safety Assurance Note */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-[11px] text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-slate-900">Direct Factory Sealed Refills</strong>
                        Electronic weighment certified, leak tested, and delivered by authorized Kwality Gas logistics.
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === "CHECKOUT" && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Customer Delivery Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep("CART")}
                    className="text-xs text-[#1769AA] hover:underline font-semibold"
                  >
                    Edit Cart ({totalCount})
                  </button>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Pre-filled order details will be delivered to this WhatsApp number.
                  </span>
                </div>

                {/* Order Type / Segment */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Connection / Order Type *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["DOMESTIC", "COMMERCIAL", "INDUSTRIAL"] as const).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${
                          orderType === type
                            ? "bg-[#102A43] text-white border-[#102A43] shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Delivery Address & Landmark *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      required
                      rows={2}
                      placeholder="Door no, street, landmark, city / area"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                    />
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Special Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Preferred delivery time, manifold connection requirement, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                {/* Order Summary Box */}
                <div className="p-3 bg-slate-100 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Total Cylinders / Items:</span>
                    <span>{totalCount} Units</span>
                  </div>
                  {subtotal > 0 && (
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Estimated Subtotal:</span>
                      <span className="text-[#F28C28]">₹{subtotal.toFixed(2)}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-500 pt-1">
                    * Final delivery charges, payment options & dispatch will be confirmed via WhatsApp.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>{loading ? "Saving Order to Database..." : "Confirm & Order via WhatsApp"}</span>
                </button>
              </form>
            )}

            {step === "SUCCESS" && successData && (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1.5">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold tracking-wide uppercase">
                    Order Saved Successfully
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Thank You!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your order request has been securely recorded in our database under Order ID:
                  </p>
                  <div className="font-mono text-base font-extrabold text-[#1769AA] bg-slate-100 py-2 px-4 rounded-xl inline-block mt-2">
                    {successData.orderNumber}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-left text-xs text-amber-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Next Step: WhatsApp Confirmation</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    WhatsApp has opened in a new tab with your pre-filled order details. If it did not open automatically, click the button below to connect with our dispatch team directly.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={successData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Open WhatsApp Chat Now</span>
                  </a>

                  <button
                    onClick={resetAndClose}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs transition-colors"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions (Only on CART step with items) */}
          {step === "CART" && items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Subtotal ({totalCount} items)</span>
                <span className="font-extrabold text-slate-900">
                  {subtotal > 0 ? `₹${subtotal.toFixed(2)}` : "Price confirmed on WhatsApp"}
                </span>
              </div>

              <button
                onClick={() => setStep("CHECKOUT")}
                className="w-full flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#F28C28] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md hover:shadow-lg"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
