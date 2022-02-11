const jwt = require('jsonwebtoken')
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN

exports.authorize = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, JWT_SECRET_TOKEN)
        req.username = decodeToken.username
        next()
    } catch (e) {
        res.status(401).json({
            error: 'Unauthenticated'
        })
    }
}