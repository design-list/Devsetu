"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "../Atom/LazyImage";

const PageHeroSlider = ({ heroBanner, handlaRedirect }) => {
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative overflow-hidden mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="mx-auto rounded-lg shadow"
      >
        {heroBanner?.map((slide, index) => (
          <React.Fragment key={index}>
            {slide?.banners?.map((item) => {
              // ✅ Image source selection (mobile vs desktop)
              const imageSrc =
                isMobile && item.mobile_image_url
                  ? item.mobile_image_url
                  : item.image_url;

              return (
                <SwiperSlide key={item.id}>
                  <div
                    className={`${slide.bgColor} rounded-lg p-6 h-[180px] md:h-80 flex flex-col justify-center cursor-pointer`}
                    onClick={() => handlaRedirect("puja", slide.slug)}
                  >
                    <LazyImage
                      src={imageSrc}
                      alt={slide.title || "banner"}
                      fill
                      className="w-full object-fill rounded-lg"
                      priority
                      height={300}
                      width={800}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </React.Fragment>
        ))}

        {/* Navigation Buttons */}
        <button className="swiper-button-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="swiper-button-next absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </Swiper>
    </div>
  );
};

export default PageHeroSlider;


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import LazyImage from "../Atom/LazyImage";



// const PageHeroSlider = ({ heroBanner, handlaRedirect }) => {
//   // 👉 Slider Data

//   return (
//     <div className="relative overflow-hidden mx-auto">
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         modules={[Autoplay, Pagination, Navigation]}
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         }}
//         className="mx-auto rounded-lg shadow"
//       >
//         {heroBanner?.map((slide, index) => {
//           return <React.Fragment key={index}>
//             {
//               slide?.banners?.map((item) => {
//               return <SwiperSlide key={item.id}>
//                   <div
//                     className={`${slide.bgColor} rounded-lg p-6 h-[150px] md:h-80 flex flex-col justify-center cursor-pointer`}
//                      onClick={() => handlaRedirect('puja',slide.slug)}
//                   >
//                     <LazyImage
//                       src={item.image_url}
//                       alt={slide.title}
//                       fill
//                       className="w-full object-fill"
//                       priority
//                       height={300}
//                       width={800}
//                     />
//                     {/* <h2 className={`text-lg md:text-xl font-bold mb-2 ${slide.textColor}`}>
//                       {slide.title}
//                     </h2>
//                     <p className="text-gray-700 mb-4 whitespace-pre-line">
//                       {slide.description}
//                     </p>
//                     <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
//                       {slide.buttonText}
//                     </button> */}
//                   </div>
//                 </SwiperSlide>
//               })            
//             }
//           </React.Fragment>
//         })}

//         {/* Navigation Buttons */}
//         <button className="swiper-button-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//         <button className="swiper-button-next absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </Swiper>
//     </div>
//   );
// }

// export default PageHeroSlider;