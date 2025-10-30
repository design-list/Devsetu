"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "../Atom/LazyImage";
import { formatDate } from "../../../utils/localstorage";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Goldenline from "../../../public/icons/goldline.svg";
import TempleIcon from "../../../public/icons/hindu-temple.svg";
import TemplateNew from "../../../public/icons/temple.png";

const PujaCard = ({ pujas, viewmore, PujaName, handlaRedirect, withLang }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 md:py-8 md:py-10">
  {pujas?.map((puja) => {
    const bannerImage = puja?.pujaBanners?.[0]?.image_url || "/images/herobanner.webp";

    return (
      <div
        key={puja.id}
        className="group flex flex-col bg-white overflow-visible shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative rounded-xl"
      >
        {/* Custom Tag */}
        <span className="puja-tag bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-[10px] sm:text-xs font-bold text-white uppercase">
          Label Tag
        </span>

        {/* Image Section */}
        <div
          onClick={() => handlaRedirect("puja", puja.slug)}
          className="relative h-44 sm:h-52 md:h-56 px-3 sm:px-4 pt-3 sm:pt-4 cursor-pointer overflow-hidden"
        >
          <LazyImage
            src={bannerImage}
            alt={puja.title}
            width={400}
            height={320}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="px-3 sm:px-4 py-3 flex flex-col flex-1 bg-gradient-to-b from-white to-[var(--forcast)]">
          <div className="glow-text text-xs sm:text-sm text-center text-transparent bg-clip-text bg-gradient-to-b from-[#d42f0e] via-[#f15822] to-[#f8b500] font-bold uppercase tracking-wider mb-1">
            {puja?.highlight || "NIVARAN MAHAPUJA SPECIAL"}
            <Image
              src={Goldenline}
              alt="Golden under"
              className="w-24 sm:w-auto rotate-[0.5deg] mx-auto"
            />
          </div>

          <div className="relative group max-w-full">
            {/* Title */}
            <div
              className="text-[var(--color-dark)] font-primary text-lg sm:text-xl md:text-2xl font-bold tracking-wide mt-2 mb-2 line-clamp-3 overflow-hidden text-ellipsis cursor-default text-left"
            >
              {puja.title}
            </div>

            {/* Tooltip */}
            <div
              className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-out left-1/2 -translate-x-1/2 top-14 mt-3 z-20 bg-gray-900 text-white text-xs sm:text-sm font-normal px-3 py-1.5 rounded-lg shadow-xl w-max max-w-[280px] sm:max-w-[320px] text-center"
            >
              {puja.title}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </div>

          <p className="text-[var(--color-info)] text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase text-left">
            {puja.sub_title}
          </p>

          <div className="flex items-center md:justify-center sm:justify-start gap-2 text-[#393939] text-sm sm:text-base font-medium mb-2">
            <Image
              src={TempleIcon}
              alt="Temple Icon"
              width={20}
              height={20}
              className="mr-1 sm:mr-2 relative -top-1"
            />
            {puja.location || "Location unavailable"}
          </div>

          <div className="flex items-center justify-start gap-2 text-[#393939] text-sm sm:text-base font-medium">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-lg sm:text-xl text-[var(--color-primary-light)]"
            />
            {formatDate(puja.date, "full")}
          </div>
        </div>

        {/* Button */}
        <div className="p-4 sm:p-5 pt-0">
          <Link
            href={withLang(`/puja/${puja.slug}`)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold rounded-lg py-2.5 sm:py-3 px-4 sm:px-5 shadow-[0_2px_6px_rgba(241,88,34,0.2)] hover:shadow-[0_4px_10px_rgba(241,88,34,0.3)] transition-all duration-300 hover:scale-[1.03] active:translate-y-[1px] relative overflow-hidden mt-3 sm:mt-4 uppercase text-sm sm:text-base"
          >
            Participate <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
            className="inline-flex items-center gap-2 text-[var(--secondary)] text-base md:text-lg font-semibold hover:underline transition-all duration-200 capitalize"
          >
            View All {PujaName} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </>
  );
};

export default PujaCard;
