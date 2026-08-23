import { getService, services } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Услуга VAG Auto Service, Алматы";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  return ogImage({
    title: service ? `${service.title} в Алматы` : "Услуги автосервиса",
    eyebrow: "Услуга",
  });
}
