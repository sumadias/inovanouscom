import React from "react";
import { motion } from "framer-motion";
import { Code2, Bot, Gamepad2, BarChart3, QrCode, BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

const icons = [Bot, Code2, Gamepad2, BookOpen, QrCode, BarChart3];
const colors = ["#1E40AF", "#F97316", "#1E40AF", "#F97316", "#1E40AF", "#10B981"];

export default function OQueFazemos() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).oQueFazemos;
  const dark = theme === "dark";

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${
      dark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"
    }`}>
      {/* Wave separator top */}
      <div className="overflow-hidden leading-none mb-[-1px]" aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10 rotate-180">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z"
            fill={dark ? "#0D1829" : "#ffffff"} />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className={`text-sm font-heading font-semibold tracking-widest uppercase mb-4 block ${
            dark ? "text-blue-400" : "text-[#1E40AF]"
          }`}>{tr.label}</span>
          <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-4 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.title}</h2>
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tr.items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`group p-6 border rounded-2xl transition-all duration-200 hover:shadow-md ${
                dark
                  ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30"
                  : "border-slate-200 bg-white hover:border-blue-200"
              }`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: colors[i] + "15", border: `1px solid ${colors[i]}25` }}
              >
                {React.createElement(icons[i], { className: "w-5 h-5", style: { color: colors[i] }, "aria-hidden": "true" })}
              </div>
              <h3 className={`text-base font-heading font-bold mb-2 ${dark ? "text-white" : "text-[#0F172A]"}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={createPageUrl("Solucoes")}
            className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl transition-all font-medium text-sm min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
              dark
                ? "border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                : "border-[#1E40AF]/30 text-[#1E40AF] hover:bg-blue-50"
            }`}
          >
            {tr.link}
          </a>
          <a
            href={createPageUrl("Projetos")}
            className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl transition-all font-medium text-sm min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
              dark
                ? "border-orange-500/30 text-orange-300 hover:bg-orange-500/10"
                : "border-[#F97316]/30 text-[#C2510A] hover:bg-orange-50"
            }`}
          >
            {lang === "en" ? "Explore our projects →" : lang === "es" ? "Conoce nuestros proyectos →" : "Conheça nossos projetos →"}
          </a>
        </div>
      </div>
    </section>
  );
}