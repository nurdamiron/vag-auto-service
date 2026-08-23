import { combos, getCombo } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Услуга и марка VAG Auto Service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return combos.map((c) => ({ slug: c.service, brand: c.brand }));
}

type Props = { params: Promise<{ slug: string; brand: string }> };

export default async function Image({ params }: Props) {
  const { slug, brand } = await params;
  const combo = getCombo(slug, brand);
  return ogImage({
    title: combo?.title ?? "Автосервис Алматы",
    eyebrow: "Алматы",
  });
}
