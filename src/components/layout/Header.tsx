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
  UserCheck,
  Send,
  Lock,
} from "lucide-react";
import EnquiryModal from "@/components/shared/EnquiryModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
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

  const openEnquiry = (type: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL" = "DOMESTIC") => {
    setEnquiryInitialType(type);
    setEnquiryModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Products",
      href: "/products",
      hasDropdown: true,
      subItems: [
        { name: "All Products Overview", href: "/products" },
        { name: "LPG Cylinders Range", href: "/cylinders" },
        { name: "LPG for Domestic (12kg, 5.5kg, 4kg)", href: "/domestic" },
        { name: "LPG for Commercial (17kg, 21kg)", href: "/commercial" },
        { name: "LPG for Industrial (33kg)", href: "/industrial" },
        { name: "Kwality Gas Water Heater", href: "/products#water-heater" },
        { name: "Accessories & Regulators", href: "/gallery" },
      ],
    },
    { name: "Services", href: "/services" },
    { name: "Price List", href: "/price-list", badge: "Live" },
    { name: "Safety Features", href: "/safety-features" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Gallery", href: "/gallery" },
    { name: "Group Company", href: "/group-company" },
    {
      name: "Contact",
      href: "/contact",
      hasDropdown: true,
      subItems: [
        { name: "Home Customer (Domestic)", href: "/contact" },
        { name: "Commercial Requirement", href: "/contact/commercial" },
        { name: "Industrial Requirement", href: "/contact/industrial" },
      ],
    },
  ];

  return (
    <>
      <header className="w-full z-40 sticky top-0 bg-white shadow-sm transition-all duration-300">
        {/* Top Corporate Accreditation Bar */}
        <div className="bg-brand-blue text-white text-xs py-2 px-4 border-b border-brand-blue-light/30">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-brand-orange-light font-semibold">CIN:</span> U01120KA2005PTC036860
              </span>
              <span className="hidden md:inline text-white/40">|</span>
              <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                <Award className="w-3.5 h-3.5 inline text-amber-400" />
                Rating: GRADE 1 (MDRA DOI 29-04-2017)
              </span>
              <span className="hidden lg:inline text-white/40">|</span>
              <span className="hidden lg:flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                Hours: 9:30 AM – 5:30 PM (Mon–Sat)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+918023400459"
                className="flex items-center gap-1.5 hover:text-brand-orange transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <span className="hidden sm:inline">Call Office:</span> +91 - 80 - 2340 0459
              </a>
              <span className="text-white/40">|</span>
              <Link
                href="/admin"
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[11px] transition-colors"
                title="Admin Portal"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-44 h-14 transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/original/logo.jpg"
                  alt="Kwality Gas Bottlers Pvt Ltd"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group"
                      onMouseEnter={() => link.name === "Products" ? setProductsOpen(true) : setContactOpen(true)}
                      onMouseLeave={() => link.name === "Products" ? setProductsOpen(false) : setContactOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                          isActive
                            ? "text-brand-orange bg-brand-orange-light/20"
                            : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full pt-1.5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-brand-orange hover:bg-orange-50/60 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                      isActive
                        ? "text-brand-orange bg-brand-orange-light/20"
                        : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-bold rounded-full animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orange-flame hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Book Cylinder / Enquiry</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="sm:hidden flex items-center gap-1 bg-brand-orange text-white px-2.5 py-1.5 rounded-lg text-xs font-bold"
              >
                <Flame className="w-3.5 h-3.5 fill-white" />
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-brand-blue hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          if (link.name === "Products") setProductsOpen(!productsOpen);
                          else setContactOpen(!contactOpen);
                        }}
                        className="w-full flex justify-between items-center px-3 py-2.5 rounded-md text-base font-semibold text-slate-800 hover:bg-slate-50"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          (link.name === "Products" && productsOpen) || (link.name === "Contact" && contactOpen) ? "rotate-180" : ""
                        }`} />
                      </button>

                      {((link.name === "Products" && productsOpen) || (link.name === "Contact" && contactOpen)) && (
                        <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-orange font-medium"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                        pathname === link.href ? "text-brand-orange bg-orange-50" : "text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
              <button
                onClick={() => openEnquiry("DOMESTIC")}
                className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white py-3 rounded-lg font-bold shadow"
              >
                <Flame className="w-4 h-4" />
                Book Cylinder / Send Enquiry
              </button>

              <div className="p-3 bg-brand-blue-surface rounded-lg text-xs space-y-1 text-brand-blue-dark">
                <p className="font-semibold">Marketing Team Call:</p>
                <p className="font-bold text-sm">+91 78997 87101 / +91 91082 48073</p>
                <p className="text-[11px] text-slate-600">Bangalore Head Office: +91 - 80 - 2340 0459</p>
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

