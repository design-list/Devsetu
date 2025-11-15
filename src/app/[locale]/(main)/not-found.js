// File: app/not-found.jsx
// Next.js App Router custom 404 page (server component)

import Link from 'next/link';

export default function NotFound() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffaf5] via-[#fff6ee] to-[#fffaf2] p-6">
      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-orange-100 p-8 md:p-12 text-center">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d42f0e] via-[#f15822] to-[#f8b500]">
              404
            </h1>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold" style={{ color: '#1f2937' }}>
              Page not found
            </h2>

            {/*
              NOTE: Some runtime environments may attempt to process Tailwind classnames
              during render which can cause issues if Tailwind isn't available. To avoid
              runtime errors we use a safe inline style for this paragraph instead of
              relying on `text-slate-600` which was causing the crash reported by the user.
            */}
            <p className="mt-3 max-w-xl mx-auto" style={{ color: '#4b5563' }}>
              Oops — we can&apos;t find the page you&apos;re looking for. It may have been moved, renamed, or never existed.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/en" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-200 bg-gradient-to-r from-[#ffedd5] to-[#fff6ee] font-medium shadow-sm hover:shadow-md">
                ← Return to Home
              </Link>
            </div>
          </div>

          <div className="w-full md:w-72 flex-1">
            {/* Illustration (SVG) */}
            <div className="mx-auto w-full max-w-xs">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect width="400" height="300" rx="20" fill="url(#g)" />
                <g transform="translate(40,30)">
                  <circle cx="120" cy="90" r="60" fill="#fff" opacity="0.9" />
                  <path d="M30 200 C80 140, 160 140, 210 200" stroke="#f15822" strokeWidth="10" strokeLinecap="round" fill="none" />
                  <text x="40" y="60" fontSize="26" fontWeight="700" fill="#d42f0e">Devasetu</text>
                  <text x="40" y="90" fontSize="14" fill="#6b7280">Your dental &amp; oral care partner</text>
                </g>
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#fffaf5" />
                    <stop offset="1" stopColor="#fff6ee" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <p className="mt-4 text-sm text-center" style={{ color: '#6b7280' }}>
              If you arrived here from an external link, try visiting our <Link href="/en" style={{ color: '#f97316', textDecoration: 'underline' }}>home-page</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/*
How to use:
1. If your project uses the App Router (Next.js 13+ with /app), place this file at: app/not-found.jsx
   Next will automatically render it for 404 routes.

2. If your project uses the Pages Router (pages/), create pages/404.js with a similar component (export default function Page() {...})

3. Notes about the fix applied here:
   - The original crash was reported at a paragraph using the `text-slate-600` Tailwind class. Some environments fail when Tailwind classes are processed at runtime or when Tailwind isn't configured; that can cause unexpected null reads.
   - To make this component robust across environments, the paragraph now uses a safe inline `style` for color instead of relying on a Tailwind color class. Several other potentially problematic utility classes were replaced with inline styles where appropriate.
   - If you do use Tailwind in your project, you can revert these inline styles back to Tailwind classes after verifying Tailwind is correctly configured and the stylesheet is available to the server render.

4. Optional next steps I can help with:
   - Convert this to a `pages/404.js` version if you use the Pages Router.
   - Revert to Tailwind classes and help debug Tailwind configuration (postcss, tailwind.config.js, purge/content paths) so the crash doesn't happen.
   - Add analytics tracking for 404 pages or localized translations.
*/
