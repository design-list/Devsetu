"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";
import Link from "next/link";
const api = new Api();

const UpdateChalisa = () => {
  
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    icon: null,
    title: "",
    slug: "",
    aboutArticle: "",
    openingDoha : "",
    closeDoha : "",
    chaupai: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Slug generate on title change
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

  // ✅ Fetch existing Aarti data
  useEffect(() => {
    if (!id) return;
    const fetchAarti = async () => {
      try {
        setLoading(true);
        api.GetChalisaById(id)
        .then((res) => {
          const data = res.data;
        if (res.status === 200) {
          setFormData({
            icon: data.icon,
            title: data.title,
            slug: data.title ? slugify(data.title) : "",
            aboutArticle: data.aboutArticle,
            openingDoha: data.openingDoha,
            chaupai: data.chaupai,
            closeDoha: data.closeDoha,
          });
        } else {
          alert("Failed to load Aarti details.");
        }
        })
      } catch (err) {
        console.error("Error fetching Aarti:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAarti();
  }, [id]);

  // ✅ Handle input & file change
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payloads = {
        id,
        ...formData,
      };

      api.UpdeteChalisa(payloads)

      .then((res) => {
        if (res.status === 200) {
          alert("Chalisa updated successfully!");
          router.push("/admin/chalisa/list");
        } else {
          alert(data.message || "Something went wrong!");
        }
      });
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error updating Chalisa");
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
        <h2 className="text-xl font-semibold mb-4">Update Chalisa</h2>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Chalisa Image</label>
          {formData.icon ? (
            <div className="relative w-32 h-32">
              <img
                src={formData.icon}
                alt="Chalisa Icon"
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
            placeholder="Enter Chalisa Title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* About Article */}
        <div>
          <label className="block font-medium mb-1">About Chalisa</label>
          <textarea
            name="aboutArticle"
            value={formData.aboutArticle}
            onChange={handleChange}
            placeholder="Short description about the Chalisa"
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        {/* Opening Doha */}
        <div>
          <label className="block font-medium mb-1">Opening Doha</label>
          <textarea
            name="openingDoha"
            value={formData.openingDoha}
            onChange={handleChange}
            placeholder="Write full opening doha text here..."
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        {/* Chalisas Text */}
        <div>
          <label className="block font-medium mb-1">Chaupai</label>
          <textarea
            name="chaupai"
            value={formData.chaupai}
            onChange={handleChange}
            placeholder="Write full chaupai text here..."
            className="w-full border p-2 rounded"
            rows={8}
          />
        </div>

        {/* Closing Doha */}
        <div>
          <label className="block font-medium mb-1">Closing Doha</label>
          <textarea
            name="closeDoha"
            value={formData.closeDoha}
            onChange={handleChange}
            placeholder="Write full closing doha text here..."
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        {/* Submit */}
        <Link
          type="button"
          className={`bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer`}
          href={("/admin/chalisa/list")}
        >
          Canlel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer ${
            loading ? "opacity-70" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Chalisa"}
        </button>
      </form>
    </div>
  );
};

export default UpdateChalisa;