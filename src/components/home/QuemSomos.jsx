import React from "react";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Leaf, Users, MapPin, Linkedin, Award } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { t } from "@/components/i18n";

const cardIcons = [Brain, Gamepad2, Leaf, Users];
const cardColors = ["text-[#1E40AF]", "text-[#F97316]", "text-[#10B981]", "text-[#1E40AF]"];

const CERT_URL = "https://www.linkedin.com/feed/update/urn:li:activity:7480695466154774528/";

function AvatarSuzana({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <defs>
        <clipPath id="avatar-clip-suzana"><circle cx="32" cy="32" r="31" /></clipPath>
      </defs>
      <circle cx="32" cy="32" r="31" fill="#DBEAFE" />
      <g clipPath="url(#avatar-clip-suzana)">
        {/* hair (back) */}
        <path d="M15 30c0-12 7.5-19 17-19s17 7 17 19v22H15V30z" fill="#3B2314" />
        {/* shoulders */}
        <path d="M10 66c1.5-10 10-15 22-15s20.5 5 22 15H10z" fill="#1E40AF" />
        {/* neck */}
        <rect x="28" y="40" width="8" height="9" rx="3.5" fill="#EBB58E" />
        {/* face */}
        <ellipse cx="32" cy="30" rx="11.5" ry="12" fill="#F5C6A0" />
        {/* fringe */}
        <path d="M20.5 30c-.8-9 4.2-15.5 11.5-15.5S44.3 21 43.5 30c-1.6-5.5-5.5-8-11.5-8s-9.9 2.5-11.5 8z" fill="#3B2314" />
        {/* side hair */}
        <path d="M19.5 27c-1.8 5-1.5 12 .5 17l-4 1c-1.8-6.5-1.5-13.5 1-18.5l2.5.5z" fill="#3B2314" />
        <path d="M44.5 27c1.8 5 1.5 12-.5 17l4 1c1.8-6.5 1.5-13.5-1-18.5l-2.5.5z" fill="#3B2314" />
        {/* eyes */}
        <circle cx="27.5" cy="30" r="1.7" fill="#1F2937" />
        <circle cx="36.5" cy="30" r="1.7" fill="#1F2937" />
        {/* blush */}
        <circle cx="25" cy="34.5" r="2" fill="#F49A7A" opacity="0.45" />
        <circle cx="39" cy="34.5" r="2" fill="#F49A7A" opacity="0.45" />
        {/* smile */}
        <path d="M28 36.5c1.3 1.7 2.9 2.5 4 2.5s2.7-.8 4-2.5" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* earrings */}
        <circle cx="20.8" cy="33.5" r="1" fill="#F97316" />
        <circle cx="43.2" cy="33.5" r="1" fill="#F97316" />
      </g>
    </svg>
  );
}

function AvatarVictor({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <defs>
        <clipPath id="avatar-clip-victor"><circle cx="32" cy="32" r="31" /></clipPath>
      </defs>
      <circle cx="32" cy="32" r="31" fill="#FFEDD5" />
      <g clipPath="url(#avatar-clip-victor)">
        {/* shoulders / suit */}
        <path d="M10 66c1.5-10 10-15 22-15s20.5 5 22 15H10z" fill="#0F172A" />
        {/* shirt + tie */}
        <path d="M26 51h12l-6 9-6-9z" fill="#F8FAFC" />
        <path d="M32 52l2.4 3.5L32 61l-2.4-5.5L32 52z" fill="#F97316" />
        {/* neck */}
        <rect x="28" y="40" width="8" height="9" rx="3.5" fill="#D9A177" />
        {/* face */}
        <ellipse cx="32" cy="30" rx="11.5" ry="12" fill="#E8B48C" />
        {/* ears */}
        <circle cx="20.8" cy="31" r="2.2" fill="#E8B48C" />
        <circle cx="43.2" cy="31" r="2.2" fill="#E8B48C" />
        {/* short hair */}
        <path d="M20.5 28.5c-.5-8.5 4.5-14 11.5-14s12 5.5 11.5 14c-1.2-5-5-7.5-11.5-7.5s-10.3 2.5-11.5 7.5z" fill="#26150B" />
        {/* eyebrows */}
        <path d="M25 26.8h4.5M34.5 26.8H39" stroke="#26150B" strokeWidth="1.4" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="27.5" cy="30" r="1.7" fill="#1F2937" />
        <circle cx="36.5" cy="30" r="1.7" fill="#1F2937" />
        {/* smile */}
        <path d="M28 36.5c1.3 1.7 2.9 2.5 4 2.5s2.7-.8 4-2.5" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* light beard */}
        <path d="M23.5 35c1 4.5 4 7 8.5 7s7.5-2.5 8.5-7c-.5 6-3.5 9.5-8.5 9.5S24 41 23.5 35z" fill="#26150B" opacity="0.25" />
      </g>
    </svg>
  );
}

const founders = [
  { name: "Suzana Dias", linkedin: "https://www.linkedin.com/in/suzana-dias-731a3667/", Avatar: AvatarSuzana },
  { name: "Victor Sousa", linkedin: "https://www.linkedin.com/in/victor-sousa/", Avatar: AvatarVictor },
];

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

          {/* Right: founders + cards */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            {/* Founders */}
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {founders.map(({ name, linkedin, Avatar }, i) => (
                <div key={name} className={`p-5 border rounded-2xl transition-all hover:shadow-md ${
                  dark
                    ? "border-blue-900/40 bg-[#121F35] hover:border-blue-500/30"
                    : "border-slate-200 bg-[#F8FAFC] hover:border-blue-200 hover:bg-white"
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <Avatar className="w-16 h-16" />
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${name}`}
                      className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                        dark ? "text-blue-300 hover:bg-blue-500/10" : "text-[#1E40AF] hover:bg-blue-50"
                      }`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <h3 className={`font-heading font-bold text-base ${dark ? "text-white" : "text-[#0F172A]"}`}>{name}</h3>
                  <p className={`text-xs font-semibold mt-0.5 mb-2 ${dark ? "text-orange-400" : "text-[#F97316]"}`}>{tr.teamRoles[i]}</p>
                  <p className={`text-xs leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.teamBios[i]}</p>
                </div>
              ))}
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

            {/* Certificate badge */}
            <a
              href={CERT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 flex items-start gap-3 p-4 border rounded-2xl transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                dark
                  ? "border-orange-500/30 bg-orange-500/5 hover:border-orange-400/50"
                  : "border-orange-200 bg-orange-50/60 hover:border-orange-300 hover:bg-orange-50"
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${dark ? "bg-orange-500/15" : "bg-orange-100"}`}>
                <Award className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
              </div>
              <div>
                <h3 className={`font-heading font-bold text-sm ${dark ? "text-white" : "text-[#0F172A]"}`}>{tr.certTitle}</h3>
                <p className={`text-xs leading-relaxed mt-0.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{tr.certText}</p>
                <span className={`text-xs font-semibold mt-1.5 inline-block ${dark ? "text-orange-400" : "text-[#F97316]"}`}>{tr.certLink}</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
