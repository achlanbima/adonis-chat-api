'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
  user(){
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_group')
  }

  message(){
    return this.belongsToMany('App/Models/Message')
      .pivotTable('reciever_messages')
  }
}

module.exports = Group
