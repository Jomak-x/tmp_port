"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export default function ProjectMedia({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "80px 0px", threshold: 0.25 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
    />
  );
}
