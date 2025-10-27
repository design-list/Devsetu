"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Search } from "lucide-react";
import Api from "../../../../../services/fetchApi";
import LazyImage from "@/components/Atom/LazyImage";

const api = new Api();

export default function AartisPage() {
  const [aartis, setAartis] = useState([]);
  const [filteredAartis, setFilteredAartis] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch all aartis
  useEffect(() => {
    api.GetAllAartis().then((res) => {
      if (res.status === 200) {
        setAartis(res.data);
        setFilteredAartis(res.data);
      } else alert(res.error || "Something went wrong");
    });
  }, []);

  // Handle filter
  useEffect(() => {
    const filtered = aartis.filter((item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAartis(filtered);
  }, [searchQuery, aartis]);

  const handleEdit = (id) => router.push(`/admin/aartis/${id}`);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this Aarti?")) {
      api.DeleteAartis(id).then((res) => {
        if (res.status === 200) {
          alert("Aarti deleted successfully!");
          api.GetAllAartis().then((res) => {
            if (res.status === 200) {
              setAartis(res.data);
              setFilteredAartis(res.data);
            }
          });
        } else alert(res.message || "Something went wrong!");
      });
    }
  };

    const handleAddNew = () => {
    router.push("/admin/aartis");
  };

  return (
    <div className="flex-1 overflow-y-auto max-h-screen scrollbar-hide p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            🪔 All Aartis
          </h1>

          {/* 🔍 Search Filter (Right Side) */}
          <div className="relative mt-4 sm:mt-0 w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Aarti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
            />
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <PlusCircle size={18} />
            Add New
          </button>
        </div>

        {/* Card Grid */}
        {filteredAartis.length === 0 ? (
          <p className="text-center text-gray-500">No Aartis found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAartis.map((item) => {
              const isExpanded = expandedCard === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
                >
                  <LazyImage
                    src={item.icon}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Slug:</strong> {item.slug}
                    </p>

                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                      <strong>About:</strong>{" "}
                      {isExpanded || (item.aboutArticle?.length ?? 0) <= 120
                        ? item.aboutArticle
                        : `${item.aboutArticle?.slice(0, 120)}...`}
                    </p>

                    {item.aboutArticle?.length > 120 && (
                      <button
                        className="text-blue-600 text-sm font-medium hover:underline self-start mb-3"
                        onClick={() =>
                          setExpandedCard(isExpanded ? null : item.id)
                        }
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                    <div className="text-sm text-gray-700 mb-4">
                      <strong>{item.title}:</strong>
                      <div className="max-h-32 overflow-y-auto mt-1 border rounded p-2 bg-gray-50 text-gray-600">
                        {item.aartis || "No content available"}
                      </div>
                    </div>

                    <div className="flex justify-between mt-auto pt-3 border-t">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
