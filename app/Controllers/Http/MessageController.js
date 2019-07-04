'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with messages
 */

const Message = use('App/Models/Message')
const { validate } = use('Validator')
const Encryption = use('Encryption')
const jwtDecode = use('jwt-decode')


class MessageController {
  
  async index ({ request, response, auth }) {
    
    const token = auth.getAuthHeader()

    

    const messages = await Message.query()
      .with('group', groupQuery => groupQuery.where({id:4}))
      .with('user', userQuery => {
        userQuery.select('id','username')
      })
      .fetch()

    response.status(200).json({
      message: "Here are all messages",
      data: messages
    })
  }

  async create ({ request, response, view }) {

  }
  
  async store ({ request, response , auth}) {

    const {message, user_id, reciever_id, reciever_group_id} = request.post()

    const rules = {
      message: 'required',
      user_id: 'required'
    }
    const token = await auth.getAuthHeader()
    const decoded = jwtDecode(token)

    const post = {
      message, 
      user_id:decoded.uid}
  
    const validation = await validate(post, rules)
  
    if (validation.fails()) {
      return {
        message : "Error",
        data : validation.messages()
      }
    }
  
    const data = await Message.create(post)
    
    if(reciever_id){
      await data.reciever().attach(reciever_id)
      data.reciever_id = await data.reciever().fetch()
    }
    
    if(reciever_group_id){
      await data.group().attach(reciever_group_id)
      data.reciever_group_id = await data.group().fetch()
    }
  
    return {
      message: "Success",
      data
    }
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
    await Message.query().where({id: params.id}).delete();

    response.status(200).send("Deleted")
  }
}

module.exports = MessageController
