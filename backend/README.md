# FixMyAC Backend (Express + Mongo + Firebase Auth)

## Setup

1) Copy env

```bash
cd backend
copy .env.example .env
```

2) Start MongoDB (local) or set `MONGODB_URI` to your hosted Mongo connection string.

3) Firebase Admin credentials (required for auth-protected endpoints)

Set one of:
- `FIREBASE_SERVICE_ACCOUNT_JSON` (stringified JSON)
- `FIREBASE_SERVICE_ACCOUNT_PATH` (path to JSON file)

4) Run

```bash
npm run dev
```

## Optional: seed technicians

```bash
node src/scripts/seedTechnicians.js
```

