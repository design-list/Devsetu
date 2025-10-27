"use client";
import { Minus, Plus, X } from "lucide-react";
import LazyImage from "../Atom/LazyImage";

export default function OfferingModal({
  show = false,
  onClose,
  selectedOffering,
  onAdd,
  allCarts,
  handleQuantityChange,
  buttonLabel = "Okay",
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] md:w-[420px] overflow-hidden relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute right-3 top-3 text-gray-100 hover:text-white z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5 drop-shadow-md cursor-pointer" />
        </button>

        {/* Full Width Image */}
        <div className="relative w-full h-44 md:h-52">
          <LazyImage
            src={selectedOffering?.packImg}
            alt={selectedOffering?.title || "Offering Image"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="font-semibold text-lg">{selectedOffering?.title}</h2>
          {selectedOffering?.price && (
            <p className="text-green-600 font-semibold mt-1">
              ₹{selectedOffering?.price}
            </p>
          )}

          <div className="mt-3 flex justify-between items-center">
            <p className="text-gray-600 text-sm leading-snug w-[75%]">
              {selectedOffering?.description}
            </p>

            {(() => {
                const matchedAddOn = allCarts?.add_ons?.find(
                (add) => add.id === selectedOffering.id
                );
                if (matchedAddOn) {
                return (
                    <div className="flex items-center border rounded-lg px-2 py-1 mt-4">
                    <button
                        onClick={() =>
                        handleQuantityChange(selectedOffering.id, "decrement")
                        }
                        className="text-gray-600 hover:text-black cursor-pointer"
                    >
                        <Minus size={14} />
                    </button>

                    <span className="mx-2 text-sm font-semibold">
                        {matchedAddOn.quantity ?? 1}
                    </span>

                    <button
                        onClick={() =>
                        handleQuantityChange(selectedOffering.id, "increment")
                        }
                        className="text-gray-600 hover:text-black cursor-pointer"
                    >
                        <Plus size={14} />
                    </button>
                    </div>
                );
                }
                return (
                <button
                    onClick={() => onAdd(selectedOffering)}
                    className="cursor-pointer whitespace-nowrap mt-3 border border-[var(--color-primary)] text-[var(--color-primary)] px-3 py-1 rounded-lg hover:bg-green-50"
                >
                    + Add
                </button>
                );
            })()}
            
          </div>

          <button
            onClick={onClose}
            className="w-full bg-green-700 text-white py-2 mt-4 rounded-lg font-medium hover:bg-green-800 transition"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
