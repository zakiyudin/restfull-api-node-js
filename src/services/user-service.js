import { prismaClient } from "../app/databasel.js"
import { ResponseError } from "../errors/response-error.js"
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
        throw new ResponseError(400, 'username already exixts')
    }

    userReg.password = await bcrypt.hash(userReg.password, 10)

    return prismaClient.user.create({
        data: userReg,
        select: {
            username: true,
            name: true
        }
    })
}

export default {
    register
}