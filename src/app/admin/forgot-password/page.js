"use client";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message || "Password reset link sent!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full border p-2 rounded-md" required />
        <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-700">Send Reset Link</button>
      </form>
    </div>
  );
}
