import Link from '#models/link'
import { linkSchema } from '#schemas/link_schema'
import { HttpContext } from '@adonisjs/core/http'
import { ZodError } from 'zod'

export default class UpdateLinksController {
  async update(ctx: HttpContext) {
    try {
      const { userid } = ctx.params
      const payload = Object.values(ctx.request.all())
      const linksDatas = linkSchema.parse(payload)

      await Link.query()
        .where('user_id', userid)
        .update({ links: JSON.stringify({ links: linksDatas }) })
      ctx.session.flash({
        success: 'Links updated !',
      })
      return ctx.response.redirect().back()
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.session.flash({
          errors: error.issues[0].message,
        })
      } else {
        ctx.session.flash({
          errors: 'Something went wrong !',
        })
      }
      return ctx.response.redirect().back()
    }
  }
}
