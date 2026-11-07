"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, Flame, Building2, Factory, Home } from "lucide-react";

interface EnquiryFormProps {
  initialType?: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
  defaultType?: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
  onSuccess?: () => void;
  className?: string;
}

export default function EnquiryForm({
  initialType,
  defaultType,
  onSuccess,
  className = "",
}: EnquiryFormProps) {
  const [activeTab, setActiveTab] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">(
    defaultType || initialType || "DOMESTIC"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    establishmentType: "",
    consumption: "",
    requiredDate: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: activeTab,
          customerName: formData.customerName,
          companyName: activeTab !== "DOMESTIC" ? formData.companyName : null,
          contactPerson: activeTab !== "DOMESTIC" ? formData.contactPerson : null,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          establishmentType: activeTab !== "DOMESTIC" ? formData.establishmentType : null,
          consumption: activeTab === "INDUSTRIAL" ? formData.consumption : null,
          requiredDate: activeTab !== "DOMESTIC" ? formData.requiredDate : null,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit enquiry");

      setSuccessMessage(data.message || "Enquiry submitted successfully!");
      setFormData({
        customerName: "",
        companyName: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        establishmentType: "",
        consumption: "",
        requiredDate: "",
        message: "",
      });

      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 ${className}`}>
      {/* Category Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-2">
        <button
          type="button"
          onClick={() => { setActiveTab("DOMESTIC"); setSuccessMessage(null); }}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === "DOMESTIC"
              ? "border-brand-orange text-brand-orange"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home / Domestic</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("COMMERCIAL"); setSuccessMessage(null); }}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === "COMMERCIAL"
              ? "border-brand-orange text-brand-orange"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Commercial (HORECA)</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("INDUSTRIAL"); setSuccessMessage(null); }}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === "INDUSTRIAL"
              ? "border-brand-orange text-brand-orange"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>Industrial Requirement</span>
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">{successMessage}</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Our marketing desk has received your request. Urgent? Call our helpline: <a href="tel:+917899787101" className="underline font-bold">+91 78997 87101</a>.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* DOMESTIC FORM FIELDS */}
        {activeTab === "DOMESTIC" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Customer Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. customer@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Address / Location
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Rajajinagar 3rd Block, Bangalore"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>
          </>
        )}

        {/* COMMERCIAL FORM FIELDS */}
        {activeTab === "COMMERCIAL" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name of Establishment *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. SLV Grand Restaurant / Sri Krishna Hotel"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Owner / Director Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="e.g. Mr. Rajendra Bhat"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 91080 01990"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Type of Establishment
                </label>
                <input
                  type="text"
                  name="establishmentType"
                  placeholder="e.g. Hotel / Restaurant / Catering / Bakery / Poultry"
                  value={formData.establishmentType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Date / Supply Start
                </label>
                <input
                  type="date"
                  name="requiredDate"
                  value={formData.requiredDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="commercial@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Establishment Address & Landmark
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Full address of hotel/kitchen"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>
          </>
        )}

        {/* INDUSTRIAL FORM FIELDS */}
        {activeTab === "INDUSTRIAL" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name of Industrial Establishment *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. Silcore Industries / Machohalli Plant"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Director / Proprietor Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="e.g. Mr. R. J. Mehta"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="e.g. Purchase Manager"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 91080 01989"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Type of Industry
                </label>
                <input
                  type="text"
                  name="establishmentType"
                  placeholder="e.g. Chemical / Metal Heat Treatment / Powder Coating"
                  value={formData.establishmentType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Present Consumption Pattern
                </label>
                <select
                  name="consumption"
                  value={formData.consumption}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                >
                  <option value="">Select Cylinders Consumption</option>
                  <option value="33 Kgs Bulk Supply">33.0 Kgs Industrial Cylinders</option>
                  <option value="17 Kgs Commercial">17.0 Kgs Cylinders</option>
                  <option value="19 Kgs Commercial">19.0 Kgs Cylinders</option>
                  <option value="Multiple Cylinder Bank Setup">Multiple Cylinder Manifold Bank Setup</option>
                  <option value="Bulk Storage Requirement">Bulk Storage Requirement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Commissioning Date
                </label>
                <input
                  type="date"
                  name="requiredDate"
                  value={formData.requiredDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="industry@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Factory / Plant Location Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Industrial Area, Phase, Plot No."
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
              />
            </div>
          </>
        )}

        {/* COMMON MESSAGE FIELD */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Requirement Details / Message
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Please mention cylinder capacity required, approximate daily/monthly quantity, or any questions..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orange-flame hover:brightness-110 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Enquiry to Kwality Team...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>
                Submit {activeTab === "DOMESTIC" ? "Home Customer" : activeTab === "COMMERCIAL" ? "Commercial Requirement" : "Industrial Requirement"} Enquiry
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

