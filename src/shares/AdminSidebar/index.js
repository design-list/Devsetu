"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen, List, Gift } from "lucide-react"; // icons

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
                href="/admin/puja"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <BookOpen size={18} />
                {open && <span>Puja</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/puja/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <List size={18} />
                {open && <span>Puja List</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/chadhava"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Gift size={18} />
                {open && <span>Chadhava</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/chadhava/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <List size={18} />
                {open && <span>Chadhava List</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Gift size={18} />
                {open && <span>Articles</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <List size={18} />
                {open && <span>Articles List</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/testimonials"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <Gift size={18} />
                {open && <span>Testimonials</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/testimonials/list"
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                <List size={18} />
                {open && <span>Testimonials List</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;