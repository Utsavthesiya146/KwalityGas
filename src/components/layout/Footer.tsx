import React from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-slate-300">
      {/* Pre-Footer Quick Contact Strip */}
      <div className="bg-brand-blue border-b border-brand-blue-light/30 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-orange/20 text-brand-orange rounded-xl">
              <Flame className="w-6 h-6 fill-brand-orange" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Need Immediate LPG Refill or Commercial Supply?</h4>
              <p className="text-xs text-slate-300">Fast doorstep deliveries across Karnataka & Tamil Nadu</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+917899787101"
              className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 78997 87101</span>
            </a>
            <Link
              href="/price-list"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border border-white/20"
            >
              View Price List
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Corporate Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-3 rounded-lg inline-block">
              <div className="relative w-44 h-12">
                <Image
                  src="/images/original/logo.jpg"
                  alt="Kwality Gas Bottlers"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Kwality Gas was conceived to produce and market L.P.G. cooking gas as a domestic and commercial fuel. Backed by an Industrial group that has been in existence for over 35 years. Kwality Gas Bottlers Private Limited is situated in Bangalore, with 3 advanced bottling plants—2 in Tamil Nadu (Hosur, Chennai) & 1 in Karnataka (Dharwad). Storage facility of 30,000 MTPA and a bottling capacity of 8,000 cylinders per day.
            </p>

            <div className="pt-2 border-t border-slate-700/60 space-y-1.5 text-xs">
              <p className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold text-brand-orange">CIN:</span>
                <span>U01120KA2005PTC036860</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400 inline" />
                <span className="font-semibold text-white">Rating:</span>
                <span className="text-emerald-400 font-bold">GRADE 1</span> (MDRA DOI 29-04-2017)
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-brand-orange/40 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Products Range", href: "/products" },
                { name: "LPG Cylinders", href: "/cylinders" },
                { name: "Services", href: "/services" },
                { name: "Price List", href: "/price-list" },
                { name: "Safety Features", href: "/safety-features" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Group Company", href: "/group-company" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-brand-orange transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-brand-orange/70" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cylinders & Segment (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-brand-orange/40 pb-2">
              LPG Segments
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: "LPG for Domestic", href: "/domestic" },
                { name: "LPG for Commercial", href: "/commercial" },
                { name: "LPG for Industrial", href: "/industrial" },
                { name: "Gas Water Heaters", href: "/products#water-heater" },
                { name: "12kg Domestic Cylinder", href: "/cylinders" },
                { name: "17kg Commercial Refill", href: "/cylinders" },
                { name: "33kg Industrial Cylinder", href: "/cylinders" },
                { name: "4kg Cook & Light", href: "/cylinders" },
                { name: "Domestic Regulators", href: "/gallery" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-brand-orange transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-brand-orange/70" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us & Map (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-brand-orange/40 pb-2">
              Head Office & Contact
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white block font-medium">Kwality Gas Bottlers Pvt Ltd</strong>
                  V M C House, D-41, 3rd Floor, Rajaji nagar Industrial Estate, Bangalore – 560 044, Karnataka, India.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-200">Office: <a href="tel:+918023400459" className="hover:text-white">+91 - 80 - 2340 0459</a> / <a href="tel:+918023151130" className="hover:text-white">2315 1130</a></p>
                  <p className="text-slate-200">Marketing: <a href="tel:+917899787101" className="hover:text-white font-medium">+91 78997 87101</a> / <a href="tel:+919108248073" className="hover:text-white font-medium">+91 91082 48073</a></p>
                  <p className="text-slate-200">Commercial: <a href="tel:+919108001989" className="hover:text-white">+91 91080 01989</a> / <a href="tel:+919108001990" className="hover:text-white">+91 91080 01990</a></p>
                  <p className="text-slate-200">Front Office: <a href="tel:+919606861082" className="hover:text-white">+91 96068 61082</a></p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="space-y-0.5">
                  <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-200 hover:text-white block">kwalitygasmarketing@gmail.com</a>
                  <a href="mailto:kwalitygas45@gmail.com" className="text-slate-200 hover:text-white block">kwalitygas45@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-700/80 mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.9274372978896!2d77.54628892764606!3d12.981132576470541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3deea2e5b96b%3A0xd699744297dbab7f!2skwality+gas+bottlers!5e0!3m2!1sen!2s!4v1435910580441"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Kwality Gas Bottlers Rajajinagar Bangalore Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 bg-[#041624] py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-center sm:text-left">
            Copyright © 2026 <strong className="text-white">Kwality Gas Bottlers Private Limited</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/safety-features" className="hover:text-white transition-colors">
              Emergency Guidelines
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-amber-400 text-[11px] transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

