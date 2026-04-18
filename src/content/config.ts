import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.date(),
      description: z.string().optional(),
      image: image().optional(),
      tags: z.array(z.string()).default([]),
      category: z.string(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

export const collections = { posts };
