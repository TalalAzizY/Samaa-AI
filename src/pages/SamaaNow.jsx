import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, RotateCcw, BrainCircuit, MapPin, Target, Bus, Watch, Check, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SoundWaves } from "@/components/SoundWaves";

const STAGES = ["listen", "detect", "analyze", "context", "priority", "alert", "band"];

export default function SamaaNow() {
  const { t } = useLang();
  const [stage, setStage] = useState(-1); // -1 idle, 0..6 stages
  const [running, setRunning] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = () => {
    clearTimers();
    setRunning(true);
    setStage(0);
    const delays = [0, 1400, 3000, 4600, 6200, 7800, 9400];
    delays.forEach((d, i) => {
      timers.current.push(setTimeout(() => setStage(i), d));
    });
    timers.current.push(setTimeout(() => { setRunning(false); }, 11200));
  };

  const reset = () => {
    clearTimers();
    setStage(-1);
    setRunning(false);
  };

  useEffect(() => () => clearTimers(), []);

  const idle = stage === -1;
  const showDetected = stage >= 1;
  const showContext = stage >= 3;
  const showPriority = stage >= 4;
  const showAlert = stage >= 5;
  const showBand = stage >= 6;
  const done = stage >= 6 && !running;

  return (
    <div className="min-h-screen bg-mesh relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-accent/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-two/15 blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent text-xs font-bold mb-5">
            <Sparkles size={14} />
            {t.ai.powered}
          </div>
          <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl tracking-tight">{t.now.title}</h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">{t.now.subtitle}</p>
        </div>

        {/* Listening core */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            {(idle || stage <= 0 || stage >= 6) && (
              <>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="absolute rounded-full border border-accent/30 animate-ring" style={{ width: 120 + i * 50, height: 120 + i * 50, animationDelay: `${i * 0.6}s`, animationDuration: "2.8s" }} />
                ))}
              </>
            )}
            <motion.div
              animate={stage >= 1 && stage <= 4 ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="relative w-28 h-28 rounded-full bg-gradient-teal flex items-center justify-center shadow-glow-teal"
            >
              <Mic size={44} className="text-foreground" />
              {stage >= 1 && stage <= 4 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-important flex items-center justify-center">
                  <BrainCircuit size={14} className="text-foreground" />
                </span>
              )}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idle ? "idle" : stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center"
            >
              {idle ? (
                <p className="text-white/70 text-lg font-semibold">{t.now.listeningHint}</p>
              ) : (
                <p className="text-accent text-lg font-bold">{t.now.stages[STAGES[stage]]}</p>
              )}
            </motion.div>
          </AnimatePresence>

          {stage >= 0 && stage <= 4 && (
            <SoundWaves active bars={9} className="h-12 w-40 mt-5" color="white" />
          )}

          {/* Controls */}
          <div className="mt-8 flex items-center gap-3">
            {!running && idle && (
              <button onClick={run} className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-bold text-foreground bg-gradient-teal hover:opacity-90 transition shadow-glow-teal">
                <Play size={20} fill="currentColor" />
                {t.now.playBtn}
              </button>
            )}
            {!idle && (
              <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition">
                <RotateCcw size={18} />
                {t.now.replayBtn}
              </button>
            )}
          </div>
        </div>

        {/* Stage progress */}
        <div className="flex items-center justify-center gap-1.5 mb-12 flex-wrap">
          {STAGES.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${stage >= i ? "bg-accent text-foreground" : "bg-white/10 text-white/40"}`}>
                {stage > i ? <Check size={14} /> : i + 1}
              </div>
              {i < STAGES.length - 1 && <div className={`w-6 h-0.5 ${stage > i ? "bg-accent" : "bg-white/15"}`} />}
            </div>
          ))}
        </div>

        {/* Live panels */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Detected sound */}
          <Panel show={showDetected} icon={Mic} label={t.now.detected} accent>
            <div className="rounded-2xl bg-primary/40 border border-accent/20 p-5">
              <p className="text-white leading-relaxed text-lg">"{t.now.detectedText}"</p>
            </div>
          </Panel>

          {/* Context understanding */}
          <Panel show={showContext} icon={BrainCircuit} label={t.now.understanding}>
            <div className="space-y-3">
              <ContextRow icon={Target} label={t.now.type} value={t.now.typeValue} />
              <ContextRow icon={MapPin} label={t.now.location} value={t.now.locationValue} />
              <ContextRow icon={Sparkles} label={t.now.priority} value={t.now.priorityValue} highlight={showPriority} />
            </div>
          </Panel>
        </div>

        {/* Final alert */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <div className="rounded-3xl bg-white shadow-glow-navy overflow-hidden max-w-2xl mx-auto">
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center w-20 bg-important">
                    <Bus size={34} className="text-foreground" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-important px-2.5 py-1 rounded-full bg-important/15">{t.now.priorityValue}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-foreground">{t.now.boarding}</h3>
                    <p className="text-muted-foreground mt-1">{t.now.busLeaves}</p>
                    <p className="font-bold text-foreground text-lg mt-1">{t.now.gate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Band sent */}
        <AnimatePresence>
          {showBand && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-dark">
                <motion.div
                  animate={{ rotate: [0, -12, 12, -12, 0], x: [0, -3, 3, -3, 0] }}
                  transition={{ duration: 0.5, repeat: done ? 0 : 2, repeatDelay: 0.3 }}
                >
                  <Watch size={24} className="text-accent" />
                </motion.div>
                <span className="text-white font-bold">{t.now.bandSent}</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: 3 }}
                  className="w-2.5 h-2.5 rounded-full bg-accent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Panel({ show, icon: Icon, label, accent = false, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-dark p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? "bg-gradient-teal text-foreground" : "bg-white/10 text-accent"}`}>
              <Icon size={18} />
            </div>
            <span className="text-white font-bold">{label}</span>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContextRow({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <span className="flex items-center gap-2 text-white/60 text-sm">
        <Icon size={15} className="text-accent" />
        {label}
      </span>
      <motion.span
        animate={highlight ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5 }}
        className={`font-bold ${highlight ? "text-accent" : "text-white"}`}
      >
        {value}
      </motion.span>
    </div>
  );
}