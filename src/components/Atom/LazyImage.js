"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const LazyImage = ({ src, alt, width, height, fill, className, priority }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const useFill = fill && !isMobile;

  if (useFill) {
    return (
      <Image
        src={src || "/images/herobanner.webp"}
        alt={alt || ""}
        fill
        priority={priority}
        className={`${className || ""} object-cover w-full h-full`}
      />
    );
  }

  return (
    <Image
      src={src || "/images/herobanner.webp"}
      alt={alt || ""}
      width={width || 1200}
      height={height || 600}
      className={`${className || ""} object-cover w-full h-auto`}
      {...(!priority && { loading: "lazy" })} // ✅ only add lazy when not priority
      priority={priority}
    />
  );
};

export default LazyImage;
