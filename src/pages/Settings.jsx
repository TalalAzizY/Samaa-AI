import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Vibrate, Bell, Watch, Accessibility, Check, Shield, Bus, Mic, Sparkles, Megaphone } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Settings() {
  const { t, lang, setLang } = useLang();
  const [vibration, setVibration] = useState("medium");
  const [types, setTypes] = useState({ safety: true, transport: true, guide: true, events: true, announcements: false });
  const [saved, setSaved] = useState(false);

  const typeIcons = { safety: Shield, transport: Bus, guide: Mic, events: Sparkles, announcements: Megaphone };
  const vibLevels = ["low", "medium", "high"];

  const toggleType = (k) => setTypes((p) => ({ ...p, [k]: !p[k] }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-10">{t.settings.title}</h1>

        <div className="space-y-6">
          {/* Language */}
          <Card icon={Globe} title={t.settings.language}>
            <div className="flex gap-2">
              {[
                { v: "ar", label: "العربية" },
                { v: "en", label: "English" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setLang(o.v)}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition ${lang === o.v ? "bg-secondary text-white" : "bg-muted text-foreground/70 hover:text-foreground"}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Vibration */}
          <Card icon={Vibrate} title={t.settings.vibration}>
            <div className="flex gap-2">
              {vibLevels.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibration(v)}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition ${vibration === v ? "bg-gradient-teal text-foreground shadow-glow-teal" : "bg-muted text-foreground/70 hover:text-foreground"}`}
                >
                  {t.settings.vibrationLevels[v]}
                </button>
              ))}
            </div>
          </Card>

          {/* Alert types */}
          <Card icon={Bell} title={t.settings.alertTypes}>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.keys(t.settings.types).map((k) => {
                const Icon = typeIcons[k];
                return (
                  <button
                    key={k}
                    onClick={() => toggleType(k)}
                    className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition text-start ${types[k] ? "bg-accent/10 border-accent/40" : "bg-muted border-border/60"}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} className={types[k] ? "text-accent" : "text-muted-foreground"} />
                      <span className="font-semibold text-sm text-foreground">{t.settings.types[k]}</span>
                    </span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center transition ${types[k] ? "bg-accent text-foreground" : "bg-border"}`}>
                      {types[k] && <Check size={14} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Band */}
          <Card icon={Watch} title={t.settings.band}>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
              <span className="text-sm text-foreground/70">{t.settings.bandStatus}</span>
              <span className="inline-flex items-center gap-1.5 text-accent font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t.settings.bandStatus}
              </span>
            </div>
          </Card>

          {/* Accessibility */}
          <Card icon={Accessibility} title={t.settings.a11y}>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.settings.a11yDesc}</p>
          </Card>

          {/* Save */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold text-foreground bg-gradient-teal hover:opacity-90 transition shadow-glow-teal"
            >
              <Check size={18} />
              {t.settings.save}
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-accent font-bold text-sm"
              >
                ✓ {t.settings.saved}
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white border border-border/60 shadow-soft p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          <Icon size={20} />
        </div>
        <h2 className="font-bold text-lg text-foreground">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}