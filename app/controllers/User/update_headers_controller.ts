import CustomPage from '#models/custom_page'
import { updateHeaderSchema } from '#schemas/header_schema'
import type { HttpContext } from '@adonisjs/core/http'
import encryption from '@adonisjs/core/services/encryption'

export default class UpdateHeadersController {
  async update(ctx: HttpContext) {
    try {
      const headerDatas = updateHeaderSchema.parse(ctx.request.all())
      const encryptedDatas = encryption.encrypt(headerDatas)
      await CustomPage.query().where('user_id', ctx.auth.user!.id).update({
        header_content: encryptedDatas,
      })
      ctx.session.flash({
        success: 'Header successfully changed !',
      })
      return ctx.response.redirect().back()
    } catch (error) {
      ctx.session.flash({
        errors: 'Something went wrong !',
      })
      return ctx.response.redirect().back()
    }
  }
}
