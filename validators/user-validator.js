const Joi = require('joi');

module.exports = function userValidator(doc) {
    const joiSchema = Joi.object({
        name: Joi
            .string()
            .min(2)
            .required()/* .regex(new RegExp('^[a-zA-Z](3-30)$')) */,
        email: Joi
            .string()
            .min(2)
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net', 'in']
                }
            }).
            required(),
        tel: Joi
            .string()
            .min(2)
            .required()/* .regex('^[0-9](8-12)$') */,
        password: Joi
            .string()
            .min(2)
            .required()
    })

    const validateRequest = joiSchema.validate(doc)

    if (validateRequest.error) {
        const errorType = validateRequest.error.name;
        const errorMessage = validateRequest.error.message;

        return {
            errorType,
            status: 422,
            message: errorMessage
        }
    }

    return {
        errorType: null,
        status: 200,
        message: 'success'
    }
}
