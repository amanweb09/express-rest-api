const crypto = require('crypto')

class HashingService {
    hashPassword(password) {
       return crypto
            .createHash('sha256', process.env.HASH_SECRET)
            .update(password)
            .digest('hex')
    }
}

module.exports = new HashingService()