"use client";
import { useState } from "react";
import LazyImage from "../Atom/LazyImage";
import { ArrowRight } from "lucide-react";

const PujaPackages = ({ pujaPackages = [], onAddToCart }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  if (!pujaPackages?.length) return null;

  const handleSelect = (pkg) => {
    setSelectedPackage(pkg); // open modal
    setName("");
    setWhatsapp("");
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !whatsapp) {
      alert("Please enter your name and WhatsApp number.");
      return;
    }
    onAddToCart?.({
      ...selectedPackage,
      userName: name,
      whatsappNumber: whatsapp,
    });
    closeModal();
  };

  return (
    <section id="packages" className="pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {pujaPackages.map((pkg, index) => (
          <div
            key={index}
            onClick={() => handleSelect(pkg)}
            className="relative rounded-2xl cursor-pointer overflow-hidden border-2 border-gray-200 hover:border-orange-400 transition-all"
          >
            {/* Image */}
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

            {/* Text */}
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg truncate">
                {pkg.packageType || pkg.name}
              </h3>
              <p className="font-bold text-xl mt-1">₹{pkg.packagePrice}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full relative p-6">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Image */}
            {selectedPackage.packImg && (
              <div className="w-full h-64 relative mb-4">
                <LazyImage
                  src={selectedPackage.packImg}
                  alt={selectedPackage.packageType}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            )}

            {/* Details */}
            <h3 className="text-2xl font-bold mb-2">
              {selectedPackage.packageType || selectedPackage.name}
            </h3>
            <p className="text-xl font-semibold mb-4">
              ₹{selectedPackage.packagePrice}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="font-secondary text-2xl font-bold cursor-pointer w-full bg-[var(--color-primary)] text-white py-3 rounded-xl hover:bg-orange-600 transition-colors flex justify-center items-center"
              >
                Next <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PujaPackages;
