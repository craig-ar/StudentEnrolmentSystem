import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const students = await Student.all()
    return students
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const studentID = request.input('StudentID')
    const givenName = request.input('GivenName')
    const lastName = request.input('LastName')
    const emailAddress = request.input('EmailAddress')

    const student = await Student.create({
      StudentID: studentID,
      GivenName: givenName,
      LastName: lastName,
      EmailAddress: emailAddress,
    })

    return response.ok(student)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const student = await Student.find(params.id)
    return student
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const fName = request.input('GivenName')
    const lName = request.input('LastName')
    const email = request.input('EmailAddress')

    try {
      const student = await Student.findOrFail(params.id)

      await student.merge({
        GivenName: fName,
        LastName: lName,
        EmailAddress: email
      }).save()
      return response.ok(`Student, ${fName} ${lName} was updated successfully`)
    } catch (ModelNotFoundException) {
      return response.notFound(`Student ${params.id} was not found`)
    }
  }

  /**
   * Delete record
   */
  async destroy({ response, params }: HttpContext) {
    const id = params.id

    try {
      const student = await Student.findOrFail(id)

      await student.delete()

      return response.ok(`Student ${id} was deleted successfully`)
    }
    catch (ModelNotFoundException) {

      return response.notFound(`Student ${id} was not found`)
    }
  }


}