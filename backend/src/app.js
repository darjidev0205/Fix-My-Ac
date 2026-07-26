const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const { notFound } = require('./middleware/notFound')
const { errorHandler } = require('./middleware/errorHandler')

const { authRoutes } = require('./routes/authRoutes')
const { pricingRoutes } = require('./routes/pricingRoutes')
const { bookingRoutes } = require('./routes/bookingRoutes')
const { technicianRoutes } = require('./routes/technicianRoutes')
const { userRoutes } = require('./routes/userRoutes')

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || true,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/pricing', pricingRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/technicians', technicianRoutes)
app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = { app }

