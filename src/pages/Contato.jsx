import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";
import useSEO from "@/components/useSEO";

const CONTACT_LABELS = {
  pt: { phone: "Telefone / WhatsApp", errorMsg: "Erro ao enviar. Por favor, tente novamente." },
  en: { phone: "Phone / WhatsApp", errorMsg: "Error sending. Please try again." },
  es: { phone: "Teléfono / WhatsApp", errorMsg: "Error al enviar. Por favor, inténtalo de nuevo." },
};

export default function Contato() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).contato;
  const labels = CONTACT_LABELS[lang] || CONTACT_LABELS.pt;
  const dark = theme === "dark";

  useSEO({
    title: lang === "en" ? "Contact" : lang === "es" ? "Contacto" : "Contato",
    description: lang === "en"
      ? "Get in touch with NOUS — ready to transform your project into reality."
      : lang === "es"
      ? "Ponte en contacto con NOUS."
      : "Entre em contato com a NOUS.",
    lang,
  });

  const [form, setForm] = useState({ nome: "", email: "", empresa: "", assunto: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await base44.entities.Lead.create({
        nome: form.nome, email: form.email, empresa: form.empresa,
        assunto: form.assunto, mensagem: form.mensagem, origem: "formulario_contato",
      });
      try {
        await base44.integrations.Core.SendEmail({
          to: "contato@inovanous.com",
          subject: `[NOUS Site] ${form.assunto} — ${form.nome}`,
          body: `Nome: ${form.nome}\nE-mail: ${form.email}\nEmpresa: ${form.empresa}\nAssunto: ${form.assunto}\n\n${form.mensagem}`,
        });
      } catch (emailErr) {
        console.warn("Email notification skipped:", emailErr?.message);
      }
      setSent(true);
      setForm({ nome: "", email: "", empresa: "", assunto: "", mensagem: "" });
    } catch (err) {
      setErrorMsg(labels.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
    dark
      ? "bg-white/5 border-blue-900/40 text-white placeholder-slate-500 focus:border-blue-500/50"
      : "bg-white border-slate-200 text-[#0F172A] placeholder-slate-400 focus:border-[#1E40AF]/50"
  }`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0D1829] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: dark ? "linear-gradient(135deg,rgba(30,64,175,0.18) 0%,transparent 60%,rgba(249,115,22,0.07) 100%)" : "linear-gradient(135deg,rgba(30,64,175,0.06) 0%,transparent 60%,rgba(249,115,22,0.03) 100%)" }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-heading font-medium mb-6 border ${
              dark ? "bg-orange-500/10 border-orange-500/20 text-orange-300" : "bg-orange-50 border-orange-200 text-[#C2510A]"
            }`}>{tr.label}</span>
            <h1 className={`text-5xl md:text-6xl font-heading font-bold mb-6 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.title}</h1>
            <p className={`text-xl max-w-2xl mx-auto ${dark ? "text-slate-300" : "text-slate-500"}`}>{tr.sub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h2 className={`text-3xl font-heading font-bold mb-8 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.formTitle}</h2>
            <div className="space-y-4 mb-8">
              <div className={`flex items-center gap-4 p-4 border rounded-2xl ${dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-white shadow-sm"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-blue-500/15" : "bg-blue-50"}`}>
                  <Mail className={`w-5 h-5 ${dark ? "text-blue-400" : "text-[#1E40AF]"}`} aria-hidden="true" />
                </div>
                <div>
                  <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>{tr.email}</p>
                  <a href="mailto:contato@inovanous.com" className={`font-semibold text-sm transition-colors hover:text-[#F97316] ${dark ? "text-white" : "text-[#0F172A]"}`}>
                    contato@inovanous.com
                  </a>
                </div>
              </div>

              <a href="https://wa.me/5562999579358" target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 border rounded-2xl transition-all ${
                  dark ? "border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/15" : "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                }`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                  <MessageCircle className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                </div>
                <div>
                  <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>{labels.phone}</p>
                  <p className="font-semibold text-sm text-[#10B981]">(62) 9.9957-9358</p>
                </div>
              </a>

              <div className={`flex items-center gap-4 p-4 border rounded-2xl ${dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-white shadow-sm"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-orange-500/15" : "bg-orange-50"}`}>
                  <MapPin className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
                </div>
                <div>
                  <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>{tr.location}</p>
                  <p className={`font-semibold text-sm ${dark ? "text-white" : "text-[#0F172A]"}`}>Campina Grande – PB, Brasil</p>
                </div>
              </div>
            </div>

            <div className={`p-5 border rounded-2xl ${dark ? "border-blue-900/40 bg-[#121F35]" : "border-slate-200 bg-white shadow-sm"}`}>
              <p className={`text-xs mb-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>{tr.cnpjLabel}</p>
              <p className={`font-mono text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>65.276.411/0001-50</p>
              <p className={`text-xs mt-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>NOUS INOVAÇÃO E TECNOLOGIA INOVA SIMPLES (I.S.)</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <CheckCircle className="w-16 h-16 text-[#10B981] mb-6" aria-hidden="true" />
                <h3 className={`text-2xl font-heading font-bold mb-3 ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.successTitle}</h3>
                <p className={`${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.successDesc}</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-[#F97316] hover:underline focus:outline-none focus-visible:underline min-h-[44px]"
                >
                  {lang === "en" ? "Send another message" : lang === "es" ? "Enviar otro mensaje" : "Enviar outra mensagem"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs mb-2 block font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.nome} *</label>
                    <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className={inputCls} placeholder={tr.nome} />
                  </div>
                  <div>
                    <label className={`text-xs mb-2 block font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.email} *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls} placeholder="email@exemplo.com" />
                  </div>
                </div>
                <div>
                  <label className={`text-xs mb-2 block font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.empresa}</label>
                  <input value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    className={inputCls} placeholder={tr.empresa} />
                </div>
                <div>
                  <label className={`text-xs mb-2 block font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.assunto} *</label>
                  <select required value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                    className={`${inputCls} cursor-pointer`}
                    style={{ backgroundColor: dark ? "#121F35" : "#ffffff" }}>
                    {tr.assuntoOpts.map((opt, i) => <option key={i} value={i === 0 ? "" : opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs mb-2 block font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.mensagem} *</label>
                  <textarea required rows={5} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className={`${inputCls} resize-none`} placeholder={tr.mensagem + "..."} />
                </div>
                {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#F97316] hover:bg-[#EA6C0A] disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-md shadow-orange-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
                >
                  {loading
                    ? <><Loader2 className="w-5 h-5 animate-spin" /> {tr.sending}</>
                    : <><Send className="w-5 h-5" aria-hidden="true" /> {tr.send}</>
                  }
                </button>
                <p className={`text-xs text-center ${dark ? "text-slate-500" : "text-slate-400"}`}>{tr.lgpd}</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}