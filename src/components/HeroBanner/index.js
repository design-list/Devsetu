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

          return <SwiperSlide key={index}>
              <div className="relative w-full h-[250px] md:h-[500px] 2xl:h-[600px] "
              onClick={() => handleExplore(type, slug)}>
              {
                banners?.map((item) => {
                  return <LazyImage
                    key={item.id}
                    src={item.image_url}
                    alt={title}
                    fill
                    className="object-fill"
                    priority
                  />
                })
              }

              <div className="relative sm:top-60 sm:pl-28 px-6 py-0 sm:py-0 text-left z-10 text-[var(--secondary)]">
                <p className="mt-0 text-base md:text-lg text-[var(--forcast)]">
                  {slide.desc}
                </p>
              </div>
             
              {/* <div className="relative top-60 text-left pl-28 z-10 text-[var(--secondary)]">
                <p className="mt-4 text-base md:text-lg text-[var(--forcast)]">
                  {slide.desc}
                </p>
                <div className="mt-6 flex justify-start gap-4">
                </div>
              </div> */}

            </div>
          </SwiperSlide>
        })}

        {/* Navigation Buttons */}
        <button className="swiper-button-prev !w-[30px] !h-[30px] md:!w-auto md:!h-auto absolute left-3 !top-[60%] md:!top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="swiper-button-next !w-[30px] !h-[30px] md:!w-auto md:!h-auto absolute right-3 !top-[60%] md:!top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
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
