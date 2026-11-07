"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lpgDropdownOpen, setLpgDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialType, setEnquiryInitialType] = useState<"DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL">("DOMESTIC");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        {/* Top utility bar */}
        <div className="bg-[#102A43] text-white border-b border-white/10 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
            {/* Left: Certifications & CIN */}
            <div className="flex items-center gap-4 flex-wrap text-slate-200">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <BadgeCheck className="w-3.5 h-3.5 text-[#F28C28]" />
                <span className="font-semibold text-white">Grade 1 Rated</span> LPG Bottlers & Distributors
              </span>
              <span className="hidden md:inline-block text-slate-400">|</span>
              <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
                <span>CIN:</span>
                <span className="text-white font-mono">U01120KA2005PTC036860</span>
              </span>
              <span className="hidden lg:inline-block text-slate-400">|</span>
              <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3 text-[#F28C28]" />
                <span>Mon - Sat: 9:30 AM - 5:30 PM</span>
              </span>
            </div>

            {/* Right: Quick hotline & Support */}
            <div className="flex items-center gap-4 text-xs ml-auto">
              <a
                href="tel:+917899787101"
                className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#F28C28] transition-colors"
                title="Marketing Hotline"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Hotline: +91 78997 87101</span>
              </a>
              <span className="text-slate-400">|</span>
              <a
                href="tel:+918023400459"
                className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <span>Office: +91 80 2340 0459</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className={`transition-all duration-300 ${isScrolled ? "py-2.5" : "py-3.5"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 bg-white">
                <Image
                  src="/images/original/logo.png"
                  alt="Kwality Gas Bottlers Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#102A43] group-hover:text-[#1769AA] transition-colors">
                  KWALITY <span className="text-[#F28C28]">GAS</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider -mt-1">
                  Bottlers Private Limited
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-[#182230]">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/" ? "text-[#1769AA] bg-blue-50 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
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
                  className={`px-3 py-2 rounded-lg inline-flex items-center gap-1 transition-colors ${
                    pathname.startsWith("/domestic") || pathname.startsWith("/commercial") || pathname.startsWith("/industrial")
                      ? "text-[#1769AA] bg-blue-50 font-bold"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                >
                  <span>LPG Segments</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${lpgDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {lpgDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-cardHover border border-slate-100 py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/domestic"
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Domestic LPG</div>
                        <div className="text-xs text-slate-500 mt-0.5">12kg, 5.5kg & 4kg Cook & Light for homes</div>
                      </div>
                    </Link>

                    <Link
                      href="/commercial"
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Commercial LPG</div>
                        <div className="text-xs text-slate-500 mt-0.5">17kg & 21kg for hotels, restaurants & caterers</div>
                      </div>
                    </Link>

                    <Link
                      href="/industrial"
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  className={`px-3 py-2 rounded-lg inline-flex items-center gap-1 transition-colors ${
                    pathname.startsWith("/products") || pathname.startsWith("/cylinders") || pathname.startsWith("/gas-water-heater") || pathname.startsWith("/safety-devices") || pathname.startsWith("/accessories")
                      ? "text-[#1769AA] bg-blue-50 font-bold"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-cardHover border border-slate-100 py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/products"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Gas Water Heater</div>
                        <div className="text-xs text-slate-500">Instant geysers with 8 safety features</div>
                      </div>
                    </Link>

                    <Link
                      href="/safety-devices"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
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

              <Link
                href="/services"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/services" ? "text-[#1769AA] bg-blue-50 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Services
              </Link>

              {/* Price List with dynamic Live indicator */}
              <Link
                href="/price-list"
                className={`relative px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 ${
                  pathname === "/price-list" ? "text-[#1769AA] bg-blue-50 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                <span>Price List</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F28C28] text-white tracking-wider uppercase shadow-xs">
                  Live
                </span>
              </Link>

              <Link
                href="/safety-features"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/safety-features" ? "text-[#1769AA] bg-blue-50 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Safety
              </Link>

              <Link
                href="/testimonials"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/testimonials" ? "text-[#1769AA] bg-blue-50 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Testimonials
              </Link>

              <Link
                href="/gallery"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/gallery" ? "text-[#1769AA] bg-blue-50 font-bold" : "hover:text-[#1769AA] hover:bg-slate-50"
                }`}
              >
                Gallery
              </Link>

              {/* Company Dropdown (About + Group Company) */}
              <div
                className="relative"
                onMouseEnter={() => setCompanyDropdownOpen(true)}
                onMouseLeave={() => setCompanyDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`px-3 py-2 rounded-lg inline-flex items-center gap-1 transition-colors ${
                    pathname === "/about" || pathname === "/group-company"
                      ? "text-[#1769AA] bg-blue-50 font-bold"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${companyDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {companyDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-cardHover border border-slate-100 py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/about"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">About Us</div>
                        <div className="text-xs text-slate-500">History, Grade 1 rating & plants</div>
                      </div>
                    </Link>

                    <Link
                      href="/group-company"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Group Company</div>
                        <div className="text-xs text-slate-500">Diversified industrial profile</div>
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
                  className={`px-3 py-2 rounded-lg inline-flex items-center gap-1 transition-colors ${
                    pathname.startsWith("/contact")
                      ? "text-[#1769AA] bg-blue-50 font-bold"
                      : "hover:text-[#1769AA] hover:bg-slate-50"
                  }`}
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${contactDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {contactDropdownOpen && (
                  <div className="absolute top-full right-0 w-72 bg-white rounded-xl shadow-cardHover border border-slate-100 py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <Link
                      href="/contact"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Main Contact & Offices</div>
                        <div className="text-xs text-slate-500">Bangalore HQ & 3 bottling plants</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact/domestic"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F28C28] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Domestic Booking</div>
                        <div className="text-xs text-slate-500">New household connection form</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact/commercial"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Commercial Quote</div>
                        <div className="text-xs text-slate-500">HORECA & hotel requirements</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact/industrial"
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Factory className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Industrial Requirement</div>
                        <div className="text-xs text-slate-500">33kg manifold cylinder supply</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Header Right Action CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Book LPG / Enquiry</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="sm:hidden inline-flex items-center gap-1.5 bg-[#F28C28] text-white px-3 py-1.5 rounded-lg font-bold text-xs"
              >
                <span>Book LPG</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-[#1769AA] hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-8 space-y-2 max-h-[85vh] overflow-y-auto animate-in fade-in duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>

            {/* Mobile LPG Segments */}
            <div className="pt-2 pb-1 border-t border-slate-100">
              <div className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                LPG Business Categories
              </div>
              <Link
                href="/domestic"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Domestic LPG (12kg, 5.5kg, 4kg)
              </Link>
              <Link
                href="/commercial"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Commercial LPG (17kg, 21kg)
              </Link>
              <Link
                href="/industrial"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Industrial LPG (33kg Cylinders & Manifolds)
              </Link>
            </div>

            {/* Mobile Products */}
            <div className="pt-2 pb-1 border-t border-slate-100">
              <div className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Products & Equipment
              </div>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                All Products Catalog
              </Link>
              <Link
                href="/cylinders"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                LPG Cylinders Range
              </Link>
              <Link
                href="/gas-water-heater"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Kwality Gas Water Heater (Geyser)
              </Link>
              <Link
                href="/safety-devices"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Industrial Safety Devices
              </Link>
              <Link
                href="/accessories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                LPG Regulators & Accessories
              </Link>
            </div>

            {/* Mobile Core Links */}
            <div className="pt-2 pb-1 border-t border-slate-100 space-y-1">
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Services
              </Link>
              <Link
                href="/price-list"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>Price List (Karnataka & TN)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F28C28] text-white">Live</span>
              </Link>
              <Link
                href="/safety-features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Safety Features & Guidelines
              </Link>
              <Link
                href="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Client Testimonials
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Plant & Facilities Gallery
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                About Us
              </Link>
              <Link
                href="/group-company"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Group Company Profile
              </Link>
            </div>

            {/* Mobile Contact Forms */}
            <div className="pt-2 pb-1 border-t border-slate-100">
              <div className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Contact & Online Enquiries
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                General Contact & Plant Locations
              </Link>
              <Link
                href="/contact/domestic"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Domestic Connection Enquiry
              </Link>
              <Link
                href="/contact/commercial"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Commercial Bulk Refill Quote
              </Link>
              <Link
                href="/contact/industrial"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Industrial Manifold Consultation
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="w-full bg-[#F28C28] text-white py-3 rounded-xl font-bold text-sm text-center shadow-sm"
              >
                Book Cylinder Connection
              </button>
              <a
                href="tel:+917899787101"
                className="w-full flex items-center justify-center gap-2 bg-[#102A43] text-white py-2.5 rounded-xl font-bold text-sm text-center"
              >
                <Phone className="w-4 h-4 text-[#F28C28]" />
                <span>Call Hotline: +91 78997 87101</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialType={enquiryInitialType}
      />
    </>
  );
}
