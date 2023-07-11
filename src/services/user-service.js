import { prismaClient } from "../app/databasel.js"
import { ResponseError } from "../errors/response-error.js"
import { userLoginSchema, userRegistrationSchema } from "../validations/user-validation.js"
import { validation } from "../validations/validate.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

const register = async (request) => {
    const userReg = validation(userRegistrationSchema, request)

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

const login = async (request) => {
    const userLog = validation(userLoginSchema, request)

    const user = await prismaClient.user.findUnique({
        where: {
            username: userLog.username
        },
        select: {
            username: true,
            password: true
        }
    })

    if (!user) {
        throw new ResponseError(400, "username or password wrong")
    }

    const validPassword = await bcrypt.compare(userLog.password, user.password )
    
    if(!validPassword) {
        throw new ResponseError(400, 'username or password wrong')
    }

    const token = uuid().toString()

    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        }
    })
}

export default {
    register,
    login
}