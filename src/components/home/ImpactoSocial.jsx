import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Wifi, Heart, Eye, GraduationCap, Building2 } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

const icons = [Leaf, Wifi, Heart, Eye, GraduationCap, Building2];

function Counter({ target, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 40;
          const inc = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + inc, target);
            setCount(Math.round(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-heading font-black text-[#F97316]">
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 text-slate-400 font-medium">{label}</div>
    </div>
  );
}

export default function ImpactoSocial() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).impacto;
  const dark = theme === "dark";

  const counterLabels = {
    pt: ["Fundação", "Soluções", "Projetos", "Setores Atendidos"],
    en: ["Founded", "Solutions", "Projects", "Sectors Served"],
    es: ["Fundación", "Soluciones", "Proyectos", "Sectores Atendidos"],
  };
  const labels = counterLabels[lang] || counterLabels.pt;
  const counters = [
    { target: 2024, label: labels[0], suffix: "" },
    { target: 9, label: labels[1], suffix: "+" },
    { target: 4, label: labels[2], suffix: "" },
    { target: 3, label: labels[3], suffix: "" },
  ];

  return (
    <section className={`py-24 px-6 relative overflow-hidden transition-colors duration-300 ${
      dark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"
    }`}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: dark ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.07)" }} aria-hidden="true" />

      {/* Wave separator top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z"
            fill={dark ? "#0D1829" : "#ffffff"} />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className={`text-sm font-heading font-semibold tracking-widest uppercase mb-4 block ${
            dark ? "text-orange-400" : "text-[#F97316]"
          }`}>
            {tr.label}
          </span>
          <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-4 ${dark ? "text-white" : "text-[#0F172A]"}`}>
            {lang === "en" ? "Impact" : lang === "es" ? "Impacto" : "Impacto"}
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
        </motion.div>

        {/* Counters strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl mb-12 border ${
            dark
              ? "bg-[#121F35] border-blue-900/40"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          {counters.map((c) => (
            <Counter key={c.label} target={c.target} label={c.label} suffix={c.suffix} />
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tr.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group p-6 border rounded-2xl transition-all duration-200 ${
                  dark
                    ? "border-blue-900/40 bg-[#121F35] hover:border-emerald-500/30"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md"
                }`}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-[#10B981]/10 border border-[#10B981]/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                </div>
                <h3 className={`text-base font-heading font-bold mb-2 ${dark ? "text-white" : "text-[#0F172A]"}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-12 p-8 border rounded-3xl text-center ${
            dark
              ? "border-blue-900/40 bg-gradient-to-br from-blue-900/20 to-orange-900/10"
              : "border-blue-100 bg-gradient-to-br from-blue-50 to-orange-50/40"
          }`}
        >
          <p className={`text-2xl font-heading font-bold mb-3 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.quote}</p>
          <p className={`max-w-2xl mx-auto ${dark ? "text-slate-300" : "text-slate-600"}`}>{tr.quoteDesc}</p>
        </motion.div>
      </div>
    </section>
  );
}