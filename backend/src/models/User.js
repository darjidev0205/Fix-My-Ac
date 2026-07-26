const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true, index: true },
    email: { type: String, default: null, index: true },
    phoneNumber: { type: String, default: null, index: true },
    role: {
      type: String,
      enum: ['user', 'technician', 'admin'],
      default: 'user',
      index: true,
    },
    displayName: { type: String, default: null },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true },
)

const User = mongoose.model('User', UserSchema)
module.exports = { User }

