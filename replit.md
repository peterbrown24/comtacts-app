# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

**Published & Live:** Website deployed at **comtacts.ca** (custom domain via GoDaddy DNS).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.

## Mobile App (`artifacts/mobile`)

Expo React Native app — "Comt@cts, Inc."

- Tabs: Contacts, Messages, Channels, Profile
- Real-time polling: contacts 5s, conversations 3s, messages 2s, channels 4s
- Demo user: Alex Johnson (no auth)
- Theme: dark bg `#0D1117`, teal accent `#00C896`, royal blue `#4169E1`, Inter font
- Freemium model: RevenueCat subscription gates premium contact fields (mobilePhone, personalEmail)
- Masthead component: `components/Masthead.tsx`

### RevenueCat Setup (COMPLETE)

The freemium subscription model is fully live. RevenueCat is connected and all API keys are stored as environment variables.

- Project: `projfa8d0353`
- Entitlement: `premium`
- Product: `premium_monthly` — $9.99/month (test store)
- Offering: `default`
- Seed script: `pnpm --filter @workspace/scripts exec tsx src/seedRevenueCat.ts` (idempotent, safe to re-run)

Client-side files:
- `lib/revenuecat.tsx` — `initializeRevenueCat()`, `SubscriptionProvider`, `useSubscription` hook
- `components/PaywallModal.tsx` — Paywall UI with purchase confirmation modal
- Premium gates: Profile screen locks Mobile Direct & Personal Email behind `premium` entitlement
- `_layout.tsx` wraps app in `SubscriptionProvider`, calls `initializeRevenueCat()` at startup

### Privacy & Security (Build 31)

All messages are encrypted at rest using AES-256-GCM. Security measures throughout:

**Server-side:**
- `lib/encryption.ts` — AES-256-GCM encrypt/decrypt for message bodies stored in PostgreSQL
- `lib/security.ts` — Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, XSS Protection, Referrer-Policy, Permissions-Policy), rate limiting (120 req/min), input sanitization (XSS prevention)
- `routes/security.ts` — `GET /api/security/status` endpoint returns encryption/security posture
- Messages encrypted before DB insert, decrypted on read — transparent to the client
- Encryption key derived from DATABASE_URL via scrypt (or custom ENCRYPTION_KEY env var)

**Mobile UI indicators:**
- `components/EncryptionBadge.tsx` — Three components: `EncryptionBadge` (compact/full), `EncryptionBanner` (chat header), `PrivacyShield` (profile card)
- Encryption banner shown at top of all conversation and channel chat screens
- Lock icons next to message previews in Messages and Channels lists
- Privacy Shield card on Profile screen showing "End-to-End Encrypted" status
- Color: shield green matches accent `#00C896`

### Referral + Incentive Program

Users can share their unique referral code (derived from their handle) to invite others and earn free Premium time.

- DB table: `referrals` (referrer_id, referred_id, referred_name, status, reward_days, timestamps)
- API: `GET /api/me/referrals` (stats + tiers), `POST /api/referrals/redeem` (redeem a code)
- Client: `lib/api-client-react/src/referrals.ts` — `useGetMyReferrals`, `useRedeemReferral`
- Mobile: `app/referrals.tsx` — full referral screen with code sharing, stats, tier progress
- Profile entry: "Refer & Earn" card on profile screen navigates to referrals
- Tiers: 1 referral → 1 free week, 3 → 1 month, 5 → 3 months, 10 → 1 year

Environment variables set (shared):
- `EXPO_PUBLIC_REVENUECAT_TEST_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`
- `REVENUECAT_PROJECT_ID`
- `REVENUECAT_TEST_STORE_APP_ID`
- `REVENUECAT_APPLE_APP_STORE_APP_ID`
- `REVENUECAT_GOOGLE_PLAY_STORE_APP_ID`
