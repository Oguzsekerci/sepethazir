"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  alt: string;
  className?: string;
  emoji: string;
  fill?: boolean;
  image?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ProductImage({
  alt,
  className,
  emoji,
  fill = true,
  image,
  priority,
  sizes,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return <span className={className}>{emoji}</span>;
  }

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      onError={() => setFailed(true)}
      priority={priority}
      sizes={sizes}
      src={image}
    />
  );
}
