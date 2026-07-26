const express = require('express')
const { me, bookings } = require('../controllers/userController')
const { requireAuth } = require('../middleware/requireAuth')

const router = express.Router()

router.get('/me', requireAuth, me)
router.get('/bookings', requireAuth, bookings)

module.exports = { userRoutes: router }

