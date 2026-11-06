import React from "react";
import Link from "next/link";
import { Flame, Home, ArrowLeft, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-brand-orange mx-auto flex items-center justify-center">
          <Flame className="w-8 h-8 fill-brand-orange" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black text-brand-blue-dark block">
            404
          </span>
          <h1 className="text-xl font-bold text-slate-800">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The page or document you are looking for may have been moved or updated during our website revamp. All original business information is fully preserved.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/price-list"
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
          >
            <span>View Current Price List</span>
          </Link>

          <Link
            href="/cylinders"
            className="w-full flex items-center justify-center gap-2 text-brand-blue hover:text-brand-orange font-bold py-1 px-4 text-xs transition-all"
          >
            <span>Browse LPG Cylinders Range</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
          Need immediate assistance? Call our office: <a href="tel:+918023400459" className="text-brand-blue font-bold">+91 - 80 - 2340 0459</a>
        </div>
      </div>
    </div>
  );
}

