'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecieverMessageSchema extends Schema {
  up () {
    this.create('reciever_messages', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .index('user_id')
      table
        .integer('group_id')
        .unsigned()
        .index('group_id')
      table
        .integer('message_id')
        .unsigned()
        .index('message_id')
      
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade')
      table
        .foreign('group_id')
        .references('groups.id')
        .onDelete('cascade')
      table
        .foreign('message_id')
        .references('messages.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('reciever_messages')
  }
}

module.exports = RecieverMessageSchema
