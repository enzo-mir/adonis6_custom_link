import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Link extends BaseModel {
  @column()
  declare user_id: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: relations.BelongsTo<typeof User>

  @column()
  declare links: string
}
