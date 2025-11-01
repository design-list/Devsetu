import "./globals.css";
// import { Philosopher } from "next/font/google";
// import localFont from "next/font/local";

// const philosopherFont = Philosopher({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "700"],
//   variable: "--font-philosopher",
// });

// const proximanovaFont = localFont({
//   src: [
//     {
//       path: "../../public/fonts/proximanova_regular.woff2", 
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/proximanova_bold.woff2", 
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-proximanova",
//   display: "swap",
// });

// export const metadata = {
//   title: "DevaSetu",
//   description: "DevaSetu",
//   icons: {
//     icon: [
//       { url: "../../public/icons/devsetu-logo-icon.ico" },
//       { url: "../../public/icons/devsetu-logo-icon.ico", type: "image/png", sizes: "32x32" },
//       { url: "../../public/icons/devsetu-logo-icon.ico", sizes: "180x180" },
//     ],
//   },
// };

export default function RootLayout({ children }) {
  return (
      <>
        {children}
      </>
  );
}
