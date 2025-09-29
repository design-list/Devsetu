"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // agar v9+
import LazyImage from "../atom/LazyImage";
import { ChevronLeft, ChevronRight } from "lucide-react";


const HeroBanner = ({ slides }) => {
  return (
    <div className="relative w-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop 
        className="w-screen h-[600px] !mx-0 !px-0"  // ! to override any conflicting utility
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index} className="w-screen h-[600px] !mx-0 !px-0">
            <div className="relative w-screen h-[600px] flex items-center justify-center bg-gradient-to-r from-[#601d0f] to-[#601d0f]/80 overflow-hidden">
              
              {/* Background Image */}
              <LazyImage
                src={slide.image}
                alt="Dev Setu Slide"
                fill
                className="object-cover absolute w-full h-full"
                priority
              />

              {/* Centered Content */}
              <div className="relative z-10 text-center text-white max-w-3xl px-4 sm:px-6 md:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-snug">
                  {slide.title}{" "}
                  <span className="text-yellow-400">{slide.highlight}</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200">
                  {slide.desc}
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button className="px-6 py-2 border border-white rounded-md bg-white text-black font-medium hover:bg-gray-100 transition">
                    Download App
                  </button>
                  <button className="px-6 py-2 border border-white rounded-md font-medium hover:bg-white hover:text-black transition">
                    Explore More
                  </button>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button className="swiper-button-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="swiper-button-next absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </Swiper>

      {/* Bottom Border Image */}
      <div className="absolute bottom-0 left-0 w-full">
        <LazyImage
          src="/images/flower.webp" // आपका border image
          alt="Border decoration"
          width={1920}
          height={50}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
