import Image from "next/image";

const LazyImage = ({ src, alt, width, height, fill, className, priority }) => {
  if (fill) {
    return (
      <Image
        src={src ? src : "/images/Sri Krishna.jpg"}
        alt={alt || ""}
        fill
        priority={priority}
        className={className || "object-cover"}
      />
    );
  }

  return (
    <Image
      src={src ? src : "/images/Sri Krishna.jpg"}
      alt={alt || ""}
      width={width || 600}
      height={height || 300}
      className={className || "object-cover rounded-lg"}
      loading="lazy"
    />
  );
};

export default LazyImage;
