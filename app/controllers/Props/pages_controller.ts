import { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  async home(ctx: HttpContext) {
    await ctx.auth.check()

    if (ctx.auth.use('web').user) {
      return ctx.response.redirect('/dashboard')
    } else {
      return ctx.inertia.render('home')
    }
  }
  async dashboard(ctx: HttpContext) {
    return ctx.inertia.render('dashboard')
  }
}
