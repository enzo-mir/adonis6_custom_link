import type { HttpContext } from '@adonisjs/core/http'
import { createUserSchema } from '#schemas/user_schemas'
import { ZodError } from 'zod'
import User from '#models/user'
import CustomPage from '#models/custom_page'
import encryption from '@adonisjs/core/services/encryption'
import db from '@adonisjs/lucid/services/db'

export default class AuthentificationsController {
  private async defaultCustomPage(userfind: User) {
    const customPage = await CustomPage.create({
      user_id: userfind.id,
      header_content: encryption.encrypt({ title: 'Title', description: 'description' }),
      style: encryption.encrypt({
        body: '#F9F3F4',
        text: '#ffffff',
        bg_links: '#C03F48',
        border_radius: '10px',
        header_color: '#F4414D',
      }),
      images: null,
    })

    await db.table('links').multiInsert([
      {
        user_id: userfind.id,
        name: 'Google',
        link: 'https://www.google.com/',
      },
      {
        user_id: userfind.id,
        name: 'Youtube',
        link: 'https://www.youtube.com/',
      },
    ])

    return customPage
  }

  async createAccount(ctx: HttpContext) {
    try {
      const createUser = createUserSchema.parse(ctx.request.all())
      await User.create(createUser)

      const userfind = await User.findBy('email', createUser.email)
      if (userfind) {
        const customProps = await this.defaultCustomPage(userfind)
        if (customProps) {
          await ctx.auth.use('web').login(userfind)

          return ctx.response.redirect().back()
        }
      } else {
        throw new Error('Something went wrong !')
      }
    } catch (error) {
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
      } else {
        ctx.session.flash({
          errors: error.message,
        })
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
