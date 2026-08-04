# Backend Production Deployment Runbook (Railway)

**Audience:** whoever operates the Platinum VC Studios Railway and Vercel accounts.
**Not student material.** This is an internal ops runbook for deploying the platform's
own backend, unrelated to the student-facing deployment guides under `docs/deployment/`.

## Why this exists

The Better Auth backend (`server/`) is fully implemented and covered by an integration
test that exercises register, email verification, login, password reset via a
Resend-delivered code, and account deletion (`server/src/auth-flow.test.ts`). None of
that has ever run against production, though:

- No Railway service for `server/` has been deployed - `npm start` (which runs
  `prisma migrate deploy` before starting the server) has therefore never executed
  against the real Railway Postgres database, so it has no tables.
- The frontend has no `VITE_API_URL` set anywhere, so even once the backend exists,
  the Vercel-deployed frontend has no way to reach it (it defaults to relative paths,
  which resolve against Vercel itself, not the backend).

Until both are done, registration, login, and password reset do not work in
production, even though the code and tests say they should.

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
else to configure there.

### 3. Set the backend's environment variables

On the backend service, set:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Reference the Postgres plugin's connection string (do not hardcode it) |
| `BETTER_AUTH_SECRET` | A newly generated random secret - never reuse the local dev one |
| `BETTER_AUTH_URL` | This service's own public HTTPS URL (generate a Railway domain for it first, then set this) |
| `CLIENT_ORIGIN` | The production frontend's exact origin, e.g. `https://platinumvcstudios.com` (no trailing slash) |
| `RESEND_API_KEY` | The real Resend API key |
| `RESEND_FROM_EMAIL` | The verified Resend sender address |

`PORT` does not need to be set - Railway injects it, and `server/src/index.ts` reads it.

`BETTER_AUTH_URL` being `https://` also matters beyond routing: `server/src/auth.ts`
uses it to decide whether the session cookie needs `SameSite=None` (required once the
frontend and backend are on different domains). Leaving it as `http://` would silently
break login persistence in production even if everything else is correct.

### 4. Deploy and confirm migrations ran

Watch the deploy logs. The start step should print something like
`Applying migration ... All migrations have been successfully applied` (or
`No pending migrations to apply` on a later redeploy). If that line never appears,
the service did not actually start with `npm run start`, or `DATABASE_URL` is wrong.

Confirm the tables exist - open the Postgres service's **Data** tab in Railway (or
`railway connect postgres` and run `\dt`) and confirm `user`, `session`, `account`,
and `verification` tables are present.

### 5. Point the frontend at the backend

On the Vercel project, set the `VITE_API_URL` environment variable (Production
environment) to the backend's public HTTPS URL from step 3. Vite bakes environment
variables in at build time, so **redeploy the frontend** after setting this - it will
not take effect on the existing build.

**If the frontend is instead deployed on Railway** (the approved alternative to Vercel,
per README §18.3): the same `VITE_API_URL` variable must be set on *that* Railway
service too, before its build runs, for the same reason. This matters more on Railway
than on Vercel: the frontend there is served by `serve --single`
(`server/package.json`'s root-level sibling, the frontend's own `package.json`
`start` script), which has no equivalent to `vercel.json`'s rewrite that excludes
`/api/(.*)` from the SPA fallback. Without `VITE_API_URL`, every auth request goes to
a relative `/api/...` path on the frontend's own Railway domain, `serve --single`
rewrites it to `index.html` regardless of HTTP method, and the frontend receives HTML
where it expected JSON.

## Verification (do this once, end to end, with a real account)

1. Visit the production frontend and register a new account.
2. Confirm the dashboard loads (this requires cookies to survive the Vercel → Railway
   cross-origin round trip - see the `SameSite=None` note above if it doesn't).
3. Confirm a row for that user now exists in the `user` table on Railway.
4. Use "Forgot password," confirm the code email actually arrives (check the Resend
   dashboard's activity log if the inbox is slow), reset the password, and log in with
   the new one.
5. Delete the test account from the Account page and confirm the row is gone from
   `user`.

## Troubleshooting

- **Tables still empty after deploy:** the start command didn't run, or ran against
  the wrong database. Re-check the deploy logs for the `prisma migrate deploy` line
  and confirm `DATABASE_URL` on the service is the Postgres reference, not a stale
  literal value.
- **Every request returns 401 / session never sticks:** `CLIENT_ORIGIN` on the backend
  doesn't exactly match the frontend's origin, or `BETTER_AUTH_URL` is still `http://`
  (see step 3).
- **Frontend requests 404 or hit the HTML shell:** `VITE_API_URL` wasn't set before the
  last Vercel build, or was set but the frontend wasn't redeployed afterward.
- **Build fails with `Module "@prisma/client" has no exported member 'PrismaClient'`:**
  `prisma generate` never ran before `tsc`. `server/package.json` has a `postinstall`
  script (`prisma generate`) that Railway's `npm install` step triggers automatically -
  if this error comes back, check that `postinstall` is still present and that
  `DATABASE_URL` is available at build time (`prisma generate` reads it via
  `prisma.config.ts` and fails without it).
- **Deploy logs show `serve --single --listen $PORT dist` instead of Prisma/Express
  output:** this service is running the repo root's `package.json` (the frontend), not
  `server/package.json`. Re-check Root Directory is set to `server` on this specific
  service and redeploy.
- **Register/login form does nothing at all - no error, no redirect, button doesn't
  even look like it was clicked:** this was a real bug (fixed) where every auth call
  in the frontend was unguarded - if the request throws instead of resolving with an
  error (exactly what happens when `VITE_API_URL` is unset on a Railway-hosted
  frontend, see step 5), the exception was unhandled and nothing appeared. The forms
  now catch this and show "Could not reach the server. Check your connection and try
  again." If you still see nothing at all, you're on a build from before this fix -
  redeploy. If you see that message, the fix is working and the real problem is
  `VITE_API_URL` per step 5.
