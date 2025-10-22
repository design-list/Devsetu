"use client";

import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "../../redux";
import "react-datepicker/dist/react-datepicker.css";
import "../globals.css";
import Header from "@/shares/AdminHeader";
import Sidebar from "@/shares/AdminSidebar";
import AuthGuard from "@/shares/AuthGuard";
import { loadState } from "../../../utils/localstorage";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AdminLayoutContent({ children }) {
   const [open, setOpen] = useState(false);



  const token = loadState("token");
  const user = loadState("user");


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false)
    // router.push("/admin/login");
  };


  return (
    <AuthGuard token={token}>
      <Header handleLogout={handleLogout} open={open} setOpen={setOpen} user={user} token={token} />
      <div className="flex">
        {token && <Sidebar /> }
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}
