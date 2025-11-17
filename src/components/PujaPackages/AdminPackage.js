"use client";
import { useState } from "react";
import LazyImage from "../Atom/LazyImage";
import { Trash, Edit2, Check, X, Upload } from "lucide-react";

const PackagesComponent = ({ pujaPackages = [], handleDelete, handleUpdate }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  if (!pujaPackages?.length) return null;

  const handleEditClick = (pkg, index) => {
    if (editingIndex === index) {
      handleUpdate({ ...editData, id: pkg.id }); 
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
      setEditData({ ...pkg });
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setEditData((prev) => ({ ...prev, packImg: previewURL }));

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data?.url) {
      setEditData((prev) => ({ ...prev, packImg: data.url }));
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
              {/* ACTION BUTTONS */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">

                {/* Delete Button */}
                <button
                  onClick={() => (!isEditing ? handleDelete(pkg) : setEditingIndex(null))}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                >
                  {isEditing ? <X size={14} /> : <Trash size={14} /> }
                </button>

                {/* Edit / Save Button */}
                <button
                  onClick={() => handleEditClick(pkg, index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${
                    isEditing ? "bg-green-600 text-white" : "bg-white hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {isEditing ? <Check size={14} /> : <Edit2 size={14} />}
                </button>
              </div>

              {/* IMAGE */}
              <div className="w-full h-48 relative bg-gray-100 flex items-center justify-center">
                <LazyImage
                  src={isEditing ? editData.packImg : pkg.packImg}
                  alt={pkg.packageType}
                  fill
                  className="object-contain"
                />

                {/* Image Upload Only In Editing */}
                {isEditing && (
                  <label className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-orange-600 px-3 py-1 rounded text-white cursor-pointer hover:bg-orange-700 flex gap-2 items-center">
                    <Upload size={14} />
                    <span>Change</span>
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                {isEditing ? (
                  <div className="space-y-2">

                    <input
                      type="text"
                      value={editData.packageType}
                      onChange={(e) => handleEditChange("packageType", e.target.value)}
                      className="border w-full p-2 rounded"
                      placeholder="Package Title"
                    />

                    <input
                      type="number"
                      value={editData.packagePrice}
                      onChange={(e) => handleEditChange("packagePrice", e.target.value)}
                      className="border w-full p-2 rounded"
                      placeholder="Price"
                    />

                    <textarea
                      value={editData.packageDescription}
                      onChange={(e) => handleEditChange("packageDescription", e.target.value)}
                      className="border w-full p-2 rounded"
                      placeholder="Description"
                    />

                    <input
                      type="number"
                      value={editData.noOfPeople}
                      onChange={(e) => handleEditChange("noOfPeople", e.target.value)}
                      className="border w-full p-2 rounded"
                      placeholder="No. of People"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg truncate">{pkg.packageType}</h3>
                    <p className="font-bold text-xl">₹{pkg.packagePrice}</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{pkg.packageDescription}</p>
                    <p className="text-xs text-gray-500 mt-2">👥 {pkg.noOfPeople} People</p>
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

export default PackagesComponent;
