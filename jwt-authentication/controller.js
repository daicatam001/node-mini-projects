const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = process.env.SALT_ROUNDS
const PASSWORD_HASH = process.env.PASSWORD_HASH
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN


exports.signup = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({
            error: 'Username and password cannnot be empty'
        })
    }
    const salt = await bcrypt.genSalt(+SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, salt)

    // TODO:Store user with passwordHash and username

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
            const token = jwt.sign({ username }, JWT_SECRET_TOKEN,);
            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        username
                    }
                }
            })
        } else {
            return res.status(400).json({
                error: true
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true })
    }
}


