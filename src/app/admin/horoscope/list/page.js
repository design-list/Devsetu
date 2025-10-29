"use client";

import { useEffect, useState } from "react";
import { X, Search, PlusCircle } from "lucide-react";
import Api from "../../../../../services/fetchApi";
import { useRouter } from "next/navigation";

const api = new Api();

export default function HoroscopeList() {
    const [horoscopes, setHoroscopes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null); // For modal
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // ✅ Fetch data using your API service
    useEffect(() => {
        setLoading(true);
        api.GetAllHoroscope()
            .then((res) => {
                if (res.status === 200) {
                    setHoroscopes(res.data);
                } else {
                    console.error("Failed to fetch horoscopes:", res.message);
                }
            })
            .catch((err) => console.error("Error:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleEdit = (id) => {
        router.push(`/admin/horoscope/${id}`);
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this horoscope?")) return;
        api.DeleteHoroscope(id).then((res) => {
            if (res.status === 200) {
                alert("horoscope deleted successfully!");
                fetchData();
            } else {
                alert(res.message || "Something went wrong!");
            }
        });
    };

    const handleAddNew = () => {
        router.push("/admin/horoscope");
    };

    if (loading)
        return <p className="text-center text-gray-500 mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                
                <h1 className="text-3xl font-bold text-gray-800">
                    🔮 Zodiac Horoscope
                </h1>
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        placeholder="Search by title or slug..."
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    <PlusCircle size={18} />
                    Add New
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {horoscopes?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md border rounded-2xl p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between"
                    >
                        {/* Header */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    {item.icon || "🌟"} {item.zodiac_sign}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {item.date_range}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Element:</strong> {item.element}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Ruling Planet:</strong> {item.ruling_planet}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>Symbol:</strong> {item.symbol}
                            </p>

                            <div className="border-t my-3"></div>

                            {/* Personality preview */}
                            <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                                {item.personality_snapshot}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                onClick={() => setSelected(item)}
                                className="text-blue-600 text-sm hover:underline font-medium"
                            >
                                Read More →
                            </button>
                            <p className="text-xs text-gray-400">
                                {new Date(item.createdAt).toLocaleDateString("en-IN")}
                            </p>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(item.id)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                            >
                                ✏️
                            </button>

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Read More */}

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                            onClick={() => setSelected(null)}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                            {selected.icon || "🔮"} {selected.zodiac_sign}
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">{selected.date_range}</p>

                        <div className="space-y-5 text-sm text-gray-800">
                            <p><strong>Element:</strong> {selected.element}</p>
                            <p><strong>Ruling Planet:</strong> {selected.ruling_planet}</p>
                            <p><strong>Symbol:</strong> {selected.symbol}</p>

                            <hr />
                            <p>{selected.zodiac_about}</p>
                            <hr />

                            {/* 🌟 Personality Snapshot */}
                            <div>
                                <h3 className="font-semibold text-lg mb-2">✨ Personality Snapshot</h3>
                                <ul className="list-disc ml-5 space-y-1">
                                    {selected.personality_snapshot
                                        ?.split("\n")
                                        .filter((line) => line.trim() !== "")
                                        .map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* 💪 Strengths & Challenges Side by Side */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    💪 Strengths & Challenges
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold flex items-center gap-1 mb-1">💎 Strengths</h4>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {selected.strengths
                                                ?.split("\n")
                                                .filter((line) => line.trim() !== "")
                                                .map((line, i) => (
                                                    <li key={i}>{line.trim()}</li>
                                                ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold flex items-center gap-1 mb-1">⚠️ Challenges</h4>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {selected.challenges
                                                ?.split("\n")
                                                .filter((line) => line.trim() !== "")
                                                .map((line, i) => (
                                                    <li key={i}>{line.trim()}</li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* ❤️ Love & Relationships */}
                            <div>
                                <h3 className="font-semibold text-lg mb-2">❤️ Love & Relationships</h3>
                                <ul className="list-disc ml-5 space-y-1">
                                    {selected.love_relationships
                                        ?.split("\n")
                                        .filter((line) => line.trim() !== "")
                                        .map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* 💼 Career & Money */}
                            <div>
                                <h3 className="font-semibold text-lg mb-2">💼 Career & Money</h3>
                                <ul className="list-disc ml-5 space-y-1">
                                    {selected.career_money
                                        ?.split("\n")
                                        .filter((line) => line.trim() !== "")
                                        .map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* 🧘‍♀️ Health & Wellness */}
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🧘‍♀️ Health & Wellness</h3>
                                <ul className="list-disc ml-5 space-y-1">
                                    {selected.health_wellness
                                        ?.split("\n")
                                        .filter((line) => line.trim() !== "")
                                        .map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* 🌱 Growth Tips */}
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🌱 Growth Tips</h3>
                                <ul className="list-disc ml-5 space-y-1">
                                    {selected.growth_tips
                                        ?.split("\n")
                                        .filter((line) => line.trim() !== "")
                                        .map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* 🎉 Fun Fact */}
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🎉 Fun Fact</h3>
                                <ul className="list-disc ml-5 space-y-1">
                                    {selected.fun_fact
                                        ?.split("\n")
                                        .filter((line) => line.trim() !== "")
                                        .map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
