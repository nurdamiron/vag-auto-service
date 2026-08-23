import { brands, getBrand } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Ремонт по марке в VAG Auto Service, Алматы";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  return ogImage({
    title: brand ? `Ремонт ${brand.name} в Алматы` : "Марки в работе",
    eyebrow: brand?.group === "korea" ? "Kia и Hyundai" : "Концерн VAG",
  });
}
