import { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  async home(ctx: HttpContext) {
    return ctx.inertia.render('home')
  }
}
