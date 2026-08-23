import { blogPosts, getPost } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Статья VAG Auto Service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({
    title: post?.title ?? "Советы автосервиса",
    eyebrow: post?.category ?? "Советы",
  });
}
