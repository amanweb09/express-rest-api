const Contacts = require('../../models/Contact');

const admin_userController = () => {
    return {
        async fetchContacts(req, res) {
            try {
                const contacts = await Contacts.find()
                return res
                    .status(200)
                    .json({ contacts })
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: 'Something went wrong!' })
            }
        }
    }
}

module.exports = admin_userController;