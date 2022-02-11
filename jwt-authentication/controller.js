const bcrypt = require('bcrypt')

const SALT_ROUNDS = process.env.SALT_ROUNDS
const PASSWORD_HASH = process.env.PASSWORD_HASH
exports.signup = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({
            error: 'Username and password cannnot be empty'
        })
    }
    const salt = await bcrypt.genSalt(+SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, salt)
    // Store user with passwordHash and username
    res.json({ hash })
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password cannnot be empty'
        })
    }

    try {
        const result = await bcrypt.compare(password, PASSWORD_HASH)
        if (result) {
            return res.status(200).json({
                success: true
            })
        } else {
            return res.status(400).json({
                error: true
            })
        }
    } catch (e) {
        return res.status(400).json({ error: true })
    }
}