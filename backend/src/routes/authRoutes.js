const express = require('express')
const { sync, logout, setRole } = require('../controllers/authController')
const { requireAuth, requireRole } = require('../middleware/requireAuth')

const router = express.Router()

router.post('/sync', sync)
router.post('/logout', logout)

// Admin-only helper (optional)
router.post('/set-role', requireAuth, requireRole('admin'), setRole)

module.exports = { authRoutes: router }

