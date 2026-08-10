import React from "react";

export default function SamaaLogo({ size = 44, withText = false, light = false, t }) {
  const navy = "#1B365D";
  const teal = "#40C4AA";

  return (
    <div className="flex items-center gap-3" dir="ltr">
      {/* Icon */}
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="samaaRing" x1="6" y1="54" x2="58" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B365D" />
            <stop offset="1" stopColor="#40C4AA" />
          </linearGradient>
        </defs>

        {/* Circular frame */}
        <circle cx="32" cy="32" r="27" stroke="url(#samaaRing)" strokeWidth="3.5" fill="none" />

        {/* Sound waves (left of S) — three concentric arcs */}
        <path d="M15 32 q-1.5 0 -1.5 -5" stroke={teal} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M11.5 32 q-3.5 0 -3.5 -8" stroke={teal} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M8 32 q-5.5 0 -5.5 -11" stroke={teal} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* S / ear silhouette (center) */}
        <path
          d="M23 41 C19 40, 18 36, 19 31 C20 25, 25 22, 30 23 C34 24, 36 27, 35 31 C34 34, 31 35, 29 34 C27 33, 27 31, 28 30"
          stroke={navy}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Upward arrow (right, originating from center) */}
        <path d="M42 42 L42 24 M38 28 L42 24 L46 28" stroke={teal} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Location pin (bottom-right, integrated into frame) */}
        <path
          d="M49 40 c0 0 3.2 4.2 3.2 7 a3.2 3.2 0 0 1 -6.4 0 c0 -2.8 3.2 -7 3.2 -7 z"
          fill={teal}
        />
        <circle cx="49" cy="46.5" r="1.2" fill="#FFFFFF" />
      </svg>

      {withText && (
        <div className="flex items-center gap-2.5 leading-none">
          {/* Arabic */}
          <div className="flex flex-col text-right">
            <span className={`font-display font-extrabold text-lg tracking-tight ${light ? "text-white" : "text-foreground"}`} dir="rtl">
              {t.brand}
            </span>
            <span className={`text-[9px] font-semibold tracking-wide ${light ? "text-white/70" : "text-muted-foreground"}`} dir="rtl">
              {t.brandSub}
            </span>
          </div>

          {/* Vertical divider */}
          <span className={`w-px h-7 ${light ? "bg-white/30" : "bg-border"}`} />

          {/* English */}
          <div className="flex flex-col text-left">
            <span className="font-display font-extrabold text-lg tracking-tight">
              <span className={light ? "text-white" : "text-foreground"}>Samaa </span>
              <span className="text-accent">AI</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.15em] uppercase text-accent">
              AI-Powered Travel Guide
            </span>
          </div>
        </div>
      )}
    </div>
  );
}