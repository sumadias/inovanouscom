import { useEffect } from "react";

export default function useSEO({ title, description, lang = "pt" }) {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | NOUS Inovação e Tecnologia` : "NOUS Inovação e Tecnologia";

    // Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description || "Transformamos IA, Tecnologia e Gamificação em Impacto Social Sustentável.");

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement("meta"); ogTitle.setAttribute("property", "og:title"); document.head.appendChild(ogTitle); }
    ogTitle.setAttribute("content", title || "NOUS Inovação e Tecnologia");

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) { ogDesc = document.createElement("meta"); ogDesc.setAttribute("property", "og:description"); document.head.appendChild(ogDesc); }
    ogDesc.setAttribute("content", description || "Transformamos IA, Tecnologia e Gamificação em Impacto Social Sustentável.");

    // OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) { ogType = document.createElement("meta"); ogType.setAttribute("property", "og:type"); document.head.appendChild(ogType); }
    ogType.setAttribute("content", "website");

    // Lang
    document.documentElement.setAttribute("lang", lang);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", window.location.href.split("?")[0]);
  }, [title, description, lang]);
}