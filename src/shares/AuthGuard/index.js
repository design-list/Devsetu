//src/shares/AuthGuard/index.js

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadState } from "../../../utils/localstorage";

export default function AuthGuard({ children, token }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = loadState("token");
    if (!token) {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [router, token]);

  if (loading) {
    return (
      <div className="">
        Checking authentication...
      </div>
    );
  }

  return children;
}
