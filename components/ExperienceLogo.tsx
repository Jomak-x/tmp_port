import type { Experience } from "@/data/experience";
import Image from "next/image";

export default function ExperienceLogo({
  experience,
  large = false,
}: {
  experience: Experience;
  large?: boolean;
}) {
  const sizeClasses = experience.logoSecondary
    ? large
      ? "h-24 w-48"
      : "h-16 w-32"
    : large
      ? "h-24 w-40"
      : "h-16 w-24";

  if (!experience.logo) {
    return null;
  }

  if (experience.logoSecondary) {
    return (
      <svg
        viewBox="0 0 192 96"
        role="img"
        aria-label={`${experience.company} logos`}
        className={`${sizeClasses} shrink-0 border border-white/15 bg-white`}
      >
        <image
          href={experience.logo}
          x="18"
          y="24"
          width="48"
          height="48"
          preserveAspectRatio="xMidYMid meet"
        />
        <text
          x="88"
          y="58"
          fill="rgba(0, 0, 0, 0.55)"
          fontSize="27"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
          textAnchor="middle"
          aria-hidden="true"
        >
          ×
        </text>
        <rect x="106" y="24" width="70" height="48" rx="12" fill="#000" />
        <image
          href={experience.logoSecondary}
          x="111"
          y="34"
          width="60"
          height="28"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    );
  }

  return (
    <div
      className={`relative ${sizeClasses} shrink-0 overflow-hidden border border-white/15 bg-white p-2`}
    >
      <Image
        src={experience.logo}
        alt={experience.logoAlt ?? `${experience.company} logo`}
        fill
        sizes={large ? "160px" : "96px"}
        unoptimized={experience.logo.endsWith(".svg")}
        className={
          experience.logoFit === "cover"
            ? "object-cover"
            : experience.logoZoom
              ? "scale-110 object-contain p-1"
              : "object-contain p-2"
        }
      />
    </div>
  );
}
