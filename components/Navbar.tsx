"use client";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";


const navItems = [
  { name: "Home", link: "/" },
  { name: "Experience", link: "/experience" },
  { name: "Projects", link: "/projects" },
  { name: "Skills", link: "/skills" },
  { name: "GitHub", link: "https://github.com/Jomak-x", picture: "Github" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/jakob-l123/", picture: "LinkedIn" },
  { name: "Resume", link: "/resume", picture: "Resume" },
];

const navicons: { [key: string]: React.ReactNode } = {
  Github: <FaGithub size={28} />,
  LinkedIn: <FaLinkedin size={28} />,
  Resume: <CgFileDocument size={28} />,
};

export default function Navbar() {
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="fixed left-0 right-0 top-3 z-50 flex justify-center px-3">
      <nav className="relative flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-orange-200/20 bg-orange-500/95 p-2 shadow-xl backdrop-blur sm:gap-2 sm:p-3">
        {isHovering && (
          <div
            className="absolute hidden rounded-full bg-orange-300 transition-all duration-300 sm:block"
            style={{
              left: sliderStyle.left,
              width: sliderStyle.width,
              height: "42px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}

        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className={
              item.picture
                ? "relative z-10 rounded-full px-3 py-2 text-black transition hover:bg-orange-300 sm:px-4 sm:hover:bg-transparent"
                : "relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-black transition hover:bg-orange-300 sm:px-6 sm:text-base sm:hover:bg-transparent"
            }
            onMouseEnter={(event) => {
              setSliderStyle({
                left: event.currentTarget.offsetLeft,
                width: event.currentTarget.offsetWidth,
              });
              setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {item.picture ? navicons[item.picture] : item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
