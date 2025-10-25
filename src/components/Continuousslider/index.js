"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // only need Autoplay
import "swiper/css";

export default function ContinuousSlider() {
    return (
        <div className="font-secondary overflow-hidden bg-[var(--color-primary)] font-bold">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                spaceBetween={0}
                slidesPerView={3}
                freeMode={true}          
                speed={5000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                className="bg-[var(--color-primary)] py-4"
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
