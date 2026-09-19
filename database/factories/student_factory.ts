import factory from '@adonisjs/lucid/factories'
import Student from '#models/student'

export const StudentFactory = factory
  .define(Student, async ({ faker }) => {
    const sID = faker.string.numeric(9)
    const fName = faker.person.firstName()
    const lname = faker.person.lastName()
    const email = faker.internet.email()

    return {
      StudentID: sID,
      GivenName: fName,
      LastName: lname,
      EmailAddress: email, 
    }
  })
  .build()