"use client";
import { ReactLenis } from "lenis/react";

/** Lenis smooth scrolling. Disabled automatically for reduced-motion users. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.1, smoothWheel: true, anchors: false }}
    >
      {children}
    </ReactLenis>
  );
}
