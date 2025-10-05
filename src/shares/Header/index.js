// src/app/shares/Header/index.js

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/app/langProviders";


const menu = [
  { id: 1, title: { en: "Home", hi: "होम" }, path: "/" },
  { id: 2, title: { en: "Puja", hi: "पूजा" }, path: "/puja" },
  { id: 3, title: { en: "Chadhava", hi: "चढ़ावा" }, path: "/chadhava" },
  { id: 4, title: { en: "Library", hi: "पुस्तकालय" }, path: "/library" },
  { id: 7, title: { en: "About Us", hi: "हमारे बारे में" }, path: "/about-us" },
];



const language = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

const Header = () => {
  const { lang, setLang } = useLang();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // prefix all menu paths with lang
  const withLang = (path) => `/${lang}${path}`;

  const normalize = (path) => {
    if (lang === "en") {
      // strip "/en" since Next.js hides it for default locale
      return path.replace(/^\/en/, "") || "/";
    }
    return path;
  };

    // ✅ language change handler
  const handleLanguageChange = (code) => {
    setLang(code);
    setDropdownOpen(false);

    // strip existing lang from current path
    let newPath = pathname.replace(/^\/(en|hi)/, "");

    // always add lang prefix
    router.push(`/${code}${newPath || ""}`);
  };


  return (
    <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <Link href={withLang("/")}>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/logo.jpg"
              alt="Dev Setu"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-semibold text-brown-800">Dev Setu</span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6">
          {menu.map(({ id, title, path }) => {
            const link = withLang(path);
            const active = normalize(pathname) === path;

            return (
              <Link
                key={id}
                href={link}
                className={`${
                  active
                    ? "text-[var(--secondary)]"
                    : "text-[var(--primary)] font-semibold"
                } hover:text-[var(--secondary)] font-medium transition`}
              >
                {title[lang]}
              </Link>
            );
          })}
        </nav>


        {/* Language & User */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition"
            >
              {lang === "en" ? "English" : "हिंदी"}
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-50">
                {language.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-gray-100 transition">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;