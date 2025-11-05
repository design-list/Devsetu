"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/langProviders";
import { usePathname, useRouter } from "next/navigation";

/**
 * GoogleTranslate component:
 * - Sets googtrans cookie (source/target)
 * - Applies value to .goog-te-combo (with retries)
 * - Hides Google UI
 * - Keeps router/lang in sync
 */

export default function GoogleTranslate() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const retryRef = useRef(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Utility to set googtrans cookie properly
  const setGoogleCookie = (from, to) => {
    try {
      const cookieValue = `/${from}/${to}`;
      // Domain handling: skip `domain=` for localhost to avoid invalid cookie
      const host = window.location.hostname;
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      let cookieStr = `googtrans=${cookieValue};expires=${expires};path=/`;
      if (host !== "localhost" && host !== "127.0.0.1") {
        // Use top-level domain if possible
        cookieStr += `;domain=${host}`;
      }
      document.cookie = cookieStr;
      // Also set __utma? Not necessary. Some implementations set also googtrans on subdomain - but above usually OK.
    } catch (e) {
      // ignore
    }
  };

  // Hide all Google UI elements continuously
  useEffect(() => {
    const hideUI = () => {
      document.querySelectorAll(
        ".goog-te-banner-frame, .goog-te-menu-frame, .goog-te-balloon-frame, .goog-logo-link, .skiptranslate, .goog-te-gadget"
      ).forEach((el) => {
        try {
          el.style.display = "none";
          el.style.visibility = "hidden";
        } catch (e) {}
      });
      try {
        document.body.style.top = "0px";
      } catch (e) {}
    };

    hideUI();
    const mo = new MutationObserver(hideUI);
    mo.observe(document.body, { childList: true, subtree: true });
    const interval = setInterval(hideUI, 1000);

    return () => {
      mo.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Apply translate by setting combo value and dispatching events
  const applyTranslateToCombo = (targetLang) => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return false;

    // When target is English: clear translation by selecting empty or original value
    if (targetLang === "en") {
      // Some versions accept empty string to reset; others require setting to 'en'
      combo.value = ""; // try clearing first
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      combo.dispatchEvent(new Event("input", { bubbles: true }));
      // Also try explicit 'en'
      combo.value = "en";
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      combo.dispatchEvent(new Event("input", { bubbles: true }));
      combo.click && combo.click();
      return true;
    }

    // For non-English target
    combo.value = targetLang;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    combo.dispatchEvent(new Event("input", { bubbles: true }));
    combo.click && combo.click();
    return true;
  };

  // Robust routine: try immediately, then retry if not ready
  const robustApply = (targetLang) => {
    if (retryRef.current) {
      clearTimeout(retryRef.current);
      retryRef.current = null;
    }

    const attempt = (triesLeft = 12) => {
      const ok = applyTranslateToCombo(targetLang);
      if (ok) {
        setIsTranslating(false);
        return;
      }
      if (triesLeft <= 0) {
        setIsTranslating(false);
        return;
      }
      retryRef.current = setTimeout(() => attempt(triesLeft - 1), 300);
    };

    attempt();
  };

  // Public handler used by dropdown
  const handleLangChange = (newLang) => {
    if (newLang === lang) return;

    setIsTranslating(true);

    // set app lang & update URL
    setLang(newLang);
    const newPath = pathname.replace(/^\/(en|hi)/, "");
    router.push(`/${newLang}${newPath || ""}`);

    // Set google cookie for translation persistence:
    // We assume original page language is 'en' (source). Adjust if dynamic.
    if (newLang === "en") {
      // reset to english
      setGoogleCookie("en", "en");
    } else {
      setGoogleCookie("en", newLang);
    }

    // Try to apply immediately and with delays (DOM may re-render)
    robustApply(newLang);
    setTimeout(() => robustApply(newLang), 700);
    setTimeout(() => robustApply(newLang), 1600);
  };

  // Re-apply when route/lang changes (keeps translation persistent after rerenders)
  useEffect(() => {
    setIsTranslating(true);
    // ensure cookie matches current 'lang' state
    if (lang === "en") {
      setGoogleCookie("en", "en");
    } else {
      setGoogleCookie("en", lang);
    }
    robustApply(lang);
    // cleanup timer on unmount
    return () => {
      if (retryRef.current) {
        clearTimeout(retryRef.current);
        retryRef.current = null;
      }
    };
  }, [lang, pathname]);

  return (
    <>
      {/* Hidden container for Google's widget */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Visible custom dropdown */}
      <div className="flex items-center gap-2 relative">
        <select
          value={lang}
          onChange={(e) => handleLangChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 notranslate"
          translate="no"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>

        {/* {isTranslating && (
          <div className="absolute -bottom-6 left-0 text-xs text-gray-500 animate-pulse">
            Translating...
          </div>
        )} */}
      </div>

      {/* Google Translate scripts */}
      <Script
        id="google-trans"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="gt-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            try {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi',
                autoDisplay: false
              }, 'google_translate_element');
            } catch(e) {}
          }
        `}
      </Script>

      {/* Hide Google UI elements globally */}
      <style jsx global>{`
      .goog-te-banner-frame,
      .goog-te-menu-frame,
      .goog-te-balloon-frame,
      .goog-logo-link,
      .skiptranslate,
      .goog-te-gadget {
        display: none !important;
        visibility: hidden !important;
      }

      /* hide google loader/spinner */
      div[class*="VIpgJd-ZVi9od-aZ2wEe-wOHMyf"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }

      body {
        top: 0px !important;
      }
    `}</style>

    </>
  );
}
