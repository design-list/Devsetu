// app/admin/layout.js

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "../../redux";
import "react-datepicker/dist/react-datepicker.css";
import "../globals.css";
import Header from "@/shares/AdminHeader";
import Sidebar from "@/shares/AdminSidebar";
import AuthGuard from "@/shares/AuthGuard";
import { loadState } from "../../../utils/localstorage";
import { useEffect, useState } from "react";

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
  const [token, setToken] = useState(loadState("token"));
  const [user, setUser] = useState(loadState("user"));


  useEffect(() => {
    const handleAuthChange = () => {
      loadState("token");
      loadState("user");
    };

    // custom event listener
    window.addEventListener("authChange", handleAuthChange);

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setOpen(false);

    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <AuthGuard token={token}>
      <Header
        handleLogout={handleLogout}
        open={open}
        setOpen={setOpen}
        user={user}
        token={token}
      />
      <div className="flex">
        {token && <Sidebar />}
        <>{children}</>
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