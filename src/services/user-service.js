import { prismaClient } from "../app/databasel.js"
import errorResponse from "../errors/error-response.js"
import { userRegistrationSchema } from "../validations/user-validation.js"
import { validate } from "../validations/validate.js"
import bcrypt from "bcrypt"

const register = async (request) => {
    const userReg = validate(userRegistrationSchema, request)

    const userCount = await prismaClient.user.count({
        where : {
            username: userReg.username
        }
    })

    if (userCount === 1) {
        throw new errorResponse(400, 'Bad Request')
    }

    userReg.password = await bcrypt.hash(userReg.password, 10)

    const result = prismaClient.user.create({
        data: userReg,
        select: {
            username: true,
            name: true
        }
    })

    return result
}

export default {
    register
}