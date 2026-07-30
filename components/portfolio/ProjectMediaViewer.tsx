"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  RiPlayFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

type ProjectMediaViewerProps = {
  media: MediaItem[];

  // Optional controlled props
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

export function ProjectMediaViewer({
  media,
  activeIndex,
  onActiveChange,
}: ProjectMediaViewerProps) {
  const [internalActive, setInternalActive] = useState(0);

  // Use parent state if provided, otherwise use internal state
  const active = activeIndex !== undefined ? activeIndex : internalActive;

  const setActive = (index: number) => {
    if (onActiveChange) {
      onActiveChange(index);
    } else {
      setInternalActive(index);
    }
  };

  if (!media?.length) return null;

  const railRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const rail = railRef.current;

    if (!rail) return;

    setCanScrollLeft(rail.scrollLeft > 0);

    setCanScrollRight(
      rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2,
    );
  };

  useEffect(() => {
    updateScrollButtons();

    const rail = railRef.current;

    if (!rail) return;

    rail.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      rail.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [media]);

  const scrollByAmount = (direction: "left" | "right") => {
    railRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Large Image */}
      <div className="relative w-full aspect-16/10 sm:aspect-video overflow-hidden bg-charcoal mb-4 rounded-2xl">
        {media.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <Image src={item.src} alt="" fill className="object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:bg-white transition"
          >
            <RiArrowLeftSLine className="w-5 h-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:bg-white transition"
          >
            <RiArrowRightSLine className="w-5 h-5" />
          </button>
        )}

        <div
          ref={railRef}
          className="flex gap-3 overflow-x-auto scrollbar-none scroll-smooth"
        >
          {media.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden ${
                i === active
                  ? "ring-2 ring-brand-500"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <Image src={item.src} alt="" fill className="object-cover" />
              ) : (
                <>
                  {item.poster && (
                    <Image
                      src={item.poster}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  )}

                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <RiPlayFill className="text-white w-5 h-5" />
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
