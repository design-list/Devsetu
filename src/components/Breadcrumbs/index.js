"use client";

import Link from "next/link";
import { useLang } from "@/app/langProviders";

const Breadcrumbs = ({ pathname }) => {
  const { lang } = useLang();

  const segments = pathname.split("/").filter(Boolean);

  const filtered = segments.slice(1);

  const crumbs = filtered.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 2).join("/");

    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { href, label };
  });

  return (
    <nav className="flex space-x-2 text-gray-600 text-sm">
      <Link href={`/${lang}`} className="hover:underline">
        {lang === "en" ? "Home" : "होम"}
      </Link>

      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center space-x-2">
          <span>/</span>
          {i === crumbs.length - 1 ? (
            <span className="font-semibold">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
