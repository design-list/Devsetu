import "./globals.css";
import { Philosopher } from "next/font/google";
import localFont from "next/font/local";

const philosopherFont = Philosopher({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

// const proximanovaFont = localFont({
//   src: [
//     {
//       path: "../public/fonts/proximanova_regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/proximanova_bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-proximanova",
//   display: "swap",
// });

export const metadata = {
  title: "Main Site",
  description: "My App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${philosopherFont.variable}`}>{children}</body>
    </html>
  );
}
