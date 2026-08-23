import { areas, getArea } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Автосервис в районе Алматы";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  return ogImage({
    title: area ? `Автосервис ${area.name}` : "Автосервис Алматы",
    eyebrow: "Алматы",
  });
}
