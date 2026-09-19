import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Student extends BaseModel {
  //@column({ isPrimary: true })
  //declare id: number

  @column({isPrimary:true, columnName:'StudentID'})
  declare StudentID: string

  @column({columnName:'GivenName'})
  declare GivenName:string

  @column({columnName:'LastName'})
  declare LastName: string

  @column({columnName:'EmailAddress'})
  declare EmailAddress: string
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}