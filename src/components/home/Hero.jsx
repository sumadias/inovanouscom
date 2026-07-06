import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Leaf, Award } from "lucide-react";
import { createPageUrl } from "@/utils";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

export default function Hero() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const tr = t(lang).hero;
  const dark = theme === "dark";
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fewer nodes, calmer movement
    const nodes = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.8,
      isAccent: i < 4, // rare orange nodes
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        if (n.isAccent) {
          ctx.fillStyle = dark ? "rgba(251,146,60,0.55)" : "rgba(249,115,22,0.45)";
        } else {
          ctx.fillStyle = dark ? "rgba(96,165,250,0.5)" : "rgba(30,64,175,0.35)";
        }
        ctx.fill();
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const alpha = 0.35 * (1 - dist / 110);
            ctx.strokeStyle = dark
              ? `rgba(96,165,250,${alpha})`
              : `rgba(30,64,175,${alpha * 0.7})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  // Heading: "transforma" highlighted in orange per language
  const headingMap = {
    pt: { pre: "Tecnologia que ", highlight: "transforma", post: " realidades." },
    en: { pre: "Technology that ", highlight: "transforms", post: " realities." },
    es: { pre: "Tecnología que ", highlight: "transforma", post: " realidades." },
  };
  const { pre, highlight, post } = headingMap[lang] || headingMap.pt;

  const miniCards = [
    { Icon: Brain, label: tr.stat1, accent: false },
    { Icon: Leaf, label: tr.stat2, accent: false },
    { Icon: Award, label: tr.stat3, accent: true },
  ];

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
      dark ? "bg-[#0D1829]" : "bg-[#F8FAFC]"
    }`}>
      {/* Canvas network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" aria-hidden="true" />

      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full blur-[120px] ${dark ? "bg-blue-900/40" : "bg-blue-100/70"}`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[100px] ${dark ? "bg-blue-800/25" : "bg-blue-50/80"}`} />
        <div className={`absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full blur-[100px] ${dark ? "bg-orange-900/20" : "bg-orange-50/60"}`} />
        {/* Organic SVG blob accent */}
        <svg className="absolute bottom-0 left-0 w-full opacity-30" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,160 C240,80 480,200 720,140 C960,80 1200,200 1440,120 L1440,200 L0,200 Z"
            fill={dark ? "rgba(30,64,175,0.25)" : "rgba(30,64,175,0.06)"}
          />
        </svg>
      </div>

      {/* Fade bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${dark ? "from-[#0D1829]" : "from-[#F8FAFC]"} to-transparent`} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-7">
            <span className={`text-xs font-semibold tracking-widest uppercase font-heading px-4 py-1.5 rounded-full border ${
              dark
                ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                : "border-[#1E40AF]/20 bg-blue-50 text-[#1E40AF]"
            }`}>
              {tr.badge}
            </span>
          </div>

          {/* Brand name */}
          <div className="mb-3">
            <span className={`text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight leading-none ${
              dark ? "text-white" : "text-[#0F172A]"
            }`}>
              NOUS
            </span>
          </div>

          <div className="mb-8">
            <span className={`text-base md:text-xl font-heading font-light tracking-[0.25em] uppercase ${
              dark ? "text-slate-400" : "text-slate-500"
            }`}>
              {tr.tagline}
            </span>
          </div>

          {/* Main heading — H1 */}
          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6 leading-tight max-w-4xl mx-auto ${
            dark ? "text-white" : "text-[#0F172A]"
          }`}>
            {pre}
            <span className="text-[#F97316]">{highlight}</span>
            {post}
          </h1>

          <p className={`text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-500"
          }`}>
            {tr.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={createPageUrl("Contato")}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] text-sm min-h-[44px]"
            >
              {tr.cta2}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={createPageUrl("Solucoes")}
              className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border font-semibold rounded-xl transition-all text-sm min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                dark
                  ? "border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50"
                  : "border-[#1E40AF]/30 text-[#1E40AF] hover:bg-blue-50 hover:border-[#1E40AF]/50"
              }`}
            >
              {tr.cta1}
            </a>
          </div>

          {/* Mini cards */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {miniCards.map(({ Icon, label, accent }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                  dark
                    ? "border-blue-900/40 bg-blue-900/20"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  accent
                    ? "bg-orange-50 dark:bg-orange-900/20"
                    : "bg-blue-50 dark:bg-blue-900/30"
                }`}>
                  <Icon className={`w-4 h-4 ${accent ? "text-[#F97316]" : dark ? "text-blue-400" : "text-[#1E40AF]"}`} />
                </div>
                <span className={`text-[11px] font-medium text-center leading-tight ${
                  dark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className={`w-5 h-9 border-2 rounded-full flex items-start justify-center p-1.5 ${
          dark ? "border-blue-700/50" : "border-slate-300/70"
        }`}>
          <div className="w-1 h-2.5 bg-[#F97316] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}