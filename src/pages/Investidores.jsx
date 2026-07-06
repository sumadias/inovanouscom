import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, Award, Handshake, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { createPageUrl } from "@/utils";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const I18N = {
  pt: {
    badge: "OPORTUNIDADES",
    title: "Investidores & Parcerias",
    sub: "Faça parte de uma startup que une tecnologia, impacto social e potencial de crescimento exponencial.",
    whyTitle: "Por que investir na NOUS?",
    parceriasTitle: "Modelos de Parceria",
    parceriasSub: "Diversas formas de colaboração para diferentes perfis de parceiros.",
    ctaTitle: "Interessado em uma parceria?",
    ctaDesc: "Apresentamos nosso pitch deck completo e modelo de negócio detalhado para investidores qualificados.",
    ctaBtn: "Solicitar Pitch Deck",
    oportunidades: [
      { title: "Modelo Escalável", desc: "Produtos digitais com capacidade de escalar nacionalmente e internacionalmente sem aumento linear de custos." },
      { title: "Mercado em Expansão", desc: "EdTech, AgriTech e GovTech são mercados bilionários em pleno crescimento no Brasil e na América Latina." },
      { title: "Registro Inova Simples", desc: "Empresa registrada no regime especial que facilita captação de recursos, parcerias e acesso a fundos de inovação." },
      { title: "Impacto Social Mensurável", desc: "Projetos com métricas claras de impacto social, ESG e sustentabilidade — critério decisivo para fundos modernos." },
      { title: "Parcerias Estratégicas", desc: "Potencial de parcerias com setor público, universidades, aceleradoras e fundações de pesquisa." },
      { title: "Captação Pública e Privada", desc: "Projetos elegíveis a editais públicos, fundos de inovação, crowdfunding e investimento anjo." },
    ],
    parceiras: [
      { tipo: "Investidor Anjo", desc: "Participação societária em troca de aporte financeiro para desenvolvimento de produtos.", valor: "Equity" },
      { tipo: "Parceria Institucional", desc: "Colaboração estratégica com universidades, institutos de pesquisa e entidades do setor público.", valor: "P&D" },
      { tipo: "Captação Pública", desc: "Projetos estruturados para editais de inovação, BNDES, FINEP, fundações e agências de fomento.", valor: "Editais" },
      { tipo: "Parceria Comercial", desc: "Co-desenvolvimento e revenda de soluções para empresas e governos com modelo de revenue share.", valor: "Revenue Share" },
    ],
  },
  en: {
    badge: "OPPORTUNITIES",
    title: "Investors & Partnerships",
    sub: "Be part of a startup that combines technology, social impact and exponential growth potential.",
    whyTitle: "Why invest in NOUS?",
    parceriasTitle: "Partnership Models",
    parceriasSub: "Multiple forms of collaboration for different partner profiles.",
    ctaTitle: "Interested in a partnership?",
    ctaDesc: "We present our complete pitch deck and detailed business model to qualified investors.",
    ctaBtn: "Request Pitch Deck",
    oportunidades: [
      { title: "Scalable Model", desc: "Digital products with the capacity to scale nationally and internationally without linear cost increases." },
      { title: "Expanding Market", desc: "EdTech, AgriTech and GovTech are billion-dollar markets in full growth in Brazil and Latin America." },
      { title: "Inova Simples Registration", desc: "Company registered under the special regime that facilitates fundraising, partnerships and access to innovation funds." },
      { title: "Measurable Social Impact", desc: "Projects with clear metrics for social impact, ESG and sustainability — a decisive criterion for modern funds." },
      { title: "Strategic Partnerships", desc: "Potential partnerships with the public sector, universities, accelerators and research foundations." },
      { title: "Public and Private Funding", desc: "Projects eligible for public grants, innovation funds, crowdfunding and angel investment." },
    ],
    parceiras: [
      { tipo: "Angel Investor", desc: "Equity stake in exchange for financial contribution for product development.", valor: "Equity" },
      { tipo: "Institutional Partnership", desc: "Strategic collaboration with universities, research institutes and public sector entities.", valor: "R&D" },
      { tipo: "Public Funding", desc: "Projects structured for innovation grants, BNDES, FINEP, foundations and development agencies.", valor: "Grants" },
      { tipo: "Commercial Partnership", desc: "Co-development and resale of solutions for companies and governments with a revenue share model.", valor: "Revenue Share" },
    ],
  },
  es: {
    badge: "OPORTUNIDADES",
    title: "Inversores & Alianzas",
    sub: "Sé parte de una startup que une tecnología, impacto social y potencial de crecimiento exponencial.",
    whyTitle: "¿Por qué invertir en NOUS?",
    parceriasTitle: "Modelos de Alianza",
    parceriasSub: "Diversas formas de colaboración para diferentes perfiles de socios.",
    ctaTitle: "¿Interesado en una alianza?",
    ctaDesc: "Presentamos nuestro pitch deck completo y modelo de negocio detallado para inversores calificados.",
    ctaBtn: "Solicitar Pitch Deck",
    oportunidades: [
      { title: "Modelo Escalable", desc: "Productos digitales con capacidad de escalar nacional e internacionalmente sin aumento lineal de costos." },
      { title: "Mercado en Expansión", desc: "EdTech, AgriTech y GovTech son mercados de miles de millones en pleno crecimiento en Brasil y América Latina." },
      { title: "Registro Inova Simples", desc: "Empresa registrada en el régimen especial que facilita la captación de recursos y el acceso a fondos de innovación." },
      { title: "Impacto Social Medible", desc: "Proyectos con métricas claras de impacto social, ESG y sostenibilidad — criterio decisivo para fondos modernos." },
      { title: "Alianzas Estratégicas", desc: "Potencial de alianzas con el sector público, universidades, aceleradoras y fundaciones de investigación." },
      { title: "Captación Pública y Privada", desc: "Proyectos elegibles para convocatorias públicas, fondos de innovación, crowdfunding e inversión ángel." },
    ],
    parceiras: [
      { tipo: "Inversor Ángel", desc: "Participación societaria a cambio de aporte financiero para el desarrollo de productos.", valor: "Equity" },
      { tipo: "Alianza Institucional", desc: "Colaboración estratégica con universidades, institutos de investigación y entidades del sector público.", valor: "I+D" },
      { tipo: "Captación Pública", desc: "Proyectos estructurados para convocatorias de innovación, BNDES, FINEP, fundaciones y agencias de fomento.", valor: "Convocatorias" },
      { tipo: "Alianza Comercial", desc: "Co-desarrollo y reventa de soluciones para empresas y gobiernos con modelo de revenue share.", valor: "Revenue Share" },
    ],
  },
};

