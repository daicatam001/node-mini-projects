const req = require('express/lib/request')
const controller = require('./controller')
const router = require('express').Router()

router.post('/login', controller.login)

module.exports = router