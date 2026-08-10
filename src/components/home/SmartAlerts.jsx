import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import AlertCard from "@/components/AlertCard";
import { SectionHeader } from "./HowItWorks";

export default function SmartAlerts() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.alerts.title} subtitle={t.alerts.subtitle} />
        <div className="grid sm:grid-cols-2 gap-5 mt-14 max-w-4xl mx-auto">
          {t.alerts.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <AlertCard
                icon={item.icon}
                title={item.title}
                body={item.body}
                priority={item.priority}
                level={item.level}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}