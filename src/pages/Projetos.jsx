import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ShieldCheck, Globe, Leaf, ArrowRight, X } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";

const PROJETOS_I18N = {
  pt: {
    badge: "INOVAÇÃO EM AÇÃO",
    title: "Projetos em Destaque",
    sub: "Iniciativas que unem tecnologia, criatividade e impacto social para transformar realidades.",
    featuresLabel: "Funcionalidades",
    impactoLabel: "Impacto Social",
    detalhes: "Ver detalhes",
    items: [
      {
        id: "rede-escuta-segura",
        badge: "SaúdeTech · Proteção",
        title: "Rede Escuta Segura",
        subtitle: "Plataforma de apoio emocional e denúncia segura",
        desc: "Plataforma digital que oferece canais seguros e anônimos de escuta, apoio emocional e denúncia para vítimas de violência, assédio e vulnerabilidade social.",
        features: ["Canal anônimo de denúncia e acolhimento","Conexão com redes de apoio especializadas","IA para triagem e encaminhamento de casos","Chat seguro com psicólogos e assistentes sociais","Mapeamento de serviços de proteção por região","Alertas e notificações de segurança em tempo real"],
        impact: "Proteção e acolhimento de populações vulneráveis, ampliando o acesso a redes de apoio e serviços de proteção social.",
        tags: ["Saúde Mental", "Proteção Social", "IA", "Anonimato", "Inclusão"],
        status: "Em Desenvolvimento",
      },
      {
        id: "babel-360",
        badge: "EdTech · Idiomas",
        title: "Babel 360",
        subtitle: "Aprendizado de idiomas com IA e gamificação",
        desc: "Plataforma imersiva de aprendizado de idiomas que combina IA, gamificação e metodologias ativas.",
        features: ["Trilhas de aprendizado personalizadas por IA","Gamificação com missões, pontos e recompensas","Conversação em tempo real com IA nativa","Reconhecimento de fala e pronúncia","Comunidade global de falantes e praticantes","Certificação digital de proficiência linguística"],
        impact: "Democratização do acesso ao aprendizado de idiomas, quebrando barreiras linguísticas.",
        tags: ["EdTech", "Idiomas", "IA", "Gamificação", "Acessibilidade"],
        status: "Em Desenvolvimento",
      },
      {
        id: "pif-ust",
        badge: "GreenTech · ESG",
        title: "PIF-UST",
        subtitle: "Plataforma de inteligência para financiamento sustentável",
        desc: "Plataforma inteligente que conecta projetos sustentáveis a fontes de financiamento público e privado, utilizando IA para análise ESG.",
        features: ["Mapeamento de editais e fontes de financiamento","Análise de viabilidade e conformidade ESG por IA","Geração automática de relatórios de impacto","Dashboard de indicadores de sustentabilidade","Conexão entre projetos e investidores ESG","Monitoramento de projetos financiados"],
        impact: "Aceleração do financiamento de projetos sustentáveis, conectando iniciativas de impacto a recursos.",
        tags: ["ESG", "Sustentabilidade", "IA", "Financiamento", "Impacto Social"],
        status: "Em Desenvolvimento",
      },
      {
        id: "cultura-tech",
        badge: "Cultural · Imersivo",
        title: "Tecnologia e Inclusão",
        subtitle: "Arte integrada à tecnologia",
        desc: "Ecossistema de projetos que une expressão artística com tecnologia de ponta, criando experiências imersivas únicas.",
        features: ["Gamificação cultural para engajamento comunitário","Experiências imersivas com VR e AR","Arte interativa integrada à tecnologia","Eventos e festivais tech-culturais","Plataforma de distribuição de conteúdo cultural","Programa de residência artística digital"],
        impact: "Preservação e difusão da cultura brasileira através da inovação tecnológica.",
        tags: ["Cultura", "Arte", "Imersivo", "VR/AR"],
        status: "Planejamento",
      },
    ],
  },
  en: {
    badge: "INNOVATION IN ACTION",
    title: "Featured Projects",
    sub: "Initiatives that combine technology, creativity and social impact to transform realities.",
    featuresLabel: "Features",
    impactoLabel: "Social Impact",
    detalhes: "View details",
    items: [
      { id: "rede-escuta-segura", badge: "HealthTech · Protection", title: "Rede Escuta Segura", subtitle: "Emotional support and safe reporting platform", desc: "A digital platform offering safe and anonymous listening channels, emotional support and reporting for victims of violence.", features: ["Anonymous reporting channel","Connection to specialized support networks","AI for case triage and referral","Secure chat with psychologists","Mapping of protection services by region","Real-time safety alerts"], impact: "Protection for vulnerable populations, expanding access to support networks.", tags: ["Mental Health","Social Protection","AI","Anonymity","Inclusion"], status: "In Development" },
      { id: "babel-360", badge: "EdTech · Languages", title: "Babel 360", subtitle: "Language learning with AI and gamification", desc: "An immersive language learning platform combining AI, gamification and active methodologies.", features: ["AI-personalized learning paths","Gamification with missions and rewards","Real-time conversation with native AI","Speech and pronunciation recognition","Global community of speakers","Digital language proficiency certification"], impact: "Democratizing access to language learning.", tags: ["EdTech","Languages","AI","Gamification","Accessibility"], status: "In Development" },
      { id: "pif-ust", badge: "GreenTech · ESG", title: "PIF-UST", subtitle: "Intelligence platform for sustainable financing", desc: "An intelligent platform connecting sustainable projects to public and private funding sources.", features: ["Mapping of calls and funding sources","AI-powered ESG compliance analysis","Automatic impact report generation","Sustainability indicators dashboard","Connection between projects and ESG investors","Project monitoring"], impact: "Accelerating sustainable project financing.", tags: ["ESG","Sustainability","AI","Financing","Social Impact"], status: "In Development" },
      { id: "cultura-tech", badge: "Cultural · Immersive", title: "Technology and Inclusion", subtitle: "Art integrated with technology", desc: "An ecosystem combining artistic expression with cutting-edge technology.", features: ["Cultural gamification","Immersive VR and AR experiences","Interactive art integrated with technology","Tech-cultural events","Cultural content distribution","Digital artistic residency"], impact: "Preservation of Brazilian culture through innovation.", tags: ["Culture","Art","Immersive","VR/AR"], status: "Planning" },
    ],
  },
  es: {
    badge: "INNOVACIÓN EN ACCIÓN",
    title: "Proyectos Destacados",
    sub: "Iniciativas que unen tecnología, creatividad e impacto social para transformar realidades.",
    featuresLabel: "Funcionalidades",
    impactoLabel: "Impacto Social",
    detalhes: "Ver detalles",
    items: [
      { id: "rede-escuta-segura", badge: "SaludTech · Protección", title: "Rede Escuta Segura", subtitle: "Plataforma de apoyo emocional y denuncia segura", desc: "Plataforma digital que ofrece canales seguros y anónimos de escucha, apoyo emocional y denuncia para víctimas de violencia.", features: ["Canal anónimo de denuncia","Conexión con redes de apoyo","IA para triaje de casos","Chat seguro con psicólogos","Mapeo de servicios de protección","Alertas en tiempo real"], impact: "Protección de poblaciones vulnerables, ampliando el acceso a redes de apoyo.", tags: ["Salud Mental","Protección Social","IA","Anonimato","Inclusión"], status: "En Desarrollo" },
      { id: "babel-360", badge: "EdTech · Idiomas", title: "Babel 360", subtitle: "Aprendizaje de idiomas con IA y gamificación", desc: "Plataforma inmersiva de aprendizaje de idiomas que combina IA, gamificación y metodologías activas.", features: ["Rutas de aprendizaje por IA","Gamificación con misiones","Conversación con IA nativa","Reconocimiento de voz","Comunidad global de hablantes","Certificación digital"], impact: "Democratización del acceso al aprendizaje de idiomas.", tags: ["EdTech","Idiomas","IA","Gamificación","Accesibilidad"], status: "En Desarrollo" },
      { id: "pif-ust", badge: "GreenTech · ESG", title: "PIF-UST", subtitle: "Plataforma de inteligencia para financiamiento sostenible", desc: "Plataforma inteligente que conecta proyectos sostenibles con fuentes de financiamiento.", features: ["Mapeo de convocatorias","Análisis ESG por IA","Informes automáticos","Dashboard de sostenibilidad","Conexión con inversores ESG","Monitoreo de proyectos"], impact: "Aceleración del financiamiento de proyectos sostenibles.", tags: ["ESG","Sostenibilidad","IA","Financiamiento","Impacto Social"], status: "En Desarrollo" },
      { id: "cultura-tech", badge: "Cultural · Inmersivo", title: "Tecnología e Inclusión", subtitle: "Arte integrado a la tecnología", desc: "Ecosistema de proyectos que une expresión artística con tecnología de vanguardia.", features: ["Gamificación cultural","Experiencias VR y AR","Arte interactivo","Eventos tech-culturales","Distribución de contenido cultural","Residencia artística digital"], impact: "Preservación de la cultura brasileña a través de la innovación.", tags: ["Cultura","Arte","Inmersivo","VR/AR"], status: "Planificación" },
    ],
  },
};

