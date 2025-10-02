"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Org Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // 🔹 place your logo in public/logo.png
            alt="Dev Setu Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-indigo-600">
            Dev<span className="text-gray-800">Setu</span>
          </span>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
