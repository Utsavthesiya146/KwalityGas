"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  Truck,
  Users,
  CheckCircle2,
  Clock,
  RefreshCw,
  FileSpreadsheet,
  Flame,
  Building,
  Briefcase
} from "lucide-react";

export default function ReportsAdminClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/reports");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load reports");
      }
      setData(json);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // CSV Export Utilities
  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportProductReport = () => {
    if (!data?.topProducts) return;
    let csv = "Product Name,Capacity,Total Quantity Ordered,Confirmed Revenue (INR)\n";
    data.topProducts.forEach((p: any) => {
      csv += `"${p.name}","${p.capacity}",${p.quantity},${p.revenue.toFixed(2)}\n`;
    });
    downloadCSV(csv, `kwality-gas-product-report-${new Date().toISOString().split("T")[0]}.csv`);
  };

  const exportDealerReport = () => {
    if (!data?.dealerPerformance) return;
    let csv = "Dealer / Agency Name,Territory,Assigned Orders,Confirmed Revenue (INR)\n";
    data.dealerPerformance.forEach((d: any) => {
      csv += `"${d.name}","${d.territory}",${d.orderCount},${d.revenue.toFixed(2)}\n`;
    });
    downloadCSV(csv, `kwality-gas-dealers-performance-${new Date().toISOString().split("T")[0]}.csv`);
  };

  const exportDailyReport = () => {
    if (!data?.dailyTrends) return;
    let csv = "Date,Total Orders,Confirmed Revenue (INR)\n";
    data.dailyTrends.forEach((t: any) => {
      csv += `"${t.date}",${t.orders},${t.revenue.toFixed(2)}\n`;
    });
    downloadCSV(csv, `kwality-gas-daily-trends-${new Date().toISOString().split("T")[0]}.csv`);
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-[#1769AA] animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Aggregating LPG Order Analytics & Dealer Reports...
        </p>
      </div>
    );
  }

  if (errorMsg || !data) {
    return (
      <div className="p-8 text-center space-y-3 bg-white rounded-3xl border border-red-200">
        <p className="text-xs text-red-600 font-bold">{errorMsg || "Failed to load analytics data"}</p>
        <button
          onClick={fetchReports}
          className="px-4 py-2 bg-[#102A43] text-white rounded-xl text-xs font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { summary, statusCounts, paymentStatusCounts, segmentBreakdown, topProducts, dealerPerformance, dailyTrends } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Executive Business Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            LPG Sales, Orders & Performance Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time business intelligence across cylinder bookings, payment reconciliations, and dealer distributions.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={exportProductReport}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all"
            title="Download Product CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Products CSV</span>
          </button>

          <button
            onClick={exportDealerReport}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all"
            title="Download Dealers CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
            <span>Dealers CSV</span>
          </button>

          <button
            onClick={exportDailyReport}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all"
            title="Download Daily Trends CSV"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Daily CSV</span>
          </button>

          <button
            onClick={fetchReports}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            title="Refresh Analytics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{summary.totalOrders}</div>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
              {summary.confirmedOrdersCount} Confirmed & Paid
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-[#1769AA] rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confirmed Revenue</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">₹{summary.totalRevenue.toFixed(2)}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Verified payment orders</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Payment</span>
            <div className="text-3xl font-black text-amber-600 mt-1">₹{summary.pendingRevenue.toFixed(2)}</div>
            <span className="text-[11px] text-amber-700 font-bold mt-1 block">
              {summary.pendingOrdersCount} In WhatsApp coordination
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fulfilled Deliveries</span>
            <div className="text-3xl font-black text-indigo-600 mt-1">{statusCounts.DELIVERED || 0}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">{statusCounts.DISPATCHED || 0} In Transit</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Truck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Segment Distribution & Payment Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segment Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-[#F28C28]" />
              <span>Customer Segment Breakdown</span>
            </h2>
            <span className="text-xs text-slate-500 font-bold">Domestic vs Commercial vs Industrial</span>
          </div>

          <div className="space-y-4">
            {/* Domestic */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Flame className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Domestic Households</span>
                </span>
                <span className="text-slate-900">
                  {segmentBreakdown.DOMESTIC.count} Orders • ₹{segmentBreakdown.DOMESTIC.revenue.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#F28C28] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${summary.totalOrders > 0 ? (segmentBreakdown.DOMESTIC.count / summary.totalOrders) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Commercial */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Briefcase className="w-3.5 h-3.5 text-[#1769AA]" />
                  <span>Commercial (HORECA)</span>
                </span>
                <span className="text-slate-900">
                  {segmentBreakdown.COMMERCIAL.count} Orders • ₹{segmentBreakdown.COMMERCIAL.revenue.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1769AA] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${summary.totalOrders > 0 ? (segmentBreakdown.COMMERCIAL.count / summary.totalOrders) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Industrial */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Building className="w-3.5 h-3.5 text-slate-800" />
                  <span>Heavy Industrial (33kg Manifold)</span>
                </span>
                <span className="text-slate-900">
                  {segmentBreakdown.INDUSTRIAL.count} Orders • ₹{segmentBreakdown.INDUSTRIAL.revenue.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-slate-800 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${summary.totalOrders > 0 ? (segmentBreakdown.INDUSTRIAL.count / summary.totalOrders) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Order Fulfillment Status Pipeline</span>
            </h2>
            <span className="text-xs text-slate-500 font-bold">{summary.totalOrders} Total Tracked</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-700 uppercase">New Orders</span>
              <div className="text-lg font-black text-blue-900 mt-0.5">{statusCounts.NEW || 0}</div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
              <span className="text-[10px] font-bold text-amber-700 uppercase">WhatsApp Pending</span>
              <div className="text-lg font-black text-amber-900 mt-0.5">{statusCounts.WHATSAPP_CONTACT_PENDING || 0}</div>
            </div>

            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100">
              <span className="text-[10px] font-bold text-teal-700 uppercase">Contacted</span>
              <div className="text-lg font-black text-teal-900 mt-0.5">{statusCounts.WHATSAPP_CONTACTED || 0}</div>
            </div>

            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
              <span className="text-[10px] font-bold text-orange-700 uppercase">Payment Pending</span>
              <div className="text-lg font-black text-orange-900 mt-0.5">{statusCounts.PAYMENT_PENDING || 0}</div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Payment Confirmed</span>
              <div className="text-lg font-black text-emerald-900 mt-0.5">{statusCounts.PAYMENT_CONFIRMED || 0}</div>
            </div>

            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">Filling / Process</span>
              <div className="text-lg font-black text-indigo-900 mt-0.5">{statusCounts.PROCESSING || 0}</div>
            </div>

            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Dispatched</span>
              <div className="text-lg font-black text-purple-900 mt-0.5">{statusCounts.DISPATCHED || 0}</div>
            </div>

            <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
              <span className="text-[10px] font-bold text-green-700 uppercase">Delivered</span>
              <div className="text-lg font-black text-green-900 mt-0.5">{statusCounts.DELIVERED || 0}</div>
            </div>

            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Cancelled</span>
              <div className="text-lg font-black text-slate-800 mt-0.5">{statusCounts.CANCELLED || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-100 text-[#F28C28] rounded-xl">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Product & Cylinder Volume Report</h2>
              <p className="text-xs text-slate-500">Breakdown of cylinder refill capacities and appliance units ordered</p>
            </div>
          </div>
          <button
            onClick={exportProductReport}
            className="text-xs font-bold text-[#1769AA] hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Product CSV</span>
          </button>
        </div>

        {topProducts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No products have been ordered yet. Place orders via the shopping cart to view analytics.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Units Ordered</th>
                  <th className="py-3 px-4 text-right">Confirmed Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.map((p: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px]">
                        {p.capacity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-800">{p.quantity} Units</td>
                    <td className="py-3 px-4 text-right font-black text-emerald-600">
                      ₹{p.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dealer Performance Rankings */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-[#1769AA] rounded-xl">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Dealer & Distributor Performance Rankings</h2>
              <p className="text-xs text-slate-500">Order volumes and revenues fulfilled per regional channel partner</p>
            </div>
          </div>
          <button
            onClick={exportDealerReport}
            className="text-xs font-bold text-[#1769AA] hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dealers CSV</span>
          </button>
        </div>

        {dealerPerformance.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No dealers registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Dealer / Distributor Name</th>
                  <th className="py-3 px-4">Territory</th>
                  <th className="py-3 px-4">Assigned Orders</th>
                  <th className="py-3 px-4 text-right">Confirmed Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dealerPerformance.map((d: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{d.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px]">
                        {d.territory}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-800">{d.orderCount} Orders</td>
                    <td className="py-3 px-4 text-right font-black text-emerald-600">
                      ₹{d.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

