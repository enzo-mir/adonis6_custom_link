import CustomPage from '#models/custom_page'
import Link from '#models/link'
import { HttpContext } from '@adonisjs/core/http'
import encryption from '@adonisjs/core/services/encryption'

export default class GetCustomDatas {
  ctx: HttpContext
  constructor(ctx: HttpContext) {
    this.ctx = ctx
  }
  async getContent(column: string, id: string | undefined) {
    if (this.ctx.auth.user || id) {
      const content = await CustomPage.query()
        .select(`${column}`)
        .where('user_id', id || this.ctx.auth.user!.id)
        .first()
      if (content) {
        const keyToRetrieve = (content as any)[column]
        const decryptedData = encryption.decrypt(keyToRetrieve)
        return decryptedData
      }
      return
    }

    return
  }

  async getLinks(id: string | undefined) {
    if (this.ctx.auth.user || id) {
      const content = await Link.query()
        .select('links')
        .where('user_id', id || this.ctx.auth.user!.id)
        .first()
      if (content) {
        console.log(content.links)

        return JSON.parse(content.links).links
      }
      return
    }

    return
  }

  async previewPage(userid: string) {
    const style = await this.getContent('style', userid)
    const headerContent = await this.getContent('header_content', userid)
    const images = await this.getContent('images', userid)
    const links = await this.getLinks(userid)

    return { style, header_content: headerContent, images, links }
  }
}
