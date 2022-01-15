const Joi = require('joi');

class OrderValidator {
    validateOrder(doc) {
        const orderSchema = Joi
            .object({
                customerId: Joi
                    .required(),
                products: Joi
                    .array()
                    .required(),
                totalPrice: Joi
                    .number()
                    .min(100)
                    .max(8000)
                    .required(),
                address: Joi
                    .string()
                    .min(6)
                    .required(),
                isPaid: Joi
                    .boolean()
                    .required(),
                promoApplied: Joi
                    .boolean()
                    .required(),
            })

        const validateOrder = orderSchema.validate(doc);

        if (validateOrder.error) {
            const errorType = validateOrder.error.name;
            const errorMessage = validateOrder.error.message;

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
    validateCancellation(doc) {
        const JoiCancellationSchema = Joi
            .object({
                orderId: Joi
                    .string()
                    .required(),
                email: Joi
                    .string()
                    .min(2)
                    .email({
                        minDomainSegments: 2,
                        tlds: {
                            allow: ['com', 'net', 'in']
                        }
                    })
                    .required(),
                tel: Joi
                    .string()
                    .required(),
                reason: Joi
                    .string()
                    .required()
            })

        const validation = JoiCancellationSchema.validate(doc);

        if (validation.error) {
            const errorType = validateOrder.error.name;
            const errorMessage = validateOrder.error.message;

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
}

module.exports = new OrderValidator();