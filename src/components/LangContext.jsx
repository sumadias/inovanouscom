import React, { createContext, useContext, useState } from "react";
import { getLang, setLang as saveLang } from "@/components/i18n";

const LangContext = createContext({ lang: "pt", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getLang());

  const setLang = (l) => {
    saveLang(l);
    setLangState(l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);