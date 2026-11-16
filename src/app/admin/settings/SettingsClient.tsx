"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  Save,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Clock,
  UserCheck,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

export default function SettingsClient() {
  const [phoneNumber, setPhoneNumber] = useState("+91 78997 87101");
  const [currentNumber, setCurrentNumber] = useState("+91 78997 87101");
  const [cleanPhone, setCleanPhone] = useState("917899787101");
  const [updatedBy, setUpdatedBy] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/settings/whatsapp");
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load helpline settings");
      }
      if (json.setting) {
        setPhoneNumber(json.setting.value || "+91 78997 87101");
        setCurrentNumber(json.setting.value || "+91 78997 87101");
        setCleanPhone(json.setting.cleanPhone || "917899787101");
        setUpdatedBy(json.setting.updatedBy || null);
        setUpdatedAt(json.setting.updatedAt || null);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to fetch helpline settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to update helpline number");
      }

      setCurrentNumber(json.setting.value);
      setCleanPhone(json.setting.cleanPhone);
      setUpdatedBy(json.setting.updatedBy);
      setUpdatedAt(json.setting.updatedAt);
      setSuccessMsg("WhatsApp Helpline number updated successfully! The live website is now using this number.");
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefault = () => {
    setPhoneNumber("+91 78997 87101");
  };

  const testWhatsAppUrl = `https://wa.me/${cleanPhone || "917899787101"}?text=${encodeURIComponent(
    "Hello Kwality Gas, testing WhatsApp Helpline connection from Admin Panel."
  )}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">WhatsApp Helpline Settings</h1>
              <p className="text-sm text-slate-500">
                Manage the floating customer support WhatsApp helpline displayed on the public website.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchSettings}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Status Card & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              Helpline Phone Number Configuration
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Changes take effect immediately across all customer sessions without requiring code redeployment.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-1">
                WhatsApp Helpline Number (with Country Code)
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 78997 87101"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 font-mono text-base tracking-wide"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                Must include country code starting with <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">+</code> (e.g., <span className="font-semibold">+91 78997 87101</span>). Default: +91 78997 87101.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving || loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>

              <a
                href={testWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-emerald-600" />
                Test WhatsApp
              </a>

              <button
                type="button"
                onClick={handleResetDefault}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors ml-auto"
                title="Reset input field to default (+91 78997 87101)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Field to Default
              </button>
            </div>
          </form>

          {/* Operational Boundaries Notice */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 text-xs space-y-1.5">
            <div className="font-semibold flex items-center gap-1.5 text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              Scope & Separation of Concerns
            </div>
            <p>
              This setting governs <strong>only</strong> the floating circular WhatsApp button for general customer support and website enquiries.
            </p>
            <p className="text-amber-700">
              Commercial LPG cylinder checkout order routing (+91 78997 87101), dealer dispatch pipelines, and payment records remain strictly managed through the secure Admin Orders module.
            </p>
          </div>
        </div>

        {/* Live Status & Audit Details Card */}
        <div className="space-y-6">
          {/* Active Live Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Live Website Status</h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Active Helpline</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live on Website
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 font-mono tracking-wide">
                {currentNumber}
              </div>
              <div className="text-xs text-slate-500">
                Dialable Target: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">wa.me/{cleanPhone}</code>
              </div>
            </div>

            {/* Audit Metadata */}
            <div className="space-y-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Last Modified By:</span>{" "}
                  <span className="font-semibold text-slate-700">{updatedBy || "System Default"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Last Updated:</span>{" "}
                  <span className="font-semibold text-slate-700">
                    {updatedAt ? new Date(updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "Initial Launch"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-500">
                  Audit Log: Recorded to <code className="text-slate-700 font-mono">audit_logs</code> table.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Preview Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-slate-700 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Button Preview</h3>
            <p className="text-xs text-slate-300">
              This preview matches the circular button shown to visitors on desktop and mobile:
            </p>

            <div className="flex items-center justify-center p-6 bg-slate-950/50 rounded-xl border border-slate-700/50 relative">
              <div className="w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center shadow-lg relative">
                <svg
                  className="w-8 h-8 fill-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.73 14.84 12.18 15.9C12.77 16.15 13.22 16.3 13.57 16.41C14.16 16.6 14.7 16.57 15.13 16.51C15.61 16.44 16.6 15.91 16.81 15.33C17.02 14.75 17.02 14.25 16.96 14.15C16.9 14.05 16.74 13.99 16.5 13.87C16.26 13.75 15.08 13.17 14.86 13.09C14.64 13.01 14.48 12.97 14.32 13.21C14.16 13.46 13.7 14.05 13.56 14.21C13.42 14.37 13.28 14.39 13.04 14.27C12.8 14.15 11.79 13.82 10.59 12.75C9.66 11.92 9.03 10.89 8.91 10.69C8.79 10.49 8.9 10.38 9.02 10.26C9.13 10.15 9.27 9.97 9.39 9.83C9.51 9.69 9.55 9.59 9.63 9.43C9.71 9.27 9.67 9.13 9.61 9.01C9.55 8.89 9.09 7.76 8.9 7.3C8.71 6.84 8.52 6.9 8.37 6.9C8.22 6.9 8.04 6.89 7.87 6.89L8.53 7.33Z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

