import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default async function getUserDatas(ctx: HttpContext) {
  try {
    await ctx.auth.check()
    const userDatas = await User.query()
      .select('*')
      .where('username', ctx.auth.user!.username)
      .where('email', ctx.auth.user!.email)
      .first()
    if (userDatas) {
      const dataToShare = {
        id: userDatas.id,
        email: userDatas.email,
        username: userDatas.username,
      }
      return dataToShare
    }
    return
  } catch (error) {
    return
  }
}
