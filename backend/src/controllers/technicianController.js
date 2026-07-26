const { Technician } = require('../models/Technician')
const { Booking } = require('../models/Booking')
const { ApiError } = require('../utils/apiError')

async function list(req, res, next) {
  try {
    const city = req.query.city
    const q = { isActive: true }
    if (city) q.city = city
    const items = await Technician.find(q).sort({ rating: -1 }).limit(24).lean()
    res.json({ items })
  } catch (err) {
    next(err)
  }
}

async function myJobs(req, res, next) {
  try {
    if (!req.user) throw new ApiError(401, 'Unauthorized')

    const tech = await Technician.findOne({ userId: req.user._id }).lean()
    if (!tech) throw new ApiError(404, 'Technician profile not found')

    const items = await Booking.find({
      'assignment.technicianId': tech._id,
      status: { $in: ['assigned', 'accepted', 'in_progress', 'completed', 'rejected'] },
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    res.json({ items })
  } catch (err) {
    next(err)
  }
}

async function myStats(req, res, next) {
  try {
    if (!req.user) throw new ApiError(401, 'Unauthorized')
    const tech = await Technician.findOne({ userId: req.user._id }).lean()
    if (!tech) throw new ApiError(404, 'Technician profile not found')

    const completed = await Booking.countDocuments({
      'assignment.technicianId': tech._id,
      status: 'completed',
    })

    // Simple earnings model: 12% of totals on completed jobs.
    const completedJobs = await Booking.find({
      'assignment.technicianId': tech._id,
      status: 'completed',
    })
      .select({ 'pricing.total': 1 })
      .lean()
    const gross = completedJobs.reduce((s, b) => s + (b.pricing?.total || 0), 0)
    const earnings = Math.round(gross * 0.12)

    res.json({ earnings, completed })
  } catch (err) {
    next(err)
  }
}

async function accept(req, res, next) {
  try {
    if (!req.user) throw new ApiError(401, 'Unauthorized')
    const tech = await Technician.findOne({ userId: req.user._id }).lean()
    if (!tech) throw new ApiError(404, 'Technician profile not found')

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.jobId, 'assignment.technicianId': tech._id },
      { $set: { status: 'accepted', 'assignment.acceptedAt': new Date() } },
      { new: true },
    ).lean()

    if (!booking) throw new ApiError(404, 'Job not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

async function reject(req, res, next) {
  try {
    if (!req.user) throw new ApiError(401, 'Unauthorized')
    const tech = await Technician.findOne({ userId: req.user._id }).lean()
    if (!tech) throw new ApiError(404, 'Technician profile not found')

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.jobId, 'assignment.technicianId': tech._id },
      { $set: { status: 'rejected', 'assignment.rejectedAt': new Date() } },
      { new: true },
    ).lean()

    if (!booking) throw new ApiError(404, 'Job not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

module.exports = { list, myJobs, myStats, accept, reject }

