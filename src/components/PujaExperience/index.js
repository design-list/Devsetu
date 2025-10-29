"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CalendarDays } from "lucide-react";

const pujaVideos = [
  {
    title: "Mahashivratri 4 Prahar Abhishek",
    date: "8 March 2023",
    embedUrl: "https://www.youtube.com/embed/mxIB9s3yM40",
  },
  {
    title: "Divya Mahakali Midnight Tantrokta Yagya",
    date: "7 May 2023",
    embedUrl: "https://www.youtube.com/embed/-8Gmcp_2gFU",
  },
  {
    title: "Shani Shant Puja",
    date: "4 May 2023",
    embedUrl: "https://www.youtube.com/embed/H5wDRAmrrc0",
  },
  {
    title: "Navratri Maha Yagya",
    date: "12 April 2023",
    embedUrl: "https://www.youtube.com/embed/jXSfifLFjD8",
  },
];

export default function PujaExperience() {
  return (
      <div className="">
        {/* Video Carousel */}
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 2 },
          }}
          className="pb-12"
        >
          {pujaVideos.map((video, index) => (
            <SwiperSlide key={index}>
              <div
                className={`w-full`}
              >
                {/* Video */}
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={video.embedUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Content */}
                <div className="p-5 text-left">
                  <h3 className="font-secondary text-lg md:text-xl font-semibold text-[var(--color-dark)] mb-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-dark)]/70">
                    <CalendarDays className="w-4 h-4 text-[var(--color-primary)]" />
                    {video.date}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
}
