"use client";

import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  boxWidth?: number | string;
  boxHeight?: number | string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showDots?: boolean;
  bordercolor?: string;
};

export default function ImageCarousel({
  children,
  className = "",
  wrapperClassName = "m-5",
  boxWidth = "min(92vw, 520px)",
  boxHeight = 320,
  autoSlide = false,
  autoSlideInterval = 3000,
  showDots = true,
  bordercolor = "border-orange-400",
}: CarouselProps) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [curr, setCurr] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prev = useCallback(
    () =>
      setCurr((c) => {
        const index = c >= slides.length ? 0 : c;
        return index === 0 ? slides.length - 1 : index - 1;
      }),
    [slides.length],
  );
  const next = useCallback(
    () =>
      setCurr((c) => {
        const index = c >= slides.length ? 0 : c;
        return index === slides.length - 1 ? 0 : index + 1;
      }),
    [slides.length],
  );
  const safeCurr = curr >= slides.length ? 0 : curr;
  const resolvedWidth = typeof boxWidth === "number" ? `${boxWidth}px` : boxWidth;
  const resolvedHeight = typeof boxHeight === "number" ? `${boxHeight}px` : boxHeight;

  useEffect(() => {
    if (!autoSlide || isPaused || slides.length <= 1) return;
    const id = setInterval(next, autoSlideInterval);
    return () => clearInterval(id);
  }, [autoSlide, autoSlideInterval, isPaused, next, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className={`${wrapperClassName} rounded-3xl border-4 ${bordercolor} bg-black/10 shadow-lg`}
      style={{ width: resolvedWidth, height: resolvedHeight }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-2xl ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="relative h-full w-full">
          <div
            className="flex h-full transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${safeCurr * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="relative h-full w-full shrink-0">
                {slide}
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
              <button
                type="button"
                onClick={prev}
                className="pointer-events-auto shadow bg-white/80 text-orange-400 p-1.5 rounded-full hover:bg-white"
                aria-label="Previous slide"
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                className="pointer-events-auto shadow bg-white/80 text-orange-400 p-1.5 rounded-full hover:bg-white"
                aria-label="Next slide"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          )}

          {showDots && slides.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurr(i)}
                    className={`transition-all w-3 h-3 rounded-full ${
                      safeCurr === i ? "scale-125 bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