const ICONS = [TrendingUp, Globe, Award, Users, Handshake, Building];

export default function Investidores() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = I18N[lang] || I18N.pt;
  const dark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0D1829] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: dark ? "linear-gradient(135deg,rgba(30,64,175,0.2) 0%,transparent 60%,rgba(249,115,22,0.08) 100%)" : "linear-gradient(135deg,rgba(30,64,175,0.07) 0%,transparent 60%,rgba(249,115,22,0.04) 100%)" }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-heading font-medium mb-6 border ${
              dark ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-50 border-blue-200 text-[#1E40AF]"
            }`}>{tr.badge}</span>
            <h1 className={`text-5xl md:text-6xl font-heading font-bold mb-6 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.title}</h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* Why invest */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className={`text-4xl font-heading font-bold ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.whyTitle}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tr.oportunidades.map((o, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`p-6 border rounded-2xl transition-all group hover:shadow-md ${
                    dark
                      ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30"
                      : "border-slate-200 bg-white hover:border-blue-200"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    dark ? "bg-blue-500/15" : "bg-blue-50"
                  }`}>
                    <Icon className={`w-5 h-5 ${dark ? "text-blue-400" : "text-[#1E40AF]"}`} aria-hidden="true" />
                  </div>
                  <h3 className={`text-base font-heading font-bold mb-2 ${dark ? "text-white" : "text-[#0F172A]"}`}>{o.title}</h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{o.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership models */}
      <section className={`py-16 px-6 ${dark ? "bg-[#0A1628]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className={`text-4xl font-heading font-bold mb-4 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.parceriasTitle}</h2>
            <p className={`${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.parceriasSub}</p>
          </motion.div>
          <div className="space-y-3">
            {tr.parceiras.map((item, i) => (
              <motion.div
                key={item.tipo}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-5 p-5 border rounded-2xl ${
                  dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-[#F8FAFC]"
                }`}
              >
                <div className={`shrink-0 px-3 py-1.5 rounded-lg border text-xs font-bold ${
                  dark ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : "bg-orange-50 border-orange-200 text-[#C2510A]"
                }`}>
                  {item.valor}
                </div>
                <div>
                  <h3 className={`font-heading font-bold mb-0.5 ${dark ? "text-white" : "text-[#0F172A]"}`}>{item.tipo}</h3>
                  <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className={`text-3xl font-heading font-bold mb-4 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.ctaTitle}</h2>
            <p className={`mb-8 ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.ctaDesc}</p>
            <Link
              to={createPageUrl("Contato")}
              className="inline-block px-8 py-4 bg-[#1E40AF] hover:bg-[#1D3A9E] text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] min-h-[44px]"
            >
              {tr.ctaBtn}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}