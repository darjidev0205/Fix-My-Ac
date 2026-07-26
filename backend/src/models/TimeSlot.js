const mongoose = require('mongoose')

const TimeSlotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, index: true },
    slotId: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    label: { type: String, required: true },
    capacity: { type: Number, default: 10 },
    bookedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

TimeSlotSchema.index({ date: 1, slotId: 1 }, { unique: true })

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema)
module.exports = { TimeSlot }
