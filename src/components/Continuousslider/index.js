"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ShieldCheck, Users, Globe, Sparkles } from "lucide-react";

export default function ContinuousSlider() {
    const slides = [
        {
            icon: <Users className="w-8 h-8 text-[var(--color-white)]" />,
            text: "Trusted by Over 1 Lac People",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[var(--color-white)]" />,
            text: "100% Secure",
        },
        {
            icon: <Globe className="w-8 h-8 text-[var(--color-white)]" />,
            text: "Leading Platform for Hindu Devotees Globally",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[var(--color-white)]" />,
            text: "100% Secure",
        },
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] py-4">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                spaceBetween={40}
                slidesPerView={3}
                speed={6000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                freeMode={true}
                allowTouchMove={false}
                className="select-none"
            >
                {[...slides, ...slides, ...slides].map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex items-center justify-center gap-3 text-[var(--color-white)] font-semibold text-xl whitespace-nowrap"
                    >
                        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-white/10 rounded-lg shadow-md hover:bg-white/20 transition-all duration-300">
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Subtle gradient fade edges */}
            {/* <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[var(--color-primary-light)] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[var(--color-primary)] to-transparent pointer-events-none"></div> */}
        </div>
    );
}
