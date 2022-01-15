const Joi = require('joi');

module.exports = function validateBlog(doc) {
    const joiBlogSchema = Joi.object({
        title: Joi
            .string()
            .min(4)
            .required(),
        desc: Joi
            .string()
            .min(10)
            .required(),
        heroImg: Joi
            .string()
            .required(),
        slug: Joi
            .string()
            .required(),
        html: Joi
            .string()
            .required()
    })

    const validateBlog = joiBlogSchema.validate(doc);

    if (validateBlog.error) {
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