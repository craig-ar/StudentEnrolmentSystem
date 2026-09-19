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

//router.get('/students', [StudentsController, 'index'])
router
.group(() => {

  router.resource('students', StudentsController).apiOnly()

  router.get('/create-students', async () => {
    await StudentFactory.createMany(5)
  //return {
  //  hello: 'world',
  //}
  })
})
.prefix('/api/v1')
