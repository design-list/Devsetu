"use client";
import Image from "next/image";
import Link from "next/link";

export default function PujaCard({ pujas }) {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {pujas.map((puja, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-[var(--forcast)] justify-between shadow-sm border border-slate-200 rounded-lg my-6 w-96 mx-auto"
          >
            <div>
              <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                <Image
                  src={puja.img || "/images/herobanner.webp"}
                  alt={puja.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-[var(--primary)]">
                  {puja.title}
                </h4>
                <p className="text-sm font-semibold text-[var(--secondary)] uppercase">
                  {puja.role || "Participant"}
                </p>
                <p className="text-base text-[var(--primary)] mt-4 font-normal">
                  {puja.desc || "No description available."}
                </p>
              </div>
            </div>
            <div className="flex justify-center p-6 pt-2 gap-7">
                <Link href={'#'}
                className="min-w-32 text-lg rounded-md bg-[var(--secondary)] py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Participate Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <a href="#" className="text-orange-600 font-medium text-xl hover:underline">
          View All Pujas →
        </a>
      </div>
    </>
  );
}
