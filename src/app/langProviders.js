// src/app/providers.js

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { translateText } from "../../helper/translate";

const LangContext = createContext(null);

const cache = {};

export function LangProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const initialLang = pathname?.split("/")[1] || "en";
  const [lang, setLangState] = useState(initialLang);

  async function t(text) {
    if (lang === "en") return text;

    if (staticTranslations[lang]?.[text]) {
      return staticTranslations[lang][text];
    }

    const key = `${lang}:${text}`;
    if (cache[key]) return cache[key];

    try {
      const translated = await translateText(text, lang);
      cache[key] = translated;
      return translated;
    } catch (err) {
      console.error("Translation error:", err);
      return text;
    }
  }

  function setLang(newLang) {
    setLangState(newLang);
    // ✅ Next.js will handle the routing for locales
    router.push(pathname, { locale: newLang });
  }

  useEffect(() => {
    const current = pathname?.split("/")[1];
    if (["en", "hi"].includes(current)) {
      setLangState(current);
    }
  }, [pathname]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}