"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  DollarSign,
  User,
  Package,
  Calendar,
  X,
  ChevronDown,
  Edit,
  Trash2,
  FileText,
  Download,
  Building,
} from "lucide-react";

interface OrderItem {
  id: string;
  productName: string;
  capacity?: string | null;
  unitPrice?: number | null;
  quantity: number;
  lineTotal?: number | null;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  deliveryAddress: string;
  orderType: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
  subtotal?: number | null;
  notes?: string | null;
  status:
    | "NEW"
    | "WHATSAPP_CONTACT_PENDING"
    | "WHATSAPP_CONTACTED"
    | "PAYMENT_PENDING"
    | "PAYMENT_CONFIRMED"
    | "PROCESSING"
    | "DISPATCHED"
    | "DELIVERED"
    | "CANCELLED";
  paymentStatus: "PENDING" | "CONFIRMED" | "FAILED" | "REFUNDED";
  dealerId?: string | null;
  dealer?: { id: string; businessName: string; territory: string; phone: string } | null;
  customer?: { id: string; name: string; email: string; category: string } | null;
  adminNotes?: string | null;
  paymentNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  whatsappSentAt?: string | null;
  paymentConfirmedAt?: string | null;
  dispatchedAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  items: OrderItem[];
}

interface DealerOption {
  id: string;
  businessName: string;
  territory: string;
  phone: string;
}

