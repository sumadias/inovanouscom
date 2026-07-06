import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb, Globe, Leaf } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";
import useSEO from "@/components/useSEO";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const valoresIcons = [Lightbulb, Leaf, Heart, Globe, Target, Eye];
const valoresColors = ["#F97316", "#10B981", "#F97316", "#1E40AF", "#1E40AF", "#10B981"];

export default function Sobre() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).sobre;
  const dark = theme === "dark";
  useSEO({
    title: lang === "en" ? "Who We Are" : lang === "es" ? "Quiénes Somos" : "Quem Somos",
    description: lang === "en"
      ? "NOUS is a technology startup registered under Inova Simples, developing AI, gamification and digital solutions with social purpose."
      : lang === "es"
      ? "NOUS es una startup de tecnología registrada bajo Inova Simples."
      : "A NOUS é uma startup de tecnologia registrada no regime Inova Simples.",
    lang,
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0D1829] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: dark ? "linear-gradient(135deg,rgba(30,64,175,0.15) 0%,transparent 60%,rgba(249,115,22,0.08) 100%)" : "linear-gradient(135deg,rgba(30,64,175,0.06) 0%,transparent 60%,rgba(249,115,22,0.04) 100%)" }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-heading font-medium mb-6 border ${
              dark ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-50 border-blue-200 text-[#1E40AF]"
            }`}>{tr.label}</span>
            <h1 className={`text-5xl md:text-6xl font-heading font-bold mb-6 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.title}</h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* History + Mission/Vision */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-heading font-bold mb-6 text-[#F97316]">{tr.histTitle}</h2>
            <div className={`space-y-4 leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
              <p>{tr.hist1}</p>
              <p>{tr.hist2}</p>
              <p>{tr.hist3}</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { num: "2024", label: tr.foundation },
                { num: "Inova", label: "Simples" },
                { num: "CG–PB", label: tr.sede },
              ].map((item) => (
                <div key={item.label} className={`text-center p-4 border rounded-xl ${
                  dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-white shadow-sm"
                }`}>
                  <div className="text-xl font-heading font-black text-[#F97316]">{item.num}</div>
                  <div className={`text-xs mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-5">
            {[
              { title: tr.missionTitle, icon: "🎯", text: tr.missionText, color: "border-[#1E40AF]/20 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500/20" },
              { title: tr.visionTitle, icon: "🔭", text: tr.visionText, color: "border-[#F97316]/20 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-500/20" },
            ].map((item) => (
              <div key={item.title} className={`p-6 border rounded-2xl ${
                dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-white shadow-sm"
              }`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className={`text-xl font-heading font-bold mb-2 ${dark ? "text-white" : "text-[#0F172A]"}`}>{item.title}</h3>
                <p className={`leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-20 px-6 ${dark ? "bg-[#0A1628]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className={`text-4xl font-heading font-bold mb-4 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.valoresTitle}</h2>
            <p className={`max-w-2xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.valoresSub}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tr.valores.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 border rounded-2xl transition-all group hover:shadow-md ${
                  dark ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30" : "border-slate-200 bg-[#F8FAFC] hover:border-blue-200 hover:bg-white"
                }`}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: valoresColors[i] + "15", border: `1px solid ${valoresColors[i]}25` }}>
                  {React.createElement(valoresIcons[i], { className: "w-5 h-5", style: { color: valoresColors[i] } })}
                </div>
                <h3 className={`text-base font-heading font-bold mb-2 ${dark ? "text-white" : "text-[#0F172A]"}`}>{v.title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`border rounded-2xl p-6 ${dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-white shadow-sm"}`}>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
              <strong className={dark ? "text-white" : "text-[#0F172A]"}>NOUS INOVAÇÃO E TECNOLOGIA INOVA SIMPLES (I.S.)</strong>
              <br />CNPJ: 65.276.411/0001-50 · Campina Grande – PB, Brasil
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}