"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "../Atom/LazyImage";
import { formatDate } from "../../../utils/localstorage";

const PujaCard = ({ pujas, viewmore, PujaName, handlaRedirect, withLang }) => {



  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {pujas?.map((puja) => {
          const { pujaBanners } = puja
          return <div
            key={puja.id}
            className="flex flex-col bg-[var(--forcast)] justify-between shadow-sm border border-slate-200 rounded-lg my-6"
          >
            <>
              {
                pujaBanners?.map((item) => {
                  return <div key={item.id}  onClick={() => handlaRedirect('puja', puja.slug)} className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center cursor-pointer">
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
              <div className="p-4">
                <h4 className="font-secondary mb-1 text-2xl font-bold text-[var(--primary)]">
                  {puja.title}
                </h4>
                <p className="text-base font-bold text-[var(--color-dark)]">
                  {puja.sub_title}
                </p>
                <p className=" font-secondary text-base text-[var(--primary)] mt-4 font-normal">
                  {puja.location || "No description available."}
                </p>
                <p className="text-base text-[var(--primary)] mt-4 font-normal">
                  {formatDate(puja.date, "full")}
                </p>
              </div>
            </>
            <div className="flex p-6 pt-2 gap-7">
              <Link href={withLang(`/puja/${puja.slug}`)}
                className="font-secondary text-base font-bold uppercase flex items-center justify-between min-w-32 rounded-md bg-[var(--orange-light)] py-2 px-4 border border-transparent text-center text-[var(--white)]"
                type="button"
              >
                Participate Now <ArrowUpRight />
              </Link>
            </div>
          </div>
        })}
      </div>

      {viewmore && <div className="text-center mt-6">
        <Link href={withLang("/puja")} className="font-medium flex justify-center text-[var(--secondary)] text-xl hover:underline capitalize">
          View All {PujaName} <ArrowUpRight className="w-6 h-6" />
        </Link>
      </div>}
    </>
  );
}

export default PujaCard;