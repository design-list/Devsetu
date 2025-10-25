// src/app/shares/Header/index.js

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/app/langProviders";

import Logo from '../../../public/icons/devsetu-horizontal.svg';
import Container from "@/components/Container";

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
    <Container>
      <div className="flex items-center justify-between py-4 fon">
        
        {/* Logo */}
        <Link href={withLang("/")}>
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Dev Setu"
              width={80}
              height={80}
            />
          </div>
        </Link>

        <nav className="hidden font-primary md:flex gap-6 font-secondary">
          {menu.map(({ id, title, path }) => {
            const link = withLang(path);
            const active = normalize(pathname) === path;

            return (
              <Link
                key={id}
                href={link}
                className={`${
                  active 
                    ? "text-[var(--color-primary-light)]"
                    : "text-black"
                } font-bold hover:text-[var(--secondary)] transition`}
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
              className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm hover:bg-[var(--color-primary-light)] transition"
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
                    className="w-full text-left px-4 py-2 hover:bg-[var(--color-primary-light)] transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-[var(--color-primary-light)] transition">
            <User size={20} />
          </button>
        </div>
      </div>
      </Container>
    </header>
  );
};

export default Header;