"use client";
import { useState } from "react";
import LazyImage from "../Atom/LazyImage";
import { Trash, Edit2, Check, Upload } from "lucide-react";

const PujaPackages = ({ pujaPackages = [], handleDelete, handleUpdate, handleChange }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  if (!pujaPackages?.length) return null;

  const handleEditClick = (pkg, index) => {
    if (editingIndex === index) {
      // 🟢 Update logic
      handleUpdate?.(editData);
      setEditingIndex(null);
    } else {
      // ✏️ Enter edit mode
      setEditingIndex(index);
      setEditData({ ...pkg });
    }
  };

  return (
    <section id="packages" className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {pujaPackages.map((pkg, index) => {
          const isEditing = editingIndex === index;

          return (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-400 transition-all bg-white"
            >
              {/* 🗑 Delete + ✏️ Edit Buttons */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                <button
                  type="button"
                  onClick={() => handleDelete(pkg)}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash height={14} width={14} />
                </button>

                <button
                  type="button"
                  onClick={() => handleEditClick(pkg, index)}
                  className={`w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                    isEditing
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-600 hover:bg-orange-400 hover:text-white"
                  }`}
                >
                  {isEditing ? <Check height={14} width={14} /> : <Edit2 height={14} width={14} />}
                </button>
              </div>

              {/* 🖼 Image */}
              <div className="w-full h-48 relative bg-gray-100 flex items-center justify-center">
                {pkg?.packImg && (
                  <LazyImage
                    src={pkg.packImg}
                    alt={pkg.packageType}
                    fill
                    className="object-contain"
                  />
                )}

                {/* 🖼 Editable image upload (only in edit mode) */}
                {isEditing && (
                  <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-2 bg-white/70 py-2 rounded-b-2xl">
                    <label className="flex items-center gap-2 cursor-pointer bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition">
                      <Upload size={16} />
                      <span className="text-sm">Change Image</span>
                      <input
                        type="file"
                        name="packImg"
                        accept="image/*"
                        onChange={(e) => handleChange(e, index)}
                        className="hidden"
                      />
                    </label>

                    {pkg.packImg && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...editData, packImg: null };
                          setEditData(updated);
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* 📦 Editable / Non-editable Content */}
              <div className="p-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editData.packageType}
                      onChange={(e) =>
                        setEditData({ ...editData, packageType: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="Package Type"
                    />
                    <input
                      type="number"
                      value={editData.packagePrice}
                      onChange={(e) =>
                        setEditData({ ...editData, packagePrice: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="Price"
                    />
                    <textarea
                      value={editData.packageDescription}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          packageDescription: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      value={editData.noOfPeople}
                      onChange={(e) =>
                        setEditData({ ...editData, noOfPeople: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="No. of People"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg truncate">
                      {pkg.packageType || pkg.name}
                    </h3>
                    <p className="font-bold text-xl mt-1">₹{pkg.packagePrice}</p>
                    <span className="text-sm text-gray-600 block mt-1 line-clamp-3">
                      {pkg.packageDescription}
                    </span>
                    {pkg.noOfPeople && (
                      <p className="text-xs text-gray-500 mt-2">
                        👥 {pkg.noOfPeople} Person
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PujaPackages;
