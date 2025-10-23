"use client";

import Image from "next/image";
import Link from "next/link";


export default function Header({setOpen, open, user, token, handleLogout}) {


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Org Name */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Dev Setu Logo"
            className="h-10 w-10 object-contain"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-indigo-600">
            Dev<span className="text-gray-800">Setu</span>
          </span>
        </div>

        {/* Login or User Dropdown */}
        {!token ? (
          <Link
            href="/admin/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            {/* Username Button */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition cursor-pointer"
            >
              <span>{user?.name || "User"}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-1 w-25 bg-white-600 text-black border rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 text-black-600 cursor-pointer hover:bg-gray-300 rounded-lg w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
