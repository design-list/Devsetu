"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "../Atom/LazyImage";
import { useWithLang } from "../../../helper/useWithLang";

export default function PujaCard({ pujas, viewmore, PujaName }) {

  const withLang = useWithLang();

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {pujas?.map((puja) => {
          const { pujaImages } = puja
          return <div
            key={puja.id}
            className="flex flex-col bg-[var(--forcast)] justify-between shadow-sm border border-slate-200 rounded-lg my-6"
          >
            <>
              {
                pujaImages?.map((item) => {
                  return <div key={item.id} className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                    <LazyImage
                      src={item.image_url || "/images/herobanner.webp"}
                      alt={puja.title}
                      width={400}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                })
              }
              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-[var(--primary)]">
                  {puja.title}
                </h4>
                <p className="text-sm font-semibold text-[var(--secondary)] uppercase">
                  {puja.sub_title}
                </p>
                <p className="text-base text-[var(--primary)] mt-4 font-normal">
                  {puja.location || "No description available."}
                </p>
                <p className="text-base text-[var(--primary)] mt-4 font-normal">
                  {puja.date}
                </p>
              </div>
            </>
            <div className="flex justify-center p-6 pt-2 gap-7">
              <Link href={withLang(`/puja/${puja.slug}`)}
                className="min-w-32 text-lg rounded-md bg-[var(--secondary)] py-2 px-4 border border-transparent text-center text-[var(--forcast)] transition-all shadow-md hover:shadow-lg focus:bg-[var(--primary)] focus:shadow-none active:bg-[var(--primary)] hover:bg-[var(--primary)] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Participate Now
              </Link>
            </div>
          </div>
        })}
      </div>

      {viewmore && <div className="text-center mt-6">
        <Link href={withLang("/puja")} className="flex justify-center text-[var(--secondary)] capitalize font-medium text-xl hover:underline">
          View All {PujaName} <ArrowUpRight className="w-6 h-6" />
        </Link>
      </div>}
    </>
  );
}
