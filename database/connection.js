const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log('db connected ...');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: 'Database unavailable...' })
    }
}

module.exports = dbConnection;