import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, AudioLines, Bell, Compass, Watch, Settings, Menu, X, LayoutDashboard, Globe, GitCommitHorizontal } from "lucide-react";
import { useLang } from "@/lib/i18n";
import SamaaLogo from "./SamaaLogo";

export default function Layout() {
  const { t, toggle, lang } = useLang();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { to: "/", label: t.nav.home, icon: Home },
    { to: "/now", label: t.nav.now, icon: AudioLines },
    { to: "/alerts", label: t.nav.alerts, icon: Bell },
    { to: "/explore", label: t.nav.explore, icon: Compass },
    { to: "/band", label: t.nav.band, icon: Watch },
    { to: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { to: "/dev-progress", label: "Dev", icon: GitCommitHorizontal },
    { to: "/settings", label: t.nav.settings, icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-soft" : "bg-transparent"}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <SamaaLogo size={36} withText t={t} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${active ? "text-accent" : "text-foreground/70 hover:text-foreground"}`}
                  >
                    <span className="flex items-center gap-2">
                      <l.icon size={16} />
                      {l.label}
                    </span>
                    {active && (
                      <motion.span layoutId="navDot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors border border-border/60"
                aria-label="Toggle language"
              >
                <Globe size={15} />
                <span>{lang === "ar" ? "العربية" : "English"}</span>
                <span className="text-muted-foreground/60">|</span>
                <span className="text-muted-foreground">{lang === "ar" ? "EN" : "ع"}</span>
              </button>

              <Link
                to="/now"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-teal hover:opacity-90 transition-opacity shadow-glow-teal"
              >
                {t.nav.start}
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-muted/60"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: lang === "ar" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className={`fixed top-0 ${lang === "ar" ? "right-0" : "left-0"} h-full w-72 bg-white z-50 lg:hidden p-6 flex flex-col"}
            >
              <div className="flex items-center justify-between mb-8">
                <SamaaLogo size={36} withText t={t} />
                <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-muted/60">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l) => {
                  const active = location.pathname === l.to;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${active ? "bg-accent/15 text-accent" : "text-foreground/75 hover:bg-muted"}`}
                    >
                      <l.icon size={18} />
                      {l.label}
                    </Link>
                  );
                })}
              </nav>
              <Link to="/now" className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-teal">
                {t.nav.start}
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer t={t} />
    </div>
  );
}

function Footer({ t }) {
  const links = [
    { label: t.footer.about, to: "/" },
    { label: t.footer.how, to: "/now" },
    { label: t.footer.a11y, to: "/settings" },
    { label: t.footer.privacy, to: "/settings" },
    { label: t.footer.contact, to: "/settings" },
  ];
  return (
    <footer className="bg-mesh text-white mt-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SamaaLogo size={44} light />
              <div className="leading-none">
                <div className="font-display font-extrabold text-xl">سمّاع</div>
                <div className="text-[10px] font-semibold tracking-[0.2em] text-accent">SAMAA AI</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">{t.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white/90">{t.footer.about}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/60 hover:text-accent text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white/90">{t.footer.built}</h4>
            <p className="text-white/60 text-sm leading-relaxed">Gemini AI · Accessibility · Tourism</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {t.ai.powered}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2026 سمّاع | SAMAA AI</p>
          <p className="text-white/40 text-xs">{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}