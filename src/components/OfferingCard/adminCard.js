"use client";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";

export default function OfferingCard({ offering, handleOfferDelete }) {
  return (
    <div className="flex flex-col justify-between border rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white">
      {/* Image */}
      {offering.offerimg && (
        <div className="w-full h-32 rounded-md overflow-hidden mb-3">
          <Image
            src={offering.offerimg}
            alt={offering.title}
            width={200}
            height={130}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Title & Description */}
      <h3 className="text-base font-semibold mb-1">{offering.title}</h3>
      <p className="text-gray-600 text-sm leading-snug flex-1">
        {offering.description}
      </p>

      {/* Price & Buttons */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-600 font-bold text-base">
          ₹{offering.price}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handleOfferDelete(offering)}
            className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-500 px-2 py-1 rounded-md text-sm hover:bg-red-100 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
