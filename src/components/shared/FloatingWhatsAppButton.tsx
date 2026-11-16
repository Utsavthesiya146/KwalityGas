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
      {/* Tooltip on Hover */}
      <div className="absolute bottom-full right-0 mb-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
        <div className="bg-slate-900/95 backdrop-blur-sm text-white text-xs font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-slate-700/60 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>WhatsApp Helpline ({phoneNumber})</span>
        </div>
      </div>

      {/* Perfectly Circular Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-108 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label={`Direct WhatsApp Helpline: ${phoneNumber}`}
        title={`WhatsApp Helpline: ${phoneNumber}`}
      >
        <div className="relative flex items-center justify-center">
          {/* Authentic WhatsApp SVG Icon */}
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.73 14.84 12.18 15.9C12.77 16.15 13.22 16.3 13.57 16.41C14.16 16.6 14.7 16.57 15.13 16.51C15.61 16.44 16.6 15.91 16.81 15.33C17.02 14.75 17.02 14.25 16.96 14.15C16.9 14.05 16.74 13.99 16.5 13.87C16.26 13.75 15.08 13.17 14.86 13.09C14.64 13.01 14.48 12.97 14.32 13.21C14.16 13.46 13.7 14.05 13.56 14.21C13.42 14.37 13.28 14.39 13.04 14.27C12.8 14.15 11.79 13.82 10.59 12.75C9.66 11.92 9.03 10.89 8.91 10.69C8.79 10.49 8.9 10.38 9.02 10.26C9.13 10.15 9.27 9.97 9.39 9.83C9.51 9.69 9.55 9.59 9.63 9.43C9.71 9.27 9.67 9.13 9.61 9.01C9.55 8.89 9.09 7.76 8.9 7.3C8.71 6.84 8.52 6.9 8.37 6.9C8.22 6.9 8.04 6.89 7.87 6.89L8.53 7.33Z" />
          </svg>

          {/* Gentle ping status indicator */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </span>
        </div>
      </a>
    </aside>
  );
}
