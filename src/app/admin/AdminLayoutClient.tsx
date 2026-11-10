"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Tag,
  Package,
  MessageSquare,
  Images,
  Award,
  FileText,
  Search,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  ShieldCheck,
  Share2,
  Sliders,
  ShoppingBag,
} from "lucide-react";

interface AdminLayoutClientProps {
  admin: any;
  children: React.ReactNode;
}

export default function AdminLayoutClient({ admin, children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (!admin && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [admin, pathname, router]);

  // If on login page, render children directly without dashboard chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white space-y-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-300">Checking authorization...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { name: "WhatsApp Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Hero Image Slider", href: "/admin/hero-slider", icon: Sliders },
    { name: "Enquiries & Leads", href: "/admin/enquiries", icon: Inbox },
    { name: "Price List Manager", href: "/admin/price-list", icon: Tag },
    { name: "Product Management", href: "/admin/products", icon: Package },
    { name: "Customer Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Photo Gallery", href: "/admin/gallery", icon: Images },
    { name: "Awards & Certificates", href: "/admin/awards", icon: Award },
    { name: "Social Media Channels", href: "/admin/social-media", icon: Share2 },
    { name: "Pages & Sections", href: "/admin/pages", icon: FileText },
    { name: "SEO & Open Graph", href: "/admin/seo", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-brand-blue-dark text-slate-300 border-r border-slate-800 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="bg-white p-2 rounded-lg">
            <div className="relative w-36 h-10">
              <Image
                src="/images/brand/logo.jpg"
                alt="Kwality Gas"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-brand-orange text-white shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin User Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#041624]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold text-xs shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{admin?.name || "Administrator"}</p>
              <p className="text-[10px] text-slate-400 truncate">{admin?.email || "admin@kwalitygas.com"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-64 max-w-[80%] h-full bg-brand-blue-dark text-slate-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white text-sm">Kwality Gas CMS</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive ? "bg-brand-orange text-white" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs text-brand-orange flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Live Website
              </Link>
              <button onClick={handleLogout} className="text-xs text-rose-400 font-bold flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-black text-brand-blue-dark text-base sm:text-lg">
              Kwality Gas Management Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-orange bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

