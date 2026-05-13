import Hero from "@/components/Hero";
import Imagecarousel from "@/components/Imagecarousel";
import Textbox from "@/components/Textbox1";
import { profile } from "@/data/profile";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 py-14 md:flex-row md:px-8">
        <Textbox text={profile.text} height="min-h-80" width="w-full md:w-[34rem]" />
        <Imagecarousel boxWidth="min(100%, 560px)" boxHeight="clamp(260px, 35vw, 360px)">
          {profile.hackathonimg.map((s, idx) => (
            <Image
              key={s}
              src={s}
              alt={`Hackathon photo ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority={idx === 0}
            />
          ))}
        </Imagecarousel>
      </div>
    </div>
  );
}
