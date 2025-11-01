"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, BookOpen, Search, PlusCircle } from "lucide-react";
import Api from "../../../../../services/fetchApi";
import LazyImage from "@/components/Atom/LazyImage";

const api = new Api();

const ChalisaPage = () => {
  const [chalisa, setChalisa] = useState([]);
  const [filteredChalisa, setFilteredChalisa] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.GetAllChalisa().then((res) => {
      if (res.status === 200) {
        setChalisa(res.data);
        setFilteredChalisa(res.data);
      } else {
        alert(res.error || "Something went wrong");
      }
    });
  };

  // 🔍 Search handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredChalisa(chalisa);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = chalisa.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.slug?.toLowerCase().includes(query)
      );
      setFilteredChalisa(filtered);
    }
  }, [searchQuery, chalisa]);

  const handleEdit = (id) => {
    router.push(`/admin/chalisa/${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this Chalisa?")) return;
    api.DeleteChalisa(id).then((res) => {
      if (res.status === 200) {
        alert("Chalisa deleted successfully!");
        fetchData();
      } else {
        alert(res.message || "Something went wrong!");
      }
    });
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 9);

  const handleAddNew = () => {
    router.push("/admin/chalisa");
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-yellow-600" /> Chalisa List
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

      {/* Cards */}
      {filteredChalisa.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No Chalisa found. Try searching again.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChalisa.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[560px]"
            >
              {/* Image */}
              <div className="relative h-48">
                <LazyImage
                  src={item.icon}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  ID: {item.id}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow overflow-hidden">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  <span className="font-medium">Slug:</span> {item.slug}
                </p>

                {/* Scrollable section for long content */}
                <div className="flex-grow overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-800">
                      About Chalisa:
                    </span>{" "}
                    {item.aboutArticle || "—"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-800">
                      Opening Doha:
                    </span>{" "}
                    {item.openingDoha || "—"}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    <span className="font-medium text-gray-800">Chaupai:</span>{" "}
                    {item.chaupai || "—"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-800">
                      Closing Doha:
                    </span>{" "}
                    {item.closeDoha || "—"}
                  </p>
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

      {/* Load More */}
      {visibleCount < filteredChalisa.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ChalisaPage;
