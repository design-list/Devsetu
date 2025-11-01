// src/app/(main)/layout.js

import { Philosopher } from "next/font/google";
import localFont from "next/font/local";
import "react-datepicker/dist/react-datepicker.css";
import Script from "next/script";
import ReduxProvider from "@/redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../globals.css";
import { LangProvider } from "../langProviders";
import Header from "@/shares/Header";
import Footer from "@/shares/Footer";

const philosopherFont = Philosopher({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

const proximanovaFont = localFont({
  src: [
    // {
    //   path: "../../../public/fonts/proximanova_regular.woff2", 
    //   weight: "400",
    //   style: "normal",
    // },
    {
      path: "../../../public/fonts/proximanova_bold.woff2", 
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-proximanova",
  display: "swap",
});

export const metadata = {
  title: "DevaSetu",
  description: "Your Spiritual Partner",
  icons: {
    icon: [
      { url: "../../public/icons/devsetu-logo-icon.ico" },
      { url: "../../public/icons/devsetu-logo-icon.ico", type: "image/png", sizes: "32x32" },
      { url: "../../public/icons/devsetu-logo-icon.ico", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({ children, mainClass }) {

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NDL5T2LK');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body className={`${philosopherFont.variable} ${proximanovaFont.variable}`}>
        {/* ✅ Razorpay Script load */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDL5T2LK"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>


        <ReduxProvider>
          <LangProvider>
            <Header />
              {children}
            <Footer />
          </LangProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
