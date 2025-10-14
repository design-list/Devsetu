"use client";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";

export default function OfferingCard({ offering, onAdd, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Left Section */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold">{offering.title}</h3>
        <p className="text-gray-600 text-sm leading-snug">{offering.description}</p>
        <span className="text-green-600 font-bold text-base mt-1">
          ₹{offering.price}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center gap-2">
        {offering.offerimg && (
          <div className="w-20 h-20 rounded-md overflow-hidden border">
            <Image
              src={offering.offerimg}
              alt={offering.title}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onAdd(offering)}
            className="flex items-center gap-1 bg-green-50 text-green-600 border border-green-500 px-2 py-1 rounded-md text-sm hover:bg-green-100 transition"
          >
            <Plus size={14} /> Add
          </button>

          <button
            onClick={() => onDelete(offering.id)}
            className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-500 px-2 py-1 rounded-md text-sm hover:bg-red-100 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
