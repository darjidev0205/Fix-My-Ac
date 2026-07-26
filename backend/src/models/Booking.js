const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true, index: true },
    },
    preferredDate: { type: String, required: true },
    job: {
      acType: { type: String, enum: ['split', 'window'], required: true },
      tonnage: { type: Number, required: true },
      addOns: {
        copperMeters: { type: Number, default: 0 },
        wallBracket: { type: Boolean, default: false },
        drilling: { type: Boolean, default: false },
        gasRefill: { type: Boolean, default: false },
      },
    },
    pricing: {
      breakdown: { type: Object, required: true },
      total: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['requested', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'],
      default: 'requested',
      index: true,
    },
    assignment: {
      technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician', default: null },
      assignedAt: { type: Date, default: null },
      acceptedAt: { type: Date, default: null },
      rejectedAt: { type: Date, default: null },
    },
  },
  { timestamps: true },
)

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = { Booking }

