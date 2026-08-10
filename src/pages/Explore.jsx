import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, BadgeCheck, Accessibility, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Image } from "@/components/ui/image";

export default function Explore() {
  const { t } = useLang();
  const [query, setQuery] = useState("");

  const filtered = t.explore.places.filter((p) =>
    p.name.includes(query) || p.loc.includes(query) || p.type.includes(query)
  );

  return (
    <div className="min-h-screen bg-muted/20 py-12 lg:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{t.explore.title}</h1>
          <p className="text-muted-foreground mt-2">{t.explore.subtitle}</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.explore.title}
            className="w-full ps-12 pe-4 py-3.5 rounded-2xl bg-white border border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group rounded-3xl bg-white border border-border/60 overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={p.img} alt={p.name} className="w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute top-3 end-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-foreground text-xs font-bold shadow-glow-teal">
                  <BadgeCheck size={13} />
                  {t.explore.compatible}
                </div>
                <div className="absolute bottom-3 start-3 text-white">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">{p.type}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground mb-2">{p.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin size={14} className="text-accent" />
                    {p.loc}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Accessibility size={14} className="text-accent" />
                    {p.access}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}