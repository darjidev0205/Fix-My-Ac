const express = require('express')
const {
  list,
  myJobs,
  myStats,
  accept,
  reject,
} = require('../controllers/technicianController')
const { requireAuth, requireRole } = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', list)

router.get('/me/jobs', requireAuth, requireRole('technician'), myJobs)
router.get('/me/stats', requireAuth, requireRole('technician'), myStats)
router.post('/me/jobs/:jobId/accept', requireAuth, requireRole('technician'), accept)
router.post('/me/jobs/:jobId/reject', requireAuth, requireRole('technician'), reject)

module.exports = { technicianRoutes: router }

