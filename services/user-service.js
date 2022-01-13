const mongoose = require('mongoose');
const Users = require('../models/User');

class UserService {
    async findUser(filter) {
        try {
            return await Users.findOne(filter);
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async createUser(user) {
        const newUser = new Users(user);
        try {
            return await newUser.save()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

module.exports = new UserService()