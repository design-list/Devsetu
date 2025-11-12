"use client";

import { useEffect, useState } from "react";
import Api from "../../../../services/fetchApi";
const api = new Api();

const HeroBannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: "",
    mobileImageUrl: "",
    type: "",
    slug: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch All Banners
  const fetchBanners = async () => {
    try {
      const res = await api.GetAllHerobanner();
      if (res?.data) {
        setBanners(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🔹 Handle Input & File Change
  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    // ✅ File Upload Handling
    if (files && files[0]) {
      const file = files[0];
      const localPreview = URL.createObjectURL(file);

      // Set local preview
      setFormData((prev) => ({
        ...prev,
        [name]: localPreview,
      }));

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const data = await res.json();

        if (!data.success || data?.status !== 200) {
          alert("Upload failed: " + (data?.error || "Unknown error"));
          return;
        }

        const uploadedUrl = data.url.toString();

        // Replace preview with uploaded URL
        setFormData((prev) => ({
          ...prev,
          [name]: uploadedUrl,
        }));
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error while uploading file");
      }
      return;
    }

    // ✅ Normal input change
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Add or Update Banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const data = {
            ...formData,
            id: editingId
        }
        const res = await api.UpdeteHerobanner(data);
        if(res.status === 200){
            fetchBanners();
        }
      } else {
        await api.AddHerobanner(formData);
      }

      await fetchBanners();
      setFormData({ imageUrl: "", mobileImageUrl: "", type: "", slug: "" });
      setEditingId(null);
    } catch (error) {
      console.error("❌ Error saving banner:", error);
      alert("Error saving banner");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Edit Banner
  const handleEdit = async (banner) => {
    try {
      const res = await api.GetHerobannerById(banner.id);
      if (res?.data) {
        setFormData({
          imageUrl: res.data.imageUrl || "",
          mobileImageUrl: res.data.mobileImageUrl || "",
          type: res.data.type || "",
          slug: res.data.slug || "",
        });
        setEditingId(banner.id);
      }
    } catch (error) {
      console.error("❌ Error fetching banner:", error);
    }
  };

  // 🔹 Delete Banner
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      await api.DeleteHerobanner(id);
      fetchBanners();
    } catch (error) {
      console.error("❌ Failed to delete banner:", error);
      alert("Failed to delete banner");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🖼️ Hero Banner Management
      </h1>

      {/* 🔸 Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl shadow mb-6 border"
      >
        <h2 className="text-lg font-semibold mb-3">
          {editingId ? "✏️ Edit Banner" : "➕ Add New Banner"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image Upload Inputs */}
          <div>
            <label className="block mb-1 text-sm font-medium">Desktop Image</label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="preview"
                className="mt-2 w-50 h-25 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Mobile Image</label>
            <input
              type="file"
              name="mobileImageUrl"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {formData.mobileImageUrl && (
              <img
                src={formData.mobileImageUrl}
                alt="preview"
                className="mt-2 w-20 h-30 object-cover rounded"
              />
            )}
          </div>

          {/* Text Inputs */}
         <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
        >
            <option value="">Select Type</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
        </select>
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Banner"
              : "Add Banner"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  imageUrl: "",
                  mobileImageUrl: "",
                  type: "",
                  slug: "",
                });
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 🔸 Banner List */}
      <div className="bg-white rounded-2xl shadow p-4 border">
        <h2 className="text-lg font-semibold mb-3">📋 Banner List</h2>
        {banners.length === 0 ? (
          <p className="text-gray-500">No banners found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Mobile</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Slug</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-2">{b.id}</td>
                  <td className="p-2">
                    <img
                      src={b.imageUrl}
                      alt=""
                      className="w-50 h-25 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">
                    <img
                      src={b.mobileImageUrl}
                      alt=""
                      className="w-20 h-30 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{b.type}</td>
                  <td className="p-2">{b.slug}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HeroBannerAdmin;
