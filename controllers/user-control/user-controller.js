const userService = require("../../services/user-service");

const userController = () => {
    return {
        viewProfile(req, res) {
            return res.status(200).json({
                user: {
                    name: req.name,
                    _id: req._id,
                    email: req.email,
                    tel: req.tel
                }
            })
        }
    }
}

module.exports = userController