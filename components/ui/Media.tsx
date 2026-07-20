import Image from "next/image";

type MediaProps = {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src);

export function Media({
  src,
  alt = "",
  className = "",
  sizes,
  priority,
}: MediaProps) {
  if (isVideo(src)) {
    return (
      <video src={src} className={className} autoPlay muted loop playsInline />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}

// function isVideo(src: string) {
//   return /\.(mp4|webm|ogg|mov)$/i.test(src);
// }
