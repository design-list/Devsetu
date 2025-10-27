"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "../Atom/LazyImage";

function ChadhavaCard({ chadhava, viewmore, handlaRedirect, withLang }) {
  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 py-6">
        {chadhava?.map((card) => {
          const bannerImage =
            card?.chadhavaBanners?.[0]?.image_url || "/images/herobanner.webp";

          return (
            <div
              key={card.id}
              onClick={() => handlaRedirect("chadhava", card.slug)}
              className="group flex flex-col bg-white overflow-visible shadow-md border border-gray-100 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
            >
              {/* Custom Tag — visible even with overflow-hidden */}
              <span className="puja-tag bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-sm font-bold text-white uppercase">
                Label Tag
              </span>

              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={bannerImage}
                  alt={card.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-300"></div> */}
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-1">
                <h4 className="text-[var(--color-dark)] font-secondary text-xl md:text-2xl font-bold tracking-wide mb-2">
                  {card.title}
                </h4>
                <p className="text-[var(--color-dark)] text-base leading-relaxed mb-3">
                  {card.chadhava_details
                    ? card.chadhava_details.substring(0, 200) + "..."
                    : "No description available."}
                </p>
              </div>

              {/* Button */}
              <div className="p-5 pt-0">
                <Link
                  href={withLang(`/chadhava/${card.slug}`)}
                  className="w-full flex items-center justify-center gap-2 
      bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary-light)] to-[var(--color-primary)]
      text-white font-semibold rounded-xl py-3 px-5
      shadow-[0_2px_6px_rgba(241,88,34,0.2)]
      hover:shadow-[0_4px_10px_rgba(241,88,34,0.3)]
      transition-all duration-300 hover:scale-[1.04]
      active:translate-y-[1px]
      relative overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Soft Gradient Glow Overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-30 blur-sm pointer-events-none"></span>

                  <span className="relative z-10 flex items-center gap-2">
                    Book Your Chadhava <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {viewmore && (
        <div className="text-center">
          <Link
            href={withLang("/chadhava")}
            className="inline-flex items-center gap-0 text-[var(--secondary)] text-lg font-semibold hover:underline transition-all duration-200 mt-4"
          >
            View All Chadhava <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </>
  );
}

export default ChadhavaCard;
