const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1d'
        })

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }
    async validateToken(token) {
        try {
            const validity = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return validity
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async validateRefreshToken(token) {
        try {
            const validity = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return validity;
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

module.exports = new TokenService()