"use client";

import { useState, useEffect } from "react";
import Api from "../../../../services/fetchApi";
const api = new Api();

const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function HoroscopeForm() {
  const [formData, setFormData] = useState({
    zodiac_sign: "",
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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.AddNewHoroscope(formData);
      if (res.status === 200) {
        alert("Horoscope added successfully!");
        setFormData({
          zodiac_sign: "",
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
        });
      } else {
        alert(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Add Horoscope Details
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium">Zodiac Sign *</label>
            <input
              type="text"
              name="zodiac_sign"
              value={formData.zodiac_sign}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Date Range</label>
            <input
              type="text"
              name="date_range"
              value={formData.date_range}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Element</label>
            <input
              type="text"
              name="element"
              value={formData.element}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Ruling Planet</label>
            <input
              type="text"
              name="ruling_planet"
              value={formData.ruling_planet}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="e.g. ♉"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium">Personality Snapshot</label>
            <textarea
              name="personality_snapshot"
              value={formData.personality_snapshot}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Strengths</label>
            <textarea
              name="strengths"
              value={formData.strengths}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Challenges</label>
            <textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Love & Relationships</label>
            <textarea
              name="love_relationships"
              value={formData.love_relationships}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Career & Money</label>
            <textarea
              name="career_money"
              value={formData.career_money}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Health & Wellness</label>
            <textarea
              name="health_wellness"
              value={formData.health_wellness}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Growth Tips</label>
            <textarea
              name="growth_tips"
              value={formData.growth_tips}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Fun Fact</label>
            <textarea
              name="fun_fact"
              value={formData.fun_fact}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Submit Horoscope"}
        </button>
      </form>
    </div>
  );
}
