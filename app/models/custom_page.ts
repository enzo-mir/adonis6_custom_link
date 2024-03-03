import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class CustomPage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: relations.BelongsTo<typeof User>

  @column()
  declare header_content: string

  @column()
  declare names: string

  @column()
  declare links: string

  @column()
  declare images: string | null

  @column()
  declare style: string
}
