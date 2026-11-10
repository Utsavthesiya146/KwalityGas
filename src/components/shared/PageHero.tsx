import React, { ReactNode } from "react";

export interface PageHeroBadge {
  icon?: ReactNode;
  text: string;
  color?: string;
}

export interface PageHeroProps {
  badge?: PageHeroBadge | ReactNode;
  title: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function PageHero({
  badge,
  title,
  description,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative bg-[#07131F] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800 ${className}`}
    >
      {/* Background Subtle Tech Grid & Ambient Blue Glow */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge / Tag */}
        {badge && (
          <div className="mb-4">
            {React.isValidElement(badge) ? (
              badge
            ) : typeof badge === "object" && "text" in badge ? (
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 ${
                  badge.color || "text-[#F28C28]"
                } text-xs font-bold uppercase tracking-wider shadow-sm`}
              >
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ) : null}
          </div>
        )}

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl sm:max-w-3xl leading-relaxed">
            {description}
          </p>
        )}

        {/* Optional Extra Elements */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
