import { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  async home(ctx: HttpContext) {
    await ctx.auth.check()

    if (ctx.auth.user) {
      return ctx.response.redirect(`/dashboard/${ctx.auth.user.id}`)
    } else {
      return ctx.inertia.render('home')
    }
  }
  async dashboard(ctx: HttpContext) {
    const { userid } = ctx.params

    return userid === ctx.auth.user!.id
      ? ctx.inertia.render('dashboard')
      : ctx.response.redirect().back()
  }
}
