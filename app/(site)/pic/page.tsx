import Image from "next/image";
import { profile } from "@/data/profile";

<Image
  src={profile.image}
  alt="Jakob Laise"
  width={256}
  height={256}
  priority
  className="mb-8 h-44 w-44 rounded-full border-4 border-orange-400 object-cover shadow-2xl shadow-orange-950/30 sm:h-64 sm:w-64"
/>;

export default async function pic() {
  <Image src={profile.image} alt="Jakob Laise" />;
}
