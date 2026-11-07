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
  Lock,
  Building,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-white/10">
      {/* Pre-Footer Action Banner */}
      <div className="bg-[#1769AA] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto border border-white/20">
              <Flame className="w-8 h-8 text-[#F28C28] fill-[#F28C28]" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">
                Need Immediate Domestic Refill or Commercial Supply?
              </h4>
              <p className="text-sm text-blue-100 mt-1">
                Reliable doorstep delivery and bulk manifold installation across Karnataka & Tamil Nadu.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <a
              href="tel:+917899787101"
              className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#D9771A] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hotline: +91 78997 87101</span>
            </a>
            <Link
              href="/price-list"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-3 rounded-xl text-sm font-bold transition-all"
            >
              Check Live Rates
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm">
              <div className="relative w-48 h-12">
                <Image
                  src="/images/original/logo.jpg"
                  alt="Kwality Gas Bottlers Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kwality Gas Bottlers Private Limited is an ISO 9001:2015 certified, Grade 1 Rated LPG bottling and distribution enterprise operating 3 state-of-the-art facilities with 30,000 MTPA storage and 8,000 cylinders/day throughput.
            </p>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                <div className="text-[#F28C28] font-bold">CARE Grade 1</div>
                <div className="text-[11px] text-slate-400">Highest Safety & Credit Rating</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                <div className="text-white font-bold">Quality Era Award</div>
                <div className="text-[11px] text-slate-400">Geneva, Switzerland (2015)</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              CIN: U01120KA2005PTC036860
            </div>
          </div>

          {/* Col 2: LPG Segments & Products (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#F28C28]" />
              <span>Gas & Appliances</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/domestic" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Domestic LPG (12kg, 5.5kg, 4kg)</span>
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Commercial LPG (17kg, 21kg)</span>
                </Link>
              </li>
              <li>
                <Link href="/industrial" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Industrial LPG (33kg Manifold)</span>
                </Link>
              </li>
              <li>
                <Link href="/cylinders" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>LPG Cylinders Catalog</span>
                </Link>
              </li>
              <li>
                <Link href="/gas-water-heater" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Kwality Gas Water Heater</span>
                </Link>
              </li>
              <li>
                <Link href="/safety-devices" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Industrial Safety Devices</span>
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Accessories & Regulators</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1769AA]" />
              <span>Company</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/group-company" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Group Company</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/price-list" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Live Price List</span>
                </Link>
              </li>
              <li>
                <Link href="/safety-features" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Safety Features</span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Testimonials</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Plant Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Office & Plants (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F28C28]" />
              <span>Head Office & Plants</span>
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-[#F28C28] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block text-xs">Registered Office:</strong>
                  <span className="text-slate-300 text-xs">
                    2nd Floor, Above Syndicate Bank, Magadi Chord Road, Vijayanagar, Bangalore - 560040, Karnataka.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1769AA] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block text-xs">Bottling Plants:</strong>
                  <span className="text-slate-300 text-xs block">
                    • Hosur Plant (Tamil Nadu)
                  </span>
                  <span className="text-slate-300 text-xs block">
                    • Chennai Bottling Unit
                  </span>
                  <span className="text-slate-300 text-xs block">
                    • Dharwad Plant (Karnataka)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400">Marketing: </span>
                  <a href="tel:+917899787101" className="text-white font-bold hover:text-[#F28C28]">
                    +91 78997 87101
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1769AA] flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400">Office: </span>
                  <a href="tel:+918023400459" className="text-white font-bold hover:text-[#F28C28]">
                    +91 80 2340 0459
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F28C28] flex-shrink-0" />
                <div className="text-xs">
                  <a href="mailto:kwalitygasmarketing@gmail.com" className="text-slate-300 hover:text-white">
                    kwalitygasmarketing@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright & Staff Link */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Kwality Gas Bottlers Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/price-list" className="hover:text-white transition-colors">
              Price Terms
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
