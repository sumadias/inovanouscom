import React from "react";
import Hero from "@/components/home/Hero";
import QuemSomos from "@/components/home/QuemSomos";
import OQueFazemos from "@/components/home/OQueFazemos";
import Diferenciais from "@/components/home/Diferenciais";
import ImpactoSocial from "@/components/home/ImpactoSocial";
import CallToAction from "@/components/home/CallToAction";
import useSEO from "@/components/useSEO";
import { useLang } from "@/components/LangContext";

export default function Home() {
  const { lang } = useLang();
  useSEO({
    title: lang === "en" ? "Innovation & Technology" : lang === "es" ? "Innovación & Tecnología" : "Inovação e Tecnologia",
    description: lang === "en"
      ? "We Transform AI, Technology and Gamification into Sustainable Social Impact. Digital solutions for governments, companies and the third sector."
      : lang === "es"
      ? "Transformamos IA, Tecnología y Gamificación en Impacto Social Sostenible. Soluciones digitales para gobiernos, empresas y el tercer sector."
      : "Transformamos IA, Tecnologia e Gamificação em Impacto Social Sustentável. Soluções digitais para governos, empresas e o terceiro setor.",
    lang,
  });

  return (
    <div className="bg-[#0a0a0a]">
      <Hero />
      <QuemSomos />
      <OQueFazemos />
      <ImpactoSocial />
      <Diferenciais />
      <CallToAction />
    </div>
  );
}