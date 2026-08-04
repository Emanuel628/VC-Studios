# Backend Production Deployment Runbook (Railway)

**Audience:** whoever operates the Platinum VC Studios Railway account.
**Not student material.** This is an internal ops runbook for deploying the platform's
own frontend and backend, unrelated to the student-facing deployment guides under
`docs/deployment/` (which teach students to deploy their own Guided project to Vercel or
Railway - a separate, unrelated project from this one).

## Current architecture

Both the frontend and backend run on Railway, as three services in one project:

- **Postgres** (database plugin)
- **Backend** (`server/`, root directory `server`) - Express + Better Auth + Prisma
- **Frontend** (repo root, root directory `/`) - the built React app, served by
  `frontend-server.js`

The frontend is **not** a plain static host. `frontend-server.js` serves the built
`dist/` files and proxies any `/api/*` request to the backend
(`API_PROXY_TARGET`), so the browser only ever talks to the frontend's own origin.

**Why the proxy exists, not just a direct cross-origin call:** Railway gives each
service a `*.up.railway.app` subdomain, and `up.railway.app` is registered in the
Mozilla Public Suffix List (submitted by Railway itself - confirmed directly against
the published list). That means the frontend and backend subdomains are different
*sites* to a browser, not sibling subdomains of one site. A cookie set by a
cross-*site* fetch response gets dropped by Safari's tracking prevention regardless of
`SameSite=None; Secure` being set correctly - and increasingly by other browsers too.
The observed symptom was exactly this: registration created a real user row in
Postgres, but the browser never kept the session, so the app still looked logged out.

Routing everything through `frontend-server.js` makes the request/response the
browser sees same-origin, so the session cookie is first-party. No custom domain is
required for this - it works entirely on Railway's generated subdomains.

Vercel remains an option (`vercel.json` still has an SPA rewrite that excludes
`/api/(.*)`) if the frontend is ever moved there instead, but that is not the current
deployment.

## One-time setup

### 1. Provision Postgres on Railway

If it does not already exist, add a Postgres database to the Railway project. Railway
will expose a `DATABASE_URL` you can reference from other services in the same project.

### 2. Create the backend service

Add a new Railway service from this GitHub repo, with:

- **Root directory:** `server` (this is what makes Railway pick up
  `server/railway.json` and `server/package.json` instead of the repo root's, which
  are the frontend's).

`server/railway.json` already sets the Railpack builder, `npm run build`, and
`npm run start` (which chains `prisma migrate deploy && node dist/index.js`) - nothing
else to configure there. Generate a public domain for this service.

### 3. Set the backend's environment variables

On the backend service, set:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Reference the Postgres plugin's connection string (do not hardcode it) |
| `BETTER_AUTH_SECRET` | A newly generated random secret - never reuse the local dev one |
| `BETTER_AUTH_URL` | This service's own public HTTPS URL (from step 2) |
| `CLIENT_ORIGIN` | The frontend service's exact public origin (no trailing slash) |
| `RESEND_API_KEY` | The real Resend API key |
| `RESEND_FROM_EMAIL` | The verified Resend sender address |

`PORT` does not need to be set - Railway injects it, and `server/src/index.ts` reads it.

`BETTER_AUTH_URL` being `https://` also matters beyond routing: `server/src/auth.ts`
uses it to decide whether the session cookie needs `SameSite=None`. Leaving it as
`http://` would silently break login persistence even if everything else is correct.

### 4. Deploy and confirm migrations ran

Watch the deploy logs. The start step should print something like
`Applying migration ... All migrations have been successfully applied` (or
`No pending migrations to apply` on a later redeploy). If that line never appears,
the service did not actually start with `npm run start`, or `DATABASE_URL` is wrong.

Confirm the tables exist - open the Postgres service's **Data** tab in Railway (or
`railway connect postgres` and run `\dt`) and confirm `user`, `session`, `account`,
and `verification` tables are present.

### 5. Create the frontend service

Add another Railway service from this same repo, with:

- **Root directory:** `/` (the repo root - this is the default, so just don't set it
  to `server`)

Generate a public domain for this service too, then set its one required environment
variable:

| Variable | Value |
|---|---|
| `API_PROXY_TARGET` | The backend service's public HTTPS URL, from step 2 |

`npm run start` now runs `node frontend-server.js`, which reads `API_PROXY_TARGET` and
refuses to start without it.

Go back to the backend service and make sure `CLIENT_ORIGIN` (step 3) is set to this
frontend service's exact public origin - the two env vars point at each other.

`VITE_API_URL` should stay **unset** on this frontend service. Setting it would make
the browser call the backend's domain directly instead of going through the proxy,
which reintroduces the cross-site cookie problem this setup exists to avoid. It only
applies to a frontend that talks to the backend directly (e.g. a future Vercel
deployment with its own rewrite, or local dev - see `.env.example`).

## Verification (do this once, end to end, with a real account)

1. Visit the production frontend and register a new account.
2. Confirm the dashboard loads and the session persists after a page refresh - this is
   the part that was failing before the proxy existed.
3. Confirm a row for that user now exists in the `user` table on Railway.
4. Use "Forgot password," confirm the code email actually arrives (check the Resend
   dashboard's activity log if the inbox is slow), reset the password, and log in with
   the new one.
5. Delete the test account from the Account page and confirm the row is gone from
   `user`.
6. If a previous test account was created before the proxy was deployed, its user row
   already exists in Postgres - sign in with it rather than registering it again.

## Troubleshooting

- **Tables still empty after deploy:** the start command didn't run, or ran against
  the wrong database. Re-check the deploy logs for the `prisma migrate deploy` line
  and confirm `DATABASE_URL` on the service is the Postgres reference, not a stale
  literal value.
- **Account gets created (row exists in `user`) but the app still shows logged out,
  especially in Safari:** this is the cross-site cookie problem described above. Confirm
  the frontend service is actually running `frontend-server.js` (not a plain static
  host) and that `API_PROXY_TARGET` is set - if the browser's network tab shows requests
  going to the backend's own `*.up.railway.app` domain directly instead of the
  frontend's domain, `VITE_API_URL` is set somewhere it shouldn't be.
- **Every request returns 401 / session never sticks:** `CLIENT_ORIGIN` on the backend
  doesn't exactly match the frontend's public origin, or `BETTER_AUTH_URL` is still
  `http://` (see step 3).
- **Build fails with `Module "@prisma/client" has no exported member 'PrismaClient'`:**
  `prisma generate` never ran before `tsc`. `server/package.json` has a `postinstall`
  script (`prisma generate`) that Railway's `npm install` step triggers automatically -
  if this error comes back, check that `postinstall` is still present and that
  `DATABASE_URL` is available at build time (`prisma generate` reads it via
  `prisma.config.ts` and fails without it).
- **Deploy logs show Prisma/Express output on the service meant to be the frontend, or
  `frontend-server.js` output on the service meant to be the backend:** the two
  services have their Root Directory settings swapped. The backend needs `server`; the
  frontend needs `/`.
- **Register/login form shows "Could not reach the server. Check your connection and
  try again" instead of working:** the frontend can't reach `API_PROXY_TARGET`, or that
  variable isn't set at all - `frontend-server.js` throws on startup without it, so
  check the frontend service's own deploy logs first.
