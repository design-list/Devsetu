"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // only need Autoplay
import "swiper/css";

export default function ContinuousSlider() {
    return (
        <div className="overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                spaceBetween={0}
                slidesPerView={3}   // let slides take natural width for smoother scrolling
                freeMode={true}          // disables snapping for smooth flow
                speed={5000}             // speed in ms, adjust for smoothness
                autoplay={{
                    delay: 0,              // no pause between slides
                    disableOnInteraction: false,
                }}
                className="bg-[var(--secondary)] py-4"
            >
                <SwiperSlide className=" p-5 text-center text-xl capitalize font-medium whitespace-nowrap flex items-center justify-center text-white px-4">
                  Trusted by Over 1 Million People</SwiperSlide>
                <SwiperSlide className=" p-5 text-center text-xl capitalize font-medium whitespace-nowrap flex items-center justify-center text-white px-4">
                    100% Secure
                </SwiperSlide>
                <SwiperSlide className=" p-5 text-center text-xl capitalize font-medium whitespace-nowrap flex items-center justify-center text-white px-4">
                 Leading Platform for Hindu Devotees Globally
                </SwiperSlide>
                 <SwiperSlide className=" p-5 text-center text-xl capitalize font-medium whitespace-nowrap flex items-center justify-center text-white px-4">
                  Trusted by Over 1 Million People</SwiperSlide>
                <SwiperSlide className=" p-5 text-center text-xl capitalize font-medium whitespace-nowrap flex items-center justify-center text-white px-4">
                    100% Secure
                </SwiperSlide>
                <SwiperSlide className=" p-5 text-center text-xl capitalize font-medium whitespace-nowrap flex items-center justify-center text-white px-4">
                 Leading Platform for Hindu Devotees Globally
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
