import React from "react";
import { motion } from "framer-motion";
import { Mic, BrainCircuit, MapPin, Target, Smartphone, Watch } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SectionHeader } from "./HowItWorks";

const icons = [Mic, BrainCircuit, MapPin, Target, Smartphone, Watch];

export default function AIPipeline() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.ai.title} subtitle={t.ai.subtitle} />
        <div className="mt-14 max-w-3xl mx-auto">
          {t.ai.pipeline.map((label, i) => {
            const Icon = icons[i];
            const isLast = i === t.ai.pipeline.length - 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="flex items-center gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${i === 1 ? "bg-gradient-teal text-foreground shadow-glow-teal" : "bg-white border border-border/60 text-foreground shadow-soft"}`}>
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  {!isLast && <div className="w-0.5 h-10 bg-gradient-to-b from-accent/40 to-accent/10" />}
                </div>
                <div className="flex-1 pb-6">
                  <span className="font-bold text-lg text-foreground">{label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-accent text-sm font-bold">
            <BrainCircuit size={16} />
            {t.ai.powered}
          </div>
        </div>
      </div>
    </section>
  );
}