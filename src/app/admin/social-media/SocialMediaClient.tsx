"use client";

import React, { useState } from "react";
import {
  Share2,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  Save,
  X,
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SocialMediaClientProps {
  initialLinks: SocialLink[];
}

// Brand SVG Icons for pixel-perfect international rendering
export function getPlatformIcon(iconName: string = "", className: string = "w-5 h-5") {
  const norm = (iconName || "").toLowerCase().trim();

  switch (norm) {
    case "whatsapp":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.664-.698c.969.585 1.961.948 2.796.948h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.773-5.766zm8.46 5.766c0 4.689-3.816 8.505-8.505 8.505-.005 0-.01 0-.015 0-1.428 0-2.83-.385-4.053-1.113l-4.518 1.185 1.206-4.407c-.799-1.28-1.22-2.766-1.22-4.27 0-4.689 3.816-8.505 8.505-8.505 4.689 0 8.505 3.816 8.505 8.505zm-3.693 4.238c-.247-.123-1.464-.722-1.691-.804-.227-.082-.392-.123-.557.123-.165.247-.64 1.05-.784 1.215-.144.165-.288.185-.535.062-.247-.123-1.042-.384-1.986-1.225-.733-.654-1.228-1.462-1.372-1.709-.144-.247-.015-.38.109-.503.111-.111.247-.288.371-.432.124-.144.165-.247.247-.412.082-.165.041-.309-.021-.432-.062-.124-.557-1.34-.763-1.835-.2-.484-.403-.418-.557-.426-.144-.008-.309-.01-.474-.01s-.433.062-.66.309c-.227.247-.866.845-.866 2.062 0 1.216.887 2.392 1.01 2.557.124.165 1.745 2.664 4.227 3.736.591.255 1.053.407 1.413.521.593.188 1.133.162 1.56.098.477-.071 1.464-.598 1.67-1.175.206-.577.206-1.072.144-1.175-.062-.103-.227-.165-.474-.288z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return <Share2 className={className} />;
  }
}

const PRESET_PLATFORMS = [
  { name: "WhatsApp", icon: "whatsapp", placeholder: "https://wa.me/917899787101" },
  { name: "LinkedIn", icon: "linkedin", placeholder: "https://www.linkedin.com/company/kwalitygas" },
  { name: "Facebook", icon: "facebook", placeholder: "https://www.facebook.com/kwalitygas" },
  { name: "Instagram", icon: "instagram", placeholder: "https://www.instagram.com/kwalitygas" },
  { name: "YouTube", icon: "youtube", placeholder: "https://www.youtube.com/@kwalitygas" },
  { name: "X (Twitter)", icon: "x", placeholder: "https://x.com/kwalitygas" },
];

export default function SocialMediaClient({ initialLinks }: SocialMediaClientProps) {
  const [links, setLinks] = useState<SocialLink[]>(initialLinks);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    platform: "WhatsApp",
    url: "",
    icon: "whatsapp",
    isActive: true,
    sortOrder: 1,
  });

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const openAddModal = () => {
    setEditingLink(null);
    const nextOrder = links.length > 0 ? Math.max(...links.map((l) => l.sortOrder)) + 1 : 1;
    setFormData({
      platform: "WhatsApp",
      url: "https://wa.me/917899787101",
      icon: "whatsapp",
      isActive: true,
      sortOrder: nextOrder,
    });
    setModalOpen(true);
  };

  const openEditModal = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon || link.platform.toLowerCase(),
      isActive: link.isActive,
      sortOrder: link.sortOrder,
    });
    setModalOpen(true);
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const preset = PRESET_PLATFORMS.find((p) => p.name === selected);
    setFormData((prev) => ({
      ...prev,
      platform: selected,
      icon: preset ? preset.icon : selected.toLowerCase(),
      url: prev.url || (preset ? preset.placeholder : ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingLink) {
        // Update
        const res = await fetch("/api/admin/social-media", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingLink.id, ...formData }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update link");

        setLinks((prev) =>
          prev
            .map((item) => (item.id === editingLink.id ? data.link : item))
            .sort((a, b) => a.sortOrder - b.sortOrder)
        );
        showNotification("success", `Updated ${data.link.platform} channel.`);
      } else {
        // Create
        const res = await fetch("/api/admin/social-media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create link");

        setLinks((prev) => [...prev, data.link].sort((a, b) => a.sortOrder - b.sortOrder));
        showNotification("success", `Added ${data.link.platform} channel.`);
      }

      setModalOpen(false);
    } catch (err: any) {
      showNotification("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (link: SocialLink) => {
    const newStatus = !link.isActive;
    try {
      const res = await fetch("/api/admin/social-media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: link.id, isActive: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle status");

      setLinks((prev) =>
        prev.map((item) => (item.id === link.id ? { ...item, isActive: newStatus } : item))
      );
      showNotification("success", `${link.platform} is now ${newStatus ? "Active" : "Disabled"}.`);
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const moveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) return;

    const newLinks = [...links];
    const currentItem = newLinks[index];
    const targetItem = newLinks[targetIndex];

    // Swap sortOrder
    const tempOrder = currentItem.sortOrder;
    currentItem.sortOrder = targetItem.sortOrder;
    targetItem.sortOrder = tempOrder;

    newLinks[index] = targetItem;
    newLinks[targetIndex] = currentItem;

    setLinks(newLinks);

    try {
      const res = await fetch("/api/admin/social-media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reorder: true,
          items: [
            { id: currentItem.id, sortOrder: currentItem.sortOrder },
            { id: targetItem.id, sortOrder: targetItem.sortOrder },
          ],
        }),
      });
      if (!res.ok) throw new Error("Failed to persist order in database");
      showNotification("success", "Display order updated in TiDB Cloud.");
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/social-media?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete link");

      setLinks((prev) => prev.filter((item) => item.id !== id));
      setDeleteConfirmId(null);
      showNotification("success", "Social media link deleted permanently.");
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const activeLinks = links.filter((l) => l.isActive);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-subtle border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102A43] tracking-tight">
                Social Media Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Configure corporate social profiles, ordering, and dynamic footer channels in TiDB Cloud.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Channel</span>
        </button>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all shadow-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Live Footer Preview Box */}
      <div className="bg-gradient-to-br from-[#102A43] to-[#0B1D2F] text-white p-6 rounded-2xl shadow-card border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F28C28]">
            <Eye className="w-4 h-4" />
            <span>Real-Time Website Footer Preview</span>
          </div>
          <span className="text-xs text-slate-400">
            {activeLinks.length} Active Channel(s)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <div>
            <p className="text-xs text-slate-300">
              This is how your social media channels appear to visitors in the live website footer:
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {activeLinks.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                No active social links. The footer cleanly hides the social bar when empty.
              </span>
            ) : (
              activeLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F28C28] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm border border-white/10"
                  title={`${link.platform} (Opens in new tab)`}
                >
                  {getPlatformIcon(link.icon || link.platform, "w-4 h-4")}
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Social Media Links Table */}
      <div className="bg-white rounded-2xl shadow-subtle border border-slate-200/80 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm sm:text-base">
            Configured Channels ({links.length})
          </h2>
          <span className="text-xs text-slate-500">
            Use arrows to reorder how icons appear in the footer.
          </span>
        </div>

        {links.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Share2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No social media links added yet.</p>
            <p className="text-xs mt-1">Click "Add Social Channel" to configure your first profile.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="py-3.5 px-4 w-16 text-center">Order</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4">Target URL</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {links.map((link, idx) => (
                  <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Order Controls */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => moveOrder(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-slate-200 disabled:opacity-20 text-slate-600 transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-slate-400 w-4">
                          {link.sortOrder}
                        </span>
                        <button
                          onClick={() => moveOrder(idx, "down")}
                          disabled={idx === links.length - 1}
                          className="p-1 rounded hover:bg-slate-200 disabled:opacity-20 text-slate-600 transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Platform Badge */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 font-bold text-slate-900">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                          {getPlatformIcon(link.icon || link.platform, "w-4 h-4")}
                        </div>
                        <span>{link.platform}</span>
                      </div>
                    </td>

                    {/* URL */}
                    <td className="py-3 px-4">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-mono text-xs truncate max-w-xs md:max-w-md group"
                      >
                        <span className="truncate">{link.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleStatus(link)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                          link.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {link.isActive ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(link)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                          title="Edit Channel"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(link.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          title="Delete Channel"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-lg">
                {editingLink ? `Edit ${editingLink.platform}` : "Add Social Media Channel"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={handlePlatformChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:border-[#F28C28] focus:ring-2 focus:ring-orange-100 bg-white"
                >
                  {PRESET_PLATFORMS.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Custom">Custom Platform...</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Profile or Channel URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#F28C28] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#F28C28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Footer Status
                  </label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-[#F28C28] focus:ring-[#F28C28]"
                    />
                    <span className="text-xs font-bold text-slate-700">Display in Footer</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Saving..." : "Save Channel"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-lg">Delete Channel?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this social media link? It will immediately stop appearing in the footer.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

