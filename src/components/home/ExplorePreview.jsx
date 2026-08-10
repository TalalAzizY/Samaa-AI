import React from "react";
import { motion } from "framer-motion";
import { MapPin, BadgeCheck, Accessibility } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Image } from "@/components/ui/image";
import { SectionHeader } from "./HowItWorks";

export default function ExplorePreview() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.explore.title} subtitle={t.explore.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {t.explore.places.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
              className="group rounded-3xl bg-white border border-border/60 overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={p.img} alt={p.name} className="w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-foreground text-xs font-bold shadow-glow-teal">
                  <BadgeCheck size={13} />
                  {t.explore.compatible}
                </div>
                <div className="absolute bottom-3 right-3 text-white">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">{p.type}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground mb-1">{p.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin size={14} className="text-accent" />
                    {p.loc}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Accessibility size={14} className="text-accent" />
                    {t.explore.access}: {p.access}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}