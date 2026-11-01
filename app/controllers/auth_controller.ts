import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"

export default class AuthController {
    async register({ request}: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')
        const fullName = request.input('fullName')

        const newUser = new User()
        newUser.email = email
        newUser.password = password
        newUser.fullName = fullName

        await newUser.save()
        const token = await User.accessTokens.create(newUser)

        return token
    }

        async login({ request}: HttpContext) {
            const email = request.input('email')
            const password = request.input('password')

            const user = await User.verifyCredentials(email, password)
            const token = await User.accessTokens.create(user)

            return token


    }
}