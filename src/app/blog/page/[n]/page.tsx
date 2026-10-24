import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { BlogList, blogPageCount, blogPagePath } from "@/components/site/BlogList";

type Props = { params: Promise<{ n: string }> };

export function generateStaticParams() {
  return Array.from({ length: Math.max(blogPageCount - 1, 0) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  const page = Number(n);
  return pageMeta({
    title: `Советы, страница ${page}`,
    description: "Статьи про диагностику, ремонт и обслуживание VAG, Kia и Hyundai в Алматы.",
    path: blogPagePath(page),
  });
}

export default async function BlogPageN({ params }: Props) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 1 || page > blogPageCount) notFound();
  if (page === 1) redirect("/blog");
  return <BlogList page={page} />;
}
