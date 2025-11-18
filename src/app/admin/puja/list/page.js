"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePujaAction, requestPujaDataAction } from "@/redux/actions/pujaActions";
import { Trash, SquarePen, Flame, Filter, PlusCircle, LayoutGrid, List, Search } from "lucide-react";
import { fetchWithWait } from "../../../../../helper/method";
import { useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";

const api = new Api();

export default function PujasPage() {
  const [expanded, setExpanded] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewType, setViewType] = useState("grid");

  // NEW: Search, Sorting & Pagination
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS = 6;

  const dispatch = useDispatch();
  const router = useRouter();
  const { allPuja } = useSelector((state) => state.pujas);

  useEffect(() => {
    dispatch(requestPujaDataAction());
  }, []);

  const handleEdit = (id) => router.push(`/admin/puja/${id}`);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this Puja?")) return;
    fetchWithWait({ dispatch, action: deletePujaAction({ id }) })
      .then((res) => {
        alert(res.message);
        dispatch(requestPujaDataAction());
      })
      .catch(console.error);
  };

  const handleToggle = (id, field, currentValue) => {
    api
      .UpdetePujaFlags({ id, field, value: !currentValue })
      .then((res) => {
        if (res.status === 200) dispatch(requestPujaDataAction());
        else alert(res.error || "Something went wrong");
      })
      .catch(console.error);
  };

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddNew = () => router.push("/admin/puja");

  // -----------------------
  // FILTER + SORT + PAGINATION LOGIC
  // -----------------------

  const filteredData = useMemo(() => {
    let data = [...(allPuja || [])];

    // SEARCH
    if (search.trim()) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.subTitle?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORT
    if (sortBy === "title") data.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "date") data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return data;
  }, [allPuja, search, sortBy]);

  const totalPages = Math.ceil(filteredData.length / ITEMS);
  const paginatedData = filteredData.slice((page - 1) * ITEMS, page * ITEMS);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
          <Flame className="text-yellow-500" />
          All Pujas
        </h2>

        <div className="flex gap-3">
          
          {/* Search Box */}
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-white shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Puja..."
              className="outline-none text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border rounded-lg shadow-sm"
          >
            <option value="">Sort</option>
            <option value="title">A → Z Title</option>
            <option value="date">Latest Date</option>
          </select>

          {/* VIEW TOGGLE BUTTON */}
          <button
            onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {viewType === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
            {viewType === "grid" ? "List View" : "Grid View"}
          </button>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <PlusCircle size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* View Area */}
      <div className={viewType === "grid" ? "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
        {paginatedData.length > 0 ? (
          paginatedData.map((puja) => (
            <div
              key={puja.id}
              className={`bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all ${
                viewType === "list" ? "flex items-center gap-6" : "flex flex-col"
              }`}
            >
              <img
                src={puja?.pujaBanners[1]?.["imageUrl"] || "/noimage.png"}
                className={`${viewType === "list" ? "w-32 h-32" : "w-full h-44"} rounded-lg object-cover`}
                alt={puja.title}
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold">{puja.title}</h3>
                <p className="text-sm text-gray-500">{puja.subTitle}</p>

                <p className="text-xs text-gray-400 mt-1">📅 {puja.date}</p>

                <p className="text-gray-700 text-sm mt-2">
                  {expanded[puja.id] ? puja.pujaDetails : `${puja.pujaDetails?.substring(0, 150)}...`}
                  {puja.pujaDetails?.length > 150 && (
                    <button className="text-orange-500 ml-1" onClick={() => toggleExpand(puja.id)}>
                      {expanded[puja.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>

                {/* SWITCHES */}
                <div className={`mt-3 text-xs flex gap-4 ${viewType === "list" ? "justify-start" : "justify-between"}`}>
                  {[
                    ["Active", "isActive"],
                    ["Home", "isActiveOnHome"],
                    ["Pack", "commonPack"],
                    ["Offer", "commonOffer"],
                    ["FAQ", "commonFaqs"],
                  ].map(([label, field]) => (
                    <div key={field} className="flex flex-col items-center">
                      <span>{label}</span>
                      <button
                        onClick={() => handleToggle(puja.id, field, puja[field])}
                        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                          puja[field] ? "bg-green-600" : "bg-gray-400"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            puja[field] ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(puja.id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                      <SquarePen size={16} /> Edit
                    </button>
                    <button onClick={() => handleDelete(puja.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                      <Trash size={16} /> Delete
                    </button>
                  </div>
                  <span className="text-orange-600 font-semibold text-sm">
                    ⭐ {puja.ratingValue}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No Pujas Found</p>
        )}
      </div>


      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded-lg"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded-lg ${
              page === i + 1 ? "bg-orange-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 border rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
