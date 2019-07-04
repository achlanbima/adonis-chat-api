'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({request, response}) => {
  response.json('HEY')
})

Route.group(() => {
  Route.post('login', 'UserController.login')
  Route.post('logout', 'UserController.logout')
  Route.post('register', 'UserController.register')
  Route.get('getUser', 'UserController.show')
  Route.get('/', 'UserController.index')
  Route.patch('/:id', 'UserController.update').middleware(['findUser'])
}).prefix('users')

Route.group(() => {
  Route.post('/', 'MessageController.store').middleware(['auth'])
  Route.get('/', 'MessageController.index').middleware(['auth'])
  Route.get('/:id', 'MessageController.show').middleware(['auth'])
  Route.delete('/:id', 'MessageController.destroy').middleware(['auth'])
}).prefix('message')

Route.group(() => {
  Route.get('/', 'GroupController.index')
  Route.get('/:id', 'GroupController.show')
  Route.post('/', 'GroupController.store')
  Route.patch('/:id', 'GroupController.update').middleware(['findGroup'])
  Route.delete('/:id', 'GroupController.delete').middleware(['findGroup'])
  
  
}).prefix('group')

Route.get('/groupMessage/:id', 'GroupController.showMessage')