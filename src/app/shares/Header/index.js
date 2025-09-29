"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menu = [ 
        {id : 1, title: "Home", path : "/"},
        {id : 2, title: "Puja", path : "/puja"},
        {id : 3, title: "Chadhava", path : "/chadhava"},
        {id : 4, title: "VIP Puja", path : "/vip-puja"},
        {id : 5, title: "Seva", path : "/seva"},
        {id : 6, title: "About Us", path : "/about-us"},
        {id : 7, title: "Contect Us", path : "/contect-us"}
    ]

const Header = () => {
  const [language, setLanguage] = useState("English");  
  
  const pathname = usePathname();

  return (
    <header className="w-full bg-saffron shadow-sm sticky top-0 z-50" style={{ backgroundColor: "#ff861cff" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6">
        
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png" // replace with your logo path
            alt="Dev Setu"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-semibold text-brown-800">Dev Setu</span>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-6">
          {menu.map(({id, title, path}) => (
            <Link key={id} href={path}
              className={`${ pathname === path ? "text-white-600 font-semibold" : "text-black" } hover:text-orange-600 transition`}
            >
              {title}
            </Link>
          ))}
        </nav>

        {/* Right: Language + User */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition">
            {language}
            <ChevronDown size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-gray-100 transition">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;