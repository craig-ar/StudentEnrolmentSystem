/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import StudentsController from '#controllers/students_controller'
import router from '@adonisjs/core/services/router'
import { StudentFactory } from '#database/factories/student_factory'
import AuthController from '../app/controllers/auth_controller.js'
import {middleware } from '#start/kernel'

//router.get('/students', [StudentsController, 'index'])
router
.group(() => {

  router.resource('students', StudentsController).apiOnly()

  router.get('/create-students', async () => {
    await StudentFactory.createMany(5)


  })
})

.prefix('/api/v1')

.use(
  middleware.auth({
    guards: ['api']
  })
)

// router.post('register', [AuthController, 'register'])

router
  .group(() => {
    router.post('signup', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])

  } )
  .prefix('api/v1/user')