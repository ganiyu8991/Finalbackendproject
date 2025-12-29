
import joi from 'joi'

export const userValidator = joi.object({
    username: joi.string().required().min(3).max(20),
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(20)
})

export const loginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(20)
})

