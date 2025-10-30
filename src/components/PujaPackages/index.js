"use client";
import LazyImage from "../Atom/LazyImage";

const PujaPackages = ({ pujaPackages = [], onAddToCart }) => {
  if (!pujaPackages?.length) return null;

  const handleSelect = (pkg) => {
    // Directly trigger cart or next action
    onAddToCart?.(pkg);
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
              <span>{pkg.packageDescription}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PujaPackages;
