'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.integer('admin').unsigned()
      
      table
        .foreign('admin')
        .references('users.id')
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupSchema
