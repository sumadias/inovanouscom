import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Tag, CheckCircle, AlertCircle, XCircle, Loader2, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useTheme } from "@/components/ThemeContext";
import { useLang } from "@/components/LangContext";

const SEO_UI = {
  pt: {
    badge: "Módulo SEO On-Page",
    title: "Otimização de Conteúdo",
    sub: "Analise palavras-chave, legibilidade e meta tags com inteligência artificial para melhorar seu rankeamento.",
    tabs: ["Palavras-chave", "Legibilidade", "Meta Tags & Headings"],
    kwLabel: "Palavra-chave principal *",
    kwPlaceholder: "ex: inteligência artificial para educação",
    contentLabel: "Conteúdo do texto *",
    contentPlaceholder: "Cole o conteúdo que deseja analisar...",
    words: "palavras",
    readLabel: "Texto para análise *",
    readPlaceholder: "Cole o texto que deseja analisar a legibilidade...",
    sentences: "frases",
    metaTitleLabel: "Título da página (meta title) *",
    metaTitlePlaceholder: "ex: NOUS Inovação | Soluções com IA e Gamificação",
    tooLong: "— muito longo",
    metaDescLabel: "Meta descrição *",
    metaDescPlaceholder: "ex: Desenvolvemos soluções de IA, gamificação e software personalizado para governos, empresas e terceiro setor.",
    tooLongDesc: "— muito longa",
    headingsLabel: "Headings da página (H1, H2, H3...)",
    headingsPlaceholder: "H1: Título principal\nH2: Subtítulo 1\nH2: Subtítulo 2\nH3: Tópico",
    analyze: "Analisar com IA",
    analyzing: "Analisando...",
    resultTitle: "Resultado da Análise",
    kwDensity: "Densidade da keyword",
    ideal: "Ideal",
    tooLow: "Muito baixa",
    tooHigh: "Muito alta",
    seoScore: "Score SEO",
    relatedKw: "Palavras-chave relacionadas sugeridas",
    level: "Nível",
    avgWords: "Média palavras/frase",
    score: "Score",
    titleScore: "Score Título",
    descScore: "Score Descrição",
    suggestedTitle: "✨ Título sugerido",
    suggestedDesc: "✨ Descrição sugerida",
    suggestions: "Sugestões",
    chars: "caracteres",
  },
  en: {
    badge: "On-Page SEO Module",
    title: "Content Optimization",
    sub: "Analyze keywords, readability, and meta tags with artificial intelligence to improve your ranking.",
    tabs: ["Keywords", "Readability", "Meta Tags & Headings"],
    kwLabel: "Main keyword *",
    kwPlaceholder: "e.g. artificial intelligence for education",
    contentLabel: "Text content *",
    contentPlaceholder: "Paste the content you want to analyze...",
    words: "words",
    readLabel: "Text for analysis *",
    readPlaceholder: "Paste the text you want to analyze for readability...",
    sentences: "sentences",
    metaTitleLabel: "Page title (meta title) *",
    metaTitlePlaceholder: "e.g. NOUS Innovation | AI and Gamification Solutions",
    tooLong: "— too long",
    metaDescLabel: "Meta description *",
    metaDescPlaceholder: "e.g. We develop AI, gamification and custom software solutions for governments.",
    tooLongDesc: "— too long",
    headingsLabel: "Page headings (H1, H2, H3...)",
    headingsPlaceholder: "H1: Main title\nH2: Subtitle 1\nH2: Subtitle 2\nH3: Topic",
    analyze: "Analyze with AI",
    analyzing: "Analyzing...",
    resultTitle: "Analysis Result",
    kwDensity: "Keyword density",
    ideal: "Ideal",
    tooLow: "Too low",
    tooHigh: "Too high",
    seoScore: "SEO Score",
    relatedKw: "Suggested related keywords",
    level: "Level",
    avgWords: "Avg words/sentence",
    score: "Score",
    titleScore: "Title Score",
    descScore: "Description Score",
    suggestedTitle: "✨ Suggested title",
    suggestedDesc: "✨ Suggested description",
    suggestions: "Suggestions",
    chars: "characters",
  },
  es: {
    badge: "Módulo SEO On-Page",
    title: "Optimización de Contenido",
    sub: "Analiza palabras clave, legibilidad y meta tags con inteligencia artificial para mejorar tu posicionamiento.",
    tabs: ["Palabras clave", "Legibilidad", "Meta Tags & Headings"],
    kwLabel: "Palabra clave principal *",
    kwPlaceholder: "ej: inteligencia artificial para educación",
    contentLabel: "Contenido del texto *",
    contentPlaceholder: "Pega el contenido que deseas analizar...",
    words: "palabras",
    readLabel: "Texto para análisis *",
    readPlaceholder: "Pega el texto que deseas analizar para legibilidad...",
    sentences: "frases",
    metaTitleLabel: "Título de la página (meta title) *",
    metaTitlePlaceholder: "ej: NOUS Innovación | Soluciones con IA y Gamificación",
    tooLong: "— demasiado largo",
    metaDescLabel: "Meta descripción *",
    metaDescPlaceholder: "ej: Desarrollamos soluciones de IA, gamificación y software personalizado para gobiernos.",
    tooLongDesc: "— demasiado larga",
    headingsLabel: "Encabezados de la página (H1, H2, H3...)",
    headingsPlaceholder: "H1: Título principal\nH2: Subtítulo 1\nH2: Subtítulo 2\nH3: Tema",
    analyze: "Analizar con IA",
    analyzing: "Analizando...",
    resultTitle: "Resultado del Análisis",
    kwDensity: "Densidad de la keyword",
    ideal: "Ideal",
    tooLow: "Muy baja",
    tooHigh: "Muy alta",
    seoScore: "Score SEO",
    relatedKw: "Palabras clave relacionadas sugeridas",
    level: "Nivel",
    avgWords: "Promedio palabras/frase",
    score: "Score",
    titleScore: "Score Título",
    descScore: "Score Descripción",
    suggestedTitle: "✨ Título sugerido",
    suggestedDesc: "✨ Descripción sugerida",
    suggestions: "Sugerencias",
    chars: "caracteres",
  },
};

const TABS_IDS = ["keywords", "readability", "metatags"];
const TAB_ICONS = [Search, FileText, Tag];

function ScoreBadge({ score }) {
  const color = score >= 70 ? "text-emerald-600 bg-emerald-50 border-emerald-200" : score >= 40 ? "text-amber-600 bg-amber-50 border-amber-200" : "text-red-600 bg-red-50 border-red-200";
  const icon = score >= 70 ? <CheckCircle className="w-4 h-4" /> : score >= 40 ? <AlertCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${color}`}>
      {icon} {score}/100
    </span>
  );
}

function SuggestionItem({ type, text }) {
  const styles = {
    good: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warn: "border-amber-200 bg-amber-50 text-amber-700",
    bad: "border-red-200 bg-red-50 text-red-700",
  };
  const icons = {
    good: <CheckCircle className="w-4 h-4 shrink-0" />,
    warn: <AlertCircle className="w-4 h-4 shrink-0" />,
    bad: <XCircle className="w-4 h-4 shrink-0" />,
  };
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${styles[type] || styles.warn}`}>
      {icons[type] || icons.warn}
      <span>{text}</span>
    </div>
  );
}

export default function SEO() {
  const { theme } = useTheme();
  const { lang } = useLang();
  const dark = theme === "dark";
  const ui = SEO_UI[lang] || SEO_UI.pt;

  const [tabIdx, setTabIdx] = useState(0);
  const tab = TABS_IDS[tabIdx];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [readText, setReadText] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [headings, setHeadings] = useState("");

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    let prompt = "";
    let schema = {};
    if (tab === "keywords") {
      prompt = `Analyze the content below for the main keyword "${keyword}". Content: "${content}". Return: score (0-100), keyword_density (percentage number), suggestions (array of {type: "good"|"warn"|"bad", text: string}, up to 6), related_keywords (array of up to 8 strings). Respond in the language: ${lang}.`;
      schema = { type: "object", properties: { score: { type: "number" }, keyword_density: { type: "number" }, suggestions: { type: "array", items: { type: "object", properties: { type: { type: "string" }, text: { type: "string" } } } }, related_keywords: { type: "array", items: { type: "string" } } } };
    } else if (tab === "readability") {
      prompt = `Analyze the readability of the text below: "${readText}". Return: score (0-100), flesch_level (string), avg_sentence_length (number), suggestions (array of {type: "good"|"warn"|"bad", text: string}, up to 6). Respond in the language: ${lang}.`;
      schema = { type: "object", properties: { score: { type: "number" }, flesch_level: { type: "string" }, avg_sentence_length: { type: "number" }, suggestions: { type: "array", items: { type: "object", properties: { type: { type: "string" }, text: { type: "string" } } } } } };
    } else {
      prompt = `Analyze these meta tags and headings for SEO. Title: "${metaTitle}", Description: "${metaDesc}", Headings: "${headings}". Return: score (0-100), title_score (0-100), desc_score (0-100), title_length (number), desc_length (number), suggested_title (string max 60 chars), suggested_desc (string max 160 chars), suggestions (array of {type: "good"|"warn"|"bad", text: string}, up to 8). Respond in the language: ${lang}.`;
      schema = { type: "object", properties: { score: { type: "number" }, title_score: { type: "number" }, desc_score: { type: "number" }, title_length: { type: "number" }, desc_length: { type: "number" }, suggested_title: { type: "string" }, suggested_desc: { type: "string" }, suggestions: { type: "array", items: { type: "object", properties: { type: { type: "string" }, text: { type: "string" } } } } } };
    }
    const res = await base44.integrations.Core.InvokeLLM({ prompt, response_json_schema: schema });
    setResult(res);
    setLoading(false);
  };

  const canAnalyze = tab === "keywords" ? keyword.trim() && content.trim()
    : tab === "readability" ? readText.trim()
    : metaTitle.trim() && metaDesc.trim();

  const card = dark ? "bg-[#121F35] border-blue-900/40" : "bg-white border-slate-200";
  const inputCls = `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
    dark ? "bg-white/5 border-blue-900/40 text-slate-100 placeholder-slate-500 focus:border-blue-500/50" : "bg-slate-50 border-slate-200 text-[#0F172A] placeholder-slate-400 focus:border-[#1E40AF]/50"
  }`;
  const labelCls = dark ? "text-slate-400" : "text-slate-500";
  const headingCls = dark ? "text-white" : "text-[#0F172A]";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0D1829]" : "bg-[#F8FAFC]"}`}>
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: dark ? "linear-gradient(135deg,rgba(30,64,175,0.15) 0%,transparent 60%,rgba(249,115,22,0.06) 100%)" : "linear-gradient(135deg,rgba(30,64,175,0.06) 0%,transparent 60%,rgba(249,115,22,0.03) 100%)" }} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-medium mb-6 border ${
              dark ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-50 border-blue-200 text-[#1E40AF]"
            }`}>
              <Sparkles className="w-4 h-4" aria-hidden="true" /> {ui.badge}
            </span>
            <h1 className={`text-4xl md:text-5xl font-heading font-bold mb-4 ${headingCls}`}>{ui.title}</h1>
            <p className={`text-lg max-w-xl mx-auto ${labelCls}`}>{ui.sub}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-xl border mb-6 ${card}`}>
          {ui.tabs.map((label, i) => {
            const Icon = TAB_ICONS[i];
            return (
              <button key={i} onClick={() => { setTabIdx(i); setResult(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                  tabIdx === i
                    ? "bg-[#1E40AF] text-white"
                    : dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-[#0F172A]"
                }`}>
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Input card */}
        <div className={`rounded-2xl border p-6 md:p-8 ${card}`}>
          {tab === "keywords" && (
            <div className="space-y-4">
              <div>
                <label className={`text-sm mb-2 block ${labelCls}`}>{ui.kwLabel}</label>
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder={ui.kwPlaceholder} className={inputCls} />
              </div>
              <div>
                <label className={`text-sm mb-2 block ${labelCls}`}>{ui.contentLabel}</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={7} placeholder={ui.contentPlaceholder} className={`${inputCls} resize-none`} />
                <p className={`text-xs mt-1 ${labelCls}`}>{content.trim().split(/\s+/).filter(Boolean).length} {ui.words}</p>
              </div>
            </div>
          )}
          {tab === "readability" && (
            <div>
              <label className={`text-sm mb-2 block ${labelCls}`}>{ui.readLabel}</label>
              <textarea value={readText} onChange={(e) => setReadText(e.target.value)} rows={10} placeholder={ui.readPlaceholder} className={`${inputCls} resize-none`} />
              <p className={`text-xs mt-1 ${labelCls}`}>{readText.trim().split(/\s+/).filter(Boolean).length} {ui.words} · {readText.split(/[.!?]+/).filter(Boolean).length} {ui.sentences}</p>
            </div>
          )}
          {tab === "metatags" && (
            <div className="space-y-4">
              <div>
                <label className={`text-sm mb-2 block ${labelCls}`}>{ui.metaTitleLabel}</label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={ui.metaTitlePlaceholder} className={inputCls} />
                <p className={`text-xs mt-1 ${metaTitle.length > 60 ? "text-red-500" : labelCls}`}>{metaTitle.length}/60 {ui.chars} {metaTitle.length > 60 && ui.tooLong}</p>
              </div>
              <div>
                <label className={`text-sm mb-2 block ${labelCls}`}>{ui.metaDescLabel}</label>
                <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={3} placeholder={ui.metaDescPlaceholder} className={`${inputCls} resize-none`} />
                <p className={`text-xs mt-1 ${metaDesc.length > 160 ? "text-red-500" : labelCls}`}>{metaDesc.length}/160 {ui.chars} {metaDesc.length > 160 && ui.tooLongDesc}</p>
              </div>
              <div>
                <label className={`text-sm mb-2 block ${labelCls}`}>{ui.headingsLabel}</label>
                <textarea value={headings} onChange={(e) => setHeadings(e.target.value)} rows={4} placeholder={ui.headingsPlaceholder} className={`${inputCls} resize-none`} />
              </div>
            </div>
          )}

          <button onClick={analyze} disabled={!canAnalyze || loading}
            className="mt-6 w-full flex items-center justify-center gap-3 py-4 bg-[#1E40AF] hover:bg-[#1D3A9E] disabled:opacity-40 text-white font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] min-h-[44px]">
            {loading
              ? <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> {ui.analyzing}</>
              : <><Sparkles className="w-5 h-5" aria-hidden="true" /> {ui.analyze}</>
            }
          </button>
        </div>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`mt-5 rounded-2xl border p-6 md:p-8 space-y-6 ${card}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-heading font-bold ${headingCls}`}>{ui.resultTitle}</h2>
              <ScoreBadge score={Math.round(result.score)} />
            </div>

            {tab === "keywords" && (
              <>
                <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border ${dark ? "border-blue-900/30 bg-white/5" : "border-slate-100 bg-slate-50"}`}>
                  <div>
                    <p className={`text-xs mb-1 ${labelCls}`}>{ui.kwDensity}</p>
                    <p className={`text-2xl font-heading font-black ${headingCls}`}>{result.keyword_density?.toFixed(2)}%</p>
                    <p className={`text-xs ${labelCls}`}>{result.keyword_density < 0.5 ? ui.tooLow : result.keyword_density > 3 ? ui.tooHigh : ui.ideal}</p>
                  </div>
                  <div>
                    <p className={`text-xs mb-1 ${labelCls}`}>{ui.seoScore}</p>
                    <p className="text-2xl font-heading font-black text-[#F97316]">{Math.round(result.score)}</p>
                  </div>
                </div>
                {result.related_keywords?.length > 0 && (
                  <div>
                    <p className={`text-sm font-semibold mb-3 ${headingCls}`}>{ui.relatedKw}</p>
                    <div className="flex flex-wrap gap-2">
                      {result.related_keywords.map((kw, i) => (
                        <span key={i} className={`px-3 py-1 text-xs rounded-full border ${
                          dark ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-50 border-blue-200 text-[#1E40AF]"
                        }`}>{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {tab === "readability" && (
              <div className={`grid grid-cols-3 gap-4 p-4 rounded-xl border ${dark ? "border-blue-900/30 bg-white/5" : "border-slate-100 bg-slate-50"}`}>
                <div><p className={`text-xs mb-1 ${labelCls}`}>{ui.level}</p><p className={`text-lg font-heading font-bold ${headingCls}`}>{result.flesch_level}</p></div>
                <div><p className={`text-xs mb-1 ${labelCls}`}>{ui.avgWords}</p><p className={`text-lg font-heading font-bold ${headingCls}`}>{result.avg_sentence_length?.toFixed(1)}</p></div>
                <div><p className={`text-xs mb-1 ${labelCls}`}>{ui.score}</p><p className="text-lg font-heading font-bold text-[#F97316]">{Math.round(result.score)}</p></div>
              </div>
            )}

            {tab === "metatags" && (
              <div className="space-y-4">
                <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border ${dark ? "border-blue-900/30 bg-white/5" : "border-slate-100 bg-slate-50"}`}>
                  <div><p className={`text-xs mb-1 ${labelCls}`}>{ui.titleScore}</p><ScoreBadge score={Math.round(result.title_score || 0)} /><p className={`text-xs mt-1 ${labelCls}`}>{result.title_length} {ui.chars}</p></div>
                  <div><p className={`text-xs mb-1 ${labelCls}`}>{ui.descScore}</p><ScoreBadge score={Math.round(result.desc_score || 0)} /><p className={`text-xs mt-1 ${labelCls}`}>{result.desc_length} {ui.chars}</p></div>
                </div>
                {result.suggested_title && (
                  <div className={`p-4 rounded-xl border ${dark ? "border-blue-500/20 bg-blue-500/10" : "border-blue-200 bg-blue-50"}`}>
                    <p className={`text-xs font-semibold mb-1 ${dark ? "text-blue-300" : "text-[#1E40AF]"}`}>{ui.suggestedTitle}</p>
                    <p className={`text-sm ${headingCls}`}>{result.suggested_title}</p>
                    <p className={`text-xs mt-1 ${labelCls}`}>{result.suggested_title.length} {ui.chars}</p>
                  </div>
                )}
                {result.suggested_desc && (
                  <div className={`p-4 rounded-xl border ${dark ? "border-orange-500/20 bg-orange-500/10" : "border-orange-200 bg-orange-50"}`}>
                    <p className={`text-xs font-semibold mb-1 ${dark ? "text-orange-300" : "text-[#C2510A]"}`}>{ui.suggestedDesc}</p>
                    <p className={`text-sm ${headingCls}`}>{result.suggested_desc}</p>
                    <p className={`text-xs mt-1 ${labelCls}`}>{result.suggested_desc.length} {ui.chars}</p>
                  </div>
                )}
              </div>
            )}

            {result.suggestions?.length > 0 && (
              <div>
                <p className={`text-sm font-semibold mb-3 ${headingCls}`}>{ui.suggestions}</p>
                <div className="space-y-2">
                  {result.suggestions.map((s, i) => <SuggestionItem key={i} type={s.type} text={s.text} />)}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}