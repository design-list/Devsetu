"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "../Atom/LazyImage";
import { useRouter } from "next/navigation";
import { useWithLang } from '../../../helper/useWithLang';




const HeroBanner = ({ slides }) => {

  const router = useRouter();
  const withLang = useWithLang();


  const handleExplore = (type,slug) => {
    if (type === "puja"){
      router.push(withLang(`/puja/${slug}`))
    }else if(type === "chadhava"){
      router.push(withLang(`/chadhava/${slug}`))
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 5000 }}
        autoplay={false}
        loop 
      >
        {slides?.map((slide,index) => {

          const {title, id, slug, type, banners} = slide

          return <SwiperSlide key={id}>
            <div className="h-[500px] cursor-pointer" onClick={() => handleExplore(type, slug)}>
              {
                banners?.map((item) => {
                  return <LazyImage
                    key={item.id}
                    src={item.image_url}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                })
              }

              {/* Centered Content */}
              <div className="relative top-60 text-left pl-28 z-10 text-[var(--secondary)]">
                {/* <h2 className="font-bold text-3xl md:text-4xl">
                  {title}
                  <span className="text-[var(--orange)]">{slide.highlight}</span>
                </h2> */}
                <p className="mt-4 text-base md:text-lg text-[var(--forcast)]">
                  {slide.desc}
                </p>
                <div className="mt-6 flex justify-start gap-4">
                  {/* <button onClick={() => handleExplore(type, slug)} className=" cursor-pointer px-6 py-2 border border-[var(--forcast)] rounded-md font-medium hover:bg-[var(--forcast)] hover:text-[var(--primary)] transition">
                    Explore More
                  </button> */}
                </div>
              </div>

            </div>
          </SwiperSlide>
        })}

        {/* Navigation Buttons */}
        <button className="swiper-button-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="swiper-button-next absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </Swiper>

      {/* Bottom Border Image */}
      {/* <div className="absolute bottom-0 left-0 w-full">
        <LazyImage
          src="/images/flower.webp"
          alt="Border decoration"
          width={1920}
          height={50}
          className="w-full h-auto"
        />
      </div> */}
    </div>
  );
};

export default HeroBanner;
