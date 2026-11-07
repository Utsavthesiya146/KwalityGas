import React from "react";
import Link from "next/link";
import { Flame, Home, Phone, ArrowRight, Tag, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F28C28] flex items-center justify-center mx-auto">
          <Flame className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-[#F28C28] tracking-widest">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-[#102A43] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The page or legacy URL you are looking for has been upgraded or moved as part of our website revamp.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#1769AA] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/price-list"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Tag className="w-4 h-4" />
            <span>View Current Price List</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need immediate assistance? Call our desk at{" "}
          <a href="tel:+917899787101" className="text-[#1769AA] font-bold hover:underline">
            +91 78997 87101
          </a>
        </div>
      </div>
    </div>
  );
}
