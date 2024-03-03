import type { HttpContext } from '@adonisjs/core/http'
import { createUserSchema } from '#schemas/user_schemas'
import { ZodError } from 'zod'
import User from '#models/user'
import CustomPage from '#models/custom_page'
import encryption from '@adonisjs/core/services/encryption'

export default class AuthentificationsController {
  async createAccount(ctx: HttpContext) {
    try {
      const createUser = createUserSchema.parse(ctx.request.all())
      await User.create(createUser)

      const userfind = await User.findBy('email', createUser.email)
      await CustomPage.create({
        header_content: encryption.encrypt({ title: 'Title', description: 'description' }),
        user_id: userfind!.id,
        names: encryption.encrypt(['Link_1', 'Link_2']),
        links: encryption.encrypt(['https://www.google.com/', 'https://www.youtube.com/']),
        images: null,
      })

      await ctx.auth.use('web').login(userfind!)

      return ctx.response.redirect('/dashboard')
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        ctx.session.flash({
          errors: error.issues[0].message,
        })
      } else if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.includes('users_email_unique')) {
          ctx.session.flash({
            errors: 'This email address is allready used !',
          })
        }
        if (error.sqlMessage.includes('users_username_unique')) {
          ctx.session.flash({
            errors: 'The username is allready used !',
          })
        }
      }
      return ctx.response.redirect().back()
    }
  }
  async login(ctx: HttpContext) {
    try {
      const { username, password } = ctx.request.all()
      const user = await User.verifyCredentials(username, password)
      ctx.auth.use('web').login(user)
      return ctx.response.redirect('/dashboard')
    } catch (error) {
      ctx.session.flash({
        errors: 'Credentials does not matches !',
      })
      return ctx.response.redirect().back()
    }
  }
}
