import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Globe, Sun, Moon, ChevronDown } from "lucide-react";
import { LangProvider, useLang } from "@/components/LangContext";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";
import ChatBot from "@/components/ChatBot";
import { AnimatePresence, motion } from "framer-motion";

const LANGS = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

function NavBar({ currentPageName }) {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const tr = t(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dark = theme === "dark";

  // "Quem Somos" maps to "Sobre" page
  const whoWeAre = lang === "en" ? "Who We Are" : lang === "es" ? "Quiénes Somos" : "Quem Somos";

  const navLinks = [
    { label: lang === "en" ? "Home" : lang === "es" ? "Inicio" : "Início", page: "Home" },
    { label: whoWeAre, page: "Sobre" },
    { label: tr.nav.solutions, page: "Solucoes" },
    { label: tr.nav.projects, page: "Projetos" },
    { label: tr.nav.investors, page: "Investidores" },
    { label: tr.nav.contact, page: "Contato" },
  ];

  const headerBg = dark
    ? "bg-[#0D1829]/95 border-blue-900/30"
    : "bg-white/95 border-slate-200/80";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a6eca37393942bd156ac5a/fa5d71d50_CpiadeDesignsemnome.png"
            alt="NOUS Logo"
            className="w-9 h-9 object-contain"
          />
          <div>
            <span className={`font-heading font-black text-lg tracking-tight transition-colors ${dark ? "text-white" : "text-[#0F172A]"}`}>
              NOUS
            </span>
            <span className="text-[var(--brand-accent)] text-[10px] block leading-none -mt-0.5 font-heading font-semibold">
              Inovação
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.page}
              to={createPageUrl(link.page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
                currentPageName === link.page
                  ? dark
                    ? "text-[var(--brand-primary)] bg-blue-500/10"
                    : "text-[#1E40AF] bg-blue-50"
                  : dark
                    ? "text-slate-300 hover:text-white hover:bg-white/5"
                    : "text-slate-500 hover:text-[#0F172A] hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            to={createPageUrl("Contato")}
            className="ml-2 px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          >
            {tr.nav.proposal}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
            className={`ml-2 p-2 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
              dark
                ? "border-blue-900/40 text-slate-400 hover:text-white hover:border-blue-700/50"
                : "border-slate-200 text-slate-500 hover:text-[#0F172A] hover:border-slate-300"
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language selector */}
          <div className="relative ml-1">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Selecionar idioma"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
                dark
                  ? "border-blue-900/40 text-slate-400 hover:text-white hover:border-blue-700/50"
                  : "border-slate-200 text-slate-500 hover:text-[#0F172A] hover:border-slate-300"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang.toUpperCase()}
              <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.12 }}
                  className={`absolute right-0 top-11 border rounded-xl overflow-hidden shadow-xl z-50 min-w-[80px] ${
                    dark ? "bg-[#121F35] border-blue-900/40" : "bg-white border-slate-200"
                  }`}
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        lang === l.code
                          ? "text-[#1E40AF] bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400"
                          : dark ? "text-slate-300 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
            className={`p-1.5 rounded border transition-colors ${dark ? "border-blue-900/40 text-slate-400" : "border-slate-200 text-slate-500"}`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Idioma"
              className={`flex items-center gap-1 px-2 py-1.5 rounded border text-xs transition-colors ${dark ? "border-blue-900/40 text-slate-400" : "border-slate-200 text-slate-500"}`}
            >
              <Globe className="w-3.5 h-3.5" />{lang.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.12 }}
                  className={`absolute right-0 top-9 border rounded-xl overflow-hidden shadow-xl z-50 ${dark ? "bg-[#121F35] border-blue-900/40" : "bg-white border-slate-200"}`}
                >
                  {LANGS.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-xs ${lang === l.code ? "text-[#1E40AF]" : dark ? "text-slate-300 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50"}`}>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className={`p-1.5 rounded-lg transition-colors ${dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-[#0F172A]"}`}
          >
            <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className={`md:hidden border-t overflow-hidden ${dark ? "border-blue-900/30 bg-[#0D1829]" : "border-slate-100 bg-white"}`}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.page} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    to={createPageUrl(link.page)}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                      currentPageName === link.page
                        ? dark ? "text-blue-400 bg-blue-500/10" : "text-[#1E40AF] bg-blue-50"
                        : dark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-500 hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.04 }}>
                <Link
                  to={createPageUrl("Contato")}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center mt-2 px-5 py-3 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold rounded-xl transition-colors min-h-[44px]"
                >
                  {tr.nav.proposal}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang);
  const dark = theme === "dark";
  const whoWeAre = lang === "en" ? "Who We Are" : lang === "es" ? "Quiénes Somos" : "Quem Somos";
  const seoLabel = lang === "en" ? "SEO Tool" : lang === "es" ? "Herramienta SEO" : "Ferramenta SEO";
  const lgpdNote = lang === "en" ? "Data protected under LGPD" : lang === "es" ? "Datos protegidos por LGPD" : "Dados protegidos pela LGPD";

  const navLinks = [
    { label: lang === "en" ? "Home" : lang === "es" ? "Inicio" : "Início", page: "Home" },
    { label: whoWeAre, page: "Sobre" },
    { label: tr.nav.solutions, page: "Solucoes" },
    { label: tr.nav.projects, page: "Projetos" },
    { label: tr.nav.investors, page: "Investidores" },
    { label: tr.nav.contact, page: "Contato" },
    { label: seoLabel, page: "SEO" },
  ];

  return (
    <footer className={`pt-16 pb-8 px-6 transition-colors duration-300 ${dark ? "bg-[#0A1628] border-t border-blue-900/20" : "bg-[#0F172A] text-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a6eca37393942bd156ac5a/fa5d71d50_CpiadeDesignsemnome.png"
                alt="NOUS Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-heading font-black text-xl text-white">NOUS</span>
                <span className="text-[#FB923C] text-xs block leading-none font-heading font-semibold">Inovação</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">{tr.footer.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 font-medium">
                Inova Simples
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300 font-medium">
                {lgpdNote}
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-4">CNPJ: 65.276.411/0001-50<br />Campina Grande – PB, Brasil</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm text-white">{tr.footer.nav}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    to={createPageUrl(link.page)}
                    className="text-sm text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:underline decoration-[#F97316]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm text-white">{tr.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="mailto:contato@inovanous.com" className="hover:text-white transition-colors focus:outline-none focus-visible:underline decoration-[#F97316]">
                  contato@inovanous.com
                </a>
              </li>
              <li className="text-slate-400">(62) 9.9957-9358</li>
              <li className="text-slate-400">Campina Grande – PB</li>
              <li className="pt-2">
                <a
                  href="https://wa.me/5562999579358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs font-medium"
                >
                  💬 WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 NOUS Inovação e Tecnologia Inova Simples (I.S.). {tr.footer.rights}</p>
          <p className="text-xs text-slate-500">{tr.footer.motto}</p>
        </div>
      </div>
    </footer>
  );
}

function ThemedApp({ children, currentPageName }) {
  const { theme } = useTheme();
  const { lang } = useLang();
  const dark = theme === "dark";

  React.useEffect(() => {
    const langMap = { pt: "pt-BR", en: "en", es: "es" };
    document.documentElement.lang = langMap[lang] || "pt-BR";
  }, [lang]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.body.style.background = dark ? "#0D1829" : "#F8FAFC";
  }, [dark]);

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${dark ? "bg-[#0D1829] text-slate-100" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      <NavBar currentPageName={currentPageName} />
      <main className="pt-16">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <ThemeProvider defaultTheme="light">
      <LangProvider>
        <ThemedApp currentPageName={currentPageName}>{children}</ThemedApp>
      </LangProvider>
    </ThemeProvider>
  );
}