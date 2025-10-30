"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { CheckCircle, User, Gift, Video, Package } from "lucide-react";
import Image from "next/image";
import Container from "../Container";
import SliderImg from "../../../public/images/pujaslider.webp";
export default function HowPujaWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const swiperRef = useRef(null);

  const steps = [
    {
      title: "Select Puja Package",
      text: "Make your selection from our wide range of pujas.",
      color: "var(--color-primary)",
      icon: <Package className="w-5 h-5" />,
      img: SliderImg,
    },
    {
      title: "Provide Your Details",
      text: "After selecting your preferred puja, fill in your Name and Gotra for Sankalp.",
      color: "var(--color-info)",
      icon: <User className="w-5 h-5" />,
      img: SliderImg,
    },
    {
      title: "Optional Add-Ons",
      text: "Include Chadhava, Seva, or other offerings to enhance your puja experience.",
      color: "var(--color-accent)",
      icon: <Gift className="w-5 h-5" />,
      img: SliderImg,
    },
    {
      title: "Receive Puja Video & Blessings",
      text: "The video of your completed puja will be shared on WhatsApp within 3–4 days.",
      color: "var(--color-primary-light)",
      icon: <Video className="w-5 h-5" />,
      img: SliderImg,
    },
    {
      title: "Receive DevaPrasadam",
      text: "A box of DevaPrasadam* will be delivered to your home at no extra cost.",
      color: "var(--color-dark)",
      icon: <CheckCircle className="w-5 h-5" />,
      img: SliderImg,
    },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
    swiperRef.current?.slideTo(index);
  };

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Left - Steps List */}
        <div className="space-y-8">
          {steps.map((step, index) => (
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
                  className={`text-lg md:text-2xl font-bold transition-colors duration-300 ${
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
        <div className="relative rounded-3xl h-96">
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
        </div>
      </div>

      {/* Note */}
      <p className="text-center mt-12 text-sm text-[var(--color-dark)]/70 italic">
        *DevaPrasadam is a devotional offering from DevaSetu and not temple
        prasad.
      </p>
    </Container>
  );
}
