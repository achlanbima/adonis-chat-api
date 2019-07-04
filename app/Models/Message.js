'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
  user(){
    return this.belongsTo('App/Models/User')
  }

  group(){
    return this.belongsToMany('App/Models/Group')
      .pivotTable('reciever_messages')
  }

  reciever(){
    return this.belongsToMany('App/Models/User')
      .pivotTable('reciever_messages')
  }


}

module.exports = Message
