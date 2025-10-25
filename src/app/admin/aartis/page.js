"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import Api from "../../../../services/fetchApi";
const api = new Api();

const AartisForm = () => {
  const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState({
    icon: null,
    title: "",
    slug: "",
    aboutArticle: "",
    Aartis: "",
  });
  const [loading, setLoading] = useState(false);

useEffect(() => {
    setFormData((prev) => ({
    ...prev,
    slug: slugify(prev.title),
    }));
}, [formData?.title]);

const slugify = (text) => {
    return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

  // ✅ Handle input & file change
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const localPreview = URL.createObjectURL(file);

      // show preview first
      setFormData((prev) => ({ ...prev, icon: localPreview }));

      // upload to backend
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
            icon: data.storedAs.toString(), // file path from server
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

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.AddNewAartis(formData );

      console.log("Submit response:", res);

      if (res.status === 200) {
        alert("Aarti added successfully!");
        setFormData({
          icon: null,
          title: "",
          slug: "",
          aboutArticle: "",
          Aartis: "",
        });
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting Aarti");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      <form
        onSubmit={handleSubmit}
        className="mx-auto shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Image Upload */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Aarti Image</label>
          {formData.icon ? (
            <div className="relative w-32 h-32">
              <img
                src={formData.icon}
                alt="Aarti Icon"
                className="w-32 h-32 object-cover rounded border cursor-pointer"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, icon: null })}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleChange}
              className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2 cursor-pointer"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Aarti Title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            type="text"
            name="title"
            value={formData.slug}
            onChange={handleChange}
            disabled
            placeholder="Enter Aarti slug"
            className="w-full border p-2 rounded"
          />
        </div>
         

        {/* About Article */}
        <div>
          <label className="block font-medium mb-1">About Aarti</label>
          <textarea
            name="aboutArticle"
            value={formData.aboutArticle}
            onChange={handleChange}
            placeholder="Short description about the Aarti"
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        {/* Aartis Text */}
        <div>
          <label className="block font-medium mb-1">Aarti Content</label>
          <textarea
            name="Aartis"
            value={formData.Aartis}
            onChange={handleChange}
            placeholder="Write full Aarti text here..."
            className="w-full border p-2 rounded"
            rows={8}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer ${
            loading ? "opacity-70" : ""
          }`}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AartisForm;
