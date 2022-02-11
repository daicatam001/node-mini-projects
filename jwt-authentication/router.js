const req = require('express/lib/request')
const controller = require('./controller')
const router = require('express').Router()
const middleware = require('./middleware')
router.post('/login', controller.login)
router.post('/signup', controller.login)
router.get('/authorize', middleware.authorize, controller.authorize)

module.exports = router