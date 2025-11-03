"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "../Atom/LazyImage";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../helper/useWithLang";
import { useEffect, useState, useMemo } from "react";

const HeroBanner = ({ slides = [] }) => {
  const router = useRouter();
  const withLang = useWithLang();
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile once on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Memoize slide data to avoid recalculation
  const processedSlides = useMemo(() => {
    return slides?.map((slide) => ({
      ...slide,
      imageSrc:
        slide.banners?.[0] &&
        (isMobile && slide.banners[0].mobile_image_url
          ? slide.banners[0].mobile_image_url
          : slide.banners[0].image_url),
    }));
  }, [slides, isMobile]);

  const handleExplore = (type, slug) => {
    if (type === "puja") {
      router.push(withLang(`/puja/${slug}`));
    } else if (type === "chadhava") {
      router.push(withLang(`/chadhava/${slug}`));
    }
  };

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
        loop
      >
        {processedSlides?.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div
              className="relative w-full h-[550px] md:h-[550px] 2xl:h-[550px]"
              onClick={() => handleExplore(slide.type, slide.slug)}
            >
              {/* ✅ Lazy loaded image with blur placeholder */}
              <LazyImage
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="object-cover transition-all duration-700 ease-in-out"
                priority={index === 0} // first image loads first
                blur
              />

              {/* Optional overlay text */}
              {slide.desc && (
                <div className="absolute bottom-6 left-4 sm:left-16 z-10 text-white drop-shadow-lg max-w-[90%] sm:max-w-[60%]">
                  <p className="text-sm md:text-lg leading-snug">{slide.desc}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}

        {/* ✅ Navigation buttons */}
        <button className="swiper-button-prev !w-[30px] !h-[30px] md:!w-auto md:!h-auto absolute left-3 !top-[60%] md:!top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="swiper-button-next !w-[30px] !h-[30px] md:!w-auto md:!h-auto absolute right-3 !top-[60%] md:!top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </Swiper>
    </div>
  );
};

export default HeroBanner;







// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import LazyImage from "../Atom/LazyImage";
// import { useRouter } from "next/navigation";
// import { useWithLang } from '../../../helper/useWithLang';




// const HeroBanner = ({ slides }) => {

//   const router = useRouter();
//   const withLang = useWithLang();


//   const handleExplore = (type,slug) => {
//     if (type === "puja"){
//       router.push(withLang(`/puja/${slug}`))
//     }else if(type === "chadhava"){
//       router.push(withLang(`/chadhava/${slug}`))
//     }
//   }

//   return (
//     <div className="relative overflow-hidden">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         }}
//         pagination={{ clickable: true }}
//         // autoplay={{ delay: 5000 }}
//         autoplay={false}
//         loop 
//       >
//         {slides?.map((slide,index) => {

//           const {title, id, slug, type, banners} = slide

//           return <SwiperSlide key={index}>
//               <div className="relative w-full h-[250px] md:h-[500px] 2xl:h-[600px] "
//               onClick={() => handleExplore(type, slug)}>
//               {
//                 banners?.map((item) => {
//                   return <LazyImage
//                     key={item.id}
//                     src={item.image_url}
//                     alt={title}
//                     fill
//                     className="object-fill"
//                     priority
//                   />
//                 })
//               }

//               <div className="relative sm:top-60 sm:pl-28 px-6 py-0 sm:py-0 text-left z-10 text-[var(--secondary)]">
//                 <p className="mt-0 text-base md:text-lg text-[var(--forcast)]">
//                   {slide.desc}
//                 </p>
//               </div>
             
//               {/* <div className="relative top-60 text-left pl-28 z-10 text-[var(--secondary)]">
//                 <p className="mt-4 text-base md:text-lg text-[var(--forcast)]">
//                   {slide.desc}
//                 </p>
//                 <div className="mt-6 flex justify-start gap-4">
//                 </div>
//               </div> */}

//             </div>
//           </SwiperSlide>
//         })}

//         {/* Navigation Buttons */}
//         <button className="swiper-button-prev !w-[30px] !h-[30px] md:!w-auto md:!h-auto absolute left-3 !top-[60%] md:!top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//         <button className="swiper-button-next !w-[30px] !h-[30px] md:!w-auto md:!h-auto absolute right-3 !top-[60%] md:!top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </Swiper>

//       {/* Bottom Border Image */}
//       {/* <div className="absolute bottom-0 left-0 w-full">
//         <LazyImage
//           src="/images/flower.webp"
//           alt="Border decoration"
//           width={1920}
//           height={50}
//           className="w-full h-auto"
//         />
//       </div> */}
//     </div>
//   );
// };

// export default HeroBanner;

