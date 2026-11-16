"use client";

import React, { useState } from "react";
import {
  Truck,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Edit2,
  Trash2,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  Building,
  User,
  Percent,
  FileText
} from "lucide-react";

interface Dealer {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  territory: string;
  serviceAreas?: string | null;
  isActive: boolean;
  commissionRate?: number | null;
  notes?: string | null;
  totalOrders: number;
  confirmedRevenue: number;
  orders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    subtotal: any;
    createdAt: string;
  }>;
}

interface DealersAdminClientProps {
  initialDealers: Dealer[];
}

export default function DealersAdminClient({ initialDealers }: DealersAdminClientProps) {
  const [dealers, setDealers] = useState<Dealer[]>(initialDealers);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [territoryFilter, setTerritoryFilter] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDealer, setEditingDealer] = useState<Partial<Dealer> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Details Drawer
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (territoryFilter !== "ALL") params.set("territory", territoryFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/dealers?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.dealers)) {
        setDealers(data.dealers);
      }
    } catch (err) {
      console.error("Failed to refresh dealers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingDealer({
      businessName: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      territory: "Bangalore Urban",
      serviceAreas: "",
      commissionRate: 5.0,
      notes: "",
      isActive: true,
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dealer: Dealer) => {
    setEditingDealer({ ...dealer });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDealer) return;
    setSaving(true);
    setErrorMsg("");

    const isEdit = Boolean(editingDealer.id);
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/dealers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDealer),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save dealer");
      }

      setSuccessMsg(isEdit ? "Dealer updated successfully." : "New dealer created.");
      setTimeout(() => setSuccessMsg(""), 3000);
      setIsModalOpen(false);
      fetchDealers();
    } catch (err: any) {
      setErrorMsg(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (dealer: Dealer) => {
    try {
      const res = await fetch("/api/admin/dealers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: dealer.id, isActive: !dealer.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setDealers((prev) =>
          prev.map((d) => (d.id === dealer.id ? { ...d, isActive: !d.isActive } : d))
        );
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove dealer "${name}"? This will unassign any associated orders.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/dealers?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDealers((prev) => prev.filter((d) => d.id !== id));
        if (selectedDealer?.id === id) setSelectedDealer(null);
      }
    } catch (err) {
      console.error("Delete dealer error:", err);
    }
  };

  // Distinct territories for filter
  const territories = Array.from(new Set(dealers.map((d) => d.territory))).filter(Boolean);

  // In-memory filter
  const filtered = dealers.filter((d) => {
    if (statusFilter === "ACTIVE" && !d.isActive) return false;
    if (statusFilter === "INACTIVE" && d.isActive) return false;
    if (territoryFilter !== "ALL" && d.territory !== territoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const mBiz = d.businessName.toLowerCase().includes(q);
      const mPerson = d.contactPerson.toLowerCase().includes(q);
      const mPhone = d.phone.includes(q);
      const mTerritory = d.territory.toLowerCase().includes(q);
      if (!mBiz && !mPerson && !mPhone && !mTerritory) return false;
    }
    return true;
  });

  const activeCount = dealers.filter((d) => d.isActive).length;
  const totalOrdersAssigned = dealers.reduce((acc, curr) => acc + curr.totalOrders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Distribution Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dealers & Distributors Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage channel partners, service territories, and order fulfillment tracking across Karnataka and Tamil Nadu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={fetchDealers}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#1769AA] text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-[#F28C28] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dealer</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Partners</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{dealers.length}</div>
            <span className="text-[10px] text-emerald-600 font-bold">{activeCount} Active</span>
          </div>
          <div className="p-2.5 bg-blue-50 text-[#1769AA] rounded-xl">
            <Building className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Territories</span>
            <div className="text-2xl font-black text-[#F28C28] mt-0.5">{territories.length}</div>
            <span className="text-[10px] text-slate-400">Coverage zones</span>
          </div>
          <div className="p-2.5 bg-orange-50 text-[#F28C28] rounded-xl">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Assigned Orders</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">{totalOrdersAssigned}</div>
            <span className="text-[10px] text-slate-400">Fulfilled by dealers</span>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verified Outlets</span>
            <div className="text-2xl font-black text-indigo-600 mt-0.5">100%</div>
            <span className="text-[10px] text-slate-400">PESO & KYC verified</span>
          </div>
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search dealers by business name, contact person, phone, territory..."
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
            <option value="ALL">All Statuses ({dealers.length})</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
          </select>

          {/* Territory Filter */}
          <select
            value={territoryFilter}
            onChange={(e) => setTerritoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
          >
            <option value="ALL">All Territories ({territories.length})</option>
            {territories.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dealers Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">No dealers found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No dealers match your search or filter criteria. Click "Add New Dealer" to register an authorized partner.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Dealer / Agency</th>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Territory & Areas</th>
                  <th className="py-3.5 px-4">Assigned Orders</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((dealer) => (
                  <tr key={dealer.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Business Name */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900">{dealer.businessName}</div>
                      <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                        +91 {dealer.phone}
                      </div>
                      {dealer.email && (
                        <div className="text-[10px] text-slate-400 truncate max-w-xs">{dealer.email}</div>
                      )}
                    </td>

                    {/* Contact Person */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-800">{dealer.contactPerson}</div>
                      {dealer.address && (
                        <div className="text-[11px] text-slate-500 max-w-xs truncate mt-0.5">
                          {dealer.address}
                        </div>
                      )}
                    </td>

                    {/* Territory */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-[#1769AA]">
                        {dealer.territory}
                      </span>
                      {dealer.serviceAreas && (
                        <div className="text-[11px] text-slate-500 max-w-xs truncate mt-1">
                          {dealer.serviceAreas}
                        </div>
                      )}
                    </td>

                    {/* Orders */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900">{dealer.totalOrders} Orders</div>
                      {dealer.confirmedRevenue > 0 && (
                        <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                          ₹{dealer.confirmedRevenue.toFixed(2)} Vol
                        </div>
                      )}
                    </td>

                    {/* Active Toggle */}
                    <td className="py-3.5 px-4 align-top">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(dealer)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-colors ${
                          dealer.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {dealer.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Call */}
                        <a
                          href={`tel:+91${dealer.phone}`}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-[#1769AA] rounded-xl transition-colors border border-blue-200"
                          title="Call Dealer Directly"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/91${dealer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${dealer.contactPerson}, this is Kwality Gas dispatch coordination.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors border border-emerald-200"
                          title="Chat with Dealer on WhatsApp"
                        >
                          <Truck className="w-3.5 h-3.5" />
                        </a>

                        {/* View Orders Drawer */}
                        <button
                          onClick={() => setSelectedDealer(dealer)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                          title="View Dealer Orders & History"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEdit(dealer)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                          title="Edit Dealer Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(dealer.id, dealer.businessName)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors border border-red-200"
                          title="Delete Dealer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Add / Edit Dealer Modal */}
      {isModalOpen && editingDealer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Channel Partner
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {editingDealer.id ? "Edit Dealer / Distributor" : "Register New Dealer / Distributor"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Business / Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Perfect Flame Gas Agencies"
                  value={editingDealer.businessName || ""}
                  onChange={(e) => setEditingDealer({ ...editingDealer, businessName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. S. Nagaraj"
                    value={editingDealer.contactPerson || ""}
                    onChange={(e) => setEditingDealer({ ...editingDealer, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={editingDealer.phone || ""}
                    onChange={(e) => setEditingDealer({ ...editingDealer, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    placeholder="dealer@example.com"
                    value={editingDealer.email || ""}
                    onChange={(e) => setEditingDealer({ ...editingDealer, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Territory / Zone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bangalore South / Hosur / Dharwad"
                    value={editingDealer.territory || ""}
                    onChange={(e) => setEditingDealer({ ...editingDealer, territory: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Service Localities & Pincodes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Gandhi Bazar, Basavanagudi, Jayanagar, JP Nagar (560004, 560011, 560078)"
                  value={editingDealer.serviceAreas || ""}
                  onChange={(e) => setEditingDealer({ ...editingDealer, serviceAreas: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Outlet Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Shop number, street, landmark, area"
                  value={editingDealer.address || ""}
                  onChange={(e) => setEditingDealer({ ...editingDealer, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Internal Notes & Operational Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Security deposit status, cylinder storage license capacity, sub-dealers count"
                  value={editingDealer.notes || ""}
                  onChange={(e) => setEditingDealer({ ...editingDealer, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="dealerActive"
                  checked={editingDealer.isActive !== false}
                  onChange={(e) => setEditingDealer({ ...editingDealer, isActive: e.target.checked })}
                  className="w-4 h-4 text-[#1769AA] rounded"
                />
                <label htmlFor="dealerActive" className="text-xs font-bold text-slate-700">
                  Dealer is actively licensed & accepting cylinder order assignments
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#102A43] hover:bg-[#F28C28] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingDealer.id ? "Update Partner" : "Create Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dealer Details & Orders Drawer */}
      {selectedDealer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-end p-0 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedDealer(null)}
        >
          <div
            className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Dealer Profile & Performance
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedDealer.businessName}
                </h3>
                <span className="text-xs text-blue-600 font-bold">{selectedDealer.territory}</span>
              </div>
              <button
                onClick={() => setSelectedDealer(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Partner Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Contact Person:</span>
                <span className="text-slate-900 font-bold">{selectedDealer.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Phone Number:</span>
                <span className="text-slate-900 font-mono font-bold">+91 {selectedDealer.phone}</span>
              </div>
              {selectedDealer.email && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Email:</span>
                  <span className="text-slate-800">{selectedDealer.email}</span>
                </div>
              )}
              {selectedDealer.address && (
                <div>
                  <span className="text-slate-500 font-bold block uppercase text-[10px] mb-0.5">Outlet Address:</span>
                  <span className="text-slate-800 leading-relaxed">{selectedDealer.address}</span>
                </div>
              )}
              {selectedDealer.serviceAreas && (
                <div className="pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 font-bold block uppercase text-[10px] mb-0.5">Service Areas:</span>
                  <span className="text-slate-800 leading-relaxed">{selectedDealer.serviceAreas}</span>
                </div>
              )}
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Assigned Orders</span>
                <div className="text-xl font-black text-blue-900 mt-0.5">{selectedDealer.totalOrders}</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Confirmed Volume</span>
                <div className="text-xl font-black text-emerald-900 mt-0.5">₹{selectedDealer.confirmedRevenue.toFixed(2)}</div>
              </div>
            </div>

            {/* Recent Orders Fulfilled */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Recent Orders Assigned to this Dealer
              </h4>
              {selectedDealer.orders.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-400">
                  No orders have been assigned to this dealer yet. Assign orders via the WhatsApp Orders tab.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  {selectedDealer.orders.map((ord) => (
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
                href={`tel:+91${selectedDealer.phone}`}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Dealer</span>
              </a>

              <button
                onClick={() => setSelectedDealer(null)}
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

