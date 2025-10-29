"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";

const api = new Api();
const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UpdateMantraForm() {
  const { id } = useParams();
  const router = useRouter();

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

  // ✅ Auto slugify title
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }, [formData?.title]);

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  // ✅ Fetch existing Mantra data
  useEffect(() => {
    if (!id) return;
    const fetchMantra = async () => {
      try {
        setLoading(true);
        const res = await api.GetMantrasById(id);
        if (res.status === 200) {
          const data = res.data;
          setFormData({
            icon: data.icon,
            lordName: data.lordName,
            title: data.title,
            slug: data.title ? slugify(data.title) : "",
            introduction: data.introduction,
            significance: data.significance,
            mantrasList: data.mantrasList?.length
              ? data.mantrasList
              : [{ mantraTitle: "", mantraText: "", meaning: "" }],
          });
        } else {
          alert("Failed to load mantra details.");
        }
      } catch (err) {
        console.error("Error fetching mantra:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMantra();
  }, [id]);

  // ✅ Handle input and file upload
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const localPreview = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, icon: localPreview }));

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        const res = await fetch(`${baseAPIURL}/uploads`, {
          method: "POST",
          body: uploadFormData,
        });
        const data = await res.json();
        if (res.ok) {
          setFormData((prev) => ({
            ...prev,
            icon: data.storedAs.toString(),
          }));
        } else {
          alert("Upload failed: " + data.error);
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error while uploading image");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Mantra list update logic
  const handleAddMantra = () => {
    setFormData((prev) => ({
      ...prev,
      mantrasList: [
        ...prev.mantrasList,
        { mantraTitle: "", mantraText: "", meaning: "" },
      ],
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
      const payload = { id, ...formData };
      const res = await api.UpdeteMantras(payload);
      if (res.status === 200) {
        alert("🕉️ Mantra updated successfully!");
        router.push("/admin/mantras/list");
      } else {
        alert(res.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error updating mantra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow-md rounded-xl p-6 w-6xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Update Mantra</h2>

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
        {loading ? "Updating..." : "Update Mantra"}
      </button>
    </form>
  );
}
