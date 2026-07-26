const http = require('http')
const { app } = require('./app')
const { connectMongo } = require('./utils/connectMongo')

const PORT = Number(process.env.PORT || 5000)

async function main() {
  await connectMongo()
  const server = http.createServer(app)
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`FixMyAC API listening on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error:', err)
  process.exit(1)
})

