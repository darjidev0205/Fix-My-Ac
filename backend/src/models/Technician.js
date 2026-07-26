const mongoose = require('mongoose')

const TechnicianSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true },
    city: { type: String, required: true, index: true },
    experienceYears: { type: Number, default: 1 },
    rating: { type: Number, default: 4.6 },
    jobsCompleted: { type: Number, default: 0 },
    onTimeRate: { type: Number, default: 92 },
    specialties: { type: [String], default: ['AC Install', 'Service'] },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
)

const Technician = mongoose.model('Technician', TechnicianSchema)
module.exports = { Technician }

