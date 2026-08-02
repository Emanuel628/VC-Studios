# Deployment Instruction Verification Protocol

**Status:** Required process  
**Applies to:** Website Foundations deployment lessons  
**Primary service:** Vercel  
**Approved alternative:** Railway

The goal is not to claim permanent perfection. The goal is to publish instructions that are demonstrably correct on a stated date and easy to recheck when a provider changes.

## Evidence layers

Every deployment guide must be supported by all four layers:

1. **Official documentation** captured by the deployment research crawler.
2. **Clean-account dashboard verification** performed manually.
3. **Real test deployment** using the same project type students use.
4. **Student usability test** performed by a beginner who follows only the written guide.

No single layer replaces the others.

## Required test repositories

Maintain small clean repositories for:

- Plain HTML, CSS, and JavaScript
- React + Vite
- React + Vite + React Router
- A deliberately broken production build
- A valid build with an incorrect output directory
- A valid deployment with a nested-route refresh failure
- A custom-domain test project

Never use a production student repository as the only test.

## Required verification run

For each platform:

1. Start with a clean or minimally configured provider account.
2. Confirm GitHub is not already connected, or document both connected and unconnected paths.
3. Import the test repository.
4. Record the exact visible dashboard labels.
5. Confirm detected framework, root directory, build command, and output directory.
6. Deploy.
7. Inspect the build log.
8. Open the generated provider URL.
9. Test the homepage.
10. Open every navigation link.
11. Paste a nested route directly into a new browser tab.
12. Refresh the nested route.
13. Test a mobile viewport.
14. Trigger a new deployment with a small Git commit.
15. Confirm which branch creates production and which creates preview.
16. Add a test custom domain when domain instructions are being verified.
17. Record DNS records exactly as displayed.
18. Confirm SSL and final routing.
19. Remove or archive the test deployment after evidence is recorded.

## Student-facing step format

Every major step must include:

- **Action:** what to click or enter
- **Expected result:** what should appear
- **Stop condition:** what means the student should not continue
- **Recovery:** where to look when the expected result is missing
- **Evidence:** what the student records for completion

Example:

> **Action:** Select **Generate Domain** under **Settings → Networking → Public Networking**.  
> **Expected result:** Railway displays a public `*.up.railway.app` address.  
> **Stop condition:** Do not continue if the service logs do not show a running server.  
> **Recovery:** Confirm the application listens on the Railway-provided `PORT`.  
> **Evidence:** Save the generated URL in the Build Plan.

## Change-management process

1. Run the crawler on a recurring schedule.
2. Treat any changed normalized source as a review trigger.
3. Inspect the official page manually.
4. Repeat the affected dashboard flow.
5. Update only the affected guide steps.
6. Retest with the clean repository.
7. Change the guide's `Last verified` date.
8. Record the affected source pages.
9. Never automatically publish crawler-generated wording.

## Publishability checklist

A deployment lesson is not ready unless:

- [ ] Every source is first-party.
- [ ] Every visible label was manually checked.
- [ ] A clean deployment succeeded.
- [ ] The generated URL works.
- [ ] Nested-route refresh works.
- [ ] Build and output settings are correct.
- [ ] The custom-domain path was separately verified when included.
- [ ] Troubleshooting begins from observable symptoms.
- [ ] Screenshots contain no private account information.
- [ ] The guide shows a `Last verified` date.
- [ ] A beginner completed the flow without undocumented help.
