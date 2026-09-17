const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    role: Joi.string()
        .valid("client", "freelancer")
        .required(),

    skills: Joi.array()
        .items(Joi.string())
        .default([])
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

module.exports = {
    registerSchema,
      loginSchema
};