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

    bio: Joi.string()
        .max(500)
        .allow("")
        .default(""),

    profileImage: Joi.string()
        .uri()
        .allow("")
        .default(""),

    hourlyRate: Joi.number()
        .min(0)
        .default(0),

    location: Joi.string()
        .allow("")
        .default(""),

    experienceLevel: Joi.string()
        .valid("beginner", "intermediate", "expert")
        .default("beginner"),

    skills: Joi.array()
        .items(Joi.string())
        .default([]),

    portfolio: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .required(),

                description: Joi.string()
                    .allow("")
                    .default(""),

                link: Joi.string()
                    .uri()
                    .allow("")
                    .default("")
            })
        )
        .default([])
});


const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

const updateProfileSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50),

    bio: Joi.string()
        .max(500)
        .allow(""),

    profileImage: Joi.string()
        .uri()
        .allow(""),

    hourlyRate: Joi.number()
        .min(0),

    location: Joi.string()
        .allow(""),

    experienceLevel: Joi.string()
        .valid("beginner", "intermediate", "expert"),

    skills: Joi.array()
        .items(Joi.string()),

    portfolio: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .required(),

                description: Joi.string()
                    .allow("")
                    .default(""),

                link: Joi.string()
                    .uri()
                    .allow("")
                    .default("")
            })
        )
}).min(1);


module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema
};