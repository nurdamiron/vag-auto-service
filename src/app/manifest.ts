import type { MetadataRoute } from "next";
import { business } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} — автосервис в ${business.city}`,
    short_name: business.shortName,
    description: business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f6f9",
    theme_color: "#0b1b2b",
    lang: "ru",
    categories: ["automotive", "business"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
