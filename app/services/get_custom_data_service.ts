import CustomPage from '#models/custom_page'
import { HttpContext } from '@adonisjs/core/http'
import encryption from '@adonisjs/core/services/encryption'

export default class GetCustomDatas {
  ctx: HttpContext
  column: string
  constructor(ctx: HttpContext, column: string) {
    this.ctx = ctx
    this.column = column
  }
  async getContent() {
    if (this.ctx.auth.user) {
      const content = await CustomPage.query()
        .select(`${this.column}`)
        .where('user_id', this.ctx.auth.user!.id)
        .first()
      if (content) {
        const keyToRetrieve = (content as any)[this.column]

        const decryptedData = encryption.decrypt(keyToRetrieve)
        return decryptedData
      }
      return
    }

    return
  }

  async getLinks() {
    if (this.ctx.auth.user) {
      const content = await CustomPage.query()
        .select('*')
        .where('user_id', this.ctx.auth.user!.id)
        .first()
      if (content) {
        const linksEncrypted = content.links
        const namesEncrypted = content.names

        const decrypteLinks = encryption.decrypt(linksEncrypted)
        const decrypteNames = encryption.decrypt(namesEncrypted)
        return { urls: decrypteLinks, names: decrypteNames }
      }
      return
    }

    return
  }
}
