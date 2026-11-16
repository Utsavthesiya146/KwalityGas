import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Inbox,
  Package,
  Tag,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Flame,
  Plus,
  Share2,
  Sliders,
  ShoppingBag,
  Truck,
  Users,
  BarChart3,
  Phone,
  Building,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  let totalEnquiries = 0;
  let newEnquiries = 0;
  let totalOrders = 0;
  let newOrders = 0;
  let whatsappPendingOrders = 0;
  let paymentPendingOrders = 0;
  let paymentConfirmedOrders = 0;
  let processingOrders = 0;
  let dispatchedOrders = 0;
  let deliveredOrders = 0;
  let cancelledOrders = 0;
  let confirmedRevenue = 0;
  let totalDealers = 0;
  let totalCustomers = 0;
  let recentOrders: any[] = [];
  let totalProducts = 0;
  let recentEnquiries: any[] = [];
  let priceStates: any[] = [];

  try {
    const results = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.product.count(),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.priceListState.findMany({
        include: { items: true },
      }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.order.count({ where: { status: "WHATSAPP_CONTACT_PENDING" } }),
      prisma.order.count({ where: { paymentStatus: "PENDING" } }),
      prisma.order.count({ where: { paymentStatus: "CONFIRMED" } }),
      prisma.order.count({ where: { status: "PROCESSING" } }),
      prisma.order.count({ where: { status: "DISPATCHED" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
      prisma.dealer.count({ where: { isActive: true } }),
      prisma.customer.count(),
      prisma.order.findMany({
        take: 6,
        include: {
          items: true,
          dealer: { select: { businessName: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.findMany({
        where: { paymentStatus: "CONFIRMED" },
        select: { subtotal: true },
      }),
    ]);

    totalEnquiries = results[0];
    newEnquiries = results[1];
    totalProducts = results[2];
    recentEnquiries = results[3];
    priceStates = results[4];
    totalOrders = results[5];
    newOrders = results[6];
    whatsappPendingOrders = results[7];
    paymentPendingOrders = results[8];
    paymentConfirmedOrders = results[9];
    processingOrders = results[10];
    dispatchedOrders = results[11];
    deliveredOrders = results[12];
    cancelledOrders = results[13];
    totalDealers = results[14];
    totalCustomers = results[15];
    recentOrders = results[16];

    const confirmedOrdersList = results[17] || [];
    confirmedRevenue = confirmedOrdersList.reduce((sum, o) => sum + (Number(o.subtotal) || 0), 0);
  } catch (err) {
    console.error("Admin dashboard fetch error:", err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-blue-dark to-[#041624] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-3.5 h-3.5 fill-[#F28C28]" />
            <span>Enterprise Business Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Kwality Gas Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Real-time management of WhatsApp cylinder bookings, dealers, payments, and plant logistics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/orders"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 fill-white" />
            <span>Orders ({newOrders} New)</span>
          </Link>
          <Link
            href="/admin/dealers"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Dealers ({totalDealers})</span>
          </Link>
          <Link
            href="/admin/customers"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customers ({totalCustomers})</span>
          </Link>
          <Link
            href="/admin/reports"
            className="bg-[#F28C28] hover:bg-[#D9771A] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Reports & Analytics</span>
          </Link>
        </div>
      </div>

      {/* Main KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Orders */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{totalOrders}</h3>
            <p className="text-[10px] text-blue-600 font-bold mt-0.5">{newOrders} New Orders</p>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        {/* WhatsApp Pending */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp Pending</p>
            <h3 className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">{whatsappPendingOrders}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Need contact</p>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Payment Pending */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Payment Pending</p>
            <h3 className="text-xl sm:text-2xl font-black text-orange-600 mt-0.5">{paymentPendingOrders}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Awaiting verification</p>
          </div>
          <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Payment Confirmed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Payment Confirmed</p>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">{paymentConfirmedOrders}</h3>
            <p className="text-[10px] text-emerald-700 font-bold mt-0.5">₹{confirmedRevenue.toFixed(0)}</p>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Dispatched & In Transit */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">In Transit</p>
            <h3 className="text-xl sm:text-2xl font-black text-purple-600 mt-0.5">{dispatchedOrders}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Dispatched cylinders</p>
          </div>
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Delivered</p>
            <h3 className="text-xl sm:text-2xl font-black text-green-700 mt-0.5">{deliveredOrders}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Fulfilled orders</p>
          </div>
          <div className="p-2.5 bg-green-50 text-green-700 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Order Status Distribution Strip */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-900 uppercase tracking-wider">
            Live Order Pipeline Status Breakdown
          </span>
          <Link href="/admin/orders" className="font-bold text-[#1769AA] hover:underline flex items-center gap-1">
            <span>Manage Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-[10px] font-bold text-blue-700 block">New</span>
            <span className="font-black text-sm text-blue-900">{newOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-[10px] font-bold text-amber-700 block">WA Pending</span>
            <span className="font-black text-sm text-amber-900">{whatsappPendingOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
            <span className="text-[10px] font-bold text-teal-700 block">Contacted</span>
            <span className="font-black text-sm text-teal-900">
              {totalOrders - newOrders - whatsappPendingOrders - dispatchedOrders - deliveredOrders - cancelledOrders > 0
                ? totalOrders - newOrders - whatsappPendingOrders - dispatchedOrders - deliveredOrders - cancelledOrders
                : 0}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-orange-50 border border-orange-100">
            <span className="text-[10px] font-bold text-orange-700 block">Pay Pending</span>
            <span className="font-black text-sm text-orange-900">{paymentPendingOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-700 block">Pay Confirmed</span>
            <span className="font-black text-sm text-emerald-900">{paymentConfirmedOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
            <span className="text-[10px] font-bold text-indigo-700 block">Processing</span>
            <span className="font-black text-sm text-indigo-900">{processingOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
            <span className="text-[10px] font-bold text-purple-700 block">Dispatched</span>
            <span className="font-black text-sm text-purple-900">{dispatchedOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-green-50 border border-green-100">
            <span className="text-[10px] font-bold text-green-700 block">Delivered</span>
            <span className="font-black text-sm text-green-900">{deliveredOrders}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 block">Cancelled</span>
            <span className="font-black text-sm text-slate-800">{cancelledOrders}</span>
          </div>
        </div>
      </div>

      {/* Recent WhatsApp Orders Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500">Live order requests received through the online shopping cart</p>
            </div>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Manage All Orders ({totalOrders})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-xs text-slate-400">No orders placed yet.</p>
            <Link
              href="/products"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#1769AA] font-bold hover:underline"
            >
              <span>Visit Public Products Catalog to place test order</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-[#102A43] text-xs">{ord.orderNumber}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-50 text-blue-700">
                      {ord.orderType}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        ord.paymentStatus === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ord.paymentStatus === "CONFIRMED" ? "PAID" : "PAYMENT PENDING"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {ord.customerName} <span className="text-slate-400 font-normal">(+91 {ord.customerPhone})</span>
                    {ord.dealer?.businessName && (
                      <span className="text-slate-500 text-[11px] ml-2">
                        • Assigned: {ord.dealer.businessName}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {ord.items.map((it: any) => `${it.quantity}x ${it.productName}`).join(", ")}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {ord.subtotal && (
                    <span className="text-xs font-bold text-slate-900">₹{Number(ord.subtotal).toFixed(2)}</span>
                  )}
                  <Link
                    href="/admin/orders"
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Columns: Recent Enquiries & Active Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Customer Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900">Recent Customer Submissions</h2>
              <p className="text-xs text-slate-500">Real-time enquiries from domestic, commercial, and industrial forms</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
            >
              <span>View All ({totalEnquiries})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEnquiries.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No enquiries submitted yet.</p>
            ) : (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{enq.customerName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.enquiryType === "DOMESTIC"
                            ? "bg-blue-100 text-blue-800"
                            : enq.enquiryType === "COMMERCIAL"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.enquiryType}
                      </span>
                      {enq.status === "NEW" && (
                        <span className="text-[9px] font-bold bg-rose-600 text-white px-1.5 py-0.2 rounded animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600">
                      Phone: <a href={`tel:${enq.phone}`} className="font-semibold text-brand-blue">{enq.phone}</a>
                      {enq.companyName && ` • Establishment: ${enq.companyName}`}
                    </p>

                    <p className="text-[11px] text-slate-400">
                      Received {formatDate(enq.createdAt)}
                    </p>
                  </div>

                  <Link
                    href={`/admin/enquiries`}
                    className="text-xs font-bold text-slate-600 hover:text-brand-orange shrink-0 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Price Lists Preview & Quick Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Price Notice Box */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-orange" />
                <span>Active Price Schedules</span>
              </h3>
              <Link href="/admin/price-list" className="text-xs font-bold text-brand-orange hover:underline">
                Edit
              </Link>
            </div>

            <div className="space-y-3">
              {priceStates.map((st) => (
                <div key={st.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-slate-900">{st.stateName} Tariff</h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {st.wefNotice}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Effective: {st.effectiveDate}</p>
                  <p className="text-[11px] text-slate-600">{st.items.length} active cylinder capacities configured</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Quick Management Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/admin/orders"
                className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>Orders</span>
              </Link>

              <Link
                href="/admin/dealers"
                className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Dealers</span>
              </Link>

              <Link
                href="/admin/customers"
                className="p-3 bg-slate-50 hover:bg-orange-50 text-slate-800 hover:text-orange-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-orange-600" />
                <span>Customers</span>
              </Link>

              <Link
                href="/admin/reports"
                className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Analytics</span>
              </Link>

              <Link
                href="/admin/products"
                className="p-3 bg-slate-50 hover:bg-brand-blue-surface text-slate-800 hover:text-brand-blue rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-brand-orange" />
                <span>Products</span>
              </Link>

              <Link
                href="/admin/price-list"
                className="p-3 bg-slate-50 hover:bg-brand-blue-surface text-slate-800 hover:text-brand-blue rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-brand-orange" />
                <span>Prices</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
