import React from "react";
import { motion } from "framer-motion";
import { Sprout, Landmark, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";

const projetos = [
  {
    icon: Sprout,
    color: "#27AE60",
    bg: "#1E8449",
    label: "AgriTech · EdTech",
    title: "Agrobos",
    desc: "Jogo digital de agricultura sustentável com cashback social e educação ambiental gamificada para produtores rurais e estudantes.",
    tags: ["Gamificação", "Sustentabilidade", "Cashback"],
  },
  {
    icon: Landmark,
    color: "#1F618D",
    bg: "#0F4C81",
    label: "CulturaTech · AR",
    title: "Via Alexandria",
    desc: "Museu a céu aberto com esculturas em alto-relevo integradas à realidade aumentada, QR Codes e inteligência artificial.",
    tags: ["Realidade Aumentada", "IA", "Cultura"],
  },
];

export default function ProjetosDestaque() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#27AE60] text-sm font-semibold tracking-widest uppercase mb-4 block">Inovação em Ação</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projetos em Destaque</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Iniciativas que unem tecnologia, criatividade e impacto para transformar realidades.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projetos.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group p-8 border border-white/10 rounded-3xl bg-white/5 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: p.bg + "25", border: `1px solid ${p.bg}40` }}>
                  <p.icon className="w-8 h-8" style={{ color: p.color }} />
                </div>
                <div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: p.bg + "20", color: p.color, border: `1px solid ${p.bg}30` }}>
                    {p.label}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{p.title}</h3>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-white/15 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={createPageUrl("Projetos")}
                className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:gap-3"
                style={{ color: p.color }}
              >
                Ver projeto completo <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href={createPageUrl("Projetos")} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            Ver todos os projetos →
          </a>
        </div>
      </div>
    </section>
  );
}