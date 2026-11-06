import React from "react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Home } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Home Customer Booking | Kwality Gas",
  description:
    "Contact Kwality Gas Bottlers Pvt Ltd for domestic gas connection and refills. Rajajinagar Bangalore office phone: +91 - 80 - 2340 0459, Marketing: +91 78997 87101.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-brand-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Domestic Connections & Refills</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Home Customer
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Book a new domestic cylinder connection, request a fast refill, or contact our customer care helpline.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                Direct Submission
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-blue-dark">
                SEND YOUR MESSAGE
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Fill out the form below and our Rajajinagar office will get back to you immediately.
              </p>
            </div>

            <EnquiryForm initialType="DOMESTIC" />
          </div>

          {/* Right Contact Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                  Helpdesk & Directory
                </span>
                <h3 className="text-xl font-black text-brand-blue-dark">
                  CONNECT WITH US
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Head Office Address</h4>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      <strong>V M C House</strong>, D-41, 3rd Floor,<br />
                      Rajaji nagar Industrial Estate,<br />
                      Bangalore – 560 044, Karnataka, India.
                    </p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">Call For Further Details</h4>
                    <p className="text-slate-700">
                      <strong>Marketing Team:</strong>{" "}
                      <a href="tel:+917899787101" className="text-brand-blue hover:text-brand-orange font-bold">+91 78997 87101</a>,{" "}
                      <a href="tel:+919108248073" className="text-brand-blue hover:text-brand-orange font-bold">+91 91082 48073</a>
                    </p>
                    <p className="text-slate-700">
                      <strong>Office Board:</strong>{" "}
                      <a href="tel:+918023400459" className="text-brand-blue hover:text-brand-orange font-bold">+91 - 80 - 2340 0459</a>
                    </p>
                    <p className="text-slate-700">
                      <strong>Tel:</strong>{" "}
                      <a href="tel:+918023151130" className="text-brand-blue hover:text-brand-orange font-bold">+91 - 80 - 2315 1130</a>
                    </p>
                    <p className="text-slate-700">
                      <strong>Front Office:</strong>{" "}
                      <a href="tel:+919606861082" className="text-brand-blue hover:text-brand-orange font-bold">+91 96068 61082</a>
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Office Hours</h4>
                    <p className="text-slate-600 mt-0.5">
                      9:30 AM to 5:30 PM (Monday through Saturday)
                    </p>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">e-mail</h4>
                    <a href="mailto:kwalitygasmarketing@gmail.com" className="text-brand-blue hover:text-brand-orange block font-medium">
                      kwalitygasmarketing@gmail.com
                    </a>
                    <a href="mailto:kwalitygas45@gmail.com" className="text-brand-blue hover:text-brand-orange block font-medium">
                      kwalitygas45@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200 mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.9274372978896!2d77.54628892764606!3d12.981132576470541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3deea2e5b96b%3A0xd699744297dbab7f!2skwality+gas+bottlers!5e0!3m2!1sen!2s!4v1435910580441"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Kwality Gas Bottlers Rajajinagar Bangalore"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

