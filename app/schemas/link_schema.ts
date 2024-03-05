import { z } from 'zod'

export const linkSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    link: z.string().url({
      message: 'Invalid link',
    }),
  })
)
