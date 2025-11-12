"use client";

import React, { useEffect, useState } from "react";
import Api from "../../../../../services/fetchApi";
import LazyImage from "@/components/Atom/LazyImage";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, PlusCircle, BookOpen, Search } from "lucide-react";

const api = new Api();

const MantrasList = () => {
  const [mantras, setMantras] = useState([]);
  const [filteredMantras, setFilteredMantras] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // ✅ Fetch all mantras
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .GetAllMantras()
      .then((res) => {
        if (res.status === 200) {
          setMantras(res.data);
          setFilteredMantras(res.data);
        } else {
          alert(res.error || "Something went wrong while fetching mantras");
        }
      })
      .catch((err) => {
        console.error("Error fetching mantras:", err);
        alert("Error fetching mantras");
      });
  };

  // ✅ Search Filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMantras(mantras);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = mantras.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.slug?.toLowerCase().includes(query) ||
          item.lordName?.toLowerCase().includes(query)
      );
      setFilteredMantras(filtered);
    }
  }, [searchQuery, mantras]);

  // ✅ Handle edit
  const handleEdit = (id) => {
    router.push(`/admin/mantras/${id}`);
  };

  // ✅ Handle delete
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this mantra?")) {
      api
        .DeleteMantra(id)
        .then((res) => {
          if (res.status === 200) {
            alert("Mantra deleted successfully!");
            fetchData();
          } else {
            alert(res.message || "Something went wrong while deleting!");
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Error deleting mantra");
        });
    }
  };

  // ✅ Handle create new
  const handleAddNew = () => {
    router.push("/admin/mantras");
  };

  // ✅ Read More toggle
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-yellow-600" /> 🕉️ Manage Mantras
        </h1>

        <div className="flex gap-3 items-center w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title, lord name or slug..."
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
      </div>

      {/* Mantra Cards */}
      {filteredMantras.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No mantras found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMantras.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[600px]"
            >
              {/* Image */}
              <div className="relative h-44">
                {item.icon ? (
                  <LazyImage
                    src={item.icon}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No Image
                  </div>
                )}
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  ID: {item.id}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow overflow-hidden">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 break-words">
                  {item.title || "Untitled Mantra"}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Lord:</span> {item.lordName || "—"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Slug:</span> {item.slug || "—"}
                </p>

                {/* 🕉 Significance */}
                {item.significance && (
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    <span className="font-medium">Significance:</span>{" "}
                    {item.significance}
                  </p>
                )}

                {/* Introduction Section */}
                <div className="flex-grow overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {expanded[item.id]
                      ? item.introduction || "No introduction available."
                      : (item.introduction?.slice(0, 200) ||
                        "No introduction available.") +
                      (item.introduction?.length > 200 ? "..." : "")}
                  </p>

                  {item.introduction?.length > 200 && (
                    <button
                      className="text-green-600 mt-1 text-sm font-medium hover:underline"
                      onClick={() => toggleReadMore(item.id)}
                    >
                      {expanded[item.id] ? "Read Less" : "Read More"}
                    </button>
                  )}

                  {/* 📜 Mantras List */}
                  {item.mantrasList?.length > 0 && (
                    <div className="mt-3 border-t pt-2">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">
                        Mantras:
                      </h3>
                      <ul className="space-y-1">
                        {item.mantrasList.map((m, idx) => (
                          <li key={idx} className="text-xs text-gray-700">
                            <span className="font-medium">{m.mantraTitle}:</span>{" "}
                            {m.meaning?.slice(0, 100)}
                            {m.meaning?.length > 100 ? "..." : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 📅 Created & Updated Info */}
                <div className="mt-2 text-xs text-gray-400">
                  <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4 border-t pt-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default MantrasList;
