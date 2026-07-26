const { Booking } = require('../models/Booking')
const { calculateQuote } = require('../services/pricingService')

function generateBookingNumber() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CC-${dateStr}-${randomHex}`
}

async function createBooking(req, res, next) {
  try {
    const { customer, address, service, serviceSelections, appointment, notes } = req.body
    
    // Extract service inputs safely
    const selections = serviceSelections || service || req.body.job || {}

    // Recalculate quote authoritatively on backend
    const quoteSnapshot = await calculateQuote(selections)

    const bookingNumber = generateBookingNumber()

    const booking = new Booking({
      bookingNumber,
      userId: req.user?._id || null,
      customer: {
        fullName: customer?.fullName || customer?.name || 'Valued Customer',
        email: customer?.email || 'customer@example.com',
        phone: customer?.phone || '+919624328554',
      },
      address: {
        house: address?.house || address?.address || '',
        street: address?.street || '',
        landmark: address?.landmark || '',
        city: address?.city || customer?.city || 'Ahmedabad',
        state: address?.state || 'Gujarat',
        postalCode: address?.postalCode || '380001',
      },
      service: {
        serviceType: quoteSnapshot.serviceType.id,
        acUnitType: quoteSnapshot.acUnitType.id,
        tonnage: quoteSnapshot.tonnage.id,
        copperPipeMeters: quoteSnapshot.copperPipeMeters,
        selectedAddons: quoteSnapshot.selectedAddons,
      },
      quoteSnapshot,
      appointment: {
        date: appointment?.date || req.body.preferredDate || new Date().toISOString().split('T')[0],
        timeSlot: appointment?.timeSlot || req.body.preferredSlot || 'Morning (9 AM - 12 PM)',
      },
      status: 'pending',
      notes: notes || '',
    })

    await booking.save()

    res.status(201).json({
      success: true,
      data: booking,
    })
  } catch (err) {
    next(err)
  }
}

async function getMyBookings(req, res, next) {
  try {
    const query = req.user ? { userId: req.user._id } : {}
    const bookings = await Booking.find(query).sort({ createdAt: -1 }).limit(20)
    res.json({
      success: true,
      data: bookings,
    })
  } catch (err) {
    next(err)
  }
}

async function getBookingById(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' })
    }
    res.json({
      success: true,
      data: booking,
    })
  } catch (err) {
    next(err)
  }
}

async function cancelBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' })
    }
    booking.status = 'cancelled'
    await booking.save()
    res.json({
      success: true,
      data: booking,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
}
