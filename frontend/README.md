# FixMyAC / Climate Clarity Frontend

React + Vite frontend for Climate Clarity AC Installation & Repair service, completely integrated with Firebase Authentication.

---

## 🛠 Firebase Console Configuration Guide

To ensure all authentication features (Email/Password & Phone OTP) function correctly, please follow these steps in your Firebase Console:

### 1. Enable Authentication Providers
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Select project **ac-service-dbfe0** (or your active Firebase project).
3. In the left menu, navigate to **Build** → **Authentication** → **Sign-in method**.
4. Enable the following sign-in providers:
   - **Email/Password**: Click *Enable* and save.
   - **Phone**: Click *Enable* and save.

> ⚠️ **SMS Billing & Limits Notice**: Phone authentication requires SMS delivery. Depending on your Firebase plan (Spark vs. Blaze) and region, free tier daily SMS quotas may apply. Consider adding billing if higher SMS volume is required.

### 2. Configure Authorized Domains
1. Go to **Authentication** → **Settings** → **Authorized domains**.
2. Ensure the following domains are listed in the authorized list:
   - `localhost`
   - `127.0.0.1`
   - Your production domain (e.g. `yourdomain.com`)
   - Your Vercel / hosting domain (e.g. `ac-service.vercel.app`)

---

## 🧪 Setting Up Test Phone Numbers for Development

To avoid consuming real SMS quotas during testing, configure test phone numbers in Firebase:

1. Go to **Firebase Console** → **Authentication** → **Sign-in method** → **Phone**.
2. Expand the **Phone numbers for testing** section.
3. Add a test phone number and fixed verification code, e.g.:
   - **Phone number**: `+919999999999`
   - **Test code**: `123456`
4. Use this number when testing Phone OTP in your local environment.

---

## 🔒 Backend Integration & Security Notice

For secure protected operations:

1. Frontend sends the Firebase ID Token in the request header:
   ```http
   Authorization: Bearer <firebase-id-token>
   ```
2. The backend server must verify ID tokens using the **Firebase Admin SDK**:
   ```javascript
   const decodedToken = await admin.auth().verifyIdToken(idToken);
   const uid = decodedToken.uid;
   ```
3. Never send or trust plain Firebase UIDs from the client as proof of identity.
4. Keep all Firebase service account keys and backend credentials strictly on the backend.
