import { heroCopy } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "VAG Auto Service — автосервис в Алматы";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: heroCopy.title, eyebrow: "Алматы · Таугуль" });
}
