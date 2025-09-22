import Joi from "joi"

export const createGroupSchema = Joi.object({
    Id: Joi.number().required(),
    Name: Joi.string().min(1).max(50).required(),
    ShortName: Joi.string().min(1).max(20).optional(),
    KoreanName: Joi.string().min(1).max(50).required(),
    Debut: Joi.date().iso().optional(),
    Company: Joi.string().required(),
    CurrentMemberCount: Joi.number().required(),
    OriginalMemberCount: Joi.number().required(),
    FanbaseName: Joi.string().optional(),
    Active: Joi.boolean().required()
});

export const updateGroupSchema = Joi.object({
    Id: Joi.number().optional(),
    Name: Joi.string().min(1).max(50).optional(),
    ShortName: Joi.string().min(1).max(20).optional(),
    KoreanName: Joi.string().min(1).max(50).optional(),
    Debut: Joi.date().iso().optional(),
    Company: Joi.string().optional(),
    CurrentMemberCount: Joi.number().optional(),
    OriginalMemberCount: Joi.number().optional(),
    FanbaseName: Joi.string().optional(),
    Active: Joi.boolean().optional()
}).min(1); // isso garante que pelo menos um campo sera enviado