const ICONS = [ShieldCheck, Globe, Leaf, Music];
const COLORS = ["#1E40AF", "#F97316", "#10B981", "#1E40AF"];

export default function Projetos() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = PROJETOS_I18N[lang] || PROJETOS_I18N.pt;
  const dark = theme === "dark";
  const [selected, setSelected] = useState(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0D1829] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: dark ? "linear-gradient(135deg,rgba(30,64,175,0.18) 0%,transparent 60%,rgba(16,185,129,0.08) 100%)" : "linear-gradient(135deg,rgba(30,64,175,0.07) 0%,transparent 60%,rgba(16,185,129,0.04) 100%)" }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-heading font-medium mb-6 border ${
              dark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}>{tr.badge}</span>
            <h1 className={`text-5xl md:text-6xl font-heading font-bold mb-6 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.title}</h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {tr.items.map((p, i) => {
            const Icon = ICONS[i] || Music;
            const color = COLORS[i] || "#1E40AF";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className={`grid lg:grid-cols-2 gap-8 items-start border rounded-3xl p-8 transition-all ${
                  dark
                    ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/25"
                    : "border-slate-200 bg-white hover:border-blue-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                    style={{ backgroundColor: color + "15", color, border: `1px solid ${color}35` }}>
                    {p.badge}
                  </span>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "15" }}>
                      <Icon className="w-7 h-7" style={{ color }} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-heading font-bold ${dark ? "text-white" : "text-[#0F172A]"}`}>{p.title}</h2>
                      <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{p.subtitle}</p>
                    </div>
                  </div>
                  <p className={`leading-relaxed mb-5 text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((tag) => (
                      <span key={tag} className={`px-2.5 py-1 rounded-full text-xs border ${
                        dark ? "border-white/10 text-slate-300 bg-white/5" : "border-slate-200 text-slate-600 bg-slate-50"
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                      {p.status}
                    </span>
                    <button
                      onClick={() => setSelected(p)}
                      className="flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:underline hover:opacity-80"
                      style={{ color }}
                    >
                      {tr.detalhes} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={`${i % 2 === 1 ? "lg:order-1" : ""} space-y-2`}>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${dark ? "text-slate-500" : "text-slate-400"}`}>{tr.featuresLabel}</h4>
                  {p.features.map((f, fi) => (
                    <div key={fi} className={`flex items-start gap-3 p-3 rounded-xl ${
                      dark ? "bg-white/5 border border-white/5" : "bg-slate-50 border border-slate-100"
                    }`}>
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
                      <span className={`text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-3xl p-8 max-w-xl w-full ${
                dark ? "bg-[#121F35] border-blue-900/40" : "bg-white border-slate-200"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className={`text-2xl font-heading font-bold ${dark ? "text-white" : "text-[#0F172A]"}`}>{selected.title}</h3>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                  className={`p-1.5 rounded-lg transition-colors ${dark ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className={`leading-relaxed mb-5 ${dark ? "text-slate-300" : "text-slate-600"}`}>{selected.desc}</p>
              <div className={`p-4 rounded-xl border ${
                dark ? "border-emerald-500/20 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"
              }`}>
                <p className="text-sm text-[#10B981] font-semibold mb-1">{tr.impactoLabel}</p>
                <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{selected.impact}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}