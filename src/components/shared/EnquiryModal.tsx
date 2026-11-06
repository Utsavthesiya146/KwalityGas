"use client";

import React, { useEffect } from "react";
import { X, Flame } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
}

export default function EnquiryModal({ isOpen, onClose, initialType = "DOMESTIC" }: EnquiryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-brand-blue text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-orange rounded-lg">
              <Flame className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Kwality Gas Refill & Connection Booking</h3>
              <p className="text-xs text-slate-300">Fast doorstep service across Karnataka & Tamil Nadu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-2 sm:p-4 max-h-[80vh] overflow-y-auto">
          <EnquiryForm initialType={initialType} onSuccess={onClose} className="shadow-none border-0 p-3 sm:p-4" />
        </div>
      </div>
    </div>
  );
}

