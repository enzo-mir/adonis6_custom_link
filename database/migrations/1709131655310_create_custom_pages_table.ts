import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'custom_pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.json('header_content').notNullable()
      table.json('names').notNullable()
      table.json('links').notNullable()
      table.json('images').notNullable()
      table.json('style').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
