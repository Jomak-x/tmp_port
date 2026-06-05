import { redirect } from "next/navigation";
import { profile } from "@/data/profile";

export default function PicPage() {
  redirect(profile.image);
}
