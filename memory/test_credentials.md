# Nimad Zayka — Admin Credentials

## Admin login
- URL (public): `{REACT_APP_BACKEND_URL}/admin/login`
- Email: `nimadzayka@gmail.com`
- Password: `Nikesh@09`
- Role: `admin`

The admin is seeded on backend startup from `backend/.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`). If `.env` values change, the backend re-hashes the password on next startup.

## Auth endpoints
- POST `/api/admin/login` → `{ token, email, role }`
- GET  `/api/admin/me` — Bearer token required
- GET  `/api/admin/stats` — Bearer token required

## Admin product CRUD (Bearer token required)
- POST   `/api/admin/products`
- PUT    `/api/admin/products/{slug}`
- DELETE `/api/admin/products/{slug}`

## Admin inquiries & settings
- GET `/api/inquiries` — **admin only** (was public in v1; now protected)
- PUT `/api/admin/settings`
- GET `/api/settings` — public, consumed by SettingsContext on the frontend
