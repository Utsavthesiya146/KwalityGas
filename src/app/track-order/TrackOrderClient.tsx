"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  AlertCircle,
  MapPin,
  Calendar,
  Flame,
  ArrowRight,
  ShieldCheck,
  Building,
  RefreshCw
} from "lucide-react";

interface OrderTrackingData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  rawPhone: string;
  deliveryAddress: string;
  orderType: string;
  subtotal: number | null;
  status: string;
  paymentStatus: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  paymentConfirmedAt?: string | null;
  dispatchedAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  items: Array<{
    id: string;
    productName: string;
    capacity?: string | null;
    quantity: number;
    unitPrice?: number | null;
    lineTotal?: number | null;
  }>;
}

const STEP_DEFINITIONS = [
  { key: "NEW", label: "Order Received", desc: "Saved securely in system" },
  { key: "WHATSAPP_CONTACTED", label: "WhatsApp Contacted", desc: "Dispatch team coordinated" },
  { key: "PAYMENT_CONFIRMED", label: "Payment Confirmed", desc: "Verified by billing staff" },
  { key: "PROCESSING", label: "Processing & Testing", desc: "Weighment & leak testing" },
  { key: "DISPATCHED", label: "Dispatched", desc: "On vehicle for delivery" },
  { key: "DELIVERED", label: "Delivered", desc: "Doorstep delivery completed" },
];

function getStepIndex(status: string) {
  switch (status) {
    case "NEW":
    case "WHATSAPP_CONTACT_PENDING":
      return 0;
    case "WHATSAPP_CONTACTED":
    case "PAYMENT_PENDING":
      return 1;
    case "PAYMENT_CONFIRMED":
      return 2;
    case "PROCESSING":
      return 3;
    case "DISPATCHED":
      return 4;
    case "DELIVERED":
      return 5;
    case "CANCELLED":
      return -1;
    default:
      return 0;
  }
}

export default function TrackOrderClient() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setOrderData(null);

    const cleanNum = orderNumber.trim();
    const cleanPh = phone.replace(/\D/g, "");

    if (!cleanNum) {
      setErrorMsg("Please enter your Order Reference Number (e.g. KWG-ORD-202611-12345).");
      return;
    }
    if (cleanPh.length < 10) {
      setErrorMsg("Please enter your 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: cleanNum, phone: cleanPh }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please verify details.");
      }

      setOrderData(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to find order details.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = orderData ? getStepIndex(orderData.status) : 0;
  const isCancelled = orderData?.status === "CANCELLED";

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#F28C28] selection:text-white">
      {/* Hero Header */}
      <section className="relative bg-[#07131F] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-[#F28C28] border border-orange-500/20 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Official Order Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Track Your LPG Cylinder Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enter your unique Order Reference ID and registered WhatsApp phone number to check live processing, payment verification, and delivery dispatch.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Order Reference ID *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. KWG-ORD-202611-12345"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#F28C28] text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Checking Live Status...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Live Order Status</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tracking Result View */}
        {orderData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8 animate-in fade-in-50 duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28]">
                  Live Tracking Details
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {orderData.orderNumber}
                </h2>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Booked on {new Date(orderData.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    isCancelled
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : orderData.paymentStatus === "CONFIRMED"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  Payment: {orderData.paymentStatus}
                </span>

                <span className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  {orderData.orderType} Connection
                </span>
              </div>
            </div>

            {/* Stepper (if not cancelled) */}
            {isCancelled ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">This order has been cancelled</strong>
                  <span>Please contact our customer support team if you believe this is an error or would like to re-order.</span>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                  Delivery Progress Timeline
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {STEP_DEFINITIONS.map((st, idx) => {
                    const isDone = currentStep >= idx;
                    const isCurrent = currentStep === idx;

                    return (
                      <div
                        key={st.key}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isCurrent
                            ? "bg-orange-50 border-[#F28C28] ring-2 ring-orange-500/20"
                            : isDone
                            ? "bg-emerald-50/70 border-emerald-200 text-slate-800"
                            : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-black mb-2 ${
                            isCurrent
                              ? "bg-[#F28C28] text-white shadow-sm"
                              : isDone
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-tight">{st.label}</h4>
                        <p className="text-[10px] text-slate-500 mt-1 leading-tight">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ordered Items Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Order Items & Cylinders
              </h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {orderData.items.map((it) => (
                  <div key={it.id} className="p-4 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-slate-900">{it.productName}</div>
                      {it.capacity && (
                        <span className="inline-block mt-0.5 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                          Capacity: {it.capacity}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">Qty: {it.quantity}</div>
                      {it.lineTotal ? (
                        <div className="text-xs text-slate-500 mt-0.5">₹{it.lineTotal.toFixed(2)}</div>
                      ) : (
                        <div className="text-[10px] text-slate-400 mt-0.5">Price on WhatsApp</div>
                      )}
                    </div>
                  </div>
                ))}

                {orderData.subtotal && orderData.subtotal > 0 && (
                  <div className="p-4 bg-slate-50 flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span>Estimated Subtotal:</span>
                    <span className="text-[#F28C28] text-base font-black">₹{orderData.subtotal.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Customer Name</span>
                <span className="text-slate-900 font-extrabold text-sm">{orderData.customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Registered Phone</span>
                <span className="text-slate-900 font-mono font-bold text-sm">{orderData.customerPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Delivery Destination</span>
                <span className="text-slate-800 text-xs leading-relaxed">{orderData.deliveryAddress}</span>
              </div>
              {orderData.notes && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Customer Notes</span>
                  <span className="text-slate-700 italic">"{orderData.notes}"</span>
                </div>
              )}
            </div>

            {/* WhatsApp Contact Hotline CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-extrabold text-sm sm:text-base">Need instant delivery update or payment confirmation?</div>
                <p className="text-xs text-emerald-100">Our customer care staff is active on WhatsApp to assist you.</p>
              </div>

              <a
                href={`https://wa.me/917899787101?text=${encodeURIComponent(
                  `Hello Kwality Gas, I am checking the status of my LPG Order ID: ${orderData.orderNumber}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 text-emerald-800 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0 transition-transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-700" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Security & Service Guarantee Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-1.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">Electronic Tare Tested</h4>
            <p className="text-[11px] text-slate-500">Every cylinder is checked for correct weight before vehicle dispatch.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-1.5">
            <Truck className="w-6 h-6 text-[#1769AA] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">Doorstep Refill Logistics</h4>
            <p className="text-[11px] text-slate-500">Fast delivery across Bangalore, Hosur, and Dharwad territories.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-1.5">
            <Flame className="w-6 h-6 text-[#F28C28] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">100% Blue Flame Purity</h4>
            <p className="text-[11px] text-slate-500">Soot-free combustion engineered for households and commercial kitchens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

