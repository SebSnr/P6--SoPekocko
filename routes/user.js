const express = require('express')
const router = express.Router()

const verifyPassword = require('../middleware/verifyPassword')
const userCtrl = require('../controllers/user')
const limiter = require('../middleware/rate-limiter')

router.post('/signup', verifyPassword, userCtrl.signup)
router.post('/login', limiter, userCtrl.login)

module.exports = router
