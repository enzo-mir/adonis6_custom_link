import { updateStyleSchema } from '#schemas/style_schemas'
import type { HttpContext } from '@adonisjs/core/http'
import { ZodError } from 'zod'

export default class UpdateStylesController {
  async update(ctx: HttpContext) {
    try {
      const styleDatas = updateStyleSchema.parse(ctx.request.all())
      console.log(styleDatas)
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.session.flash({
          errors: error.issues[0].message,
        })
      }

      return ctx.response.redirect().back()
    }
  }
}
