import { z } from 'zod'

export const linkSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    path: z.string().url({
      message: 'Invalid link',
    }),
  })
)
