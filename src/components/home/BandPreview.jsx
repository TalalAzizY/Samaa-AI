import React from "react";
import { motion } from "framer-motion";
import { Watch, Vibrate } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionHeader } from "./HowItWorks";

export default function BandPreview() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-mesh relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.band.title} subtitle={t.band.subtitle} light />
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-14">
          {/* Band mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-[3rem] bg-gradient-to-br from-secondary to-primary border border-accent/20 shadow-glow-navy flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-60" />
                {/* watch face */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="relative w-40 h-40 rounded-[2rem] bg-black/40 border border-accent/30 flex flex-col items-center justify-center backdrop-blur-sm"
                >
                  <Watch size={32} className="text-accent mb-2" />
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                        className="w-2.5 h-2.5 rounded-full bg-accent"
                      />
                    ))}
                  </div>
                  <span className="text-white/50 text-[10px] mt-2 font-semibold">{t.band.concept}</span>
                </motion.div>
              </div>
              {/* strap */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-12 rounded-t-3xl bg-gradient-to-b from-secondary/80 to-transparent" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-12 rounded-b-3xl bg-gradient-to-t from-secondary/80 to-transparent" />
            </div>
          </motion.div>

          {/* Vibration patterns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {t.band.patterns.map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl glass-dark">
                <div className="flex gap-1.5">
                  {Array.from({ length: p.count }).map((_, j) => (
                    <motion.span
                      key={j}
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.12 }}
                      className={`w-3 h-8 rounded-full ${i === 0 ? "bg-accent" : i === 1 ? "bg-important" : "bg-emergency"}`}
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
              </div>
            ))}
            <p className="text-white/70 text-lg leading-relaxed font-medium pt-2 border-r-2 border-accent pr-4">
              {t.band.quote}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}