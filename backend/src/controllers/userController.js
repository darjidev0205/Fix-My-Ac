const { Booking } = require('../models/Booking')
const { ApiError } = require('../utils/apiError')

async function me(req, res, next) {
  try {
    if (!req.user) throw new ApiError(401, 'Unauthorized')
    res.json({
      user: {
        uid: req.user.uid,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
        role: req.user.role,
      },
    })
  } catch (err) {
    next(err)
  }
}

async function bookings(req, res, next) {
  try {
    if (!req.user) throw new ApiError(401, 'Unauthorized')
    const items = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
    res.json({ items })
  } catch (err) {
    next(err)
  }
}

module.exports = { me, bookings }

