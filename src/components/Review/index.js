import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Reviews = ({ reviews }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="!pb-10" // add space for pagination if needed
      >
        {reviews.map((r, idx) => (
          <SwiperSlide key={idx} className="flex">
            <div className="flex flex-col justify-between bg-white shadow-md rounded-xl p-6 w-full">
              <p className="text-[var(--color-dark)] italic mb-4">“{r.text}”</p>
              <div>
                <h4 className="font-secondary font-semibold">{r.name}</h4>
                <p className="text-sm text-[var(--color-dark)]">{r.city}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Optional: Navigation buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>

      {/* Force all slides to stretch equally */}
      <style jsx global>{`
        .swiper-wrapper {
          align-items: stretch !important;
        }
        .swiper-slide {
          height: auto !important;
          display: flex !important;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
