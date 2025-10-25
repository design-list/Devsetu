"use client";
import { useState } from "react";

export default function UpdatePasswordForm() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token");
    const res = await fetch("/api/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "Password updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="password" name="oldPassword" onChange={handleChange} placeholder="Old Password" className="w-full border p-2 rounded-md" required />
        <input type="password" name="newPassword" onChange={handleChange} placeholder="New Password" className="w-full border p-2 rounded-md" required />
        <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm New Password" className="w-full border p-2 rounded-md" required />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Update</button>
      </form>
    </div>
  );
}
