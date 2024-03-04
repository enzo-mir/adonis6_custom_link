import { z } from 'zod'

export const updateHeaderSchema = z.object({
  title: z.string(),
  description: z.string(),
})
