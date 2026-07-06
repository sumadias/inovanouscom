import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

// Competency wheel / organic grid — each item is a "node"
const NODE_COLORS = [
  "#1E40AF", "#F97316", "#1E40AF", "#10B981",
  "#F97316", "#1E40AF", "#10B981", "#F97316",
];

export default function Diferenciais() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).diferenciais;
  const dark = theme === "dark";

  const centerLabel = lang === "en" ? "tech + creativity + purpose" : lang === "es" ? "tech + creatividad + propósito" : "tech + criatividade + propósito";

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${
      dark ? "bg-[#0D1829]" : "bg-white"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <span className={`text-sm font-heading font-semibold tracking-widest uppercase mb-4 block ${
              dark ? "text-blue-400" : "text-[#1E40AF]"
            }`}>{tr.label}</span>
            <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight ${
              dark ? "text-white" : "text-[#0F172A]"
            }`}>
              <span className="text-[#F97316]">{tr.title}</span>
            </h2>
            <p className={`text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.sub}</p>
          </motion.div>

          {/* Organic competency grid */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            {/* Center node */}
            <div className="flex justify-center mb-5">
              <div className={`px-5 py-3 rounded-2xl border-2 text-center font-heading font-bold text-sm ${
                dark
                  ? "border-orange-500/40 bg-orange-900/20 text-orange-300"
                  : "border-[#F97316]/40 bg-orange-50 text-[#C2510A]"
              }`}>
                {centerLabel}
              </div>
            </div>

            {/* Nodes grid */}
            <div className="grid grid-cols-2 gap-3">
              {tr.items.map((d, i) => {
                const color = NODE_COLORS[i] || "#1E40AF";
                const isOrange = color === "#F97316";
                const isGreen = color === "#10B981";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      dark
                        ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30"
                        : "border-slate-200 bg-[#F8FAFC] hover:border-blue-200 hover:bg-white"
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className={`text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>{d}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}