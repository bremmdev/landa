import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
    loader: file('./src/content/projects.csv'),
    schema: z.object({
        id: z.number().int(),
        name: z.string(),
        slug: z.string(),
        category: z.string().optional().nullable(),
        owner: z.string().optional().nullable(),
        startDate: z.string().optional().nullable(),
        endDate: z.string().optional().nullable(),
        needleSize: z.string().optional().nullable(),
        yarn: z.string().optional().nullable(),
        designer: z.string().optional().nullable(),
        imageUrl: z.string().optional().nullable(),
        castOn: z.number().int().optional().nullable(),
    }),
});

export const collections = { projects };
