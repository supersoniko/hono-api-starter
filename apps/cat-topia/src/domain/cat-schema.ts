import { z } from 'zod';

export const catSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const catCreationSchema = catSchema.omit({ id: true });

export type Cat = Readonly<z.infer<typeof catSchema>>;
export type CatCreationInput = Readonly<z.infer<typeof catCreationSchema>>;
