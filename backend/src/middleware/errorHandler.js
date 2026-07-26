function errorHandler(err, _req, res, _next) {
  const status = Number(err.status || 500)
  const message = err.message || 'Internal Server Error'

  // eslint-disable-next-line no-console
  if (status >= 500) console.error(err)

  res.status(status).json({
    message,
    details: err.details || undefined,
  })
}

module.exports = { errorHandler }

