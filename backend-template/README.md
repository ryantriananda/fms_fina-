# FMS Backend

Backend API untuk Facility Management System menggunakan Express.js, Prisma, dan PostgreSQL.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT + bcrypt
- **Validation:** Zod

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Copy `.env.example` ke `.env` dan sesuaikan:

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fms_db"
JWT_SECRET="your-secret-key"
```

### 3. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed data awal
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3001`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/:id` - Get vehicle by ID
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `GET /api/vehicles/contracts/all` - Get all contracts
- `GET /api/vehicles/services/all` - Get all services
- `GET /api/vehicles/tax-kir/all` - Get all tax/KIR

### Buildings
- `GET /api/buildings` - Get all buildings
- `POST /api/buildings` - Create building
- `GET /api/buildings/:id` - Get building by ID
- `PUT /api/buildings/:id` - Update building
- `DELETE /api/buildings/:id` - Delete building
- `GET /api/buildings/utilities/all` - Get utilities
- `GET /api/buildings/maintenance/all` - Get maintenances

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create asset
- `GET /api/assets/:id` - Get asset by ID
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Consumables (ATK/ARK)
- `GET /api/consumables/master` - Get master items
- `POST /api/consumables/master` - Create master item
- `GET /api/consumables/atk/requests` - Get ATK requests
- `POST /api/consumables/atk/requests` - Create ATK request
- `GET /api/consumables/ark/requests` - Get ARK requests
- `GET /api/consumables/stock-opname` - Get stock opnames

### Facility
- `GET /api/facility/pods` - Get master pods
- `GET /api/facility/tenants` - Get tenant pods
- `GET /api/facility/pod-requests` - Get pod requests
- `GET /api/facility/lockers` - Get lockers
- `GET /api/facility/locker-requests` - Get locker requests

### Insurance
- `GET /api/insurance/providers` - Get providers
- `GET /api/insurance/policies` - Get policies
- `GET /api/insurance/claims` - Get claims

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/vendors` - Get all vendors
- `GET /api/admin/master-data` - Get master data
- `GET /api/admin/workflows` - Get approval workflows
- `GET /api/admin/logbook` - Get logbook entries
- `GET /api/admin/timesheet` - Get timesheets

## Default Users

Setelah seed:

| Email | Password | Role |
|-------|----------|------|
| admin@modena.com | admin123 | Admin |
| staff@modena.com | staff123 | Staff |

## Scripts

```bash
npm run dev        # Development dengan hot reload
npm run build      # Build untuk production
npm run start      # Run production build
npm run db:generate # Generate Prisma Client
npm run db:push    # Push schema ke database
npm run db:migrate # Run migrations
npm run db:seed    # Seed database
npm run db:studio  # Open Prisma Studio
```

## Project Structure

```
src/
├── app.ts              # Express app entry point
├── config/
│   ├── database.ts     # Prisma client
│   └── env.ts          # Environment config
├── controllers/        # Request handlers
├── middlewares/        # Auth, validation, error handling
├── routes/             # API routes
└── utils/              # Helper functions

prisma/
├── schema.prisma       # Database schema
└── seed.ts             # Seed data
```
