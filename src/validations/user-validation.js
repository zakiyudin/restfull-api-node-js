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

export {
    userRegistrationSchema,
    userLoginSchema
}