import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Bus, ShieldAlert, Mic } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SoundWaves } from "@/components/SoundWaves";

export default function Hero() {
  const { t, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowLeft;

  return (
    <section className="relative overflow-hidden bg-mesh pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-accent-two/20 blur-[120px]" />
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-start"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {t.ai.powered}
            </div>
            <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero.desc}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/now"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-foreground bg-gradient-teal hover:opacity-90 transition shadow-glow-teal"
              >
                <Play size={20} fill="currentColor" />
                {t.hero.ctaPrimary}
                <Arrow size={18} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              </Link>
              <Link
                to="/now"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            {/* mini stats */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent" /> {t.dashboard.list.length}+ {t.dashboard.stats.alerts}</div>
              <div className="w-px h-4 bg-white/15" />
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent-two" /> {t.explore.places.length} {t.dashboard.stats.active}</div>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const { t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative flex justify-center items-center min-h-[480px]"
    >
      {/* sound waves around phone */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-accent/25 animate-ring"
            style={{ width: 260 + i * 90, height: 260 + i * 90, animationDelay: `${i * 0.7}s`, animationDuration: "3.2s" }}
          />
        ))}
      </div>

      {/* Floating cards */}
      <FloatingCard className="absolute top-6 -left-2 sm:left-2" delay={0.6} icon="bus" color="important" title={t.hero.cards.boarding.title} body={t.hero.cards.boarding.body} meta={t.hero.cards.boarding.meta} />
      <FloatingCard className="absolute bottom-16 -right-2 sm:right-2" delay={1.1} icon="shield" color="emergency" title={t.hero.cards.safety.title} body={t.hero.cards.safety.body} />
      <FloatingCard className="absolute bottom-44 -left-4 sm:left-0" delay={1.5} icon="mic" color="info" title={t.hero.cards.guide.title} body={t.hero.cards.guide.body} />

      {/* Phone */}
      <div className="relative w-[260px] h-[540px] rounded-[2.8rem] bg-secondary border-[10px] border-[#0a0f1f] shadow-glow-navy overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0a0f1f] rounded-b-2xl z-20" />
        {/* screen */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-primary flex flex-col">
          <div className="pt-10 px-5 pb-3 flex items-center justify-between text-white/80 text-xs">
            <span className="font-bold">9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              {t.hero.listening}
            </div>
          </div>
          <div className="px-5 flex-1 flex flex-col items-center justify-center">
            {/* mic + waves */}
            <div className="relative w-28 h-28 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mb-6">
              <span className="absolute inset-0 rounded-full border border-accent/40 animate-ring" style={{ animationDuration: "2.4s" }} />
              <div className="w-16 h-16 rounded-full bg-gradient-teal flex items-center justify-center shadow-glow-teal">
                <Mic size={28} className="text-foreground" />
              </div>
            </div>
            <SoundWaves active bars={7} className="h-10 w-28 mb-5" color="white" />
            <p className="text-white/60 text-xs text-center px-6">{t.now.listeningHint}</p>

            {/* mini alert */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 w-full rounded-2xl bg-white p-3.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-important flex items-center justify-center"><Bus size={16} className="text-foreground" /></div>
                <span className="text-xs font-bold text-foreground">{t.hero.cards.boarding.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.hero.cards.boarding.body}</p>
              <p className="text-xs font-bold text-foreground mt-1">{t.hero.cards.boarding.meta}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingCard({ className = "", delay = 0, icon, color, title, body, meta }) {
  const Icon = icon === "bus" ? Bus : icon === "shield" ? ShieldAlert : Mic;
  const bg = color === "emergency" ? "bg-emergency text-white" : color === "important" ? "bg-important text-foreground" : "bg-accent text-foreground";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`z-30 w-44 rounded-2xl bg-white shadow-card p-3 ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}><Icon size={15} /></div>
        <span className="text-xs font-bold text-foreground">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-snug">{body}</p>
      {meta && <p className="text-xs font-bold text-foreground mt-1">{meta}</p>}
    </motion.div>
  );
}