"use client";
import { useState } from "react";
import Image from "next/image";
import { RiPlayFill } from "react-icons/ri";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export function ProjectMediaViewer({ media }: { media: MediaItem[] }) {
  const [active, setActive] = useState(0);

  if (!media || media.length === 0) return null;

  return (
    <div>
      {/* ── Large display frame ── */}
      <div className="relative w-full aspect-16/10 sm:aspect-video overflow-hidden bg-charcoal mb-4 rounded-2xl">
        {media.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={item.src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Thumbnail rail — every file, image or video ── */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {media.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${item.type} ${i + 1}`}
            aria-current={i === active}
            className={`relative shrink-0 w-24 h-16 sm:w-28 sm:h-20 overflow-hidden transition-all duration-300 rounded-lg ${
              i === active
                ? "ring-2 ring-brand-500"
                : "opacity-55 hover:opacity-90"
            }`}
          >
            {item.type === "video" ? (
              item.poster ? (
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              ) : (
                <div className="absolute inset-0 bg-charcoal" />
              )
            ) : (
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            )}

            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-charcoal/35">
                <RiPlayFill className="w-5 h-5 text-white" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
