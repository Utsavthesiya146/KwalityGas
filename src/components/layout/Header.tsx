"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Flame,
  Clock,
  Building2,
  Home,
  Briefcase,
  Factory,
  Sparkles,
  FileText,
  BadgeCheck,
  Images,
  MessageSquare,
  ArrowRight,
  Award,
} from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lpgDropdownOpen, setLpgDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  // Mobile Accordions
  const [mobileLpgOpen, setMobileLpgOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialType, setEnquiryInitialType] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("DOMESTIC");

  const lpgMenuRef = useRef<HTMLDivElement>(null);
  const productsMenuRef = useRef<HTMLDivElement>(null);
  const companyMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLpgDropdownOpen(false);
    setProductsDropdownOpen(false);
    setCompanyDropdownOpen(false);
  }, [pathname]);

  // Click outside listener for all desktop dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (lpgMenuRef.current && !lpgMenuRef.current.contains(target)) {
        setLpgDropdownOpen(false);
      }
      if (productsMenuRef.current && !productsMenuRef.current.contains(target)) {
        setProductsDropdownOpen(false);
      }
      if (companyMenuRef.current && !companyMenuRef.current.contains(target)) {
        setCompanyDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLpgDropdownOpen(false);
        setProductsDropdownOpen(false);
        setCompanyDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openEnquiry = (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL" = "DOMESTIC") => {
    setEnquiryInitialType(type);
    setEnquiryModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-white transition-all duration-200">
        {/* Top Utility Strip */}
        <div className="bg-[#0B1D2F] text-white text-xs border-b border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-2 text-[11px] sm:text-xs">
            {/* Left: Rating & Quality */}
            <div className="flex items-center gap-2 sm:gap-4 text-slate-300 truncate">
              <span className="inline-flex items-center gap-1.5 font-bold text-white tracking-tight truncate">
                <BadgeCheck className="w-3.5 h-3.5 text-[#F28C28] shrink-0" />
                <span>Grade 1 Rated</span>
                <span className="text-slate-400 font-normal hidden md:inline">• CARE MDRA Certified</span>
              </span>
              <span className="hidden lg:inline-block text-slate-600">|</span>
              <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3 text-[#F28C28]" />
                <span>Plants: Hosur • Chennai • Dharwad</span>
              </span>
            </div>

            {/* Right: Hotline */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto shrink-0 whitespace-nowrap">
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#F28C28] transition-colors"
                title="Priority LPG Helpline"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Phone className="w-3 h-3 text-[#F28C28]" />
                <span>Hotline: +91 78997 87101</span>
              </a>
              <span className="text-slate-600 hidden xl:inline">|</span>
              <a
                href="tel:+918023400459"
                className="hidden xl:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <span>Office: +91 80 2340 0459</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Desktop Navigation - Clean, Single Horizontal Line */}
        <div
          className={`border-b border-slate-100 transition-all duration-200 ${isScrolled ? "py-2 shadow-md bg-white/98 backdrop-blur-md" : "py-3 bg-white"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">

            {/* Logo on the left */}
            <Link
              href="/"
              className="flex items-center shrink-0 group py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769AA] rounded-lg"
              title="Kwality Gas Bottlers Pvt Ltd - Home"
              aria-label="Kwality Gas Bottlers Home"
            >
              <div className="relative h-9 sm:h-10 md:h-11 w-36 sm:w-40 md:w-44 flex items-center">
                <Image
                  src="/images/brand/logo.jpg"
                  alt="Kwality Gas Bottlers Pvt Ltd"
                  fill
                  className="object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, 176px"
                />
              </div>
            </Link>

            {/* Navigation links in the center (Single line on all desktop viewports 1024px+) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 text-xs xl:text-sm font-semibold text-slate-700">

              {/* Home */}
              <Link
                href="/"
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${pathname === "/" ? "text-[#1769AA] bg-blue-50/80 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
              >
                Home
              </Link>

              {/* LPG Segments Dropdown */}
              <div
                ref={lpgMenuRef}
                className="relative"
                onMouseEnter={() => setLpgDropdownOpen(true)}
                onMouseLeave={() => setLpgDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setLpgDropdownOpen(!lpgDropdownOpen)}
                  className={`px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors whitespace-nowrap ${pathname.startsWith("/domestic") || pathname.startsWith("/commercial") || pathname.startsWith("/industrial")
                    ? "text-[#1769AA] bg-blue-50/80 font-bold"
                    : "hover:text-[#1769AA] hover:bg-slate-50"
                    }`}
                  aria-expanded={lpgDropdownOpen}
                >
                  <span>LPG Segments</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${lpgDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {lpgDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/domestic"
                      onClick={() => setLpgDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Domestic LPG</div>
                        <div className="text-[11px] text-slate-500">12kg, 5.5kg & 4kg households</div>
                      </div>
                    </Link>

                    <Link
                      href="/commercial"
                      onClick={() => setLpgDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Commercial LPG</div>
                        <div className="text-[11px] text-slate-500">17kg & 21kg for hotels & kitchens</div>
                      </div>
                    </Link>

                    <Link
                      href="/industrial"
                      onClick={() => setLpgDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                        <Factory className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Industrial LPG</div>
                        <div className="text-[11px] text-slate-500">33kg LOT/VOT & manifold banks</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Products Compact Mega-Menu */}
              <div
                ref={productsMenuRef}
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  className={`px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors whitespace-nowrap ${pathname.startsWith("/products") || pathname.startsWith("/cylinders") || pathname.startsWith("/gas-water-heater") || pathname.startsWith("/safety-devices") || pathname.startsWith("/accessories")
                    ? "text-[#1769AA] bg-blue-50/80 font-bold"
                    : "hover:text-[#1769AA] hover:bg-slate-50"
                    }`}
                  aria-expanded={productsDropdownOpen}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${productsDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {productsDropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] xl:w-[580px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 z-50 animate-in fade-in-50 duration-150 text-slate-900"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Col 1: LPG Cylinders Range */}
                      <div className="space-y-1">
                        <div className="px-2 pb-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          LPG Cylinders
                        </div>
                        <Link
                          href="/cylinders"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0">
                            <Flame className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                              Domestic Cylinders
                            </div>
                            <div className="text-[10px] text-slate-500">12kg, 5.5kg & 4kg Cook & Light</div>
                          </div>
                        </Link>

                        <Link
                          href="/commercial"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                              Commercial Cylinders
                            </div>
                            <div className="text-[10px] text-slate-500">17kg & 21kg for HORECA</div>
                          </div>
                        </Link>

                        <Link
                          href="/industrial"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                            <Factory className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                              Industrial 33kg LOT/VOT
                            </div>
                            <div className="text-[10px] text-slate-500">Liquid & vapor off-take systems</div>
                          </div>
                        </Link>
                      </div>

                      {/* Col 2: Appliances & Safety */}
                      <div className="space-y-1">
                        <div className="px-2 pb-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Appliances & Safety
                        </div>
                        <Link
                          href="/gas-water-heater"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                              Kwality Gas Water Heater
                            </div>
                            <div className="text-[10px] text-slate-500">8 built-in safety devices</div>
                          </div>
                        </Link>

                        <Link
                          href="/safety-devices"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                              Safety Devices
                            </div>
                            <div className="text-[10px] text-slate-500">Auto shut-offs & leak detectors</div>
                          </div>
                        </Link>

                        <Link
                          href="/accessories"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#1769AA] transition-colors">
                              Accessories & Valves
                            </div>
                            <div className="text-[10px] text-slate-500">Hoses, click-ons & regulators</div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs px-2">
                      <Link
                        href="/products"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="font-bold text-[#1769AA] hover:text-[#F28C28] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>All Products Catalog</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href="/price-list"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="font-bold text-slate-600 hover:text-[#F28C28] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Check Live Rates</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Services */}
              <Link
                href="/services"
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${pathname === "/services" ? "text-[#1769AA] bg-blue-50/80 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
              >
                Services
              </Link>

              {/* Price List */}
              <Link
                href="/price-list"
                className={`px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${pathname === "/price-list" ? "text-[#1769AA] bg-blue-50/80 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
              >
                <span>Price List</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#F28C28] text-white uppercase tracking-wider">
                  Live
                </span>
              </Link>

              {/* Safety */}
              <Link
                href="/safety-features"
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${pathname === "/safety-features" ? "text-[#1769AA] bg-blue-50/80 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
              >
                Safety
              </Link>

              {/* Company Dropdown */}
              <div
                ref={companyMenuRef}
                className="relative"
                onMouseEnter={() => setCompanyDropdownOpen(true)}
                onMouseLeave={() => setCompanyDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                  className={`px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors whitespace-nowrap ${pathname === "/about" || pathname === "/group-company" || pathname === "/testimonials" || pathname === "/gallery"
                    ? "text-[#1769AA] bg-blue-50/80 font-bold"
                    : "hover:text-[#1769AA] hover:bg-slate-50"
                    }`}
                  aria-expanded={companyDropdownOpen}
                >
                  <span>Company</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${companyDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {companyDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/about"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-[#1769AA]" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">About Kwality Gas</div>
                        <div className="text-[10px] text-slate-500">Heritage & 3 bottling plants</div>
                      </div>
                    </Link>

                    <Link
                      href="/group-company"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <Award className="w-4 h-4 text-[#F28C28]" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Group Profile</div>
                        <div className="text-[10px] text-slate-500">Over 35 years in energy</div>
                      </div>
                    </Link>

                    <Link
                      href="/gallery"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <Images className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Plant Infrastructure</div>
                        <div className="text-[10px] text-slate-500">Hosur, Chennai & Dharwad photos</div>
                      </div>
                    </Link>

                    <Link
                      href="/testimonials"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Testimonials</div>
                        <div className="text-[10px] text-slate-500">Verified client feedback</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${pathname.startsWith("/contact") ? "text-[#1769AA] bg-blue-50/80 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: One Prominent Enquiry CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#F28C28] hover:bg-[#D9771A] text-white px-3 py-2 xl:px-4 xl:py-2.5 rounded-xl text-xs xl:text-sm font-bold shadow-xs hover:shadow transition-all whitespace-nowrap active:scale-95"
              >
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>
                  <span className="hidden xl:inline">Book Cylinder / </span>Enquire
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#102A43] hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[88px] z-40 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-between">
            <div className="bg-white w-full max-h-[calc(100vh-88px)] overflow-y-auto border-t border-slate-100 p-5 space-y-4 shadow-xl">

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pb-2">
                <button
                  onClick={() => openEnquiry("DOMESTIC")}
                  className="bg-[#F28C28] text-white p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Home className="w-4 h-4" />
                  <span>Domestic Refill</span>
                </button>
                <button
                  onClick={() => openEnquiry("COMMERCIAL")}
                  className="bg-[#1769AA] text-white p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Commercial Quote</span>
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1 text-sm font-bold text-slate-900 divide-y divide-slate-100">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Home
                </Link>

                {/* LPG Segments Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileLpgOpen(!mobileLpgOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>LPG Segments</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileLpgOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileLpgOpen && (
                    <div className="pl-5 pr-2 py-1 space-y-1 text-xs font-semibold text-slate-600">
                      <Link
                        href="/domestic"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Domestic LPG (12kg, 5.5kg, 4kg)
                      </Link>
                      <Link
                        href="/commercial"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Commercial LPG (17kg, 21kg)
                      </Link>
                      <Link
                        href="/industrial"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Industrial 33kg LOT/VOT
                      </Link>
                    </div>
                  )}
                </div>

                {/* Products Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>Products & Appliances</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="pl-5 pr-2 py-1 space-y-1 text-xs font-semibold text-slate-600">
                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100 font-bold text-[#1769AA]"
                      >
                        All Products Overview
                      </Link>
                      <Link
                        href="/cylinders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        LPG Cylinders (2kg to 33kg)
                      </Link>
                      <Link
                        href="/gas-water-heater"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Gas Water Heater (Geyser)
                      </Link>
                      <Link
                        href="/safety-devices"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Safety Devices & Auto-Shutoffs
                      </Link>
                      <Link
                        href="/accessories"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Accessories & Regulators
                      </Link>
                    </div>
                  )}
                </div>

                {/* Services */}
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Services
                </Link>

                {/* Price List */}
                <Link
                  href="/price-list"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span>Price List</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F28C28] text-white">LIVE</span>
                </Link>

                {/* Safety */}
                <Link
                  href="/safety-features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Safety Guidelines
                </Link>

                {/* Company Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>Company</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileCompanyOpen && (
                    <div className="pl-5 pr-2 py-1 space-y-1 text-xs font-semibold text-slate-600">
                      <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        About Kwality Gas
                      </Link>
                      <Link
                        href="/group-company"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Group Company Profile
                      </Link>
                      <Link
                        href="/gallery"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Plant Photo Gallery
                      </Link>
                      <Link
                        href="/testimonials"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-2 rounded hover:bg-slate-100"
                      >
                        Customer Testimonials
                      </Link>
                    </div>
                  )}
                </div>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Contact & Hotlines
                </Link>
              </div>

              {/* Direct Call hotline */}
              <div className="pt-4 border-t border-slate-100 text-center">
                <a
                  href="tel:+917899787101"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0B1D2F] text-white font-bold text-xs shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#F28C28]" />
                  <span>Call 24/7 Hotline: +91 78997 87101</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Shared Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialType={enquiryInitialType}
      />
    </>
  );
}
