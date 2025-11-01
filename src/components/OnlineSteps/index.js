"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import Image from "next/image";
import Container from "../Container";
import SliderImg from "../../../public/images/pujaslider.webp";
export default function HowPujaWorks({steps}) {
  const [activeStep, setActiveStep] = useState(0);
  const swiperRef = useRef(null);

  const handleStepClick = (index) => {
    setActiveStep(index);
    swiperRef.current?.slideTo(index);
  };

  return (
    <Container>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"> */}
      <div className="flex justify-center gap-10 items-center max-w-6xl mx-auto">
        {/* Left - Steps List */}
        <div className="space-y-8">
          {steps?.map((step, index) => (
            <div
              key={index}
              onClick={() => handleStepClick(index)}
              className={`relative flex items-start gap-4 cursor-pointer group transition-all duration-300 ${
                activeStep === index ? "translate-x-4" : ""
              }`}
            >
              {/* Step Badge */}
              <div
                className="w-10 h-10 flex items-center justify-center text-white font-bold rounded-lg shadow-md shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: step.color }}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  className={`text-base md:text-2xl font-bold transition-colors duration-300 ${
                    activeStep === index
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-dark)]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-[var(--color-dark)] font-primary text-sm md:text-base${
                    activeStep === index
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-dark)]"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Swiper */}
        {/* <div className="relative rounded-3xl h-96">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            spaceBetween={30}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
            className="rounded-2xl overflow-hidden h-full"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={step.img}
                  alt={step.title}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      </div>

      {/* Note */}
      <p className="text-center mt-12 text-sm text-[var(--color-dark)]/70 italic">
        *DevaPrasadam is a devotional offering from DevaSetu and not temple
        prasad.
      </p>
    </Container>
  );
}
