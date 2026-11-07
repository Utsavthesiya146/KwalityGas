"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  Award,
  Menu,
  X,
  ChevronDown,
  Flame,
  Clock,
  Send,
  Building2,
  Home,
  Briefcase,
  Factory,
  Sparkles,
  HelpCircle,
  FileText,
  BadgeCheck,
  Images,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lpgDropdownOpen, setLpgDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  // Mobile Accordion States
  const [mobileLpgOpen, setMobileLpgOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialType, setEnquiryInitialType] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("DOMESTIC");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLpgDropdownOpen(false);
    setProductsDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setContactDropdownOpen(false);
  }, [pathname]);

  const openEnquiry = (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL" = "DOMESTIC") => {
    setEnquiryInitialType(type);
    setEnquiryModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
        {/* Top Utility Bar */}
        <div className="bg-[#0B1D2F] text-white border-b border-white/10 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
            {/* Left: Certifications & CIN */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-slate-200">
              <span className="inline-flex items-center gap-1.5 font-bold tracking-tight">
                <BadgeCheck className="w-3.5 h-3.5 text-[#F28C28]" />
                <span className="text-white">Grade 1 Rated</span>
                <span className="text-slate-400 font-normal hidden sm:inline">LPG Bottlers & Distributors</span>
              </span>
              <span className="hidden md:inline-block text-slate-600">|</span>
              <span className="hidden md:inline-flex items-center gap-1 text-slate-300 font-medium">
                <span className="text-slate-400">CIN:</span>
                <span className="text-white font-mono text-[11px]">U01120KA2005PTC036860</span>
              </span>
              <span className="hidden xl:inline-block text-slate-600">|</span>
              <span className="hidden xl:inline-flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3 text-[#F28C28]" />
                <span>Mon - Sat: 9:30 AM - 5:30 PM</span>
              </span>
            </div>

            {/* Right: Hotline & Office */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs ml-auto whitespace-nowrap">
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-1.5 font-black text-white hover:text-[#F28C28] transition-colors"
                title="24/7 Priority Hotline"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Hotline: +91 78997 87101</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <a
                href="tel:+918023400459"
                className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <span>Office: +91 80 2340 0459</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar - Strictly 1-line on all desktop viewports */}
        <div className={`transition-all duration-300 ${isScrolled ? "py-2 sm:py-2.5 shadow-md bg-white/98 backdrop-blur-md" : "py-3 sm:py-3.5 bg-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-xs border border-slate-100 shrink-0 bg-white">
                <Image
                  src="/images/original/logo.png"
                  alt="Kwality Gas Bottlers Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight text-[#102A43] group-hover:text-[#1769AA] transition-colors whitespace-nowrap">
                  KWALITY <span className="text-[#F28C28]">GAS</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider -mt-0.5 whitespace-nowrap">
                  Bottlers Pvt Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Visible lg+ (1024px+) on ONE clean line */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px] xl:text-sm font-bold text-[#102A43]">
              
              {/* Home */}
              <Link
                href="/"
                className={`px-2.5 xl:px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                  pathname === "/" ? "text-[#1769AA] bg-blue-50/80 font-black" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              {/* LPG Segments Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLpgDropdownOpen(true)}
                onMouseLeave={() => setLpgDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-xl inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                    pathname.startsWith("/domestic") || pathname.startsWith("/commercial") || pathname.startsWith("/industrial")
                      ? "text-[#1769AA] bg-blue-50/80 font-black"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                  aria-expanded={lpgDropdownOpen}
                >
                  <span>LPG Segments</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${lpgDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {lpgDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-cardHover border border-slate-100 py-2.5 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/domestic"
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Domestic LPG</div>
                        <div className="text-xs text-slate-500 mt-0.5">12kg, 5.5kg & 4kg Cook & Light for households</div>
                      </div>
                    </Link>

                    <Link
                      href="/commercial"
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Commercial LPG</div>
                        <div className="text-xs text-slate-500 mt-0.5">17kg & 21kg for hotels, restaurants & catering</div>
                      </div>
                    </Link>

                    <Link
                      href="/industrial"
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Factory className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Industrial LPG</div>
                        <div className="text-xs text-slate-500 mt-0.5">33kg LOT/VOT & multi-cylinder manifold systems</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Products & Appliances Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-xl inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                    pathname.startsWith("/products") || pathname.startsWith("/cylinders") || pathname.startsWith("/gas-water-heater") || pathname.startsWith("/safety-devices") || pathname.startsWith("/accessories")
                      ? "text-[#1769AA] bg-blue-50/80 font-black"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                  aria-expanded={productsDropdownOpen}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-cardHover border border-slate-100 py-2.5 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/products"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">All Products Overview</div>
                        <div className="text-xs text-slate-500">Complete catalog of gas & appliances</div>
                      </div>
                    </Link>

                    <Link
                      href="/cylinders"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0 mt-0.5">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">LPG Cylinders Range</div>
                        <div className="text-xs text-slate-500">2kg to 33kg heavy-duty cylinders</div>
                      </div>
                    </Link>

                    <Link
                      href="/gas-water-heater"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Gas Water Heater</div>
                        <div className="text-xs text-slate-500">Instant geysers with 8 built-in safety devices</div>
                      </div>
                    </Link>

                    <Link
                      href="/safety-devices"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Safety Devices</div>
                        <div className="text-xs text-slate-500">Gas detectors, auto-shutoffs & valves</div>
                      </div>
                    </Link>

                    <Link
                      href="/accessories"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Accessories & Regulators</div>
                        <div className="text-xs text-slate-500">IS 9573 rubber hoses & click-on regulators</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Services */}
              <Link
                href="/services"
                className={`px-2.5 xl:px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                  pathname === "/services" ? "text-[#1769AA] bg-blue-50/80 font-black" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Services
              </Link>

              {/* Price List with dynamic Live indicator */}
              <Link
                href="/price-list"
                className={`relative px-2.5 xl:px-3 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  pathname === "/price-list" ? "text-[#1769AA] bg-blue-50/80 font-black" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                <span>Price List</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#F28C28] text-white tracking-wider uppercase shadow-xs">
                  Live
                </span>
              </Link>

              {/* Safety */}
              <Link
                href="/safety-features"
                className={`px-2.5 xl:px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                  pathname === "/safety-features" ? "text-[#1769AA] bg-blue-50/80 font-black" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Safety
              </Link>

              {/* Company Dropdown (Consolidated: About, Group Company, Testimonials, Gallery, Awards) */}
              <div
                className="relative"
                onMouseEnter={() => setCompanyDropdownOpen(true)}
                onMouseLeave={() => setCompanyDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-xl inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                    pathname === "/about" || pathname === "/group-company" || pathname === "/testimonials" || pathname === "/gallery"
                      ? "text-[#1769AA] bg-blue-50/80 font-black"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                  aria-expanded={companyDropdownOpen}
                >
                  <span>Company</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {companyDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-cardHover border border-slate-100 py-2.5 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/about"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">About Kwality Gas</div>
                        <div className="text-xs text-slate-500">History, Grade 1 rating & 3 bottling plants</div>
                      </div>
                    </Link>

                    <Link
                      href="/group-company"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Group Company</div>
                        <div className="text-xs text-slate-500">Diversified 35+ years industrial profile</div>
                      </div>
                    </Link>

                    <Link
                      href="/testimonials"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Customer Testimonials</div>
                        <div className="text-xs text-slate-500">8 genuine verified customer reviews</div>
                      </div>
                    </Link>

                    <Link
                      href="/gallery"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Images className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Plant Photo Gallery</div>
                        <div className="text-xs text-slate-500">Hosur, Chennai & Dharwad facilities</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setContactDropdownOpen(true)}
                onMouseLeave={() => setContactDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-xl inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                    pathname.startsWith("/contact")
                      ? "text-[#1769AA] bg-blue-50/80 font-black"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                  aria-expanded={contactDropdownOpen}
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${contactDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {contactDropdownOpen && (
                  <div className="absolute top-full right-0 w-80 bg-white rounded-2xl shadow-cardHover border border-slate-100 py-2.5 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/contact"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Corporate Offices & Plants</div>
                        <div className="text-xs text-slate-500">Bengaluru HQ & bottling plant hotlines</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact/domestic"
                      className="flex items-start gap-3 px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0 mt-0.5">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Domestic Gas Connection</div>
                        <div className="text-[11px] text-slate-500">Household cylinder refill inquiry</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact/commercial"
                      className="flex items-start gap-3 px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Commercial Supply</div>
                        <div className="text-[11px] text-slate-500">HORECA bulk quotation request</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact/industrial"
                      className="flex items-start gap-3 px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Factory className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">Industrial Manifold Consultation</div>
                        <div className="text-[11px] text-slate-500">33kg LOT manifold sizing & survey</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right: CTA & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="hidden sm:inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-3.5 xl:px-5 py-2.5 rounded-xl text-xs xl:text-sm font-extrabold shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Book Cylinder / Enquire</span>
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
          <div className="lg:hidden fixed inset-0 top-[90px] z-40 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-between">
            <div className="bg-white w-full max-h-[calc(100vh-90px)] overflow-y-auto border-t border-slate-100 p-5 space-y-4 shadow-xl">
              
              {/* Quick Booking Buttons */}
              <div className="grid grid-cols-2 gap-2 pb-2">
                <button
                  onClick={() => openEnquiry("DOMESTIC")}
                  className="bg-[#F28C28] text-white p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Home className="w-4 h-4" />
                  <span>Domestic Refill</span>
                </button>
                <button
                  onClick={() => openEnquiry("COMMERCIAL")}
                  className="bg-[#1769AA] text-white p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Commercial Quote</span>
                </button>
              </div>

              {/* Nav Links List */}
              <div className="space-y-1 text-sm font-bold text-slate-900 divide-y divide-slate-100">
                <Link
                  href="/"
                  className="block py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Home
                </Link>

                {/* LPG Segments Accordion */}
                <div className="pt-1">
                  <button
                    onClick={() => setMobileLpgOpen(!mobileLpgOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <span>LPG Segments</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileLpgOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileLpgOpen && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-xl my-1 p-2">
                      <Link href="/domestic" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Domestic LPG (12kg, 5.5kg, 4kg)
                      </Link>
                      <Link href="/commercial" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Commercial LPG (17kg, 21kg)
                      </Link>
                      <Link href="/industrial" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Industrial LPG (33kg Manifold)
                      </Link>
                    </div>
                  )}
                </div>

                {/* Products Accordion */}
                <div className="pt-1">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <span>Products & Appliances</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-xl my-1 p-2">
                      <Link href="/products" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        All Products Catalog
                      </Link>
                      <Link href="/cylinders" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        LPG Cylinders Range (2kg to 33kg)
                      </Link>
                      <Link href="/gas-water-heater" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Instant Gas Water Heater
                      </Link>
                      <Link href="/safety-devices" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Safety Devices & Auto-Shutoff
                      </Link>
                      <Link href="/accessories" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Accessories & Regulators
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/services"
                  className="block py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Services
                </Link>

                <Link
                  href="/price-list"
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span>Live Price List</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#F28C28] text-white uppercase">
                    Live
                  </span>
                </Link>

                <Link
                  href="/safety-features"
                  className="block py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Safety Guidelines
                </Link>

                {/* Company Accordion */}
                <div className="pt-1">
                  <button
                    onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <span>Company</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileCompanyOpen && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-xl my-1 p-2">
                      <Link href="/about" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        About Kwality Gas & Plants
                      </Link>
                      <Link href="/group-company" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Group Company Profile
                      </Link>
                      <Link href="/testimonials" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Customer Testimonials
                      </Link>
                      <Link href="/gallery" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Plant Photo Gallery
                      </Link>
                    </div>
                  )}
                </div>

                {/* Contact Accordion */}
                <div className="pt-1">
                  <button
                    onClick={() => setMobileContactOpen(!mobileContactOpen)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <span>Contact</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileContactOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileContactOpen && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-xl my-1 p-2">
                      <Link href="/contact" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Main Contact & Offices
                      </Link>
                      <Link href="/contact/domestic" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Domestic Gas Booking
                      </Link>
                      <Link href="/contact/commercial" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Commercial Quotation
                      </Link>
                      <Link href="/contact/industrial" className="block py-2 px-2 rounded-lg hover:text-[#1769AA]">
                        Industrial Consultation
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Call Hotlines */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <a
                  href="tel:+917899787101"
                  className="flex items-center justify-between p-3 rounded-xl bg-orange-50 text-[#F28C28] font-bold text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>24/7 Hotline: +91 78997 87101</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="tel:+918023400459"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Bangalore Office: +91 80 2340 0459</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Controlled Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialType={enquiryInitialType}
      />
    </>
  );
}
