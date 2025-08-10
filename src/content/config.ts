import { defineCollection, z } from "astro:content";

const productCollections = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    image: z.array(z.object({ src: z.string() })),
    price: z.number(),
    category: z.string(),
  }),
});

export const collections = {
  product: productCollections,
};
