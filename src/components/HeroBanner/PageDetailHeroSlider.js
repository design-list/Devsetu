"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "../Atom/LazyImage";



const PageDetailHeroSlider = ({ heroSlides }) => {

  return (
    <div className="relative overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={false}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="mx-auto rounded-lg shadow"
      >
        {heroSlides?.map((item) => (
          <SwiperSlide key={item.id}>
              <LazyImage
                src={item.imageUrl}
                alt={item.id+ "puja image"}
                className="object-cover"
                width={600}
                height={400}
              />
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
      </div>
  );
}

export default PageDetailHeroSlider;