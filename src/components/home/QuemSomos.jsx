import React from "react";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Leaf, Users, MapPin } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

const cardIcons = [Brain, Gamepad2, Leaf, Users];
const cardColors = ["text-[#1E40AF]", "text-[#F97316]", "text-[#10B981]", "text-[#1E40AF]"];

export default function QuemSomos() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).quemSomos;
  const dark = theme === "dark";

  return (
    <section className={`py-24 px-6 relative overflow-hidden transition-colors duration-300 ${
      dark ? "bg-[#0D1829]" : "bg-white"
    }`}>
      {/* Subtle blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: dark ? "rgba(30,64,175,0.07)" : "rgba(30,64,175,0.05)" }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <span className={`text-sm font-semibold tracking-widest uppercase mb-4 block font-heading ${
              dark ? "text-orange-400" : "text-[#F97316]"
            }`}>{tr.label}</span>
            <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight ${
              dark ? "text-white" : "text-[#0F172A]"
            }`}>{tr.title}</h2>
            <p className={`leading-relaxed mb-5 text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{tr.p1}</p>
            <p className={`leading-relaxed text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{tr.p2}</p>

            {/* Location badge */}
            <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium ${
              dark
                ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                : "border-blue-100 bg-blue-50 text-[#1E40AF]"
            }`}>
              <MapPin className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
              Campina Grande – PB, Nordeste do Brasil
            </div>

            <div className="mt-8">
              <a href="/Sobre" className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl font-medium transition-all text-sm min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                dark
                  ? "border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                  : "border-[#1E40AF]/30 text-[#1E40AF] hover:bg-blue-50"
              }`}>
                {tr.link}
              </a>
            </div>
          </motion.div>

          {/* Right: team placeholder + cards */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            {/* Photo placeholder */}
            <div className={`w-full h-52 rounded-2xl mb-5 flex flex-col items-center justify-center border-2 border-dashed relative overflow-hidden ${
              dark ? "border-blue-700/40 bg-blue-900/20" : "border-blue-200 bg-blue-50"
            }`}>
              <div className="absolute inset-0 opacity-10"
                style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #FED7AA 100%)" }} />
              <div className={`relative text-center px-6 ${dark ? "text-blue-300" : "text-[#1E40AF]"}`}>
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-current mx-auto mb-2 flex items-center justify-center opacity-50">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium opacity-60">
                  {lang === "en" ? "Team photo — coming soon" : lang === "es" ? "Foto del equipo — próximamente" : "Foto da equipe — em breve"}
                </p>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {tr.cardTitles.map((title, i) => {
                const Icon = cardIcons[i];
                return (
                  <div key={title} className={`p-5 border rounded-2xl transition-all group hover:shadow-md ${
                    dark
                      ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30"
                      : "border-slate-200 bg-[#F8FAFC] hover:border-blue-200 hover:bg-white"
                  }`}>
                    <Icon className={`w-6 h-6 mb-3 ${cardColors[i]}`} aria-hidden="true" />
                    <h3 className={`font-heading font-bold mb-1 text-sm ${dark ? "text-white" : "text-[#0F172A]"}`}>{title}</h3>
                    <p className={`text-xs leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.cards[i]}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}