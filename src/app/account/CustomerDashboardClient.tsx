"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  LogOut,
  ArrowRight,
  Flame,
  Building,
  Edit2,
  Save,
  X,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface CustomerDashboardClientProps {
  customer: any;
}

export default function CustomerDashboardClient({ customer: initialCustomer }: CustomerDashboardClientProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState(initialCustomer);
  const [orders, setOrders] = useState<any[]>(initialCustomer?.orders || []);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Edit fields
  const [name, setName] = useState(customer?.name || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [deliveryAddress, setDeliveryAddress] = useState(customer?.deliveryAddress || "");
  const [city, setCity] = useState(customer?.city || "");
  const [companyName, setCompanyName] = useState(customer?.companyName || "");

  const handleLogout = async () => {
    await fetch("/api/customer/logout", { method: "POST" });
    router.push("/account/login");
    router.refresh();
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch("/api/customer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          deliveryAddress,
          city,
          companyName,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update profile");
      }

      setCustomer((prev: any) => ({
        ...prev,
        name,
        phone,
        deliveryAddress,
        city,
        companyName,
      }));
      setIsEditing(false);
      setMsg({ text: "Profile details updated successfully!", type: "success" });
    } catch (err: any) {
      setMsg({ text: err.message || "Failed to update profile", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#F28C28] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#0B1D2F] to-[#102A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-[#F28C28] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-[#F28C28]" />
              <span>{customer.category} Customer Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome, {customer.name}
            </h1>
            <p className="text-xs text-slate-300">
              Registered Phone: +91 {customer.phone} • Email: {customer.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Book New Refill</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {msg && (
          <div
            className={`p-4 rounded-2xl flex items-start gap-2.5 text-xs ${
              msg.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {msg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Profile Details (Col 1) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-[#1769AA]" />
                <span>Customer Profile</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-[#1769AA] hover:text-[#F28C28] font-bold inline-flex items-center gap-1 transition-colors"
              >
                {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                <span>{isEditing ? "Cancel" : "Edit"}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSave} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                {customer.category !== "DOMESTIC" && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company / Establishment</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Default Delivery Address</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">City / Region</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#102A43] hover:bg-[#F28C28] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Name</span>
                  <span className="text-slate-900 font-bold">{customer.name}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">WhatsApp Phone</span>
                  <span className="text-slate-900 font-mono font-bold">+91 {customer.phone}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Email</span>
                  <span className="text-slate-700">{customer.email}</span>
                </div>

                {customer.companyName && (
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Establishment</span>
                    <span className="text-slate-800 font-bold">{customer.companyName}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Default Delivery Address</span>
                  <span className="text-slate-800 leading-relaxed block mt-0.5">
                    {customer.deliveryAddress || "Not set yet. Click Edit to add."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Orders History (Col 2 & 3) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-slate-900">Your LPG Cylinder Bookings</h2>
                <p className="text-xs text-slate-500">Track delivery status or reorder previous cylinders</p>
              </div>
              <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                {orders.length} Total
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">No bookings yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our certified LPG cylinders and instant water heaters to place your first WhatsApp order.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-[#F28C28] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-[#102A43] text-xs">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-50 text-blue-700">
                            {ord.orderType}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(ord.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase ${
                            ord.status === "DELIVERED"
                              ? "bg-emerald-100 text-emerald-800"
                              : ord.status === "DISPATCHED"
                              ? "bg-purple-100 text-purple-800"
                              : ord.status === "CANCELLED"
                              ? "bg-slate-200 text-slate-600"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          Status: {ord.status.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-1 text-xs">
                      {ord.items.map((it: any) => (
                        <div key={it.id} className="flex justify-between text-slate-800">
                          <span>
                            {it.quantity}× {it.productName} {it.capacity && `(${it.capacity})`}
                          </span>
                          {it.lineTotal && (
                            <span className="font-bold text-slate-900">₹{Number(it.lineTotal).toFixed(2)}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                      {ord.subtotal ? (
                        <div className="font-bold text-slate-900">
                          Total: <span className="text-[#F28C28]">₹{Number(ord.subtotal).toFixed(2)}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400">Price confirmed on WhatsApp</div>
                      )}

                      <Link
                        href={`/track-order`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1769AA] hover:text-[#F28C28] transition-colors"
                      >
                        <span>Track Live Status</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

