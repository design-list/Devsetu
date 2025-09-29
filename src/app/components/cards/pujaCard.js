import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";
import LazyImage from "../atom/LazyImage";

export default function PujaCard({ pujas }) {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 px-6 md:px-16">
        {pujas.map((puja, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <LazyImage
              // src={puja.img}
              alt={puja.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover p-3"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{puja.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{puja.desc}</p>
              <p className="text-xs mt-2 text-gray-500">{puja.place}</p>
              <p className="text-xs text-gray-500">{puja.date}</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                Participate →
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <a href="#" className="text-orange-600 font-medium">
          View All Pujas →
        </a>
      </div>
    </>
  );
}
