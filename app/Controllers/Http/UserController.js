'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')
var jwtDecode = require('jwt-decode')

class UserController {

  async index({response}){
    return await User.query().fetch()

  }

  async login({ request, response, auth }){
    const {email, password} = request.only(['email', 'password'])

    const token = await auth.attempt(email, password)

    return response.json({token})
  }

  async logout(auth){
    await auth.logout()

    return response.json({msg: "Logged out"})
  }

  async register({request, response}){

    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required',
      username: 'required|unique:users',
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.json(validation._errorMessages)
    }

    const {username, email, password} = request.only([
      'username', 
      'email', 'password'
    ])

    const user = await User.create({
      username,
    
      email,
      password
    })

    return response.json({msg: "success"})
  }

  async show({params, response, auth}){
    
    const token = await auth.getAuthHeader()
    const decoded = jwtDecode(token)
    
    const user = await User.query().select('id','username').where({id:decoded.uid}).with('groups', groupQuery => groupQuery.with('user', childUserQuery => childUserQuery.select('id','username'))).first()

    // const user = await User.query().where({id:decoded.uid}).with('messages').fetch()
    
    return response.json(user)
  }

  async update({request, response}){
    const { id, user , groups, username} = request.post()

    user.id = id || user.id
    user.username = username ||user.username

    await user.save(user)

    if(groups && groups.length > 0){
      await user.groups().detach()
      await user.groups().attach(groups)

      user.groups = await user.groups().fetch()
    }

    response.status(200).json({
      message: 'updated',
      data: user
    })


  }
}

module.exports = UserController
