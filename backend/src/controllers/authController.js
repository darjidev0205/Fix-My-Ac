const { z } = require('zod')
const { ApiError } = require('../utils/apiError')
const { getAdmin } = require('../utils/firebaseAdmin')
const { User } = require('../models/User')

async function sync(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) throw new ApiError(401, 'Missing Authorization Bearer token')

    const admin = getAdmin()
    const decoded = await admin.auth().verifyIdToken(token)

    const payload = {
      uid: decoded.uid,
      email: decoded.email || null,
      phoneNumber: decoded.phone_number || null,
      lastLoginAt: new Date(),
    }

    const user = await User.findOneAndUpdate(
      { uid: decoded.uid },
      { $set: payload, $setOnInsert: { role: 'user' } },
      { new: true, upsert: true },
    ).lean()

    res.json({
      user: {
        uid: user.uid,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    })
  } catch (err) {
    next(new ApiError(401, 'Unauthorized', { reason: err.message }))
  }
}

async function logout(_req, res) {
  res.json({ ok: true })
}

const setRoleSchema = z.object({
  uid: z.string().min(1),
  role: z.enum(['user', 'technician', 'admin']),
})

async function setRole(req, res, next) {
  try {
    const body = setRoleSchema.parse(req.body)
    const user = await User.findOneAndUpdate(
      { uid: body.uid },
      { $set: { role: body.role } },
      { new: true },
    ).lean()
    if (!user) throw new ApiError(404, 'User not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

module.exports = { sync, logout, setRole }

