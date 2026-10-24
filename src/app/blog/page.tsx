import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogList } from "@/components/site/BlogList";

export const metadata: Metadata = pageMeta({
  title: "Советы",
  description:
    "Диагностика VAG, ABS на Passat/Golf, сцепление и КПП — полезно до визита на СТО в Алматы.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogList page={1} />;
}
