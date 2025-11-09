"use client";

import { useState, useEffect } from "react";
import Api from "../../../../services/fetchApi";
import Link from "next/link";
const api = new Api();

const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AddMantraForm() {
  const [formData, setFormData] = useState({
    icon: null,
    lordName: "",
    title: "",
    slug: "",
    introduction: "",
    significance: "",
    mantrasList: [{ mantraTitle: "", mantraText: "", meaning: "" }],
  });
  const [loading, setLoading] = useState(false);

  // ✅ Slugify title automatically
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }, [formData?.title]);

  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  // ✅ Handle input change and file upload
  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    // 🖼 If file is selected
    if (files && files[0]) {
      const file = files[0];
      const localPreview = URL.createObjectURL(file);

      // 1️⃣ Show local preview immediately
      setFormData((prev) => ({
        ...prev,
        [name]: localPreview,
      }));

      // 2️⃣ Prepare file for upload
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const data = await res.json();

        // 3️⃣ Validate upload response
        if (!res.ok || !data?.url) {
          console.error("Upload failed:", data);
          alert("Upload failed: " + (data?.error || "Unknown error"));
          return;
        }

        // 4️⃣ Replace local preview with uploaded file URL
        setFormData((prev) => ({
          ...prev,
          [name]: data.url.toString(),
        }));
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error while uploading file");
      }

      return; // exit early after file handling
    }

    // ✏️ Handle text inputs
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Add or Remove mantra fields
  const handleAddMantra = () => {
    setFormData((prev) => ({
      ...prev,
      mantrasList: [...prev.mantrasList, { mantraTitle: "", mantraText: "", meaning: "" }],
    }));
  };

  const handleRemoveMantra = (index) => {
    const updated = formData.mantrasList.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, mantrasList: updated }));
  };

  const handleMantraChange = (index, e) => {
    const { name, value } = e.target;
    const updated = formData.mantrasList.map((m, i) =>
      i === index ? { ...m, [name]: value } : m
    );
    setFormData((prev) => ({ ...prev, mantrasList: updated }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await api.AddNewMantras(formData);

      if (res.status === 200) {
        alert("🕉️ Mantra added successfully!");
        setFormData({
          icon: null,
          lordName: "",
          title: "",
          slug: "",
          introduction: "",
          significance: "",
          mantrasList: [{ mantraTitle: "", mantraText: "", meaning: "" }],
        });
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting Mantra");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Form JSX
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow-md rounded-xl p-6 w-6xl mx-auto"
    >
      <div className="mb-4">
        <Link
          href="/admin/mantras/list"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-4 py-2 rounded-xl shadow hover:shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          ← Back
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Add New Mantra</h2>

      {/* Image Upload */}
      <div>
        <label className="block font-semibold mb-2">Image</label>
        <input type="file" name="icon" accept="image/*" onChange={handleChange} />
        {formData.icon && (
          <img
            src={formData.icon}
            alt="Preview"
            className="w-20 h-20 mt-2 rounded border object-cover"
          />
        )}
      </div>

      <div>
        <label className="block font-semibold mb-2">Lord Name</label>
        <input
          type="text"
          name="lordName"
          value={formData.lordName}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="border rounded p-2 w-full bg-gray-100"
          readOnly
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Introduction</label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows="3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Significance</label>
        <textarea
          name="significance"
          value={formData.significance}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows="3"
        />
      </div>

      {/* Mantra List */}
      <div>
        <label className="block font-semibold mb-3">Mantras</label>
        {formData.mantrasList.map((m, index) => (
          <div key={index} className="border p-3 mb-3 rounded-md relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="mantraTitle"
                value={m.mantraTitle}
                onChange={(e) => handleMantraChange(index, e)}
                placeholder="Mantra Title"
                className="border rounded p-2 w-full"
              />
              <textarea
                name="mantraText"
                value={m.mantraText}
                onChange={(e) => handleMantraChange(index, e)}
                placeholder="Mantra Text"
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <textarea
                name="meaning"
                value={m.meaning}
                onChange={(e) => handleMantraChange(index, e)}
                placeholder="Meaning"
                className="border rounded p-2 w-full"
              />
            </div>
            {formData.mantrasList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveMantra(index)}
                className="text-red-500 mt-2 text-sm underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMantra}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
        >
          + Add More Mantra
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Mantra"}
      </button>
    </form>
  );
}
