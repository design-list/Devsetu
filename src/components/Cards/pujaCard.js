"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "../Atom/LazyImage";
import { formatDate } from "../../../utils/localstorage";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Goldenline from "../../../public/icons/goldline.svg";
import TempleIcon from "../../../public/icons/puja-temple1.png";

const PujaCard = ({ pujas, viewmore, PujaName, handlaRedirect, withLang }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:py-10">
        {pujas?.map((puja) => {
          const bannerImage =
            puja?.pujaBanners?.[0]?.image_url || "/images/herobanner.webp";

          return (
            <div
              key={puja.id}
              className="group flex flex-col bg-white overflow-visible shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative rounded-xl"
            >
              {/* Custom Tag — visible even with overflow-hidden */}
              {puja.tags && <span className="puja-tag bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-xs font-bold text-white uppercase">
                Special Puja
              </span> }
              {/* Image Section */}
              <div
                onClick={() => handlaRedirect("puja", puja.slug)}
                className="relative h-44 sm:h-52 md:h-56 px-2 md:px-4 pt-2 md:pt-4 pb-0 cursor-pointer overflow-hidden object-fill"
              >
                <LazyImage
                  src={bannerImage}
                  alt={puja.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-fill rounded-xl "
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
                <div className="glow-text text-sm inline-block text-center text-transparent bg-clip-text bg-gradient-to-b from-[#d42f0e] via-[#f15822] to-[#f8b500] font-bold uppercase tracking-widest mb-1">
                  {puja?.tags ? puja.tags : <span className="opacity-0">&quot</span>}
                  <Image
                    src={Goldenline}
                    alt="Golden under"
                    className="rotate-[0.5deg]"
                  />
                </div>

                <div className="relative group max-w-full">
                  {/* Title */}
                  <div
                    className="text-[var(--color-dark)] font-primary text-xl 2xl:text-2xl 3xl:text-3xl font-bold tracking-wide mt-2 mb-2
               line-clamp-2 overflow-hidden text-ellipsis cursor-default"
                  >
                    {puja.title}
                  </div>

                  {/* Tooltip */}
                  <div
                    className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-out
               left-1/2 -translate-x-1/2 top-14 mt-3 z-20 bg-gray-900 text-white text-sm font-normal px-3 py-1.5 rounded-lg
               shadow-xl w-max max-w-[320px] text-center"
                  >
                    {puja.title}

                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </div>

                <p className="text-[var(--color-info)] text-sm font-bold mb-3 uppercase">
                  {puja.sub_title}
                </p>

                {/* tample icon should align baseline */}
                <div className="flex items-center gap-[3.1px] md:gap-2 my-2 text-[#393939] text-sm md:text-base font-medium mb-2"> 
                  <Image
                    src={TempleIcon}
                    alt="Temple Icon"
                    width={22}
                    height={22}
                    className="mr-2 relative -top-0.5 -left-[1px]"
                  />
                  {puja.location}
                </div>

                <div className="flex items-center gap-2 text-[#393939] text-sm md:text-base font-medium">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="relative -left-1 text-2xl text-[var(--color-primary-light)]"
                  />
                  {formatDate(puja.date, "full")} {puja.specialDay}
                </div>
              </div>

              {/* Button */}
              <div className="p-5 pt-0">
                <Link
                  href={withLang(`/puja/${puja.slug}`)}
                  className="w-full flex items-center justify-center gap-0 
      bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)]
      text-white font-semibold rounded-lg py-3 px-5
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
