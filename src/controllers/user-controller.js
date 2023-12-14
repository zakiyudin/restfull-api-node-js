import { logger } from "../app/logging.js"
import userService from "../services/user-service.js"

const registration = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)

        console.log(result);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getUsername = async (req, res, next) => {
    try {
        const username = req.user.username
        const result = await userService.getUser(username)

        logger.info(result)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username
        const request = req.body
        request.username = username

        const result = await userService.updateUser(request)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username)
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    registration,
    login,
    getUsername,
    update,
    logout
}