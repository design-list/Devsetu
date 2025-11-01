"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ShieldCheck, Users, Globe } from "lucide-react";

export default function ContinuousSlider() {
  const slides = [
    {
      icon: <Users className="w-4 h-4 md:w-8 md:h-8 text-[var(--color-white)]" />,
      text: "Trusted by Over 1 Lac People",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 md:w-8 md:h-8 text-[var(--color-white)]" />,
      text: "100% Secure",
    },
    {
      icon: <Globe className="w-4 h-4 md:w-8 md:h-8 text-[var(--color-white)]" />,
      text: "Leading Platform for Hindu Devotees",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 md:w-8 md:h-8 text-[var(--color-white)]" />,
      text: "Verified Pandits & Authentic Rituals",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] py-1 md:py-2">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={30}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        freeMode={true}
        allowTouchMove={false}
        className="select-none"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 20 },
          480: { slidesPerView: 1, spaceBetween: 25 },
          640: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {[...slides, ...slides, ...slides].map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center gap-3 text-[var(--color-white)] font-semibold text-base sm:text-lg md:text-xl whitespace-nowrap"
          >
            <div className="flex items-center justify-center gap-3 px-3 sm:px-4 py-1 rounded-lg shadow-md transition-all duration-300">
              {item.icon}
              <span className="text-sm md:text-xl">{item.text}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional: fade edges for smooth look */}
      <div className="absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-[var(--color-primary)] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-[var(--color-primary)] to-transparent pointer-events-none"></div>
    </div>
  );
}
