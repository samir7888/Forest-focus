"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface BackgroundImageProps {
  className?: string;
  priority?: boolean;
}

export default function BackgroundImage({
  className = "",
  priority = false,
}: BackgroundImageProps) {
  const [imageSrc, setImageSrc] = useState(
    "/images/forest-backgrounds/forest-main.svg"
  );
  const [imageSize, setImageSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateImageSource = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        // Mobile
        setImageSrc("/images/forest-backgrounds/forest-mobile.svg");
        setImageSize({ width: 768, height: 1024 });
      } else if (width <= 1024) {
        // Tablet
        setImageSrc("/images/forest-backgrounds/forest-tablet.svg");
        setImageSize({ width: 1024, height: 768 });
      } else {
        // Desktop
        setImageSrc("/images/forest-backgrounds/forest-main.svg");
        setImageSize({ width: 1920, height: 1080 });
      }
    };

    // Set initial image source
    updateImageSource();

    // Add resize listener
    window.addEventListener("resize", updateImageSource);

    // Cleanup
    return () => window.removeEventListener("resize", updateImageSource);
  }, []);

  return (
    <div className={`background-image-container ${className}`}>
      <Image
        src={imageSrc}
        alt="Forest background with trees and sunlight"
        width={imageSize.width}
        height={imageSize.height}
        priority={priority}
        quality={90}
        className="background-image"
        sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}
