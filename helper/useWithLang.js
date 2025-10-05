"use client";

import { useLang } from "@/app/langProviders";


export function useWithLang() {
  const { lang } = useLang();

  function withLang(path) {
    if (!path) return "/";
    return `/${lang}${path.startsWith("/") ? path : "/" + path}`;
  }

  return withLang;
}
