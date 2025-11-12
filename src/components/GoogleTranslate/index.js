"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useLang } from "@/app/langProviders";
import { usePathname, useRouter } from "next/navigation";

export default function GoogleTranslate() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Hide Google Translate UI elements
  useEffect(() => {
    const hideUI = () => {
      document.querySelectorAll(
        ".goog-te-banner-frame, .goog-te-menu-frame, .goog-te-balloon-frame, .goog-logo-link, .skiptranslate, .goog-te-gadget"
      ).forEach((el) => {
        if (el?.style) {
          el.style.display = "none";
          el.style.visibility = "hidden";
        }
      });
      document.body.style.top = "0px";
    };

    const mo = new MutationObserver(hideUI);
    mo.observe(document.body, { childList: true, subtree: true });
    hideUI();
    const interval = setInterval(hideUI, 800);

    return () => {
      mo.disconnect();
      clearInterval(interval);
    };
  }, []);

  // ✅ Fully clear ALL googtrans cookies (all domain/path variants)
  const clearGoogleCookies = () => {
    const cookies = document.cookie.split(";");
    const cookieName = "googtrans";

    const hostParts = window.location.hostname.split(".");
    const domains = [];

    // generate all domain variants like example.com, .example.com, www.example.com
    for (let i = 0; i < hostParts.length - 1; i++) {
      const domain = hostParts.slice(i).join(".");
      domains.push(domain);
      domains.push(`.${domain}`);
    }

    const paths = ["/", "/en", "/hi", window.location.pathname];

    cookies.forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name === cookieName) {
        domains.forEach((domain) => {
          paths.forEach((path) => {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
          });
        });
        // also remove current domain without domain param
        paths.forEach((path) => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
        });
      }
    });
  };

  // ✅ Set googtrans cookie (after clearing old ones)
  const setGoogleCookie = (from, to) => {
    clearGoogleCookies();
    const cookieValue = `/${from}/${to}`;
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `googtrans=${cookieValue}; expires=${expires}; path=/; domain=${window.location.hostname};`;
  };

  // ✅ Translate apply helper
  const applyTranslate = (targetLang) => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return false;
    combo.value = targetLang === "en" ? "" : targetLang;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };

  const robustApply = (targetLang) => {
    let tries = 15;
    const tryApply = () => {
      if (applyTranslate(targetLang)) return;
      if (--tries > 0) setTimeout(tryApply, 400);
    };
    tryApply();
  };

  // ✅ Detect cookie and apply language
  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    };

    const googTransCookie = getCookie("googtrans");
    const pathLang = pathname.startsWith("/hi") ? "hi" : "en";

    if (googTransCookie && googTransCookie.includes("/en/hi")) {
      setLang("hi");
      robustApply("hi");
    } else {
      setLang("en");
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = "";
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      }

      // redirect to /en if current URL is /hi
      if (pathLang === "hi") {
        const newPath = pathname.replace(/^\/hi/, "/en");
        router.replace(newPath);
      }
    }
  }, [pathname]);

  // ✅ Handle language change from dropdown
  const handleLangChange = (newLang) => {
    if (newLang === "en") {
      clearGoogleCookies();
      setLang("en");
      const iframe = document.querySelector(".goog-te-banner-frame");
      if (iframe) iframe.remove();
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = "";
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      }
      setTimeout(() => window.location.reload(), 300);
      return;
    } else if (newLang === "hi") {
      const fromLang = pathname.startsWith("/hi") ? "hi" : "en";
      setGoogleCookie(fromLang, newLang);
      robustApply(newLang);
      setTimeout(() => window.location.reload(), 800);
    }

    const newPath = pathname.replace(/^\/(en|hi)/, "");
    router.push(`/${newLang}${newPath || ""}`);
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />

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
      </div>

      <Script
        id="google-trans"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="gt-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,hi',
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}
      </Script>

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
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf * {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        body {
          top: 0px !important;
        }
      `}</style>
    </>
  );
}
