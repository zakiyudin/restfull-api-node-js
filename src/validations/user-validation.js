import Joi from 'joi'

const userRegistrationSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
})

const userLoginSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const getUsernameValidation = Joi.string().max(100).required()

const updateUsernameValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional()
})

export {
    userRegistrationSchema,
    userLoginSchema,
    getUsernameValidation,
    updateUsernameValidation
}