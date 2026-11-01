import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { createStudentValidator, updateStudentValidator } from '#validators/student'

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

    const payload = await request.validateUsing(createStudentValidator)

    const student = await Student.create(payload)

    return response.ok(`Student: \n ${studentID}\n ${givenName} ${lastName}\n ${emailAddress}\nwas added to the Database.`)

    //const student = await Student.create({
    //  StudentID: studentID,
    //  GivenName: givenName,
    //  LastName: lastName,
    //  EmailAddress: emailAddress,
    //})

    return response.ok(student)
  }

  /**
   * Show individual record
   */
  async show({ response, params }: HttpContext) {
    try{
      const student = await Student.find(params.id)
      return student
    } catch (ModelNotFoundException) {
      return response.notFound({message: 'Student not found' })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
  //  const fName = request.input('GivenName')
  //  const lName = request.input('LastName')
  //  const email = request.input('EmailAddress')

    let stud: Student

    try{
      stud = await Student.findOrFail(params.id)
    } catch (ModelNotFoundException) {
      return response.notFound(`Student, ${params.id} does not exist`)
    }

    const payload = request.all()
    
    if (request.method() == 'PUT') {
      await request.validateUsing(updateStudentValidator)
    }
    
    await stud.merge(payload).save()

    return response.ok(`Student ${params.id} was updated successfully`)

  //   try {
  //     const student = await Student.findOrFail(params.id)

  //     await student.merge({
  //       GivenName: fName,
  //       LastName: lName,
  //       EmailAddress: email
  //     }).save()
  //     return response.ok(`Student, ${fName} ${lName} was updated successfully`)
  //   } catch (ModelNotFoundException) {
  //     return response.notFound(`Student ${params.id} was not found`)
  //   }
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