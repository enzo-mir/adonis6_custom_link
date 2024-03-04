import CustomPage from '#models/custom_page'
import Link from '#models/link'
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
        if (this.column === 'links') {
          console.log(
            encryption.decrypt(
              'jyHcZQpAoMKlNqiHTfRpjVWoM88S83pvC9Of_HdWV8Fmr4q_upz4cPIn_8ST3hVqLLrnY6N5rchinn_t121k7ECPqIzv5F_f7QlLxDn3dqeqYjc3gIVUE_mzNfY7s6zITKpltjYgGqUSpfc52vs-XmIyIY-K8HPGRGUsYz2xcz8s0zknYadRtpUAzujsk5cq.X05TQ0VpYTJEcjBXUHpTZA.yQcv-qOwqGt4l95XGgzkTUB-wNGqGLAvqZEaKD8'
            )
          )
        }

        const decryptedData = encryption.decrypt(keyToRetrieve)
        return decryptedData
      }
      return
    }

    return
  }

  async getLinks() {
    if (this.ctx.auth.user) {
      const content = await Link.query()
        .select('id')
        .select('name')
        .select('link')
        .where('user_id', this.ctx.auth.user!.id)
      if (content) return content
      return
    }

    return
  }
}
