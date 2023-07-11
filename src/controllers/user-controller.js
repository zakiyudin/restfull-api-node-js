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
            data: {
                username: result.username,
                name: result.name,
                token: result.token
            }
        })
    } catch (error) {
        next(error)
    }
}

export default {
    registration,
    login
}