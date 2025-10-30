"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Aarti",
    desc: "Find complete lyrics of all the famous Aartis and easily worship your beloved God.",
    img: "/images/aarti_article_image.webp",
    link: "#",
  },
  {
    id: 2,
    title: "Chalisa",
    desc: "Get the complete Chalisa of all deities. Recite during pooja and seek divine grace.",
    img: "/images/chaalisa_article_image.webp",
    link: "#",
  },
  {
    id: 3,
    title: "Mantra",
    desc: "Discover powerful mantras for peace and spiritual upliftment. Remove life's obstacles.",
    img: "/images/mantra_article_image.webp",
    link: "#",
  },
  {
    id: 4,
    title: "Ayurvedic & Home Remedies",
    desc: "Explore ancient Ayurvedic wisdom and home remedies for holistic well-being.",
    img: "/images/ayurvedic_article_image.webp",
    link: "#",
  },
];

export default function LibraryCards() {
  return (
    <section className="relative bg-gradient-to-b from-[var(--forcast)] via-white to-[var(--forcast)] py-0 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Heading */}
        <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-[var(--color-dark)]">
          Explore Our
          <span className="text-[var(--color-info)]"> Divine Library</span>
        </h2>
        <p className="text-[var(--color-dark)] text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          Explore the wisdom of Sanatan Dharma through our curated articles,
          videos, and guides.
        </p>

        {/* Card Grid */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="font-secondary group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Wrapper */}
              <div className="relative w-full h-48 sm:h-52 lg:h-56 overflow-hidden">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300"></div>

                {/* Title on Image */}
                <h3 className="absolute bottom-3 left-3 sm:left-4 text-white text-xl sm:text-2xl font-semibold drop-shadow-lg">
                  {cat.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between h-auto sm:h-48">
                <p className="font-primary text-[var(--color-dark)] text-sm sm:text-base leading-relaxed flex-grow">
                  {cat.desc}
                </p>
                <Link
                  href={cat.link}
                  className="font-primary inline-flex items-center justify-center gap-2 mt-4 text-white font-semibold bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-lg py-2.5 px-4 hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Read All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Mandala Background */}
      <div className="absolute inset-0 bg-[url('/patterns/mandala-bg.svg')] bg-center bg-cover opacity-5 pointer-events-none"></div>
    </section>
  );
}
