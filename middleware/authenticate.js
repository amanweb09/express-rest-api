const tokenService = require('../services/token-service');
const userService = require('../services/user-service')

const authenticate = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(401).json({ err: 'Unauthorized access!' })
    }

    const validity = await tokenService.validateToken(accessToken)

    if (validity) {
        const user = await userService.findUser({ _id: validity._id });

        if (user) {
            req._id = user._id;
            req.name = user.name;
            req.email = user.email;
            req.tel = user.tel;

            return next()
        }
    }

    return res.status(401).json({ err: 'Unauthorized access!' })
}

module.exports = authenticate;