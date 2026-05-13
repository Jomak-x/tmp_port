import Image from "next/image";
import { LightRays } from "@/components/ui/light-rays";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { profile } from "@/data/profile";
import { AuroraText } from "@/components/ui/aurora-text";
import { FaArrowDownLong } from "react-icons/fa6";

export default function Hero() {
  return (
    <div className="relative z-0 min-h-screen">
      <LightRays
        color="rgba(255, 165, 0, 0.2)"
        length="250vh"
        count={15}
        speed={3}
        className=""
      />

      {/* Content container - flexbox for side-by-side layout */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <Image
          src={profile.image}
          alt="Jakob Laise"
          width={256}
          height={256}
          priority
          className="mb-8 h-44 w-44 rounded-full border-4 border-orange-400 object-cover shadow-2xl shadow-orange-950/30 sm:h-64 sm:w-64"
        />

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {profile.nameintro}{" "}
            <AuroraText colors={["#f88b38", "#f8c538"]}>
              {profile.name}
            </AuroraText>
          </h1>
          <h3 className="mt-3 text-lg text-yellow-400 sm:text-xl">{profile.university}</h3>
          <TypingAnimation
            className="m-3 text-lg sm:text-xl"
            words={profile.titles}
            loop
            blinkCursor
          >
          </TypingAnimation>
        </div>
        <FaArrowDownLong className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-xl text-orange-500" />
      </div>
    </div>
  );
}
