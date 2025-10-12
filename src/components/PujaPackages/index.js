"use client";
import { useState } from "react";
import LazyImage from "../Atom/LazyImage";

const PujaPackages = ({ pujaPackages = [], onAddToCart }) => {
  const [selectedId, setSelectedId] = useState(null);

  if (!pujaPackages?.length) return null;

  const handleSelect = (pkg, index) => {
    setSelectedId(index);
    onAddToCart?.(pkg);
  };

  return (
    <section id="packages" className="py-8">
      <h2 className="text-xl font-semibold mb-4">Select Puja Packages</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {pujaPackages.map((pkg, index) => {
          const isSelected = selectedId === index;
          return (
            <div
              key={index}
              onClick={() => handleSelect(pkg, index)}
              className={`relative rounded-2xl cursor-pointer overflow-hidden border-2 transition-all ${
                isSelected
                  ? "border-orange-300 bg-orange-50"
                  : "border-gray-200 hover:border-orange-400"
              }`}
            >
              {/* Checkmark */}
              <div
                className={`absolute top-3 left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-gray-400"
                }`}
              >
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Image */}
              {pkg?.packImg && (
                <div className={!isSelected
                    ? "w-full h-48 relative bg-gray-100"
                    : "w-full h-48 relative bg-gradient-to-r from-[#ffa806] to-[#72b836]" }>
                {/* <div className="w-full h-48 relative transition-all duration-300"> */}
               
                <LazyImage
                    src={pkg.packImg}
                    alt={pkg.packageType}
                    fill
                    className="object-contain"
                />
                </div>
              )}

              {/* Text */}
              <div
                className={`p-4 ${
                  isSelected ? "bg-orange-500 text-white" : "bg-white"
                }`}
              >
                <h3 className="font-semibold text-lg truncate">
                  {pkg.packageType || pkg.name}
                </h3>
                <p className="font-bold text-xl mt-1">₹{pkg.packagePrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


export default PujaPackages;