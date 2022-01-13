const HashingService = require("../../services/hashing-service");
const UserService = require("../../services/user-service");
const Joi = require('joi');

const signupController = () => {
    return {
        async createUser(req, res) {
            const { name, email, tel, password } = req.body;

            if (!name || !email || !tel || !password) {
                return res
                    .status(422)
                    .json({ err: 'Please fill all the fields!' })
            }

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

            const validateRequest = joiSchema.validate(req.body)

            if (validateRequest.error) {
                const errorType = validateRequest.error.name;
                const errorMessage = validateRequest.error.message;
                if (errorType == 'ValidationError') {
                    return res
                        .status(422)
                        .json({ err: errorMessage })
                }
            }

            const user = await UserService.findUser({
                $or: [
                    { email },
                    { tel }]
            })

            if (user) {
                return res
                    .status(402)
                    .json({ err: 'User already exists with this email/contact number!' })
            }

            const hash = await HashingService.hashPassword(password)

            if (hash) {
                const newUser = { name, email, tel, password: hash }
                const saveUser = await UserService.createUser(newUser)

                if (saveUser) {
                    return res
                        .status(201)
                        .json({ message: 'Signup successful.. Please Login!' })
                }

                return res
                    .status(500)
                    .json({ err: 'Something went wrong...' })

            }

            return res
                .status(500)
                .json({ err: 'Hashing error' })
        }
    }
}

module.exports = signupController;