import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Local SVG covers skip the optimizer; photos go through AVIF/WebP. */
export function CoverImage({ src, alt, sizes, className, priority }: Props) {
  const svg = src.endsWith(".svg");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={svg}
    />
  );
}
