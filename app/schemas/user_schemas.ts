import { z } from 'zod'
export const createUserSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username muste be further than 4 characters',
    })
    .refine((text) => /^[\p{L}]+$/u.test(text), {
      message: 'Only leters are allowed for the username',
    }),
  email: z.string().email({
    message: 'Email value is invalid',
  }),
  password: z.string().refine((text) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(text), {
    message:
      'Please choose a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter and one digit.',
  }),
})