interface OrdersAdminClientProps {
  initialOrders: Order[];
  dealers: DealerOption[];
}

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; bg: string; text: string; border: string }
> = {
  NEW: { label: "New Order", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  WHATSAPP_CONTACT_PENDING: {
    label: "WhatsApp Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  WHATSAPP_CONTACTED: {
    label: "WhatsApp Contacted",
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
  },
  PAYMENT_PENDING: {
    label: "Payment Pending",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  PAYMENT_CONFIRMED: {
    label: "Payment Confirmed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  PROCESSING: {
    label: "Processing / Filling",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  DISPATCHED: {
    label: "Dispatched",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  DELIVERED: {
    label: "Delivered",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-300",
  },
};

const PAYMENT_CONFIG: Record<
  Order["paymentStatus"],
  { label: string; bg: string; text: string; border: string }
> = {
  PENDING: { label: "Payment Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  CONFIRMED: { label: "Paid Confirmed", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  FAILED: { label: "Payment Failed", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  REFUNDED: { label: "Refunded", bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300" },
};

export default function OrdersAdminClient({ initialOrders, dealers }: OrdersAdminClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [dealerFilter, setDealerFilter] = useState<string>("ALL");

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editAdminNotes, setEditAdminNotes] = useState("");
  const [editPaymentNotes, setEditPaymentNotes] = useState("");
  const [selectedDealerId, setSelectedDealerId] = useState<string>("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (paymentFilter !== "ALL") params.set("paymentStatus", paymentFilter);
      if (typeFilter !== "ALL") params.set("orderType", typeFilter);
      if (dealerFilter !== "ALL") params.set("dealerId", dealerFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Error refreshing orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    setStatusUpdatingId(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, ...data.order } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, ...data.order } : null));
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: Order["paymentStatus"]) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, paymentStatus: newPaymentStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, ...data.order } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, ...data.order } : null));
        }
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  const handleDealerChange = async (orderId: string, newDealerId: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, dealerId: newDealerId }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, ...data.order } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, ...data.order } : null));
        }
      }
    } catch (err) {
      console.error("Error assigning dealer:", err);
    }
  };

  const handleSaveModalUpdates = async () => {
    if (!selectedOrder) return;
    setSavingNotes(true);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder.id,
          adminNotes: editAdminNotes,
          paymentNotes: editPaymentNotes,
          dealerId: selectedDealerId || "NONE",
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? { ...o, ...data.order } : o))
        );
        setSelectedOrder((prev) => (prev ? { ...prev, ...data.order } : null));
      }
    } catch (err) {
      console.error("Error saving modal updates:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order record? This cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/orders?id=${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(null);
        }
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setEditAdminNotes(order.adminNotes || "");
    setEditPaymentNotes(order.paymentNotes || "");
    setSelectedDealerId(order.dealerId || "");
  };

  const getAdminWhatsAppUrl = (order: Order) => {
    const phone = order.customerPhone.replace(/\D/g, "");
    let text = `Hello ${order.customerName},\n\n`;
    text += `This is Kwality Gas Bottlers dispatch office regarding your LPG order *${order.orderNumber}*.\n\n`;
    text += `We have received your request for:\n`;
    order.items.forEach((it) => {
      text += `• ${it.productName} (${it.capacity || "Standard"}) × ${it.quantity} Qty\n`;
    });
    text += `\nDelivery Address: ${order.deliveryAddress}\n\n`;
    text += `Payment Status: ${order.paymentStatus === "CONFIRMED" ? "PAID & CONFIRMED" : "PENDING CONFIRMATION"}\n\n`;
    text += `Please let us know your preferred delivery slot.\n\nThank you,\nKwality Gas Customer Care\nHotline: +91 78997 87101`;

    return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
  };

  // CSV Export for filtered orders
  const exportOrdersCSV = () => {
    let csv = "Order Number,Date,Customer Name,Phone,Order Type,Subtotal,Order Status,Payment Status,Assigned Dealer,Delivery Address\n";
    filtered.forEach((o) => {
      const dName = o.dealer?.businessName ? `"${o.dealer.businessName}"` : "Unassigned";
      csv += `"${o.orderNumber}","${new Date(o.createdAt).toISOString()}","${o.customerName}","+91 ${o.customerPhone}","${o.orderType}",${o.subtotal || 0},"${o.status}","${o.paymentStatus}",${dName},"${o.deliveryAddress.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kwality-gas-orders-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // In-memory Filter
  const filtered = orders.filter((o) => {
    if (statusFilter !== "ALL" && o.status !== statusFilter) return false;
    if (paymentFilter !== "ALL" && o.paymentStatus !== paymentFilter) return false;
    if (typeFilter !== "ALL" && o.orderType !== typeFilter) return false;
    if (dealerFilter !== "ALL") {
      if (dealerFilter === "UNASSIGNED" && o.dealerId) return false;
      if (dealerFilter !== "UNASSIGNED" && o.dealerId !== dealerFilter) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.includes(q);
      const matchAddress = o.deliveryAddress.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchPhone && !matchAddress) return false;
    }
    return true;
  });

  const countNew = orders.filter((o) => o.status === "NEW").length;
  const countPendingPayment = orders.filter((o) => o.paymentStatus === "PENDING").length;
  const countPaid = orders.filter((o) => o.paymentStatus === "CONFIRMED").length;
  const countDelivered = orders.filter((o) => o.status === "DELIVERED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>WhatsApp E-Commerce Order Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Orders & Dispatches
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time orders recorded in TiDB database and fulfilled through official WhatsApp hotline (+91 78997 87101).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={exportOrdersCSV}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all"
            title="Export Filtered Orders to CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV ({filtered.length})</span>
          </button>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">New Orders</span>
            <div className="text-2xl font-black text-blue-600 mt-0.5">{countNew}</div>
            <span className="text-[10px] text-slate-400">Awaiting contact</span>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment Pending</span>
            <div className="text-2xl font-black text-amber-600 mt-0.5">{countPendingPayment}</div>
            <span className="text-[10px] text-amber-700 font-bold">Unpaid orders</span>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment Confirmed</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">{countPaid}</div>
            <span className="text-[10px] text-emerald-700 font-bold">Manual admin verified</span>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Delivered</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{countDelivered}</div>
            <span className="text-[10px] text-slate-400">Total fulfilled</span>
          </div>
          <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, phone, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          >
            <option value="ALL">All Order Statuses ({orders.length})</option>
            <option value="NEW">New Order</option>
            <option value="WHATSAPP_CONTACT_PENDING">WhatsApp Pending</option>
            <option value="WHATSAPP_CONTACTED">WhatsApp Contacted</option>
            <option value="PAYMENT_PENDING">Payment Pending</option>
            <option value="PAYMENT_CONFIRMED">Payment Confirmed</option>
            <option value="PROCESSING">Processing / Filling</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          >
            <option value="ALL">All Payments</option>
            <option value="PENDING">Pending Payment</option>
            <option value="CONFIRMED">Payment Confirmed</option>
            <option value="FAILED">Payment Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>

          {/* Segment Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          >
            <option value="ALL">All Segments</option>
            <option value="DOMESTIC">Domestic</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="INDUSTRIAL">Industrial</option>
          </select>

          {/* Dealer Filter */}
          <select
            value={dealerFilter}
            onChange={(e) => setDealerFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          >
            <option value="ALL">All Dealers</option>
            <option value="UNASSIGNED">Unassigned Only</option>
            {dealers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.businessName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">No orders found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {search || statusFilter !== "ALL" || paymentFilter !== "ALL"
                ? "Try adjusting your search criteria or clearing filters."
                : "No customer order requests have been received yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order Reference</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Ordered Cylinders</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4">Assigned Dealer</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((order) => {
                  const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.NEW;
                  const paymentInfo = PAYMENT_CONFIG[order.paymentStatus] || PAYMENT_CONFIG.PENDING;
                  const dateStr = new Date(order.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Order Details */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-mono font-extrabold text-[#102A43]">{order.orderNumber}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </div>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                            order.orderType === "INDUSTRIAL"
                              ? "bg-slate-100 text-slate-800"
                              : order.orderType === "COMMERCIAL"
                              ? "bg-blue-50 text-[#1769AA]"
                              : "bg-orange-50 text-[#F28C28]"
                          }`}
                        >
                          {order.orderType}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-slate-900">{order.customerName}</div>
                        <div className="text-slate-600 font-mono text-[11px] mt-0.5">
                          +91 {order.customerPhone}
                        </div>
                        <div className="text-[11px] text-slate-500 max-w-xs truncate mt-0.5 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                          <span className="truncate">{order.deliveryAddress}</span>
                        </div>
                      </td>

                      {/* Ordered Items */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1">
                          {order.items.map((it) => (
                            <div key={it.id} className="text-[11px] text-slate-800">
                              <span className="font-bold text-slate-900">
                                {it.quantity}× {it.productName}
                              </span>
                              {it.capacity && (
                                <span className="text-slate-500 ml-1">({it.capacity})</span>
                              )}
                            </div>
                          ))}
                          {order.subtotal && (
                            <div className="font-bold text-slate-900 pt-1">
                              ₹{Number(order.subtotal).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Payment Status Dropdown (Manual Update) */}
                      <td className="py-3.5 px-4 align-top">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handlePaymentStatusChange(order.id, e.target.value as Order["paymentStatus"])
                          }
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${paymentInfo.bg} ${paymentInfo.text} ${paymentInfo.border}`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Paid Confirmed</option>
                          <option value="FAILED">Failed</option>
                          <option value="REFUNDED">Refunded</option>
                        </select>
                      </td>

                      {/* Order Status Dropdown */}
                      <td className="py-3.5 px-4 align-top">
                        <select
                          value={order.status}
                          disabled={statusUpdatingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as Order["status"])
                          }
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                        >
                          <option value="NEW">New Order</option>
                          <option value="WHATSAPP_CONTACT_PENDING">WhatsApp Pending</option>
                          <option value="WHATSAPP_CONTACTED">WhatsApp Contacted</option>
                          <option value="PAYMENT_PENDING">Payment Pending</option>
                          <option value="PAYMENT_CONFIRMED">Payment Confirmed</option>
                          <option value="PROCESSING">Processing / Filling</option>
                          <option value="DISPATCHED">Dispatched</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>

                      {/* Assigned Dealer */}
                      <td className="py-3.5 px-4 align-top">
                        <select
                          value={order.dealerId || ""}
                          onChange={(e) => handleDealerChange(order.id, e.target.value)}
                          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
                        >
                          <option value="">Unassigned</option>
                          {dealers.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.businessName} ({d.territory})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Direct Actions */}
                      <td className="py-3.5 px-4 align-top text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* WhatsApp Chat */}
                          <a
                            href={getAdminWhatsAppUrl(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors border border-emerald-200"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4 fill-emerald-600" />
                          </a>

                          {/* Call */}
                          <a
                            href={`tel:+91${order.customerPhone}`}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-[#1769AA] rounded-xl transition-colors border border-blue-200"
                            title="Call Customer Directly"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Full Details Modal */}
                          <button
                            onClick={() => openOrderDetails(order)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                            title="View Full Order Details & Notes"
                          >
                            <FileText className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors border border-red-200"
                            title="Delete Order Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details & Notes Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Order Breakdown & Audit Record
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-500 font-bold block uppercase text-[10px]">Customer Name</span>
                <span className="text-slate-900 font-extrabold text-sm">{selectedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block uppercase text-[10px]">Mobile Number</span>
                <span className="text-slate-900 font-mono font-bold">+91 {selectedOrder.customerPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 font-bold block uppercase text-[10px]">Delivery Address</span>
                <span className="text-slate-800">{selectedOrder.deliveryAddress}</span>
              </div>
              {selectedOrder.notes && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 font-bold block uppercase text-[10px]">Customer Instructions</span>
                  <span className="text-slate-700 italic">"{selectedOrder.notes}"</span>
                </div>
              )}
            </div>

            {/* Ordered Items List */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Ordered Products ({selectedOrder.items.length})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="p-3.5 bg-white flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{it.productName}</span>
                      {it.capacity && <span className="text-slate-500 ml-1.5">({it.capacity})</span>}
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-slate-900">Qty: {it.quantity}</span>
                      {it.unitPrice && (
                        <div className="text-[11px] text-slate-500">₹{it.unitPrice} each</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assign Dealer */}
            <div className="space-y-1 text-xs">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Assign Regional Dealer / Distributor
              </label>
              <select
                value={selectedDealerId}
                onChange={(e) => setSelectedDealerId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
              >
                <option value="">Unassigned (Kwality Direct Dispatch)</option>
                {dealers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.businessName} — {d.territory} (+91 {d.phone})
                  </option>
                ))}
              </select>
            </div>

            {/* Admin & Payment Notes */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Internal Dispatch & Admin Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes on cylinder tare weight, delivery vehicle assignment, delivery time slot..."
                  value={editAdminNotes}
                  onChange={(e) => setEditAdminNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Payment Verification Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="UPI transaction reference, bank transfer verification, cash collection receipt..."
                  value={editPaymentNotes}
                  onChange={(e) => setEditPaymentNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveModalUpdates}
                  disabled={savingNotes}
                  className="bg-[#102A43] hover:bg-[#F28C28] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {savingNotes ? "Saving Updates..." : "Save Order Notes & Dealer"}
                </button>
              </div>
            </div>

            {/* Timestamps audit */}
            <div className="p-3 bg-slate-100 rounded-2xl text-[10px] text-slate-500 space-y-1">
              <div>Order Placed: {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}</div>
              {selectedOrder.paymentConfirmedAt && (
                <div>Payment Confirmed: {new Date(selectedOrder.paymentConfirmedAt).toLocaleString("en-IN")}</div>
              )}
              {selectedOrder.dispatchedAt && (
                <div>Dispatched: {new Date(selectedOrder.dispatchedAt).toLocaleString("en-IN")}</div>
              )}
              {selectedOrder.deliveredAt && (
                <div>Delivered: {new Date(selectedOrder.deliveredAt).toLocaleString("en-IN")}</div>
              )}
            </div>

            {/* Footer Direct WhatsApp Link */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <a
                href={getAdminWhatsAppUrl(selectedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Chat with Customer</span>
              </a>

              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
