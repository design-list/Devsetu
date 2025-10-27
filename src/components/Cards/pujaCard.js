"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "../Atom/LazyImage";
import { formatDate } from "../../../utils/localstorage";
import Image from "next/image";
import TempleIcon from "../../../public/icons/hindu-temple.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const PujaCard = ({ pujas, viewmore, PujaName, handlaRedirect, withLang }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 py-10">
        {pujas?.map((puja) => {
          const bannerImage =
            puja?.pujaBanners?.[0]?.image_url || "/images/herobanner.webp";

          return (
            <div
              key={puja.id}
              className="group flex flex-col bg-white overflow-visible shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative"
            >
              {/* Custom Tag — visible even with overflow-hidden */}
              <span className="puja-tag bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-sm font-bold text-white uppercase">
                Label Tag
              </span>
              {/* Image Section */}
              <div
                onClick={() => handlaRedirect("puja", puja.slug)}
                className="relative h-64 cursor-pointer overflow-hidden"
              >
                <LazyImage
                  src={bannerImage}
                  alt={puja.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Label Tag */}
                {/* {puja.label && (
                  <span className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-xs font-semibold uppercase px-3 py-1 rounded-full shadow-md">
                    {puja.label}
                  </span>
                )} */}
              </div>

              {/* Details */}
              <div className="px-4 py-2 flex flex-col flex-1 bg-gradient-to-b from-white to-[var(--forcast)]">
                <div className="text-[var(--color-dark)] font-primary text-xl md:text-2xl font-bold tracking-wide mt-2 mb-2">
                  {puja.title}
                </div>

                <p className="text-[var(--color-info)] text-sm font-bold mb-3 uppercase">
                  {puja.sub_title}
                </p>

                <div className="flex items-center gap-2 text-[#393939] text-base font-medium mb-2">
                  <Image
                    src={TempleIcon}
                    alt="Temple Icon"
                    width={22}
                    height={22}
                    className="mr-2 relative -top-1.5 "
                  />
                  {puja.location || "Location unavailable"}
                </div>

                <div className="flex items-center gap-2 text-[#393939] text-base font-medium">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="relative -left-1 text-2xl text-[var(--color-primary-light)]"
                  />
                  {formatDate(puja.date, "full")}
                </div>
              </div>

              {/* Button */}
              <div className="p-5 pt-0">
                <Link
                  href={withLang(`/puja/${puja.slug}`)}
                  className="w-full flex items-center justify-center gap-0 
      bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)]
      text-white font-semibold rounded-xl py-3 px-5
      shadow-[0_2px_6px_rgba(241,88,34,0.2)]
      hover:shadow-[0_4px_10px_rgba(241,88,34,0.3)]
      transition-all duration-300 hover:scale-[1.04]
      active:translate-y-[1px]
      relative overflow-hidden mt-4 uppercase"
                >
                  Participate <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {viewmore && (
        <div className="text-center">
          <Link
            href={withLang("/puja")}
            className="inline-flex items-center gap-2 text-[var(--secondary)] text-lg font-semibold hover:underline transition-all duration-200 capitalize"
          >
            View All {PujaName} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </>
  );
};

export default PujaCard;
