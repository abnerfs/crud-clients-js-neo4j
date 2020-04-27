const Joi = require('@hapi/joi');

const addressSchema = Joi.object({
    address: Joi.string().required(),
    streetNumber: Joi.string().required().min(1),
    neighborhood: Joi.string().required(),
    zipcode: Joi.string().required()
});

const clientSchema = Joi.object({
    id: Joi.string().optional(),
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    email: Joi.string().required().min(10),
    birthDay: Joi.date().required(),
    address: addressSchema.required(),
    phone: Joi.string().required()
})


module.exports = {
    addressSchema,
    clientSchema
}
