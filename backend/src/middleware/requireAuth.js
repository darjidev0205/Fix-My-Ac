const { ApiError } = require('../utils/apiError')
const { getAdmin } = require('../utils/firebaseAdmin')
const { User } = require('../models/User')

async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) throw new ApiError(401, 'Missing Authorization Bearer token')

    const admin = getAdmin()
    const decoded = await admin.auth().verifyIdToken(token)

    req.auth = {
      uid: decoded.uid,
      email: decoded.email || null,
      phoneNumber: decoded.phone_number || null,
    }

    const user = await User.findOne({ uid: decoded.uid }).lean()
    req.user = user || null
    next()
  } catch (err) {
    next(new ApiError(401, 'Unauthorized', { reason: err.message }))
  }
}

function requireRole(role) {
  return (req, _res, next) => {
    if (!req.user) return next(new ApiError(401, 'Unauthorized'))
    if (req.user.role !== role) return next(new ApiError(403, 'Forbidden'))
    return next()
  }
}

module.exports = { requireAuth, requireRole }

