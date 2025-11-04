"use client";


// shares/AdminSidebar/index.js

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen, List, Gift, Flame, Leaf } from "lucide-react"; // icons

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-16"
        } h-screen bg-indigo-700 text-white flex flex-col transition-all duration-300 sticky top-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          <span className={`font-bold text-lg ${!open && "hidden"}`}>
            CMS Panel
          </span>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/puja/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Flame size={24} className="text-yellow-500" />
                {open && <span>All Pujas</span> }
              </Link>
            </li>
            
            <li>
              <Link
                href="/admin/chadhava/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Leaf size={24} className="text-yellow-500" />
                {open && <span>Chadhava List</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/aartis/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                🪔
                {open && <span>Aartis List</span>}
              </Link>
            </li>
            
            <li>
              <Link
                href="/admin/chalisa/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <BookOpen size={24} className="text-yellow-500" />
                {open && <span>Chalisa List</span>}
              </Link>
            </li>

            <li>
              <Link
                href="/admin/mantras/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <span className="text-yellow-500 text-large">🕉️</span>
                {open && <span>All  Mantras</span>}
              </Link>
            </li>
            
            <li>
              <Link
                href="/admin/horoscope/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <List size={24} />
                {open && <span>Horoscope List</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/faqs"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Gift size={24} />
                {open && <span>FAQs</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/puja-package"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Gift size={24} />
                {open && <span>Common Packages & Offerings</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/booking-details"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Gift size={24} />
                {open && <span>Booking Details</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;