const express = require('express')
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} = require('../controllers/bookingController')

const router = express.Router()

router.post('/', createBooking)
router.get('/my', getMyBookings)
router.get('/:id', getBookingById)
router.patch('/:id/cancel', cancelBooking)

module.exports = { bookingRoutes: router }
