const userService = require("../../services/user-service");

const userController = () => {
    return {
        viewProfile(req, res) {
            return res.status(200).json({
                user: {
                    name: req.name,
                    _id: user._id,
                    email: user.email,
                    tel: user.tel
                }
            })
        }
    }
}

module.exports = userController