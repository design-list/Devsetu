"use client";

import React from 'react'
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LazyImage from '../Atom/LazyImage';


function ChadhavaCard({ chadhava, viewmore, handlaRedirect, withLang }) {

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {chadhava?.map((card) => (
          <div
            key={card.id}
            onClick={() => handlaRedirect('chadhava', card.slug)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col cursor-pointer"
          >
            {card?.['chadhavaBanners']?.map((item) => (
              <LazyImage
                key={item.id}
                src={item.image_url || "/images/herobanner.webp"}
                alt={card.title}
                width={400}
                height={320}
                className="w-full h-64 object-fill"
              />
            ))
            }
            <h2 className="font-secondary text-2xl font-semibold mt-3 text-[var(--color-dark)]">
              {card.title}
            </h2>
            <p className="text-[var(--color-dark)] text-base mt-2 flex-grow">{card.chadhava_details.substring(0,400)+ "..."}</p>
            <Link href={withLang(`/chadhava/${card.slug}`)} className="font-secondary text-lg mt-4 text-center bg-[var(--color-primary-light)] hover:[var(--color-primary)] text-white py-2 rounded-md">
              Book Your Chadhava
            </Link>
          </div>
        ))}
      </div>
      {viewmore && <div className="text-center mt-8">
        <Link href={withLang("/chadhava")} className="font-medium flex justify-center text-[var(--secondary)] text-xl hover:underline capitalize">
          View All Chadhava <ArrowUpRight className="w-6 h-6" />
        </Link>
      </div>} 
    </>
  )
}

export default ChadhavaCard;