"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePujaAction, requestPujaDataAction } from "@/redux/actions/pujaActions";
import { Trash, SquarePen, Flame, Filter, PlusCircle } from "lucide-react";
import { fetchWithWait } from "../../../../../helper/method";
import { useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";

const api = new Api();

export default function PujasPage() {
  const [expanded, setExpanded] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
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
    const payload = { id, field, value: !currentValue };
    api
      .UpdetePujaFlags(payload)
      .then((res) => {
        if (res.status === 200) dispatch(requestPujaDataAction());
        else alert(res.error || "Something went wrong");
      })
      .catch(console.error);
  };

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddNew = () => {
    router.push("/admin/puja");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
          <Flame className="text-yellow-500" />
          All Pujas
        </h2>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
        >
          <Filter size={18} /> Filter
        </button>
      

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <PlusCircle size={18} />
          Add New
        </button>
      </div>

      {/* Grid View */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(allPuja) && allPuja.length > 0 ? (
          allPuja.map((puja) => (
            <div
              key={puja.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{puja.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{puja.subTitle}</p>

                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-semibold">Date:</span> {puja.date}
                </p>

                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">Location:</span> {puja.location}
                </p>

                {/* Puja Details with Read More */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {expanded[puja.id]
                    ? puja.pujaDetails
                    : `${puja.pujaDetails?.substring(0, 150)}...`}
                  {puja.pujaDetails?.length > 150 && (
                    <button
                      className="text-orange-500 text-sm ml-1"
                      onClick={() => toggleExpand(puja.id)}
                    >
                      {expanded[puja.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>

              {/* Status Toggles */}
              <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                {[
                  ["Active", "isActive"],
                  ["Home", "isActiveOnHome"],
                  ["Common Pack", "commonPack"],
                  ["Common Offer", "commonOffer"],
                  ["Common FAQ", "commonFaqs"],
                ].map(([label, field]) => (
                  <div key={field} className="flex flex-col items-center">
                    <span>{label}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(puja.id, field, puja[field])
                      }
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

              {/* Bottom Actions */}
              <div className="mt-5 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(puja.id)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                  >
                    <SquarePen size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(puja.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  ⭐ {puja.ratingValue} ({puja.ratingReviews})
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No Pujas Found.</p>
        )}
      </div>
    </div>
  );
}
