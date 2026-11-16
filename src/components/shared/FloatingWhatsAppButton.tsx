"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const [phoneNumber, setPhoneNumber] = useState("+91 78997 87101");
  const [cleanPhone, setCleanPhone] = useState("917899787101");

  useEffect(() => {
    let isMounted = true;
    async function fetchHelplineNumber() {
      try {
        const res = await fetch("/api/settings/whatsapp", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.phone && data.cleanPhone) {
            setPhoneNumber(data.phone);
            setCleanPhone(data.cleanPhone);
          }
        }
      } catch (err) {
        // Silently preserve default phone on error
      }
    }
    fetchHelplineNumber();
    return () => {
      isMounted = false;
    };
  }, []);

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const defaultMsg = encodeURIComponent(
    "Hello Kwality Gas, I would like to enquire about LPG cylinder booking, refill delivery, and pricing."
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${defaultMsg}`;

  return (
    <aside
      aria-label="WhatsApp live chat support"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group"
    >
      {/* Subtle Hover Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
        <div className="bg-slate-900/95 backdrop-blur-sm text-white text-xs font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-slate-700/60 flex items-center">
          <span>WhatsApp Helpline</span>
        </div>
      </div>

      {/* Perfectly Circular Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2),0_2px_6px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.28),0_4px_12px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
        aria-label="Chat with Kwality Gas on WhatsApp"
        title="Chat with Kwality Gas on WhatsApp"
      >
        {/* Authentic White WhatsApp SVG Icon */}
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.031 0C5.398 0 0 5.398 0 12.031c0 2.125.555 4.195 1.61 6.016L.07 24l6.133-1.609a11.986 11.986 0 005.828 1.492h.005c6.633 0 12.031-5.398 12.031-12.031C24.067 5.398 18.664 0 12.031 0zm0 21.945h-.004a9.92 9.92 0 01-5.062-1.39l-.363-.215-3.766.988 1.004-3.672-.238-.379a9.904 9.904 0 01-1.52-5.246c0-5.488 4.469-9.957 9.957-9.957 2.656 0 5.156 1.035 7.031 2.91 1.875 1.875 2.91 4.375 2.91 7.031 0 5.488-4.469 9.957-9.957 9.957zm5.457-7.457c-.297-.148-1.758-.867-2.031-.965-.273-.098-.473-.148-.672.148-.199.297-.77 1.016-.945 1.215-.176.199-.352.223-.648.074-.297-.148-1.254-.461-2.39-1.473-.883-.789-1.48-1.766-1.652-2.062-.176-.297-.019-.457.129-.605.133-.133.297-.348.445-.523.148-.176.199-.297.297-.496.098-.199.049-.371-.025-.52-.074-.148-.672-1.621-.922-2.223-.242-.586-.488-.508-.672-.516-.172-.008-.371-.008-.57-.008s-.52.074-.793.371c-.273.297-1.043 1.016-1.043 2.48 0 1.465 1.066 2.879 1.215 3.078.148.199 2.098 3.203 5.082 4.492.711.309 1.266.492 1.699.633.715.227 1.363.195 1.879.117.574-.086 1.758-.719 2.008-1.414.246-.695.246-1.293.172-1.414-.074-.121-.273-.195-.57-.344z" />
        </svg>
      </a>
    </aside>
  );
}
