"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
  ShoppingBag,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Calendar,
  FileText,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
  companyName?: string | null;
  gstNumber?: string | null;
  deliveryAddress?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  isActive: boolean;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
  orders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    subtotal: any;
    createdAt: string;
  }>;
}

interface CustomersAdminClientProps {
  initialCustomers: Customer[];
}

export default function CustomersAdminClient({ initialCustomers }: CustomersAdminClientProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "ALL") params.set("category", categoryFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/customers?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.customers)) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error("Failed to refresh customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (cust: Customer) => {
    try {
      const res = await fetch("/api/admin/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cust.id, isActive: !cust.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setCustomers((prev) =>
          prev.map((c) => (c.id === cust.id ? { ...c, isActive: !c.isActive } : c))
        );
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const filtered = customers.filter((c) => {
    if (categoryFilter !== "ALL" && c.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const mName = c.name.toLowerCase().includes(q);
      const mEmail = c.email.toLowerCase().includes(q);
      const mPhone = c.phone.includes(q);
      const mCompany = c.companyName?.toLowerCase().includes(q);
      const mAddress = c.deliveryAddress?.toLowerCase().includes(q);
      if (!mName && !mEmail && !mPhone && !mCompany && !mAddress) return false;
    }
    return true;
  });

  const domesticCount = customers.filter((c) => c.category === "DOMESTIC").length;
  const commercialCount = customers.filter((c) => c.category === "COMMERCIAL").length;
  const industrialCount = customers.filter((c) => c.category === "INDUSTRIAL").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#F28C28] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Customer Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Registered LPG Customers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse registered domestic households, commercial kitchens, and industrial accounts.
          </p>
        </div>

        <button
          onClick={fetchCustomers}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Registered</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{customers.length}</div>
            <span className="text-[10px] text-slate-400">All categories</span>
          </div>
          <div className="p-2.5 bg-blue-50 text-[#1769AA] rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Domestic</span>
            <div className="text-2xl font-black text-orange-600 mt-0.5">{domesticCount}</div>
            <span className="text-[10px] text-slate-400">12kg, 5.5kg, 4kg</span>
          </div>
          <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Commercial</span>
            <div className="text-2xl font-black text-blue-600 mt-0.5">{commercialCount}</div>
            <span className="text-[10px] text-slate-400">17kg & 21kg HORECA</span>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Industrial</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">{industrialCount}</div>
            <span className="text-[10px] text-slate-400">33kg LOT/VOT</span>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, email, phone, company, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          >
            <option value="ALL">All Categories ({customers.length})</option>
            <option value="DOMESTIC">Domestic ({domesticCount})</option>
            <option value="COMMERCIAL">Commercial ({commercialCount})</option>
            <option value="INDUSTRIAL">Industrial ({industrialCount})</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">No customers found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Customers register when ordering online or creating an account via the customer portal.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Delivery Address</th>
                  <th className="py-3.5 px-4">Order History</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Customer Info */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900">{cust.name}</div>
                      <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                        +91 {cust.phone}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{cust.email}</div>
                      {cust.companyName && (
                        <div className="text-[11px] font-semibold text-[#1769AA] mt-0.5">
                          {cust.companyName}
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 align-top">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          cust.category === "INDUSTRIAL"
                            ? "bg-slate-100 text-slate-800"
                            : cust.category === "COMMERCIAL"
                            ? "bg-blue-50 text-[#1769AA]"
                            : "bg-orange-50 text-[#F28C28]"
                        }`}
                      >
                        {cust.category}
                      </span>
                    </td>

                    {/* Address */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="text-[11px] text-slate-600 max-w-xs line-clamp-2">
                        {cust.deliveryAddress || "No address saved"}
                      </div>
                      {cust.city && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">{cust.city}</span>
                      )}
                    </td>

                    {/* Orders & Total Spend */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900">{cust.totalOrders} Orders</div>
                      {cust.totalSpent > 0 && (
                        <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                          ₹{cust.totalSpent.toFixed(2)} Spent
                        </div>
                      )}
                    </td>

                    {/* Active toggle */}
                    <td className="py-3.5 px-4 align-top">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(cust)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-colors ${
                          cust.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cust.isActive ? "Active" : "Suspended"}
                      </button>
                    </td>

                    {/* Direct Actions */}
                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Call */}
                        <a
                          href={`tel:+91${cust.phone}`}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-[#1769AA] rounded-xl transition-colors border border-blue-200"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/91${cust.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${cust.name}, this is Kwality Gas customer care regarding your LPG account.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors border border-emerald-200"
                          title="Chat with Customer on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        {/* Order History Details */}
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                          title="View Customer Order History"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Details Drawer */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-end p-0 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Customer History
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedCustomer.name}
                </h3>
                <span className="text-xs text-blue-600 font-bold">{selectedCustomer.category} Customer</span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Mobile Number:</span>
                <span className="text-slate-900 font-mono font-bold">+91 {selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Email:</span>
                <span className="text-slate-800">{selectedCustomer.email}</span>
              </div>
              {selectedCustomer.companyName && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Establishment:</span>
                  <span className="text-slate-900 font-bold">{selectedCustomer.companyName}</span>
                </div>
              )}
              {selectedCustomer.deliveryAddress && (
                <div>
                  <span className="text-slate-500 font-bold block uppercase text-[10px] mb-0.5">Delivery Address:</span>
                  <span className="text-slate-800 leading-relaxed">{selectedCustomer.deliveryAddress}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Registered On:</span>
                <span className="text-slate-700">
                  {new Date(selectedCustomer.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                </span>
              </div>
            </div>

            {/* Orders Section */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Recent Orders Placed ({selectedCustomer.orders.length})
              </h4>
              {selectedCustomer.orders.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-400">
                  No orders have been placed by this customer yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  {selectedCustomer.orders.map((ord) => (
                    <div key={ord.id} className="p-3.5 bg-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{ord.orderNumber}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(ord.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-700">
                          {ord.status}
                        </span>
                        {ord.subtotal && (
                          <div className="font-bold text-slate-900 mt-0.5">₹{Number(ord.subtotal).toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`tel:+91${selectedCustomer.phone}`}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
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

