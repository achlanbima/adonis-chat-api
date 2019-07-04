'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGroupSchema extends Schema {
  up () {
    this.create('user_group', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .index('user_id')
      table
        .integer('group_id')
        .unsigned()
        .index('group_id')
      
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade')
      table
        .foreign('group_id')
        .references('groups.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('user_group')
  }
}

module.exports = UserGroupSchema
