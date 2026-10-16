import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The "blog" collection reads Markdown/MDX files from src/content/blog.
// The schema validates each post's frontmatter at build time, so a typo
// in a date or a missing title fails the build instead of shipping broken.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
