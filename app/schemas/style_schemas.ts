import { z } from 'zod'

export const updateStyleSchema = z.object({
  bg_links: z.string(),
  body: z.string(),
  border_radius: z.string().refine((value) => value.slice(value.length - 2) === 'px', {
    message: 'Something went wrong !',
  }),
  header_color: z.string(),
  text: z.string(),
})
