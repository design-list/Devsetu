"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChadhavaAction,
  requestChadhavaAction,
} from "@/redux/actions/chadhavaAction";
import { fetchWithWait } from "../../../../../helper/method";
import { useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";
import {
  Trash,
  SquarePen,
  Filter,
  PlusCircle,
  Package,
  Gift,
  HelpCircle,
  Image as ImageIcon,
  Leaf,
} from "lucide-react";
import { formatDate } from "../../../../../utils/localstorage";

const api = new Api();

export default function ChadhavaPage() {
  const [expanded, setExpanded] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { allChadhava } = useSelector((state) => state.chadhavas);

  useEffect(() => {
    dispatch(requestChadhavaAction());
  }, [dispatch]);

  const handleEdit = (id) => router.push(`/admin/chadhava/${id}`);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this Chadhava?")) return;
    fetchWithWait({ dispatch, action: deleteChadhavaAction({ id }) })
      .then((res) => {
        alert(res.message);
        dispatch(requestChadhavaAction());
      })
      .catch(console.error);
  };

  const handleToggle = (id, field, currentValue) => {
    const payload = { id, field, value: !currentValue };
    api
      .UpdeteChadhavaFlags(payload)
      .then((res) => {
        if (res.status === 200) dispatch(requestChadhavaAction());
        else alert(res.error || "Something went wrong");
      })
      .catch(console.error);
  };

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddNew = () => {
    router.push("/admin/chadhava");
  };

  const handleMouseOver = (type, data) => {
    console.log("Hover:", type, data);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
          <Leaf className="text-yellow-500" />
          All Chadhava
        </h2>

        <div className="flex gap-3">
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
            <PlusCircle size={18} /> Add New
          </button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(allChadhava) && allChadhava.length > 0 ? (
          allChadhava.map((chadhava) => (
            <div
              key={chadhava.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all flex flex-col justify-between max-h-[420px] overflow-hidden"
            >
              {/* Scrollable content */}
              <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {chadhava.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{chadhava.slug}</p>

                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-semibold">Date:</span> {formatDate(chadhava.date, "full")}
                </p>

                <p className="text-gray-700 text-sm mb-3">
                  <span className="font-semibold">Location:</span>{" "}
                  {chadhava.location}
                </p>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {expanded[chadhava.id]
                    ? chadhava.pujaDetails
                    : `${chadhava.pujaDetails?.substring(0, 150)}...`}
                  {chadhava.pujaDetails?.length > 150 && (
                    <button
                      className="text-orange-500 text-sm ml-1"
                      onClick={() => toggleExpand(chadhava.id)}
                    >
                      {expanded[chadhava.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>

              {/* Hover Icons Section */}
              <div className="flex justify-between items-center mt-4 border-t pt-3 text-gray-600">
                <div
                  onMouseOver={() =>
                    handleMouseOver("Packages", chadhava.chadhavaPackages)
                  }
                  className="flex flex-col items-center cursor-pointer hover:text-orange-500"
                >
                  <Package size={18} />
                  <span className="text-xs mt-1">Packages</span>
                </div>
                <div
                  onMouseOver={() =>
                    handleMouseOver("Offerings", chadhava.chadhavaOfferings)
                  }
                  className="flex flex-col items-center cursor-pointer hover:text-orange-500"
                >
                  <Gift size={18} />
                  <span className="text-xs mt-1">Offerings</span>
                </div>
                <div
                  onMouseOver={() =>
                    handleMouseOver("FAQs", chadhava.chadhavaFaqs)
                  }
                  className="flex flex-col items-center cursor-pointer hover:text-orange-500"
                >
                  <HelpCircle size={18} />
                  <span className="text-xs mt-1">FAQs</span>
                </div>
                <div
                  onMouseOver={() =>
                    handleMouseOver("Images", chadhava.chadhavaImages)
                  }
                  className="flex flex-col items-center cursor-pointer hover:text-orange-500"
                >
                  <ImageIcon size={18} />
                  <span className="text-xs mt-1">Images</span>
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                {[
                  ["Active", "isActive"],
                  ["Home", "isActiveOnHome"],
                  ["Common FAQs", "commonFaqs"],
                ].map(([label, field]) => (
                  <div key={field} className="flex flex-col items-center">
                    <span>{label}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(chadhava.id, field, chadhava[field])
                      }
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                        chadhava[field] ? "bg-green-600" : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          chadhava[field]
                            ? "translate-x-5"
                            : "translate-x-1"
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
                    onClick={() => handleEdit(chadhava.id)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                  >
                    <SquarePen size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(chadhava.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  ⭐ {chadhava.ratingValue} ({chadhava.ratingReviews})
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No Chadhava Found.</p>
        )}
      </div>
    </div>
  );
}
