'use strict'

const Group = use('App/Models/Group')
var jwtDecode = require('jwt-decode')


class GroupController {
  async index ({ request, response, view, params }) {

    const id = params.id
    
    let group

    if(id){

      group = await Group.query().where({id:id}).with('message').with('user', userQuery => { 
        userQuery.select('id','username')} ).fetch()
    }else{
      group = await Group.query().with('message').with('user', userQuery => { 
        userQuery.select('id','username')} ).fetch()

    }
    

    return response.status(200).json({
      message: "Successfully retrieved Group",
      data: group
    })
  }

  async store ({ request, response, auth }) {
    const groupData = request.only(['name'])
    const token = await auth.getAuthHeader()
    const decoded = jwtDecode(token)

    const group = await Group.create({
      name:groupData.name,
      admin:decoded.uid
    })

    await group.user().attach(decoded.uid)


    return response.status(200).json({
      message: "Successfully created new Group",
      data: group
    })
  }

  async show ({ params, request, response, auth}) {

    return await Group.query().where({id:params.id}).with('message', messageQuery => messageQuery.with('user').orderBy('created_at', 'desc')).with('user', userQuery => { 
      userQuery.select('id','username')} ).first()

    // const userId = params.id

    // const token = await auth.getAuthHeader()
    // const decoded = jwtDecode(token)

    // const group = await Group.query().with('user', userQuery => { 
    //   userQuery.select('id','username') 
    //   userQuery.where({id : decoded.uid})} ).fetch()
    
    // return response.status(200).json({
    //   message: "Found your group",
    //   data: group
    // })


  }

  async update ({ params, request, response }) {
    const { name, group, users } = request.post()
    
    group.name = name || group.name

    await group.save()

    if(users && users.length > 0){
      await group.user().attach(users)
      group.users = await group.user().fetch()
    }

    // const id = params.id
    // const name = request.body.name

    return response.status(200).json({
      message: "Successfully updated Group",
      data: group
    })
  }

  async delete ({ params, request, response }) {
    const { group } = request.post()
    await group.delete()

    return response.status(200).json({
      message: "Successfully deleted this Group",
      data: true
    })
  }

  // this is group message
  
  async showMessage ({request, response, params}){
    return await Group.query().where({id: params.id}).with('message').first()

    
  }
}


module.exports = GroupController
