const jwt = require('jsonwebtoken')

exports.jwtSign = (data, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret, { algorithm: 'RS256' }, (error, token) => {
            if (error) {
                reject(error)
            } else {
                resolve(token)
            }
        })
    })
}
