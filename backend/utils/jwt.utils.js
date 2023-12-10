const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const signJwt = (object, expiresIn) => {
    return jwt.sign(object, SECRET, { expiresIn })
}

const verifyJwt = (token) => {
    try {


        const decoded = jwt.verify(token, SECRET)

        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (error) {
        return {
            valid: false,
            expired: true,

            decoded: null
        }
    }
}

module.exports = {
    signJwt, verifyJwt
}