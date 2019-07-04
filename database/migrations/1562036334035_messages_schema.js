'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.text('message', 256).notNullable()
      table.integer('user_id').index('user_id').unsigned()
      table.timestamps()

      table
        .foreign('user_id')
        .references('users.id')
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
