"use client";

import React from 'react'
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from '../Atom/LazyImage';
import { useWithLang } from '../../../helper/useWithLang';

function ChadhavaCard({ chadhava, viewmore }) {

  const withLang = useWithLang();

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {chadhava?.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {card?.['chadhavaBanners']?.map((item) => (
              <LazyImage
                key={item.id}
                src={item.image_url || "/images/herobanner.webp"}
                alt={card.title}
                width={400}
                height={320}
                className="w-full h-full object-cover"
              />
            ))
            }
            <h2 className="text-xl font-semibold mt-3 text-gray-800">
              {card.title}
            </h2>
            <p className="text-gray-600 text-sm mt-2 flex-grow">{card.chadhava_details.substring(0,400)+ "..."}</p>
            <Link href={withLang(`/chadhava/${card.slug}`)} className="mt-4 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
              Book Your Chadhava
            </Link>
          </div>
        ))}
      </div>
      {viewmore && <div className="text-center mt-6">
        <Link href={withLang("/chadhava")} className="flex justify-center text-[var(--secondary)] capitalize font-medium text-xl hover:underline">
          View All Chadhava <ArrowUpRight className="w-6 h-6" />
        </Link>
      </div>}
    </>
  )
}

export default ChadhavaCard;