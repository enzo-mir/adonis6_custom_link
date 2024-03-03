import CustomPage from '#models/custom_page'
import { HttpContext } from '@adonisjs/core/http'

export default class GetCustomDatas {
  ctx: HttpContext
  constructor(ctx: HttpContext) {
    this.ctx = ctx
  }
  async header_content() {
    const headerContent = await CustomPage.query()
      .select('header_content')
      .where('id', this.ctx.auth.user!.id)
      .first()

    return headerContent?.header_content
  }
}
