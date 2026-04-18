# Nimad Zayka Spices — PRD

## Original Problem Statement
Build a professional, modern corporate + e-commerce website for **Nimad Zayka Spices Pvt. Ltd.**, a premium spice manufacturing company based in Rajpur, Madhya Pradesh. Blend the traditional Nimadi / Pithora village art with a sleek modern corporate look. Tagline: "The Soul of Nimad, the Spirit of Purity." — "Swaad jo Nimad se aayo". Founder: Mukesh Kushwah (Mukesh & Sons Masala Udhyog → Nimad Zayka Pvt. Ltd.). Dual locations: Rajpur factory (451447) + Indore Scheme 51 marketing office.

## User Decisions (Feb 2026)
- **Checkout**: Inquiry / lead form only (no real payments).
- **Products**: Standard Pouch — Haldi, Mirchi, Dhaniya, Garam Masala. Premium Box — Meat Masala, Garam Masala, Shahi Paneer Masala, Dal Bati Masala, Khada Masala. Variants 20g / 50g / 100g etc.
- **Admin panel**: Not needed for v1.
- **WhatsApp & Phone**: +91 62659 96333
- **Email**: info@nimadzayka.com

## Personas
1. **Home cook / retail buyer** — shops samples or small quantities, submits inquiry.
2. **Distributor / retailer** — bulk inquiry via Indore office through Join Us.
3. **Raw-material supplier / farmer** — partnership inquiry.
4. **Influencer / creator** — collab inquiry.
5. **Job seeker** — career inquiry.

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). Routes under `/api`. Startup seeds 9 products.
- **Frontend**: React 19 + CRA + Tailwind + shadcn primitives + sonner + lucide + react-router v7. Fonts: Fraunces (serif, headings) + Manrope (sans, body). FontAwesome for social/village icons.
- **No auth** (public site, no payments).

## Iteration 3 — 2026-02 (Admin Panel)
- ✅ JWT-based admin auth (bcrypt + PyJWT). Admin seeded on startup from `backend/.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
- ✅ Endpoints: `POST /api/admin/login`, `GET /api/admin/me`, `GET /api/admin/stats`, products CRUD (`POST/PUT/DELETE /api/admin/products`), `GET/PUT /api/admin/settings`, `GET /api/inquiries` now admin-protected. Public `GET /api/settings` added.
- ✅ Admin UI (`/admin/*`): Login, Dashboard (stats + by-type breakdown), Products (table + modal form + create/edit/delete + featured toggle), Inquiries (filter + detail modal), Settings (contact + 3 hero slides including Hindi).
- ✅ `SettingsContext` fetches `/api/settings` on app start; HeroSlider / WhatsAppButton / Footer consume it so admin edits reflect on the public site after reload.
- ✅ `AdminProtectedRoute` + auto-401 redirect via axios interceptor.
- ✅ Credentials saved to `/app/memory/test_credentials.md`.
- ✅ Testing: 22/22 backend + all frontend admin flows + regression pass (iteration_3.json). Testing agent caught & fixed one stale `HERO_SLIDES` reference in HeroSlider.jsx.

## Implemented (2026-02)
- ✅ Backend models: Product, Variant, Inquiry. Seeder for 9 products.
- ✅ Endpoints: `GET /api/`, `/api/products`, `/api/products/{slug}`, `/api/categories`, `POST /api/inquiries` (discriminated by type: cart/contact/sample/supplier/career/distributor/influencer), `GET /api/inquiries`.
- ✅ Pages: Home, About, Products, CSR, Join Us, Contact.
- ✅ Global Layout: Navbar (dark/maroon logo safe), Footer, WhatsApp floating button, Inquiry Sheet (right-side), Sonner toaster.
- ✅ Brand design system: earthy palette (chilli, maroon, turmeric, leaf, parchment, earth, black), Pithora/Warli SVG dividers, custom brand buttons.
- ✅ Components: ProductCard (variant picker), InquirySheet (cart + inline form), PartnershipDialog (role-specific), PithoraDivider, Logo.
- ✅ All interactive elements have `data-testid`.
- ✅ Testing: 21/21 backend + all frontend flows pass (iteration_1.json).

## Iteration 2 — 2026-02 (Content & Hero updates)
- ✅ Global `<ScrollToTop />` smoothly scrolls on pathname change.
- ✅ Home hero replaced with 3-slide slider (Haat Bazaar → Founder Mukesh Kushwah → Rajpur Plant) with auto-advance, prev/next, dot indicators. New tagline: "Legacy of Purity, Powered by Women, Driven by Heritage."
- ✅ About: H1 updated to "From a Rajpur Stone Mill to a Modern Pvt. Ltd. Powerhouse". Timeline corrected to 1990 / 2005 / 2023 / 2025-26. Founder portrait (Mukesh Kushwah) + vintage papa-dukan heritage strip added.
- ✅ CSR: explicit Women Empowerment emphasis, new Government Partnerships section (PMFME, Mahila Samooh, Government tenders) and a Nimad Region pictorial spices map section.
- ✅ Testing: 22/22 iteration-2 features + 8/8 regression passed (iteration_2.json).

## Backlog
**P1 (next)**
- Product detail page (`/products/:slug`) with long description, hero image and related products.
- Admin panel (view inquiries, toggle featured, add/edit products).
- Newsletter / recipe subscription (Resend integration).
- SEO: meta tags per route, Open Graph images, sitemap.

**P2**
- Recipe blog / "Kitchen Stories" section.
- Real payments (Razorpay) when ready for DTC.
- Multilingual (Hindi / Nimadi tagline + English).
- Lead dashboard analytics (conversion by partner type).

## Next Tasks
1. Build product detail pages.
2. Add a lightweight admin (read-only inquiries view) gated behind a simple token.
3. SEO + Open Graph.
4. Newsletter signup → Resend.

## Tech Notes
- `REACT_APP_BACKEND_URL` drives all frontend API calls.
- Mongo seeded via `@app.on_event("startup")` if `products` collection is empty.
- Logo is designed for dark bg → always rendered inside a `rich_black` card.
