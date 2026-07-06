import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

export default function CallToAction() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).cta;
  const dark = theme === "dark";

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${dark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`relative p-12 border rounded-3xl overflow-hidden ${
            dark
              ? "border-blue-900/40 bg-[#121F35]"
              : "border-blue-100 bg-white shadow-lg"
          }`}
        >
          {/* Aurora background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.3) 0%, rgba(59,130,246,0.15) 50%, rgba(249,115,22,0.2) 100%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight ${dark ? "text-white" : "text-[#0F172A]"}`}>
              {tr.title}
            </h2>
            <p className={`text-lg mb-8 max-w-xl mx-auto ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
            <a
              href={createPageUrl("Contato")}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
            >
              {tr.btn}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}