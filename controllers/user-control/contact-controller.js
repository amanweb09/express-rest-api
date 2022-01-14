const Contact = require("../../models/Contact");

module.exports = function contactController() {
    return {
        async contact(req, res) {
            const { message } = req.body;

            if (!message) {
                return res.status(422).json({ err: 'Please leave a message for us!' })
            }

            const contactMessage = new Contact({
                userId: req._id,
                email: req.email,
                tel: req.tel,
                message
            })

            try {
                const saveRequest = await contactMessage.save();
                return res.status(201).json({ message: "We've saved your message!" })

            } catch (error) {
                console.log(error);
                return res.status(500).json({ err: 'Something went wrong!' })
            }
        }
    }
}