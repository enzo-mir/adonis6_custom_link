import User from '#models/user'
import GetCustomDatas from '#services/get_custom_data_service'
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

  async custom_page(ctx: HttpContext) {
    const { username } = ctx.params
    const useridFind = await User.findBy('username', username)
    if (useridFind) {
      ctx.inertia.share({ user: false })
      const customPageProps = await new GetCustomDatas(ctx).previewPage(useridFind.id)

      return ctx.inertia.render('custom', { ...customPageProps })
    } else {
      return ctx.view.render('error/not_found')
    }
  }
}
