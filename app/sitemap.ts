import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";

const BASE = "https://portfolio-sisr.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects();

  const projectPages = projects.flatMap((p) => [
    {
      url: `${BASE}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/projects/${p.slug}/report`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/certifications`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...projectPages,
  ];
}
