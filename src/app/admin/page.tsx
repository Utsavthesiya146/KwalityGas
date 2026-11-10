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
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  let totalEnquiries = 0;
  let newEnquiries = 0;
  let totalOrders = 0;
  let newOrders = 0;
  let recentOrders: any[] = [];
  let totalProducts = 0;
  let totalTestimonials = 0;
  let totalSocial = 0;
  let totalSlides = 0;
  let recentEnquiries: any[] = [];
  let recentProducts: any[] = [];
  let priceStates: any[] = [];

  try {
    const results = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.product.count(),
      prisma.testimonial.count(),
      prisma.enquiry.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.findMany({
        take: 5,
        include: { category: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.priceListState.findMany({
        include: { items: true },
      }),
      prisma.socialMediaLink.count({ where: { isActive: true } }),
      prisma.heroSlide.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.order.findMany({
        take: 5,
        include: { items: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    totalEnquiries = results[0];
    newEnquiries = results[1];
    totalProducts = results[2];
    totalTestimonials = results[3];
    recentEnquiries = results[4];
    recentProducts = results[5];
    priceStates = results[6];
    totalSocial = results[7];
    totalSlides = results[8];
    totalOrders = results[9];
    newOrders = results[10];
    recentOrders = results[11];
  } catch (err) {
    console.error("Admin dashboard fetch error:", err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Kwality Gas Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Monitor incoming cylinder refills, manage state price lists, and update live website content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/orders"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>WhatsApp Orders ({newOrders} New)</span>
          </Link>
          <Link
            href="/admin/price-list"
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Update LPG Prices</span>
          </Link>
          <Link
            href="/admin/hero-slider"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Hero Slider ({totalSlides})</span>
          </Link>
          <Link
            href="/admin/social-media"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Channels ({totalSocial})</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Review Enquiries ({newEnquiries} New)</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Orders</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalOrders}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">{newOrders} New orders</p>
          </div>
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalEnquiries}</h3>
            <p className="text-xs text-amber-600 font-bold mt-1">{newEnquiries} New pending</p>
          </div>
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">LPG Products</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalProducts}</h3>
            <p className="text-xs text-blue-600 font-bold mt-1">Cylinders & Geysers</p>
          </div>
          <div className="p-3 bg-blue-100 text-brand-blue rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price Lists</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{priceStates.length} States</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">KA & TN Tariff</p>
          </div>
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
            <Tag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reviews</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalTestimonials}</h3>
            <p className="text-xs text-brand-orange font-bold mt-1">Verified client stories</p>
          </div>
          <div className="p-3 bg-orange-100 text-brand-orange rounded-2xl">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent WhatsApp Orders Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Recent WhatsApp Cylinder Orders</h2>
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
            <p className="text-xs text-slate-400">No WhatsApp orders placed yet.</p>
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
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {ord.customerName} <span className="text-slate-400 font-normal">(+91 {ord.customerPhone})</span>
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
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Quick Management Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/admin/products"
                className="p-3 bg-slate-50 hover:bg-brand-blue-surface text-slate-800 hover:text-brand-blue rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-brand-orange" />
                <span>Add Product</span>
              </Link>

              <Link
                href="/admin/price-list"
                className="p-3 bg-slate-50 hover:bg-brand-blue-surface text-slate-800 hover:text-brand-blue rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-brand-orange" />
                <span>Edit Prices</span>
              </Link>

              <Link
                href="/admin/testimonials"
                className="p-3 bg-slate-50 hover:bg-brand-blue-surface text-slate-800 hover:text-brand-blue rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-brand-orange" />
                <span>Testimonials</span>
              </Link>

              <Link
                href="/admin/seo"
                className="p-3 bg-slate-50 hover:bg-brand-blue-surface text-slate-800 hover:text-brand-blue rounded-xl border border-slate-100 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-brand-orange" />
                <span>SEO Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

