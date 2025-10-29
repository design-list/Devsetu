"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const api = new Api();

export default function UpdateHoroscope() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    zodiac_sign: "",
    slug: "",
    zodiac_title: "",
    date_range: "",
    element: "",
    ruling_planet: "",
    symbol: "",
    personality_snapshot: "",
    strengths: "",
    challenges: "",
    love_relationships: "",
    career_money: "",
    health_wellness: "",
    growth_tips: "",
    fun_fact: "",
    icon: "",
    zodiac_about: "",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Slug auto generate
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.zodiac_sign),
    }));
  }, [formData?.zodiac_sign]);

  const slugify = (text) => {
    return text
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, "")
      ?.trim()
      ?.replace(/\s+/g, "-");
  };

  // 🔹 Fetch Horoscope by ID
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.GetHoroscopeById(id);
        if (res.status === 200 && res.data) {
          const data = res.data;

          setFormData({
            zodiac_sign: data.zodiac_sign || "",
            slug: data.slug || slugify(data.zodiac_sign),
            zodiac_title: data.zodiac_title || "",
            date_range: data.date_range || "",
            element: data.element || "",
            ruling_planet: data.ruling_planet || "",
            symbol: data.symbol || "",
            personality_snapshot: data.personality_snapshot || "",
            strengths: data.strengths || "",
            challenges: data.challenges || "",
            love_relationships: data.love_relationships || "",
            career_money: data.career_money || "",
            health_wellness: data.health_wellness || "",
            growth_tips: data.growth_tips || "",
            fun_fact: data.fun_fact || "",
            icon: data.icon || "",
            zodiac_about: data.zodiac_about || "",
          });
        } else {
          alert("Failed to load horoscope details.");
        }
      } catch (error) {
        console.error("Error fetching horoscope:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Date range picker
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const formatted = `${start.toLocaleString("default", {
        month: "short",
      })} ${start.getDate()} - ${end.toLocaleString("default", {
        month: "short",
      })} ${end.getDate()}`;
      setFormData({ ...formData, date_range: formatted });
    }
  };

  // 🔹 Submit (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { id, ...formData };
      const res = await api.UpdeteHoroscope(payload);
      if (res.status === 200) {
        alert("Horoscope updated successfully!");
        router.push("/admin/horoscope/list");
      } else {
        alert(res.message || "Update failed!");
      }
    } catch (err) {
      console.error("Error updating horoscope:", err);
      alert("Failed to update horoscope!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UI
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-3 mb-6">
        🔮 Update Horoscope
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="font-medium text-gray-700">Zodiac Sign</label>
            <input
              type="text"
              name="zodiac_sign"
              value={formData.zodiac_sign}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Slug: <span className="font-mono">{formData.slug}</span>
            </p>
          </div>

          <div>
            <label className="font-medium text-gray-700">Date Range</label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              isClearable
              placeholderText="Select date range"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            {formData.date_range && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {formData.date_range}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium text-gray-700">Element</label>
            <input
              type="text"
              name="element"
              value={formData.element}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Ruling Planet</label>
            <input
              type="text"
              name="ruling_planet"
              value={formData.ruling_planet}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="e.g. ♉"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        </div>

        {/* About Section */}
        <div>
          <label className="font-medium text-gray-700">About Zodiac</label>
          <textarea
            name="zodiac_about"
            value={formData.zodiac_about}
            onChange={handleChange}
            rows={3}
            placeholder="Write about this zodiac..."
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Detailed Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "personality_snapshot",
            "strengths",
            "challenges",
            "love_relationships",
            "career_money",
            "health_wellness",
            "growth_tips",
            "fun_fact",
          ].map((field) => (
            <div key={field}>
              <label className="font-medium text-gray-700 capitalize">
                {field.replace("_", " ")}
              </label>
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows="3"
                placeholder={`Enter ${field.replace("_", " ")}`}
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Horoscope"}
          </button>
        </div>
      </form>
    </div>
  );
}
