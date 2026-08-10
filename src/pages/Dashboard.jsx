import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, AudioLines, Bus, Mic, ShieldAlert, BrainCircuit, Compass, AlertCircle, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/i18n";
import { SoundWaves } from "@/components/SoundWaves";

const iconMap = { bus: Bus, mic: Mic, shield: ShieldAlert, sparkles: Compass, bell: AudioLines };

function timeAgo(dateStr, lang) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return lang === "ar" ? "الآن" : "now";
  if (min < 60) return lang === "ar" ? `منذ ${min} دقيقة` : `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return lang === "ar" ? `منذ ${hr} ساعة` : `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return lang === "ar" ? `منذ ${day} يوم` : `${day}d ago`;
}

export default function Dashboard() {
  const { t, lang } = useLang();
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    base44.entities.AlertLog.list("-created_date", 50)
      .then((rows) =>
        setAlerts(
          (rows || []).map((r) => ({
            id: r.id,
            title: r.title,
            body: r.body,
            level: r.level,
            icon: r.icon,
            location: r.location,
            created_date: r.created_date,
          }))
        )
      )
      .catch(() => setAlerts([]));
  }, []);

  const todayCount = alerts ? alerts.length : 0;

  return (
    <div className="min-h-screen bg-muted/20 py-12 lg:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">{t.dashboard.welcome} 👋</h1>
            <p className="text-muted-foreground mt-2">{t.tagline}</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent/10 border border-accent/30 text-accent font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            {t.dashboard.listeningStatus}
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <StatCard icon={AudioLines} value={String(todayCount)} label={t.dashboard.stats.alerts} color="accent" />
          <StatCard icon={Compass} value={String(t.explore.places.length)} label={t.dashboard.stats.active} color="accent-two" />
          <StatCard icon={BrainCircuit} value="96%" label={t.dashboard.stats.accuracy} color="important" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Listening + location */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl bg-mesh p-6 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold">{t.dashboard.listeningStatus}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                </div>
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-24 h-24 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                    <span className="absolute inset-0 rounded-full border border-accent/40 animate-ring" style={{ animationDuration: "2.4s" }} />
                    <AudioLines size={32} className="text-accent" />
                  </div>
                  <SoundWaves bars={7} className="h-8 w-24" color="white" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-border/60 shadow-soft p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold mb-3">
                <MapPin size={16} className="text-accent" />
                {t.dashboard.currentLocation}
              </div>
              <p className="font-bold text-foreground text-lg">{t.dashboard.locationName}</p>
            </div>
          </div>

          {/* Recent alerts log */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white border border-border/60 shadow-soft p-6">
              <h2 className="font-bold text-xl text-foreground mb-5">{t.dashboard.recentAlerts}</h2>

              {alerts === null ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              ) : alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <AlertCircle size={32} className="mb-3 opacity-40" />
                  <p className="font-semibold">{t.dashboard.recentAlerts}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((a, i) => {
                    const Icon = iconMap[a.icon] || AudioLines;
                    const levelStyle = a.level === "emergency" ? "bg-emergency text-white" : a.level === "important" ? "bg-important text-foreground" : "bg-accent text-foreground";
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${levelStyle}`}>
                          <Icon size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground">{a.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{a.body}</p>
                          {a.location && (
                            <span className="text-xs text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-accent" />
                              {a.location}
                            </span>
                          )}
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-xs text-muted-foreground">{timeAgo(a.created_date, lang)}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }) {
  const bg = color === "accent" ? "bg-accent/15 text-accent" : color === "accent-two" ? "bg-accent-two/15 text-accent-two" : "bg-important/15 text-important";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white border border-border/60 shadow-soft p-6 flex items-center gap-4"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bg}`}>
        <Icon size={26} />
      </div>
      <div>
        <div className="font-display font-extrabold text-3xl text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}