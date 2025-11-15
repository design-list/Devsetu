"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, User, Mail, Phone, MessageCircle, Flame, BookOpen, Home, FileText, X, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/app/langProviders";
import Logo from "../../../public/icons/devasetu-logo_vertical.svg";
import Container from "@/components/Container";
import GoogleTranslate from "@/components/GoogleTranslate";
import { capitalizeWords, loadState } from "../../../utils/localstorage";
import Api from "../../../services/fetchApi";
// import { useWithLang } from "../../../helper/useWithLang";

      const api = new Api();

const menu = [
  { id: 1, title: { en: "Home", hi: "होम" }, path: "/" },
  { id: 2, title: { en: "Puja", hi: "पूजा" }, path: "/puja" },
  { id: 3, title: { en: "Chadhava", hi: "चढ़ावा" }, path: "/chadhava" },
  { id: 7, title: { en: "About Us", hi: "हमारे बारे में" }, path: "/about-us" },
];

const Header = () => {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [loginUser, setLoginUser] = useState(null)
  const menuRef = useRef(null);

  const phone = loadState("phone");
  const token = loadState("token");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {


    if (phone && token) {
      triggerUserApi(phone);
    } 
  }, []);

  const triggerUserApi = async (phone) => {
    try {
      const res = await api.Userdetail({ phone });
      if(res.status === 200){
        setLoginUser(res.data)
      }
    } catch (err) {
      console.error("❌ API Error:", err);
    }
  };

  const withLang = (path) => `/${lang}${path}`;
  const normalize = (path) =>
    lang === "en" ? path.replace(/^\/en/, "") || "/" : path;

  const handleLangChange = (code) => {
    setLang(code);
    let newPath = pathname.replace(/^\/(en|hi)/, "");
    router.push(`/${code}${newPath || ""}`);
  };

  // const withLang = useWithLang();

  const handleRedirect = () => {
    setMenuOpen(false)
    router.push(withLang("/login"));
  };

  const handleLogout = () => {
    setMenuOpen(false)
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
  };


  return (
    <header className="w-full shadow-sm sticky top-0 z-50 bg-white">
      <Container>
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href={withLang("/")}>
            <Image src={Logo} alt="Dev Setu" width={180} height={80} className="w-[150px] md:w-[180px]" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            {menu.map(({ id, title, path }) => {
              const link = withLang(path);
              const active = normalize(pathname) === path;
              return (
                <Link
                  key={id}
                  href={link}
                  className={`font-secondary text-lg font-bold transition ${
                    active
                      ? "text-[var(--color-primary-light)]"
                      : "text-[var(--color-dark)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {title[lang]}
                </Link>
              );
            })}

            {/* <GoogleTranslate /> */}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-[var(--color-primary-light)] transition cursor-pointer"
              >
                {loginUser ? <span>{capitalizeWords(loginUser?.name)}</span> : <User size={20} />}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">
                  {/* Top CTA */}
                  <div className="p-5 border-b">
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      To check all available pujas & offers:
                    </p>
                   { !phone ? <button onClick={handleRedirect} className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition cursor-pointer">
                      Login / Create an account
                    </button>
                      : 
                    <button onClick={handleLogout} className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition cursor-pointer">
                      Logout
                    </button>
                    }
                  </div>

                  {/* Account Details */}
                  <div className="p-4 border-b">
                    <p className="text-sm text-gray-500 font-semibold mb-3">Account Details</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 cursor-pointer">
                        <Link onClick={() => setMenuOpen(false)} href={withLang("/user/profile")} className="flex items-center gap-2 text-gray-700"><User size={16} /> My Profile</Link>
                      </li>
                      <li className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 cursor-pointer">
                        <Link onClick={() => setMenuOpen(false)} href={withLang("/user/orders")} className="flex items-center gap-2 text-gray-700"><FileText size={16} /> My Orders</Link>
                      </li>
                    </ul>
                  </div>

                  {/* Support */}
                  <div className="p-4">
                    <p className="text-sm text-gray-500 font-semibold mb-3">Help & Support for Puja Booking</p>
                    <div className="bg-gray-50 border rounded-lg p-3 mb-3 flex items-center gap-3">
                      <Phone size={18} className="text-[var(--color-primary)]" />
                      <div>
                        <Link href={'tel:7877961501'} className="text-sm font-semibold text-gray-700">+9178-779-61501</Link>
                        <p className="text-xs text-gray-500">10:30 AM - 7:30 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={'mailto:customerservices.devasetu@gmail.com'} className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition">
                        <Mail size={16} className="text-[var(--color-primary)]" /> Email Us
                      </Link>
                      <Link href={'https://wa.me/7877961501'} className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition">
                        <MessageCircle size={16} className="text-green-600" /> WhatsApp
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <GoogleTranslate />
            {/* Mobile Hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border rounded-full hover:bg-[var(--color-primary-light)] transition"
              onClick={() => setMobileNav(!mobileNav)}
            >
              {mobileNav ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileNav && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <nav className="flex flex-col gap-4 p-4">
            {menu.map(({ id, title, path }) => {
              const link = withLang(path);
              const active = normalize(pathname) === path;
              return (
                <Link
                  key={id}
                  href={link}
                  className={`text-base font-semibold transition ${
                    active
                      ? "text-[var(--color-primary-light)]"
                      : "text-gray-800 hover:text-[var(--color-primary)]"
                  }`}
                  onClick={() => setMobileNav(false)}
                >
                  {title[lang]}
                </Link>
              );
            })}

            {phone &&  
              <div className="p-4 border-b">
                <p className="text-sm text-gray-500 font-semibold mb-3">Account Details</p>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 cursor-pointer">
                    <Link onClick={() => setMobileNav(false)} href={withLang("/user/profile")} className="flex items-center gap-2 text-gray-700"><User size={16} /> My Profile</Link>
                  </li>
                  <li className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 cursor-pointer">
                    <Link onClick={() => setMobileNav(false)} href={withLang("/user/orders")} className="flex items-center gap-2 text-gray-700"><FileText size={16} /> My Orders</Link>
                  </li>
                </ul>
              </div>}

            {!phone ?  <button onClick={handleRedirect} className="mt-3 w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition">
              Login / Create an account
            </button> :
            <button className="mt-3 w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition">
              Logout
            </button>}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
