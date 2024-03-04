import CustomPage from '#models/custom_page'
import { updateStyleSchema } from '#schemas/style_schemas'
import type { HttpContext } from '@adonisjs/core/http'
import encryption from '@adonisjs/core/services/encryption'
import { ZodError } from 'zod'

export default class UpdateStylesController {
  async update(ctx: HttpContext) {
    try {
      const styleDatas = updateStyleSchema.parse(ctx.request.all())
      const encryptedDatas = encryption.encrypt(styleDatas)
      await CustomPage.query().where('user_id', ctx.auth.user!.id).update({
        style: encryptedDatas,
      })

      ctx.session.flash({
        success: 'Style successfully changed !',
      })

      return ctx.response.redirect().back()
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.session.flash({
          errors: error.issues[0].message,
        })
      } else {
        ctx.session.flash({
          errors: 'Something went Wrong',
        })
      }

      return ctx.response.redirect().back()
    }
  }
}
