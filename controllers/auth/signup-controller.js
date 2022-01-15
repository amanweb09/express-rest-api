const HashingService = require("../../services/hashing-service");
const UserService = require("../../services/user-service");
const Joi = require('joi');
const userValidator = require("../../validators/user-validator");

const signupController = () => {
    return {
        async createUser(req, res) {
            const { name, email, tel, password } = req.body;

            if (!name || !email || !tel || !password) {
                return res
                    .status(422)
                    .json({ err: 'Please fill all the fields!' })
            }

            const { errorType, status, message } = userValidator(req.body)

            if (errorType) {
                return res
                    .status(status)
                    .json({ err: message })
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