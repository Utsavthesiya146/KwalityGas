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

            <div className="flex items-center justify-center p-6 bg-slate-950/50 rounded-xl border border-slate-700/50">
              <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2),0_2px_6px_rgba(37,211,102,0.4)]">
                <svg
                  className="w-8 h-8 sm:w-9 sm:h-9 fill-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.031 0C5.398 0 0 5.398 0 12.031c0 2.125.555 4.195 1.61 6.016L.07 24l6.133-1.609a11.986 11.986 0 005.828 1.492h.005c6.633 0 12.031-5.398 12.031-12.031C24.067 5.398 18.664 0 12.031 0zm0 21.945h-.004a9.92 9.92 0 01-5.062-1.39l-.363-.215-3.766.988 1.004-3.672-.238-.379a9.904 9.904 0 01-1.52-5.246c0-5.488 4.469-9.957 9.957-9.957 2.656 0 5.156 1.035 7.031 2.91 1.875 1.875 2.91 4.375 2.91 7.031 0 5.488-4.469 9.957-9.957 9.957zm5.457-7.457c-.297-.148-1.758-.867-2.031-.965-.273-.098-.473-.148-.672.148-.199.297-.77 1.016-.945 1.215-.176.199-.352.223-.648.074-.297-.148-1.254-.461-2.39-1.473-.883-.789-1.48-1.766-1.652-2.062-.176-.297-.019-.457.129-.605.133-.133.297-.348.445-.523.148-.176.199-.297.297-.496.098-.199.049-.371-.025-.52-.074-.148-.672-1.621-.922-2.223-.242-.586-.488-.508-.672-.516-.172-.008-.371-.008-.57-.008s-.52.074-.793.371c-.273.297-1.043 1.016-1.043 2.48 0 1.465 1.066 2.879 1.215 3.078.148.199 2.098 3.203 5.082 4.492.711.309 1.266.492 1.699.633.715.227 1.363.195 1.879.117.574-.086 1.758-.719 2.008-1.414.246-.695.246-1.293.172-1.414-.074-.121-.273-.195-.57-.344z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

