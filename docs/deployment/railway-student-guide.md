# Publish a Website with Railway

**Course status:** Candidate student guide; requires clean-account screenshot verification before release  
**Role:** Approved Website Foundations alternative deployment path  
**Last research verification:** August 2, 2026  
**Official sources:** Railway React guide, public networking, domains, and service-settings documentation

## What this produces

A successful Railway deployment creates a service for the GitHub repository. The service is not necessarily public immediately. The student normally generates a Railway-provided domain after confirming the service runs.

## Before opening Railway

Confirm:

- [ ] The latest work is committed and pushed to GitHub.
- [ ] `npm install` completes.
- [ ] `npm run build` completes.
- [ ] The production output exists.
- [ ] The project has a production start command that serves the built site.
- [ ] The server listens on Railway's provided `PORT`.
- [ ] The server binds to a publicly reachable interface, normally `0.0.0.0`.
- [ ] No private credentials are committed.

For the current Platinum VC Studios Vite pattern:

```json
{
  "scripts": {
    "build": "tsc --noEmit && vite build",
    "start": "serve --single --listen $PORT dist"
  }
}
```

The `serve` package must be installed when this pattern is used.

## 1. Create a Railway project

Sign in to Railway with the account the student controls.

Choose the option to create a new project.

**Expected result:** Railway displays deployment-source options.

## 2. Deploy from GitHub

1. Select **Deploy from GitHub repo**.
2. Connect GitHub when prompted.
3. Choose the correct repository.
4. Select **Deploy**.

**Expected result:** Railway creates a service and begins a deployment.

A created service is not proof that the website is public or running correctly.

## 3. Inspect the deployment logs

Open the service and inspect the deployment or runtime logs.

Confirm:

- Dependency installation completed.
- The production build completed.
- The start command ran.
- The process remains running.
- The server listens on the Railway-provided port.

**Stop if:** The process exits, crashes, or listens only on `localhost`.

## 4. Review service settings when detection is wrong

Inside the service's **Settings**, Railway provides controls for:

- Source repository and branch
- Custom build command
- Custom start command
- Networking

Use custom commands only when the repository's own configuration is missing or Railway detected it incorrectly.

For the documented Vite pattern:

- Build command: `npm run build`
- Start command: `npm run start`

## 5. Generate a public Railway URL

Railway services do not always receive a public domain automatically.

After the service is running:

1. Open the service.
2. Open **Settings**.
3. Find **Networking → Public Networking**.
4. Select **Generate Domain**.

Railway may also display an automated prompt when it detects a correctly listening service.

**Expected result:** Railway displays a generated `*.up.railway.app` address.

**Evidence:** Save the generated address in the Build Plan.

**If Generate Domain is missing:** Check whether a TCP Proxy was previously assigned to the service. Railway's official domain documentation says the TCP Proxy must be removed before the Generate Domain option returns.

## 6. Verify the live website

Open the generated address and test:

- [ ] Homepage loads.
- [ ] Navigation works.
- [ ] Images and fonts load.
- [ ] Mobile layout works.
- [ ] A nested route opens directly.
- [ ] Refreshing a nested route still works.
- [ ] Runtime logs remain free of unexplained crashes.

The `serve --single` start command supplies SPA fallback behavior for React Router routes.

## 7. Confirm deployments from GitHub

Push a small approved commit to the connected branch.

**Expected result:** Railway creates a new deployment for the service.

Confirm the new deployment becomes active and the public URL shows the change.

## 8. Add a custom domain only when applicable

Inside the service:

1. Open **Settings**.
2. Find **Public Networking**.
3. Select **+ Custom Domain**.
4. Enter the exact domain.
5. Copy both DNS records displayed by Railway into the DNS provider.

Railway's current official dashboard flow provides:

- A CNAME record for routing
- A TXT record for ownership verification

Both records are required. Railway warns that the custom domain can return a 404 when the CNAME resolves but the TXT verification record is missing.

Do not copy example DNS values from the course. Use the records displayed for the student's own service.

**Expected result:** Railway shows a verified status and provisions HTTPS.

Railway notes that DNS propagation can take time.

## Troubleshooting map

### Build succeeds but the service stops

- Confirm a production `start` script exists.
- Confirm the start command serves the built output rather than starting the Vite development server.
- Inspect the first runtime error.

### Service runs but Generate Domain is unavailable

- Confirm a TCP Proxy is not assigned.
- Confirm the service is an HTTP service.
- Confirm the process is listening correctly.

### Generated domain returns an error

- Inspect runtime logs.
- Confirm the app listens on `$PORT`.
- Confirm it binds to `0.0.0.0`.
- Confirm the configured target port matches the process when a custom port was set.

### Homepage works but nested routes fail

- Confirm the production server uses SPA fallback.
- With the documented `serve` pattern, verify `--single` remains in the start command.
- Redeploy and directly refresh the nested route.

### Custom domain returns 404

- Confirm both the CNAME and TXT records exist exactly as Railway displayed them.
- Wait for Railway ownership verification.
- Do not treat CNAME resolution alone as completed setup.

### Custom domain remains pending

- Check the exact DNS host names and values.
- Check for conflicting records.
- Allow for DNS propagation.
- Reopen Railway to confirm the verification status.

## Completion evidence

The Guided student records:

- Railway service name
- Generated `*.up.railway.app` URL
- Successful build and running-service evidence
- Start command
- Nested-route refresh result
- One deployment-specific test or correction
- Custom domain, only when used
