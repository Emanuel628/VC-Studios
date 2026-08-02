# Publish a Website with Vercel

**Course status:** Candidate student guide; requires clean-account screenshot verification before release  
**Role:** Primary Website Foundations deployment path  
**Last research verification:** August 2, 2026  
**Official sources:** Vercel Git deployments, deployment overview, projects, domains, and project configuration documentation

## What this produces

A successful deployment gives the project:

- A public `*.vercel.app` address
- Automatic production deployments from the configured production branch
- Preview deployments for other Git branches and pull requests
- Optional custom-domain support

## Before opening Vercel

Confirm all of the following locally:

- [ ] The latest work is committed and pushed to GitHub.
- [ ] `npm install` completes.
- [ ] `npm run build` completes.
- [ ] Vite creates the `dist` folder.
- [ ] The website works locally.
- [ ] No passwords, private keys, or private `.env` files are committed.
- [ ] The repository's production branch is known, normally `main`.

Do not begin deployment while the production build is failing.

## 1. Create or sign in to Vercel

Open Vercel and sign in with the account the student controls.

When GitHub has not been connected before, Vercel will request permission to access repositories. Grant access only to the repositories needed for the course whenever the available permission screen allows that choice.

**Expected result:** The Vercel dashboard opens.

## 2. Import the GitHub repository

From the dashboard:

1. Choose **Add New**.
2. Choose **Project**.
3. Select the correct Git provider or GitHub account.
4. Find the course repository.
5. Select **Import**.

**Expected result:** Vercel opens the project-configuration screen.

**Stop if:** The repository does not appear. Recheck GitHub authorization before creating a duplicate repository.

## 3. Review project settings

For a normal React + Vite repository, verify:

- **Framework Preset:** Vite
- **Root Directory:** repository root, unless the Vite app is intentionally inside a subfolder
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** default npm install behavior

Vercel often detects these automatically. Do not override correct detected values merely to type them manually.

**Stop if:** The root directory points at the wrong folder or the output directory is not `dist`.

## 4. Deploy

Select **Deploy**.

Watch the deployment status and open the build details when an error appears.

**Expected result:** The deployment reaches a ready or successful state and Vercel displays a generated `*.vercel.app` URL.

**Evidence:** Save the project URL in the student's Build Plan.

## 5. Verify the live website

Open the generated URL and test:

- [ ] Homepage loads.
- [ ] Navigation links work.
- [ ] Images and fonts load.
- [ ] Buttons behave as intended.
- [ ] Mobile layout works.
- [ ] Browser console has no unexplained production errors.
- [ ] A nested route can be opened directly.
- [ ] Refreshing a nested route does not produce a Vercel 404.

Do not mark deployment complete until every relevant check passes.

## 6. React Router SPA fallback

A Vite site that uses client-side React Router must pass the direct-route refresh test.

When the deployed site returns a 404 after directly opening or refreshing a valid route such as `/about`, add a Vercel SPA rewrite at the repository root.

`vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Commit and push the change, wait for the new deployment, and repeat the route-refresh test.

Do not add this as a blind patch for unrelated 404 errors. First confirm that the homepage works and the failure occurs specifically on valid client-side routes.

## 7. Confirm automatic deployments

Make one harmless, visible change in a separate Git branch and push it.

**Expected result:** Vercel creates a preview deployment with its own generated URL.

Merge an approved change into the production branch.

**Expected result:** Vercel creates a production deployment.

Record which branch is configured as production.

## 8. Add a custom domain only when applicable

Inside the Vercel project:

1. Open **Settings**.
2. Open **Domains**.
3. Select **Add Domain**.
4. Enter the exact domain or subdomain.
5. Follow the DNS records Vercel displays.

Typical official behavior:

- Apex domains use an A record.
- Subdomains use a CNAME record.
- A domain already associated with another Vercel account may require TXT verification.
- Nameserver-based setup requires recreating DNS records that must continue to exist.

Use the records shown in the student's own Vercel dashboard rather than copying sample DNS values from the course.

**Expected result:** Vercel marks the domain ready and provisions HTTPS.

**Evidence:** Record the final domain and test both the chosen canonical address and any redirect.

## Troubleshooting map

### Repository is missing

- Reopen GitHub authorization.
- Confirm the correct GitHub account or organization.
- Confirm the Vercel integration can access the repository.

### Framework was not detected

- Confirm `package.json` is in the selected root directory.
- Select Vite manually only after verifying the root directory.

### Build fails

- Read the first meaningful error in the Vercel build log.
- Reproduce it locally with `npm install` and `npm run build`.
- Correct the repository and push a new commit.

### Deployment succeeds but the page is blank

- Inspect the browser console.
- Check asset paths.
- Confirm the output directory is `dist`.
- Confirm the app works from a production build locally.

### Homepage works but route refresh returns 404

- Confirm the route is valid in the app.
- Add or verify the SPA rewrite.
- Redeploy and retest the direct URL.

### Custom domain remains unverified

- Compare every DNS name, type, and value with the current Vercel dashboard.
- Remove conflicting records only when their purpose is understood.
- Allow time for DNS propagation.
- Recheck the domain status in Vercel.

## Completion evidence

The Guided student records:

- Vercel project URL
- Production branch
- Successful production-build evidence
- Nested-route refresh result
- One deployment log or status record
- Custom domain, only when used
- Any deployment-specific defect and its correction
