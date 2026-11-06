"use client";

import React, { useState } from "react";
import { Inbox, Phone, Mail, MapPin, Calendar, Clock, Filter, Trash2, CheckCircle2, MessageSquare, AlertCircle, X, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EnquiryItem {
  id: string;
  enquiryType: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
  customerName: string;
  companyName?: string | null;
  contactPerson?: string | null;
  email: string;
  phone: string;
  address?: string | null;
  consumption?: string | null;
  establishmentType?: string | null;
  requiredDate?: string | null;
  message?: string | null;
  status: "NEW" | "IN_PROGRESS" | "CONTACTED" | "RESOLVED" | "CLOSED";
  adminNotes?: string | null;
  createdAt: string;
}

export default function EnquiriesAdminClient({ initialEnquiries }: { initialEnquiries: EnquiryItem[] }) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const filtered = enquiries.filter((e) => {
    if (filterType !== "ALL" && e.enquiryType !== filterType) return false;
    if (filterStatus !== "ALL" && e.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedEnquiry.id, adminNotes: adminNote }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, adminNotes: adminNote } : e))
        );
        setSelectedEnquiry((prev) => prev ? { ...prev, adminNotes: adminNote } : null);
        alert("Internal admin notes saved!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-blue-dark flex items-center gap-2">
            <Inbox className="w-6 h-6 text-brand-orange" />
            <span>Enquiries & Leads Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track domestic cylinder bookings, commercial requirements, and industrial bulk leads.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="ALL">All Categories</option>
            <option value="DOMESTIC">Domestic Only</option>
            <option value="COMMERCIAL">Commercial (HORECA)</option>
            <option value="INDUSTRIAL">Industrial Only</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW Submissions</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CONTACTED">Customer Contacted</option>
            <option value="RESOLVED">Resolved / Delivered</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center text-xs font-bold text-slate-500">
          <span>Showing {filtered.length} of {enquiries.length} enquiries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-6 font-bold">Category</th>
                <th className="py-3.5 px-6 font-bold">Customer / Establishment</th>
                <th className="py-3.5 px-6 font-bold">Contact Info</th>
                <th className="py-3.5 px-6 font-bold">Details</th>
                <th className="py-3.5 px-6 font-bold">Status</th>
                <th className="py-3.5 px-6 font-bold">Date</th>
                <th className="py-3.5 px-6 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No enquiries found matching selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          enq.enquiryType === "DOMESTIC"
                            ? "bg-blue-100 text-blue-800"
                            : enq.enquiryType === "COMMERCIAL"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.enquiryType}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{enq.customerName}</p>
                      {enq.companyName && (
                        <p className="text-[11px] text-slate-600 font-medium">{enq.companyName}</p>
                      )}
                    </td>

                    <td className="py-4 px-6 space-y-0.5">
                      <a href={`tel:${enq.phone}`} className="font-bold text-brand-blue hover:text-brand-orange block">
                        {enq.phone}
                      </a>
                      {enq.email && (
                        <a href={`mailto:${enq.email}`} className="text-[11px] text-slate-500 hover:text-slate-700 block truncate max-w-[160px]">
                          {enq.email}
                        </a>
                      )}
                    </td>

                    <td className="py-4 px-6 text-slate-600 max-w-xs">
                      {enq.consumption && (
                        <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 mr-1 mb-1">
                          {enq.consumption}
                        </span>
                      )}
                      {enq.establishmentType && (
                        <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 mr-1 mb-1">
                          {enq.establishmentType}
                        </span>
                      )}
                      {enq.message && <p className="truncate text-[11px]">{enq.message}</p>}
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          enq.status === "NEW"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : enq.status === "IN_PROGRESS"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : enq.status === "CONTACTED"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {formatDate(enq.createdAt)}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setAdminNote(enq.adminNotes || "");
                          }}
                          className="px-2.5 py-1 rounded-lg bg-brand-blue-surface text-brand-blue font-bold text-[11px] hover:bg-brand-blue hover:text-white transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-black text-brand-blue-dark">
                  {selectedEnquiry.customerName}
                </h3>
                {selectedEnquiry.companyName && (
                  <p className="text-xs font-bold text-slate-600 mt-0.5">{selectedEnquiry.companyName}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 font-semibold block">Phone:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-brand-blue text-sm block">
                  {selectedEnquiry.phone}
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 font-semibold block">Email:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-slate-800 text-xs block truncate">
                  {selectedEnquiry.email || "Not provided"}
                </a>
              </div>

              {selectedEnquiry.address && (
                <div className="col-span-2 p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 font-semibold block">Address / Location:</span>
                  <p className="text-slate-800 font-medium">{selectedEnquiry.address}</p>
                </div>
              )}

              {selectedEnquiry.consumption && (
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 font-semibold block">Present Consumption:</span>
                  <p className="text-slate-800 font-bold">{selectedEnquiry.consumption}</p>
                </div>
              )}

              {selectedEnquiry.establishmentType && (
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 font-semibold block">Type of Establishment:</span>
                  <p className="text-slate-800 font-bold">{selectedEnquiry.establishmentType}</p>
                </div>
              )}

              {selectedEnquiry.message && (
                <div className="col-span-2 p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 font-semibold block">Requirement Message:</span>
                  <p className="text-slate-800">{selectedEnquiry.message}</p>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700">
                Internal Staff Notes / Follow-up Status
              </label>
              <textarea
                rows={3}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="e.g. Called customer on 10am, assigned to Rajajinagar distributor..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/20 resize-none"
              />
              <button
                onClick={handleSaveNotes}
                disabled={isUpdating}
                className="bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-brand-blue-dark transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

