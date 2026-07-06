import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Gamepad2, BookOpen, Bot, QrCode, BarChart3, Headset, ShieldCheck } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";
import useSEO from "@/components/useSEO";

const icons = [Code2, Headset, Cpu, Gamepad2, BookOpen, Bot, QrCode, BarChart3, ShieldCheck];
// Alternate blue / orange, last two get blue and green
const colors = ["#1E40AF", "#F97316", "#1E40AF", "#F97316", "#1E40AF", "#F97316", "#1E40AF", "#10B981", "#1E40AF"];

export default function Solucoes() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).solucoes;
  const dark = theme === "dark";

  useSEO({
    title: lang === "en" ? "Our Solutions" : lang === "es" ? "Nuestras Soluciones" : "Nossas Soluções",
    description: lang === "en"
      ? "Custom software, AI, educational gamification, augmented reality, Big Data, ESG and LGPD consulting for governments, companies and NGOs."
      : lang === "es"
      ? "Software a medida, IA, gamificación educativa, Big Data, ESG y consultoría LGPD para gobiernos, empresas y ONGs."
      : "Software sob encomenda, IA, gamificação educacional, Big Data, ESG e consultoria LGPD para governos, empresas e ONGs.",
    lang,
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0D1829] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: dark ? "linear-gradient(135deg,rgba(30,64,175,0.2) 0%,transparent 60%,rgba(249,115,22,0.08) 100%)" : "linear-gradient(135deg,rgba(30,64,175,0.07) 0%,transparent 60%,rgba(249,115,22,0.04) 100%)" }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-heading font-medium mb-6 border ${
              dark ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-50 border-blue-200 text-[#1E40AF]"
            }`}>{tr.label}</span>
            <h1 className={`text-5xl md:text-6xl font-heading font-bold mb-6 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.title}</h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
          {tr.items.map((s, i) => {
            const Icon = icons[i];
            const color = colors[i] || "#1E40AF";
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-7 border rounded-2xl transition-all duration-200 group hover:shadow-lg ${
                  dark
                    ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30"
                    : "border-slate-200 bg-white hover:border-blue-200"
                }`}
                style={{ "--card-accent": color }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: color + "15", border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-heading font-bold mb-2 ${dark ? "text-white" : "text-[#0F172A]"}`}>{s.title}</h3>
                    <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-slate-400" : "text-slate-500"}`}>{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-medium border"
                          style={{ borderColor: color + "40", color, backgroundColor: color + "0D" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Wave separator */}
      <div className="overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,20 C480,40 960,0 1440,20 L1440,40 L0,40 Z"
            fill={dark ? "#0A1628" : "#EFF6FF"} />
        </svg>
      </div>

      {/* CTA */}
      <section className={`py-20 px-6 ${dark ? "bg-[#0A1628]" : "bg-[#EFF6FF]"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-3xl font-heading font-bold mb-4 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.ctaTitle}</h2>
            <p className={`mb-8 ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.ctaDesc}</p>
            <a
              href="/Contato"
              className="inline-block px-8 py-4 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
            >
              {tr.ctaBtn}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}