import React from "react";
import { Bus, ShieldAlert, Mic, Sparkles, Bell, AlertTriangle, Info } from "lucide-react";

const iconMap = {
  bus: Bus,
  shield: ShieldAlert,
  mic: Mic,
  sparkles: Sparkles,
  bell: Bell,
};

const levelStyles = {
  emergency: {
    ring: "ring-emergency/30",
    bg: "bg-emergency/10",
    iconBg: "bg-emergency text-white",
    chip: "bg-emergency text-white",
    glow: "shadow-[0_8px_30px_-8px_rgba(239,68,68,0.45)]",
  },
  important: {
    ring: "ring-important/30",
    bg: "bg-important/10",
    iconBg: "bg-important text-foreground",
    chip: "bg-important text-foreground",
    glow: "shadow-[0_8px_30px_-8px_rgba(251,191,36,0.4)]",
  },
  info: {
    ring: "ring-accent/30",
    bg: "bg-accent/10",
    iconBg: "bg-accent text-foreground",
    chip: "bg-accent text-foreground",
    glow: "shadow-[0_8px_30px_-8px_rgba(45,212,191,0.35)]",
  },
};

export function priorityMeta(level) {
  if (level === "emergency") return { Icon: AlertTriangle, ...levelStyles.emergency };
  if (level === "important") return { Icon: Info, ...levelStyles.important };
  return { Icon: Bell, ...levelStyles.info };
}

export default function AlertCard({ icon = "bell", title, body, priority, meta, level = "info", animate = false, compact = false }) {
  const Icon = iconMap[icon] || Bell;
  const s = levelStyles[level];
  return (
    <div
      className={`relative rounded-2xl bg-white ring-1 ${s.ring} ${s.glow} overflow-hidden ${animate ? "animate-float-up" : ""}`}
    >
      <div className="flex items-stretch">
        <div className={`flex items-center justify-center ${compact ? "w-12" : "w-16"} ${s.iconBg}`}>
          <Icon size={compact ? 22 : 28} strokeWidth={2.2} />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-bold text-foreground text-base">{title}</h4>
            {priority && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.chip}`}>{priority}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          {meta && <p className="text-sm font-semibold text-foreground mt-1.5">{meta}</p>}
        </div>
      </div>
    </div>
  );
}