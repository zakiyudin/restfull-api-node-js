import { prismaClient } from "../app/databasel.js"
import { ResponseError } from "../errors/response-error.js"
import { getUsernameValidation, updateUsernameValidation, userLoginSchema, userRegistrationSchema } from "../validations/user-validation.js"
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
        throw new ResponseError(401, "username or password wrong")
    }

    const validPassword = await bcrypt.compare(userLog.password, user.password )
    
    if(!validPassword) {
        throw new ResponseError(401, 'username or password wrong')
    }

    const token = uuid().toString()

    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })
}

const getUser = async (username) => {
    username = validation(getUsernameValidation, username)

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true,
            password: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "username not found")
    }

    return user

}

const updateUser = async (request) => {
    const user = validation(updateUsernameValidation, request)

    console.log(user)
    const totalUsername = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if(totalUsername === null) {
        throw new ResponseError(404, 'username not found')
    }

    const data = {}

    if(user.name){
        data.name = user.name
    }

    if(user.password){
        data.password = await bcrypt.hash(user.password, 10)
    }

    console.log(data)
    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data
    })
}

const logout = async (username) => {
    username = validation(getUsernameValidation, username)

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    })

    if(!user) {
        throw new ResponseError(404, 'username not found')
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

export default {
    register,
    login,
    getUser,
    updateUser,
    logout
}