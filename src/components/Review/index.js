import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Reviews = ({ reviews }) => {
  return (
    <div className="px-8">
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
        slidesPerView={4} // 👈 show 4 slides by default
        breakpoints={{
          320: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 2 }, // small tablets
          1024: { slidesPerView: 3 }, // laptops
          1280: { slidesPerView: 4 }, // desktops
        }}
      >
        {reviews.map((r, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow-md rounded-xl p-6">
              <p className="text-[var(--color-dark)] italic mb-4">“{r.text}”</p>
              <h4 className="font-secondary font-semibold">{r.name}</h4>
              <p className="text-sm text-[var(--color-dark)]">{r.city}</p>
            </div>
          </SwiperSlide>
        ))}

        {/* Optional: Add custom nav buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export default Reviews;
