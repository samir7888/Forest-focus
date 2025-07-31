"use client";

import Image from "next/image";

export type IconName =
  | "tree"
  | "leaf"
  | "play"
  | "pause"
  | "reset"
  | "settings"
  | "github"
  | "forest"
  | "sun"
  | "logo";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  alt?: string;
}

export default function Icon({
  name,
  size = 24,
  className = "",
  alt,
}: IconProps) {
  const iconSrc = `/images/icons/${name}.svg`;
  const iconAlt = alt || `${name} icon`;

  return (
    <Image
      src={iconSrc}
      alt={iconAlt}
      width={size}
      height={size}
      className={`icon icon-${name} ${className}`}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
      }}
      priority={false}
    />
  );
}
