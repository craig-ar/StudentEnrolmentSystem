import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('StudentID', 9).primary()
        table.string('GivenName', 64)
        table.string('LastName', 64)
        table.string('EmailAddress', 64)

      //table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}