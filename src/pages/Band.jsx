import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Watch, Vibrate, Bluetooth, Battery, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Band() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  const trigger = (i) => {
    setActive(i);
    setTimeout(() => setActive(0), 1600);
  };

  return (
    <div className="min-h-screen bg-mesh relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/15 blur-[130px] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-14">
          <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl tracking-tight">{t.band.title}</h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">{t.band.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Band visual */}
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                animate={active ? { x: [0, -6, 6, -6, 6, 0] } : {}}
                transition={{ duration: 0.5, repeat: active ? 2 : 0 }}
                className="w-72 h-72 rounded-[3.5rem] bg-gradient-to-br from-secondary to-primary border border-accent/25 shadow-glow-navy flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-mesh opacity-50" />
                <motion.div
                  animate={active ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 0.5, repeat: active ? 2 : 0 }}
                  className="relative w-44 h-44 rounded-[2.5rem] bg-black/40 border border-accent/30 flex flex-col items-center justify-center backdrop-blur-sm"
                >
                  <Watch size={36} className="text-accent mb-3" />
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={active > i ? { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
                        transition={{ duration: 0.5, repeat: active > i ? 1 : 0, delay: i * 0.12 }}
                        className={`w-3 h-9 rounded-full ${active === 1 ? "bg-important" : active === 2 ? "bg-emergency" : "bg-accent"}`}
                      />
                    ))}
                  </div>
                  <span className="text-white/40 text-[10px] mt-3 font-semibold">{t.band.concept}</span>
                </motion.div>
              </motion.div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-14 rounded-t-3xl bg-gradient-to-b from-secondary/70 to-transparent" />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 h-14 rounded-b-3xl bg-gradient-to-t from-secondary/70 to-transparent" />
            </div>
          </div>

          {/* Vibration patterns + controls */}
          <div className="space-y-4">
            {t.band.patterns.map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl glass-dark">
                <div className="flex gap-1.5">
                  {Array.from({ length: p.count }).map((_, j) => (
                    <motion.span
                      key={j}
                      animate={active === i + 1 ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.5, repeat: active === i + 1 ? 1 : 0, delay: j * 0.12 }}
                      className={`w-3.5 h-9 rounded-full ${i === 0 ? "bg-accent" : i === 1 ? "bg-important" : "bg-emergency"}`}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Vibrate size={16} className="text-accent" />
                    <span className="font-bold text-white">{p.label}</span>
                  </div>
                  <p className="text-white/60 text-sm">{p.desc}</p>
                </div>
                <button
                  onClick={() => trigger(i + 1)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-bold hover:bg-white/20 transition"
                >
                  <Play size={13} fill="currentColor" />
                </button>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 p-4 rounded-2xl glass-dark">
                <Bluetooth size={18} className="text-accent" />
                <div>
                  <div className="text-white text-sm font-bold">{t.settings.band}</div>
                  <div className="text-accent text-xs">{t.settings.bandStatus}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-2xl glass-dark">
                <Battery size={18} className="text-accent" />
                <div>
                  <div className="text-white text-sm font-bold">82%</div>
                  <div className="text-white/50 text-xs">Battery</div>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-lg leading-relaxed font-medium pt-3 border-r-2 border-accent pr-4">
              {t.band.quote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}