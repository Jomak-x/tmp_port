import Image from "next/image";
import { MapPin } from "lucide-react";

type ProjectBoxProps = {
  name: string;
  technologies: string[];
  short_desc: string;
  borderColor?: string;
  textcolor?: string;
  startimg?: string;
  startvid?: string;
  location: string;
  bgcolor?: string;
  onClick?: () => void;
};

export default function ProjectBox({
  name,
  technologies,
  short_desc,
  borderColor = "border-orange-400",
  textcolor = "text-orange-400",
  bgcolor = "bg-gray-900",
  startimg,
  startvid,
  location,
  onClick,
}: ProjectBoxProps) {
  const maxVisibleTech = 3;
  const visibleTech = technologies.slice(0, maxVisibleTech);
  const remainingCount = technologies.length - visibleTech.length;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgcolor} group flex h-full min-h-[31rem] w-full flex-col overflow-hidden rounded-2xl border-2 ${borderColor} text-left shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-orange-300`}
    >
      <div className="relative h-52 overflow-hidden bg-black/30 sm:h-56">
        {startvid ? (
          <video
            src={startvid}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : startimg ? (
          <Image
            src={startimg}
            alt={`${name} preview`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 440px"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0">
          <div className={`text-2xl font-semibold ${textcolor}`}>
            {name}
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/55">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        <p className="mt-5 line-clamp-5 flex-1 text-base leading-7 text-white/78">
          {short_desc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span
              className={`rounded-full border px-3 py-1 text-xs text-white/82 ${borderColor}`}
              key={tech}
            >
              {tech}
            </span>
          ))}

          {remainingCount > 0 && (
            <span className={`rounded-full border px-3 py-1 text-xs text-white/82 ${borderColor}`}>
              +{remainingCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
