const Joi = require('@hapi/joi');

const addressSchema = Joi.object({
    address: Joi.string().required().min(5),
    streetNumber: Joi.string().required().min(1),
    neighborhood: Joi.string().required(5)
});

const clientSchema = Joi.object({
    firstName: Joi.string().required().min(5),
    lastName: Joi.string().required().min(5),
    email: Joi.string().required().min(10),
    birthDay: Joi.date().required(),
    address: addressSchema.required()
})


module.exports = {
    addressSchema,
    clientSchema
}
