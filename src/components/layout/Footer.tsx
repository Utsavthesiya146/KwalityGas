import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  Flame,
  FileText,
  Lock,
  Building,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Share2,
  Heart,
} from "lucide-react";

// Platform-specific brand SVG icons for international rendering
function renderFooterSocialIcon(platform: string = "", icon: string = "") {
  const norm = (icon || platform || "").toLowerCase().trim();

  switch (norm) {
    case "whatsapp":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.664-.698c.969.585 1.961.948 2.796.948h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.773-5.766zm8.46 5.766c0 4.689-3.816 8.505-8.505 8.505-.005 0-.01 0-.015 0-1.428 0-2.83-.385-4.053-1.113l-4.518 1.185 1.206-4.407c-.799-1.28-1.22-2.766-1.22-4.27 0-4.689 3.816-8.505 8.505-8.505 4.689 0 8.505 3.816 8.505 8.505zm-3.693 4.238c-.247-.123-1.464-.722-1.691-.804-.227-.082-.392-.123-.557.123-.165.247-.64 1.05-.784 1.215-.144.165-.288.185-.535.062-.247-.123-1.042-.384-1.986-1.225-.733-.654-1.228-1.462-1.372-1.709-.144-.247-.015-.38.109-.503.111-.111.247-.288.371-.432.124-.144.165-.247.247-.412.082-.165.041-.309-.021-.432-.062-.124-.557-1.34-.763-1.835-.2-.484-.403-.418-.557-.426-.144-.008-.309-.01-.474-.01s-.433.062-.66.309c-.227.247-.866.845-.866 2.062 0 1.216.887 2.392 1.01 2.557.124.165 1.745 2.664 4.227 3.736.591.255 1.053.407 1.413.521.593.188 1.133.162 1.56.098.477-.071 1.464-.598 1.67-1.175.206-.577.206-1.072.144-1.175-.062-.103-.227-.165-.474-.288z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
}

export default async function Footer() {
  // Dynamically load active social media links configured in Admin Panel
  let socialLinks: any[] = [];
  try {
    socialLinks = await prisma.socialMediaLink.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (err: any) {
    console.warn("Footer: Could not query social_media_links from database, falling back safely:", err.message);
    socialLinks = [];
  }

  const developerUrl = process.env.NEXT_PUBLIC_DEVELOPER_URL || null;

  return (
    <footer className="bg-[#050D15] text-slate-300 border-t border-slate-800/80 selection:bg-[#F28C28] selection:text-white">
      {/* Pre-Footer Action Banner */}
      <div className="relative bg-gradient-to-r from-[#07131F] via-[#102A43] to-[#07131F] text-white py-12 px-4 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-35 pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-5 text-center lg:text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 mx-auto border border-orange-500/30 shadow-inner">
              <Flame className="w-8 h-8 text-[#F28C28] fill-[#F28C28]" />
            </div>
            <div>
              <h4 className="text-white font-black text-xl sm:text-2xl tracking-tight leading-snug">
                Immediate Domestic Refill or Bulk Commercial Gas Connection?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Grade 1 Rated bottling infrastructure with 30,000 MTPA storage, guaranteed blue flame efficiency, and prompt delivery across Karnataka & Tamil Nadu.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <a
              href="tel:+917899787101"
              className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call 24/7 Hotline: +91 78997 87101</span>
            </a>
            <Link
              href="/price-list"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all hover:border-white/40"
            >
              Check Live Rates
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand, Credentials & Social Links (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
              <div className="relative w-48 h-12">
                <Image
                  src="/images/brand/logo.jpg"
                  alt="Kwality Gas Bottlers Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Kwality Gas Bottlers Private Limited is an ISO 9001:2015 certified, Grade 1 Rated LPG bottling and distribution corporation. We operate 3 advanced automated facilities with 30,000 MTPA storage and 8,000 cylinders/day throughput.
            </p>

            {/* Quality Badges */}
            <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
                <div className="text-[#F28C28] font-black tracking-wide text-xs">CARE Grade 1 Rated</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Highest Safety & Credit Evaluation</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
                <div className="text-white font-black tracking-wide text-xs">International Era Award</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Geneva, Switzerland (2015)</div>
              </div>
            </div>

            {/* Corporate Identification */}
            <div className="text-xs text-slate-400 font-mono">
              Corporate CIN: <span className="text-white font-semibold">U01120KA2005PTC036860</span>
            </div>

            {/* Dynamic Social Media Channels (Loaded from Database) */}
            {socialLinks.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Connect With Us</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#F28C28] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm border border-white/10"
                      aria-label={`Kwality Gas on ${link.platform}`}
                      title={link.platform}
                    >
                      {renderFooterSocialIcon(link.platform, link.icon || link.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: LPG Segments & Cylinders (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#F28C28]" />
              <span>LPG Products & Gas</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/domestic" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Domestic LPG (12kg, 5.5kg, 4kg)</span>
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Commercial LPG (17kg, 21kg HORECA)</span>
                </Link>
              </li>
              <li>
                <Link href="/industrial" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Industrial LPG (33kg Manifold LOT)</span>
                </Link>
              </li>
              <li>
                <Link href="/cylinders" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Heavy-Duty Cylinders Catalog</span>
                </Link>
              </li>
              <li>
                <Link href="/gas-water-heater" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Instant Gas Geysers (8 Safety Devices)</span>
                </Link>
              </li>
              <li>
                <Link href="/safety-devices" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Safety Devices & Auto Shut-Offs</span>
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28] group-hover:translate-x-0.5 transition-transform" />
                  <span>Certified Regulators & IS 9573 Tubing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1769AA]" />
              <span>Company</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/group-company" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Group Company</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Technical Services</span>
                </Link>
              </li>
              <li>
                <Link href="/price-list" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Verified Price List</span>
                </Link>
              </li>
              <li>
                <Link href="/safety-features" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Safety Protocols</span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Client Testimonials</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Plant Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Offices & Bottling Plants (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F28C28]" />
              <span>Offices & Plants</span>
            </h4>
            
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">Bengaluru Corporate Offices:</strong>
                  <span className="text-slate-400 text-xs block leading-relaxed mt-0.5">
                    • Regd: V M C House, D-41, 3rd Flr, Rajajinagar Ind. Estate, Bangalore - 560044
                  </span>
                  <span className="text-slate-400 text-xs block leading-relaxed mt-1">
                    • Mktg: 2nd Flr, Above Syndicate Bank, Magadi Chord Rd, Vijayanagar, Bangalore - 560040
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">Automated Bottling Plants:</strong>
                  <span className="text-slate-400 text-xs block leading-relaxed mt-0.5">
                    • Hosur LPG Plant (Tamil Nadu)
                  </span>
                  <span className="text-slate-400 text-xs block leading-relaxed">
                    • Chennai Bottling Facility (Tamil Nadu)
                  </span>
                  <span className="text-slate-400 text-xs block leading-relaxed">
                    • Dharwad LPG Plant (Karnataka)
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400">Marketing Hotline: </span>
                    <a href="tel:+917899787101" className="text-white font-bold hover:text-[#F28C28] transition-colors">
                      +91 78997 87101
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400">Board Office: </span>
                    <a href="tel:+918023400459" className="text-white font-bold hover:text-[#F28C28] transition-colors">
                      +91 80 2340 0459
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F28C28] shrink-0" />
                  <div className="text-xs">
                    <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-400 hover:text-white transition-colors truncate block">
                      kwalitygasmarketing@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright & Staff Portal */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Kwality Gas Bottlers Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/price-list" className="hover:text-white transition-colors">
              Price Terms & GST
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
              <Lock className="w-3 h-3" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>

        {/* Developer Credit Line matching reference */}
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center">
          <div className="inline-flex items-center justify-center flex-wrap gap-2 text-xs text-slate-300 font-medium text-center">
            <span className="inline-flex items-center gap-1.5">
              <span>Designed &amp; Developed with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block animate-pulse shrink-0" aria-label="love" />
              <span>by</span>
            </span>
            {developerUrl ? (
              <a
                href={developerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center transition-transform hover:scale-105"
                title="HostingBaba"
              >
                <Image
                  src="/images/hostingbaba-logo.webp"
                  alt="HostingBaba"
                  width={105}
                  height={26}
                  priority
                  unoptimized
                  className="h-6 sm:h-7 w-auto object-contain inline-block rounded-md shadow-xs"
                />
              </a>
            ) : (
              <div className="inline-flex items-center" title="HostingBaba">
                <Image
                  src="/images/hostingbaba-logo.webp"
                  alt="HostingBaba"
                  width={105}
                  height={26}
                  priority
                  unoptimized
                  className="h-6 sm:h-7 w-auto object-contain inline-block rounded-md shadow-xs"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
