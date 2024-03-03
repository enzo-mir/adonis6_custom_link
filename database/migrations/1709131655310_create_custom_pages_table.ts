import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'custom_pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('header_content').notNullable()
      table.string('names').notNullable()
      table.string('links').notNullable()
      table.string('images').nullable()
      table.string('style').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
