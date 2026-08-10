import React, { createContext, useContext, useEffect, useState } from "react";

const translations = {
  ar: {
    dir: "rtl",
    brand: "سمّاع",
    brandSub: "SAMAA AI",
    tagline: "نسمع العالم… بطريقة تناسبك.",
    nav: {
      home: "الرئيسية",
      now: "سمّاع الآن",
      alerts: "التنبيهات",
      explore: "استكشف",
      band: "السوار",
      settings: "الإعدادات",
      dashboard: "لوحة التحكم",
      start: "ابدأ الآن",
    },
    hero: {
      title: "العالم يتحدث… وسمّاع يوصله لك.",
      desc: "دليل سياحي ذكي مدعوم بالذكاء الاصطناعي، يحوّل الأصوات والمعلومات المهمة من حولك إلى تنبيهات واضحة ومرئية واهتزازية، لتعيش رحلتك باستقلالية وأمان.",
      ctaPrimary: "ابدأ تجربة سمّاع",
      ctaSecondary: "كيف يعمل سمّاع؟",
      listening: "سمّاع يستمع الآن",
      cards: {
        boarding: { title: "نداء صعود", body: "الحافلة ستغادر خلال 5 دقائق", meta: "البوابة 3" },
        safety: { title: "تنبيه سلامة", body: "يرجى التوجه إلى نقطة التجمع.", meta: "" },
        guide: { title: "شرح سياحي", body: "بدأ المرشد شرح المعلم التاريخي.", meta: "" },
      },
    },
    now: {
      title: "سمّاع الآن",
      subtitle: "شاهد الذكاء الاصطناعي يعمل أمامك — من الصوت إلى التنبيه.",
      listening: "سمّاع يستمع الآن",
      listeningHint: "جاري الاستماع إلى محيطك…",
      playBtn: "تشغيل التجربة",
      replayBtn: "إعادة التجربة",
      stages: {
        listen: "سمّاع يستمع…",
        detect: "اكتشاف صوت محيطي…",
        analyze: "جاري فهم الصوت والسياق عبر Gemini…",
        context: "فهم السياق المكاني والسياحي…",
        priority: "تحديد أولوية المعلومة…",
        alert: "إنشاء التنبيه…",
        band: "إرسال التنبيه إلى السوار…",
      },
      detected: "الصوت المكتشف",
      detectedText: "نرجو من جميع الزوار التوجه إلى البوابة رقم 3، الحافلة ستغادر خلال خمس دقائق.",
      understanding: "فهم سمّاع للسياق",
      type: "نوع المعلومة",
      typeValue: "نداء صعود",
      priority: "الأولوية",
      priorityValue: "مهم",
      location: "الموقع",
      locationValue: "منطقة الحافلات السياحية",
      finalAlert: "التنبيه النهائي",
      boarding: "نداء صعود",
      busLeaves: "الحافلة ستغادر خلال 5 دقائق",
      gate: "البوابة 3",
      bandSent: "تم إرسال تنبيه اهتزازي إلى السوار",
    },
    how: {
      title: "من الصوت… إلى المعلومة التي تهمك.",
      subtitle: "أربع خطوات تفصل بين الضجيج المحيط والتنبيه الذي يهمك أنت.",
      steps: [
        { num: "01", title: "يستمع", desc: "يلتقط سمّاع الأصوات المهمة من البيئة المحيطة." },
        { num: "02", title: "يفهم", desc: "يستخدم Gemini AI لفهم الكلام والسياق." },
        { num: "03", title: "يحدد الأولوية", desc: "يحدد ما إذا كانت المعلومة عادية أو مهمة أو عاجلة." },
        { num: "04", title: "ينبهك", desc: "يحوّل المعلومة إلى تنبيه نصي ومرئي واهتزازي." },
      ],
    },
    alerts: {
      title: "المعلومة المهمة… في الوقت المناسب.",
      subtitle: "تنبيهات ذكية تجمع اللون والأيقونة والنص معًا، فلا تعتمد على لون واحد.",
      items: [
        { icon: "shield", title: "تنبيه سلامة", body: "يرجى التوجه إلى نقطة التجمع.", priority: "عاجل", level: "emergency" },
        { icon: "bus", title: "نداء صعود", body: "الحافلة رقم 24 ستغادر خلال 5 دقائق.", priority: "مهم", level: "important" },
        { icon: "mic", title: "شرح سياحي", body: "بدأ المرشد شرح المعلم التاريخي.", priority: "معلوماتي", level: "info" },
        { icon: "sparkles", title: "فعالية", body: "بدأت الفعالية في الساحة الرئيسية.", priority: "مهم", level: "important" },
      ],
    },
    band: {
      title: "سمّاع معك… أينما كنت.",
      subtitle: "السوار الذكي امتداد لسمّاع، يستقبل التنبيهات دون الحاجة للنظر إلى الهاتف.",
      patterns: [
        { count: 1, label: "اهتزاز واحد", desc: "تنبيه عادي" },
        { count: 2, label: "اهتزازان", desc: "تنبيه مهم" },
        { count: 3, label: "اهتزاز قوي", desc: "حالة طارئة" },
      ],
      quote: "لأن بعض اللحظات لا تنتظر أن تنظر إلى شاشة هاتفك.",
      concept: "مفهوم مستقبلي — قيد التطوير",
    },
    explore: {
      title: "اكتشف المكان… وافهم ما حولك.",
      subtitle: "أماكن متوافقة مع سمّاع، حيث تصل إليك المعلومات المهمة تلقائيًا.",
      compatible: "متوافق مع سمّاع",
      access: "إمكانية الوصول",
      places: [
        { name: "الدرعية التاريخية", loc: "الرياض", type: "معالم تاريخية", access: "عالية", img: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80" },
        { name: "المتحف الوطني", loc: "الرياض", type: "متاحف", access: "عالية", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80" },
        { name: "موسم الرياض", loc: "الرياض", type: "فعاليات ثقافية", access: "متوسطة", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" },
        { name: "وادي ذهب", loc: "العلا", type: "مواقع سياحية", access: "عالية", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80" },
        { name: "محطة الحافلات المركزية", loc: "جدة", type: "محطات النقل", access: "عالية", img: "https://images.unsplash.com/photo-1570125909232-eb97e8a4cd44?w=800&q=80" },
        { name: "البحر الأحمر", loc: "العلا", type: "مواقع سياحية", access: "متوسطة", img: "https://images.unsplash.com/photo-1583417319075-3a8ffe194c04?w=800&q=80" },
      ],
    },
    ai: {
      title: "ذكاء يفهم السياق، وليس الصوت فقط.",
      subtitle: "سمّاع لا يكتفي بتحويل الصوت إلى نص، بل يحاول فهم ما يعنيه الصوت للمستخدم وما إذا كان يحتاج إلى تنبيه.",
      pipeline: ["الصوت المحيط", "Gemini AI", "السياق المكاني والسياحي", "تحديد الأولوية", "تنبيه مرئي", "تنبيه اهتزازي"],
      powered: "مدعوم بـ Gemini AI",
    },
    dashboard: {
      welcome: "أهلًا بك في سمّاع",
      listeningStatus: "سمّاع يستمع الآن",
      currentLocation: "موقعك الحالي",
      locationName: "منطقة الحافلات السياحية — الرياض",
      recentAlerts: "آخر التنبيهات",
      stats: { alerts: "تنبيهات اليوم", active: "أماكن متوافقة", accuracy: "دقة الفهم" },
      list: [
        { type: "نداء صعود", body: "الحافلة رقم 24", time: "منذ دقيقتين", level: "important", icon: "bus" },
        { type: "شرح سياحي", body: "بدأ المرشد الشرح", time: "منذ 8 دقائق", level: "info", icon: "mic" },
        { type: "تنبيه سلامة", body: "تم رصد تنبيه مهم", time: "منذ 15 دقيقة", level: "emergency", icon: "shield" },
      ],
    },
    settings: {
      title: "الإعدادات",
      language: "اللغة",
      vibration: "شدة الاهتزاز",
      vibrationLevels: { low: "منخفض", medium: "متوسط", high: "قوي" },
      alertTypes: "أنواع التنبيهات",
      types: { safety: "السلامة", transport: "المواصلات", guide: "المرشد السياحي", events: "الفعاليات", announcements: "الإعلانات المهمة" },
      priority: "أولوية التنبيهات",
      band: "السوار الذكي",
      bandStatus: "متصل",
      a11y: "إمكانية الوصول",
      a11yDesc: "حجم خط أكبر، تباين عالٍ، وأيقونات واضحة في كل مكان.",
      save: "حفظ الإعدادات",
      saved: "تم حفظ الإعدادات",
    },
    footer: {
      about: "عن سمّاع",
      how: "كيف يعمل",
      a11y: "إمكانية الوصول",
      privacy: "الخصوصية",
      contact: "تواصل معنا",
      built: "بُني باستخدام Gemini AI",
    },
  },
  en: {
    dir: "ltr",
    brand: "Samaa",
    brandSub: "SAMAA AI",
    tagline: "We hear the world… in a way that fits you.",
    nav: {
      home: "Home",
      now: "Samaa Now",
      alerts: "Alerts",
      explore: "Explore",
      band: "Band",
      settings: "Settings",
      dashboard: "Dashboard",
      start: "Get Started",
    },
    hero: {
      title: "The world is talking… Samaa delivers it to you.",
      desc: "An AI-powered smart travel guide that turns the sounds and key information around you into clear, visual and haptic alerts — so you can travel with independence and safety.",
      ctaPrimary: "Start Samaa experience",
      ctaSecondary: "How does Samaa work?",
      listening: "Samaa is listening now",
      cards: {
        boarding: { title: "Boarding call", body: "Bus departs in 5 minutes", meta: "Gate 3" },
        safety: { title: "Safety alert", body: "Please head to the assembly point.", meta: "" },
        guide: { title: "Tour guide", body: "The guide started explaining the landmark.", meta: "" },
      },
    },
    now: {
      title: "Samaa Now",
      subtitle: "Watch AI work in front of you — from sound to alert.",
      listening: "Samaa is listening now",
      listeningHint: "Listening to your surroundings…",
      playBtn: "Run the experience",
      replayBtn: "Replay",
      stages: {
        listen: "Samaa is listening…",
        detect: "Detecting ambient sound…",
        analyze: "Understanding sound & context via Gemini…",
        context: "Understanding spatial & touristic context…",
        priority: "Prioritizing the information…",
        alert: "Building the alert…",
        band: "Sending the alert to the band…",
      },
      detected: "Detected sound",
      detectedText: "All visitors please proceed to gate number 3, the bus will depart in five minutes.",
      understanding: "Samaa's context understanding",
      type: "Info type",
      typeValue: "Boarding call",
      priority: "Priority",
      priorityValue: "Important",
      location: "Location",
      locationValue: "Tourist bus area",
      finalAlert: "Final alert",
      boarding: "Boarding call",
      busLeaves: "Bus departs in 5 minutes",
      gate: "Gate 3",
      bandSent: "Haptic alert sent to the band",
    },
    how: {
      title: "From sound… to the information that matters to you.",
      subtitle: "Four steps between ambient noise and the alert that matters to you.",
      steps: [
        { num: "01", title: "Listens", desc: "Samaa captures important sounds from the surrounding environment." },
        { num: "02", title: "Understands", desc: "Uses Gemini AI to understand speech and context." },
        { num: "03", title: "Prioritizes", desc: "Determines whether info is normal, important, or urgent." },
        { num: "04", title: "Alerts you", desc: "Turns info into a text, visual, and haptic alert." },
      ],
    },
    alerts: {
      title: "The right information… at the right time.",
      subtitle: "Smart alerts combine color, icon, and text — never relying on color alone.",
      items: [
        { icon: "shield", title: "Safety alert", body: "Please head to the assembly point.", priority: "Urgent", level: "emergency" },
        { icon: "bus", title: "Boarding call", body: "Bus number 24 departs in 5 minutes.", priority: "Important", level: "important" },
        { icon: "mic", title: "Tour guide", body: "The guide started explaining the landmark.", priority: "Info", level: "info" },
        { icon: "sparkles", title: "Event", body: "The event has started in the main square.", priority: "Important", level: "important" },
      ],
    },
    band: {
      title: "Samaa with you… wherever you go.",
      subtitle: "The smart band extends Samaa, receiving alerts without looking at your phone.",
      patterns: [
        { count: 1, label: "One vibration", desc: "Normal alert" },
        { count: 2, label: "Two vibrations", desc: "Important alert" },
        { count: 3, label: "Strong vibration", desc: "Emergency" },
      ],
      quote: "Because some moments can't wait for you to look at your phone.",
      concept: "Future concept — in development",
    },
    explore: {
      title: "Discover the place… understand what's around you.",
      subtitle: "Samaa-compatible places, where key information reaches you automatically.",
      compatible: "Samaa-compatible",
      access: "Accessibility",
      places: [
        { name: "Historic Diriyah", loc: "Riyadh", type: "Historic sites", access: "High", img: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80" },
        { name: "National Museum", loc: "Riyadh", type: "Museums", access: "High", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80" },
        { name: "Riyadh Season", loc: "Riyadh", type: "Cultural events", access: "Medium", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" },
        { name: "Golden Valley", loc: "AlUla", type: "Tourist sites", access: "High", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80" },
        { name: "Central Bus Station", loc: "Jeddah", type: "Transit", access: "High", img: "https://images.unsplash.com/photo-1570125909232-eb97e8a4cd44?w=800&q=80" },
        { name: "Red Sea", loc: "AlUla", type: "Tourist sites", access: "Medium", img: "https://images.unsplash.com/photo-1583417319075-3a8ffe194c04?w=800&q=80" },
      ],
    },
    ai: {
      title: "Intelligence that understands context, not just sound.",
      subtitle: "Samaa doesn't just convert sound to text — it tries to understand what the sound means to the user and whether it needs an alert.",
      pipeline: ["Ambient sound", "Gemini AI", "Spatial & touristic context", "Prioritization", "Visual alert", "Haptic alert"],
      powered: "Powered by Gemini AI",
    },
    dashboard: {
      welcome: "Welcome to Samaa",
      listeningStatus: "Samaa is listening now",
      currentLocation: "Your current location",
      locationName: "Tourist bus area — Riyadh",
      recentAlerts: "Recent alerts",
      stats: { alerts: "Alerts today", active: "Compatible places", accuracy: "Understanding accuracy" },
      list: [
        { type: "Boarding call", body: "Bus number 24", time: "2 min ago", level: "important", icon: "bus" },
        { type: "Tour guide", body: "Guide started", time: "8 min ago", level: "info", icon: "mic" },
        { type: "Safety alert", body: "Important alert detected", time: "15 min ago", level: "emergency", icon: "shield" },
      ],
    },
    settings: {
      title: "Settings",
      language: "Language",
      vibration: "Vibration intensity",
      vibrationLevels: { low: "Low", medium: "Medium", high: "Strong" },
      alertTypes: "Alert types",
      types: { safety: "Safety", transport: "Transit", guide: "Tour guide", events: "Events", announcements: "Key announcements" },
      priority: "Alert priority",
      band: "Smart band",
      bandStatus: "Connected",
      a11y: "Accessibility",
      a11yDesc: "Larger font, high contrast, and clear icons everywhere.",
      save: "Save settings",
      saved: "Settings saved",
    },
    footer: {
      about: "About Samaa",
      how: "How it works",
      a11y: "Accessibility",
      privacy: "Privacy",
      contact: "Contact us",
      built: "Built with Gemini AI",
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const dir = translations[lang].dir;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const t = translations[lang];
  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, dir: t.dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}