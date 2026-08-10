import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useLang } from "@/lib/i18n";
import AlertCard from "@/components/AlertCard";

const filters = ["all", "emergency", "important", "info"];

export default function Alerts() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");

  const labels = {
    all: t.nav.alerts,
    emergency: t.alerts.items[0].priority,
    important: t.alerts.items[1].priority,
    info: t.alerts.items[2].priority,
  };

  const items = [
    ...t.alerts.items,
    { icon: "bell", title: t.dashboard.list[0].type, body: t.dashboard.list[0].body, priority: t.alerts.items[1].priority, level: "important" },
    { icon: "shield", title: t.dashboard.list[2].type, body: t.dashboard.list[2].body, priority: t.alerts.items[0].priority, level: "emergency" },
  ];

  const filtered = filter === "all" ? items : items.filter((i) => i.level === filter);

  return (
    <div className="min-h-screen bg-muted/20 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{t.nav.alerts}</h1>
          <p className="text-muted-foreground mt-2">{t.alerts.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <Filter size={18} className="text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? "bg-secondary text-white" : "bg-white border border-border/60 text-foreground/70 hover:text-foreground"}`}
            >
              {labels[f]}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <AlertCard icon={item.icon} title={item.title} body={item.body} priority={item.priority} level={item.level} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}