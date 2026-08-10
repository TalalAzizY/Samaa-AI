import React from "react";
import { motion } from "framer-motion";
import { Ear, BrainCircuit, ListFilter, BellRing } from "lucide-react";
import { useLang } from "@/lib/i18n";

const icons = [Ear, BrainCircuit, ListFilter, BellRing];
const colors = ["text-accent", "text-accent-two", "text-important", "text-accent"];

export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.how.title} subtitle={t.how.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {t.how.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="h-full rounded-3xl bg-white border border-border/60 p-7 shadow-soft hover:shadow-card transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center ${colors[i]}`}>
                      <Icon size={26} strokeWidth={2} />
                    </div>
                    <span className="font-display font-extrabold text-4xl text-muted/40">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                </div>
                {/* connector arrow */}
                {i < t.how.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-3 z-10 text-accent/40">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 10 H6 M9 6 L5 10 L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, light = false }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight ${light ? "text-white" : "text-foreground"}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}