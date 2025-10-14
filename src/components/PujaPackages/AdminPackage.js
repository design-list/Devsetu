"use client";
import { useState } from "react";
import LazyImage from "../Atom/LazyImage";
import { Trash } from "lucide-react";

const PujaPackages = ({ pujaPackages = [], handleDelete }) => {

  if (!pujaPackages?.length) return null;

  // const handleDelete = (pkg) => {
  //   if (confirm(`Are you sure you want to delete "${pkg.packageType}"?`)) {
  //     onDeletePackage?.(pkg); 
  //   }
  // };

  return (
    <section id="packages" className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {pujaPackages.map((pkg, index) => (
          <div
            key={index}
            className="relative rounded-2xl cursor-pointer overflow-hidden border-2 border-gray-200 hover:border-orange-400 transition-all"
          >
            {/* 🗑 Delete Button */}
            <div className="absolute top-3 left-3 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm z-10">
              <button
                type="button"
                onClick={() => handleDelete(pkg)}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <Trash height={14} width={14} />
              </button>
            </div>

            {/* 🖼️ Image */}
            {pkg?.packImg && (
              <div className="w-full h-48 relative bg-gray-100">
                <LazyImage
                  src={pkg.packImg}
                  alt={pkg.packageType}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* 📦 Text */}
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg truncate">
                {pkg.packageType || pkg.name}
              </h3>
              <p className="font-bold text-xl mt-1">₹{pkg.packagePrice}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PujaPackages;
