import React from "react";

// Animated sound waves — bars that pulse
export function SoundWaves({ active = true, bars = 5, className = "", color = "accent" }) {
  const colorClass = color === "navy" ? "bg-secondary" : color === "white" ? "bg-white" : "bg-accent";
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-full ${colorClass}`}
          style={{
            height: "100%",
            animation: `wave-pulse ${1 + (i % 3) * 0.18}s ease-in-out ${i * 0.12}s infinite`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}

// Concentric pulse rings
export function PulseRings({ className = "", color = "accent" }) {
  const ringColor = color === "navy" ? "border-secondary" : color === "white" ? "border-white" : "border-accent";
  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`} aria-hidden="true">
      {[0, 0.8, 1.6].map((delay, i) => (
        <span
          key={i}
          className={`absolute rounded-full border-2 ${ringColor} animate-ring`}
          style={{ width: "100%", height: "100%", animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}