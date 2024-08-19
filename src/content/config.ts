import { z, defineCollection } from 'astro:content'

const tutorialCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    description: z.string()
  }),
})


export const collections = {
  'tutorials': tutorialCollection
}
