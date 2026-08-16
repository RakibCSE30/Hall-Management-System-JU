# Backend V2

The project now contains the first backend foundation:

- Next.js App Router
- PostgreSQL via Prisma ORM
- Auth.js credentials authentication
- Role-aware sessions (`SUPER_ADMIN`, `HALL_ADMIN`, `STAFF`, `STUDENT`)
- Secure password hashing with Node.js `scrypt`
- Protected admin route
- Protected live dashboard statistics API
- Development seed for Jatiya Kabi Kazi Nazrul Islam Hall

## Local setup

1. Install Node.js 20+ and PostgreSQL.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` and a strong `AUTH_SECRET`.
4. Install dependencies with `npm install`.
5. Generate Prisma Client with `npm run db:generate`.
6. Create the database schema with `npx prisma migrate dev --name init`.
7. Seed demo data with `npm run db:seed`.
8. Start the app with `npm run dev`.

## Demo credentials

Development seed creates:

- Admin: `admin@hallms.ju` / `Admin@12345`
- Student: `student@hallms.ju` / `Student@12345`

Change these credentials before using any deployed environment.

## API

- `GET /api/health` — database connectivity check.
- `GET /api/dashboard` — authenticated live hall statistics.
- `/api/auth/*` — Auth.js credentials session endpoints.

The existing static HTML dashboard is intentionally retained during the migration. The next frontend step is to move its dashboard modules into the Next.js app and replace hard-coded demo statistics with these database-backed endpoints.
