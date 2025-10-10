import Joi from "joi"

export const createIdolSchema = Joi.object({
    Id:Joi.number().required(),
    StageName: Joi.string().min(1).max(50).required(),
    FullName: Joi.string().optional(),
    KoreanName: Joi.string().optional(),
    KoreanStageName: Joi.string().optional(),
    DateOfBirth: Joi.date().iso().optional(),
    Group: Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required()
    }).required(),
    Country: Joi.string().required(),
    Birthplace: Joi.string().optional(),
    SecondGroup: Joi.string().optional(),
    Gender: Joi.string().valid("M", "F", "Other").optional()
});

export const updateIdolSchema = Joi.object({
    Id:Joi.number().optional(),
    StageName: Joi.string().min(1).max(50).optional(),
    FullName: Joi.string().optional(),
    KoreanName: Joi.string().optional(),
    KoreanStageName: Joi.string().optional(),
    DateOfBirth: Joi.date().iso().optional(),
    Group: Joi.object({
        name: Joi.string().optional(),
        url: Joi.string().uri().optional()
    }).required(),
    Country: Joi.string().optional(),
    Birthplace: Joi.string().optional(),
    SecondGroup: Joi.string().optional(),
    Gender: Joi.string().valid("M", "F", "Other").optional()
}).min(1);