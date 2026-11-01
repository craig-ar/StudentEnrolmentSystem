import vine from '@vinejs/vine'

export const createStudentValidator = vine.create({
    StudentID: vine.string().trim().maxLength(9),
    GivenName: vine.string().trim().maxLength(50),
    LastName: vine.string().trim().maxLength(50),
    EmailAddress: vine.string().trim().email().maxLength(50).unique({
        table: 'students',
        column: 'EmailAddress',
        caseInsensitive: true
    })
})

export const updateStudentValidator = vine.create({
    GivenName: vine.string().trim().minLength(1).maxLength(50),
    LastName: vine.string().trim().minLength(1).maxLength(50),
    EmailAddress: vine.string().trim().minLength(1).email().maxLength(50)
})