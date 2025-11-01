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
    <nav className="flex items-center space-x-2 text-[var(--color-dark)] text-xs md:text-sm font-secondary py-2 md:py-4">
      <Link href={`/${lang}`} className="hover:underline">
        {lang === "en" ? "Home" : "होम"}
      </Link>

      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center space-x-2">
          <span>/</span>
          {i === crumbs.length - 1 ? (
            <span className="font-semibold line-clamp-1">{crumb.label}</span>
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
