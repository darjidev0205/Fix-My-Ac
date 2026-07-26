const admin = require('firebase-admin')

let inited = false

function initFirebaseAdmin() {
  if (inited) return

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH

  if (json) {
    const serviceAccount = JSON.parse(json)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    inited = true
    return
  }

  if (path) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const serviceAccount = require(path)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    inited = true
    return
  }

  // Fallback: ADC (works on deployed environments with proper IAM)
  admin.initializeApp()
  inited = true
}

function getAdmin() {
  initFirebaseAdmin()
  return admin
}

module.exports = { getAdmin }

