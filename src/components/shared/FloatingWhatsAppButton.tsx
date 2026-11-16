"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const defaultMsg = encodeURIComponent(
    "Hello Kwality Gas, I would like to enquire about LPG cylinder booking, refill delivery, and pricing."
  );
  const whatsappUrl = `https://wa.me/917899787101?text=${defaultMsg}`;

  return (
    <aside aria-label="WhatsApp live chat support" className="fixed bottom-5 right-5 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Direct WhatsApp Chat with Kwality Gas Helpline"
        title="Direct WhatsApp Helpline: +91 78997 87101"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline-block text-xs font-extrabold uppercase tracking-wider">
          WhatsApp Helpline
        </span>
      </a>

      {/* Floating Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl whitespace-nowrap shadow-lg border border-slate-700">
          Official Support: +91 78997 87101
        </div>
      </div>
    </aside>
  );
}

