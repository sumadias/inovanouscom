import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@/components/ThemeContext";
import { useLang } from "@/components/LangContext";

const SYSTEM_PROMPT = `Você é o assistente virtual da NOUS Inovação e Tecnologia, uma startup brasileira registrada no regime Inova Simples, sediada em Campina Grande – PB. CNPJ: 65.276.411/0001-50.

Sobre a NOUS:
- Desenvolve soluções com Inteligência Artificial, gamificação e tecnologia digital focadas em impacto social sustentável.
- Atende governos, empresas e terceiro setor.
- Soluções: IA generativa/ML/NLP, software sob encomenda, jogos digitais, gamificação educacional, realidade aumentada, Big Data & ESG, orientações e consultoria LGPD (adequação à Lei Geral de Proteção de Dados para empresas, governos e terceiro setor).
- E-mail: contato@inovanous.com
- Telefone/WhatsApp: (62) 9.9957-9358 | Link direto: https://wa.me/5562999579358
- Formulário de contato: página /Contato no site

Instruções:
- Responda de forma concisa, profissional e amigável.
- SEMPRE responda no idioma em que o usuário escrever (português, inglês ou espanhol).
- Se o visitante demonstrar interesse comercial (proposta, orçamento, projeto, parceria, "quero falar com alguém", "entrar em contato"), ofereça IMEDIATAMENTE:
  1. WhatsApp: (62) 9.9957-9358 — https://wa.me/5562999579358
  2. Formulário de contato: /Contato
  3. E-mail: contato@inovanous.com
- Não invente informações. Se não souber algo, diga que vai encaminhar para a equipe.`;

const UI_STRINGS = {
  pt: {
    title: "Assistente NOUS",
    online: "Online agora",
    placeholder: "Digite sua mensagem...",
    greeting: "Olá! 👋 Sou o assistente virtual da **NOUS**. Posso responder suas dúvidas, apresentar nossas soluções ou indicar o caminho certo para seu projeto. Como posso ajudar?",
    quickReplies: ["Ver soluções", "Solicitar proposta", "Agendar demo", "Falar com equipe"],
    powered: "Powered by NOUS AI",
    error: "Ocorreu um erro. Por favor, tente novamente.",
  },
  en: {
    title: "NOUS Assistant",
    online: "Online now",
    placeholder: "Type your message...",
    greeting: "Hello! 👋 I'm NOUS's virtual assistant. I can answer your questions, present our solutions, or guide you toward the right path for your project. How can I help?",
    quickReplies: ["View solutions", "Request proposal", "Schedule demo", "Talk to team"],
    powered: "Powered by NOUS AI",
    error: "An error occurred. Please try again.",
  },
  es: {
    title: "Asistente NOUS",
    online: "En línea ahora",
    placeholder: "Escribe tu mensaje...",
    greeting: "¡Hola! 👋 Soy el asistente virtual de **NOUS**. Puedo responder tus preguntas, presentar nuestras soluciones o guiarte hacia el camino correcto para tu proyecto. ¿Cómo puedo ayudarte?",
    quickReplies: ["Ver soluciones", "Solicitar propuesta", "Agendar demo", "Hablar con el equipo"],
    powered: "Powered by NOUS AI",
    error: "Ocurrió un error. Por favor, inténtalo de nuevo.",
  },
};

export default function ChatBot() {
  const { theme } = useTheme();
  const { lang } = useLang();
  const dark = theme === "dark";
  const ui = UI_STRINGS[lang] || UI_STRINGS.pt;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true;
      setMessages([{ role: "assistant", content: ui.greeting }]);
    }
  }, [open]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant") {
      setMessages([{ role: "assistant", content: ui.greeting }]);
    }
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    setLoading(true);
    const updatedMessages = [...messages, { role: "user", content: msg }];
    setMessages(updatedMessages);
    const history = updatedMessages.slice(-10).map((m) => `${m.role === "user" ? "Usuário" : "Assistente"}: ${m.content}`).join("\n");
    const prompt = `${SYSTEM_PROMPT}\n\nHistórico da conversa:\n${history}\n\nResponda apenas a última mensagem do usuário de forma concisa.`;
    try {
      const response = await base44.integrations.Core.InvokeLLM({ prompt });
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      const isAuthErr = err?.message && /authenticated|conversation|unauthenticated/i.test(err.message);
      if (!isAuthErr) setMessages((prev) => [...prev, { role: "assistant", content: ui.error }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            aria-label="Abrir assistente NOUS"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E40AF] hover:bg-[#1D3A9E] text-white shadow-2xl shadow-blue-900/30 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
          >
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] rounded-full border-2 border-white animate-pulse" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Assistente NOUS"
            className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              dark ? "bg-[#121F35] border-blue-900/40" : "bg-white border-slate-200"
            }`}
            style={{ maxHeight: "calc(100vh - 120px)", height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 70%, #F97316 100%)" }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-white font-heading font-semibold text-sm">{ui.title}</p>
                <p className="text-white/70 text-xs">{ui.online}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar assistente"
                className="text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-0.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-1 shrink-0"
                      style={{ background: "linear-gradient(135deg,#1E40AF,#3B82F6)" }}>
                      <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </div>
                  )}
                  <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1E40AF] text-white rounded-br-sm"
                      : dark
                        ? "bg-white/8 text-slate-200 rounded-bl-sm border border-blue-900/30"
                        : "bg-slate-100 text-slate-700 rounded-bl-sm"
                  }`}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="my-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc ml-4 my-1">{children}</ul>,
                        li: ({ children }) => <li className="my-0.5">{children}</li>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 shrink-0"
                    style={{ background: "linear-gradient(135deg,#1E40AF,#3B82F6)" }}>
                    <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${dark ? "bg-white/8 border border-blue-900/30" : "bg-slate-100"}`}>
                    <Loader2 className="w-4 h-4 animate-spin text-[#1E40AF]" aria-hidden="true" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length === 1 && (
              <div className={`px-4 pb-2 flex flex-wrap gap-2 shrink-0 border-t ${dark ? "border-blue-900/30" : "border-slate-100"}`}>
                {ui.quickReplies.map((q) => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[32px] ${
                      dark
                        ? "border-blue-500/30 text-blue-300 hover:bg-blue-500/15"
                        : "border-[#1E40AF]/30 text-[#1E40AF] hover:bg-blue-50"
                    }`}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className={`px-3 py-3 border-t shrink-0 ${dark ? "border-blue-900/30" : "border-slate-200"}`}>
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
                dark ? "bg-white/5 border-blue-900/30" : "bg-slate-50 border-slate-200"
              }`}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={ui.placeholder}
                  aria-label={ui.placeholder}
                  className={`flex-1 bg-transparent text-sm outline-none ${dark ? "text-white placeholder-slate-500" : "text-slate-800 placeholder-slate-400"}`}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  aria-label="Enviar mensagem"
                  className="w-8 h-8 rounded-lg bg-[#F97316] hover:bg-[#EA6C0A] disabled:opacity-40 flex items-center justify-center transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                >
                  <Send className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </button>
              </div>
              <p className={`text-center text-xs mt-2 ${dark ? "text-slate-600" : "text-slate-400"}`}>{ui.powered}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}