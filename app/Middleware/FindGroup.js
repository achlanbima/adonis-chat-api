const Group = use('App/Models/Group')

class FindGroup {
  async handle({ request, response, params: { id } }, next){
    const group = await Group.find(id)

    if(!group){
      return response.status(404).json({
        message: "Group not found",
        id
      })
    }

    request.body.group = group

    await next()
  }
}

module.exports = FindGroup