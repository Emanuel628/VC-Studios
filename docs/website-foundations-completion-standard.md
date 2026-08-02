# Website Foundations Completion Standard

**Status:** Locked  
**Program:** Website Foundations  
**Purpose:** Define the exact evidence required to complete the first Platinum VC Studios program before modules or chapters are written.

This standard is the source of truth for the final outcome of Website Foundations. The module map, chapter sequence, practical activities, assessments, guided milestones, Coursework-Only exercises, progress system, and completion review must all be derived from it.

Website Foundations must produce a complete and valuable capability. It is not an incomplete first half of a later application-development program.

---

# 1. Honest Completion Claim

A student who successfully completes Website Foundations may be told:

> You can now plan, build, organize, test, and publish a professional responsive website with AI assistance.

Website Foundations does **not** claim that the student has learned:

- Databases
- Authentication
- Backend services
- API integration
- API-key setup or management for application integrations
- Desktop-software development
- Phone-application development

Those capabilities belong to later, separately gated programs.

---

# 2. Guided Build-Along Completion Evidence

A Guided Build-Along student completes Website Foundations only by producing all required evidence below.

## 2.1 Website Build Plan

The student must produce a clear Build Plan containing:

- Website name or working title
- Website purpose
- Problem or need being addressed
- Intended audience
- Main outcome for the visitor
- Required pages
- Primary user flow
- First-version boundaries
- Features deliberately excluded
- Visual direction
- Major content requirements
- Initial file and responsibility plan

The plan must be reviewed before substantial building begins.

## 2.2 Working Responsive Website

The student must produce a working website that:

- Has a clear purpose
- Serves the intended audience identified in the Build Plan
- Uses understandable navigation
- Has a shared visual foundation
- Works on desktop, tablet, and mobile
- Uses accessible labels, headings, focus states, and readable contrast
- Contains no database, authentication, backend, or application API dependency

If a later program teaches those capabilities, it must remain separately gated rather than expanding Website Foundations beyond this boundary.

### Minimum page floor

The completed website must include:

- A purposeful homepage
- At least two additional purposeful pages

A functionally equivalent structure may be approved when the website concept genuinely requires a different arrangement, but a single scrolling page does not satisfy the normal completion standard.

Every page must serve a real user or business purpose. Empty filler pages do not count toward the minimum.

## 2.3 Modular Project Structure

The project must demonstrate clear file responsibilities.

Required evidence includes:

- One dedicated page component per page file
- Focused shared components where appropriate
- Shared design tokens or foundation styles
- Clear route ownership
- Reused common interface patterns
- Separation between page structure and shared styling responsibilities
- No giant `App.tsx`
- No single file containing the entire website
- No duplicated page structures that should be shared
- No unnecessary dependencies added merely because AI suggested them

A student cannot pass the architecture checkpoint while a serious monolithic-file problem remains unresolved.

## 2.4 Evidence of Controlled AI Use

The student must show that AI was directed and corrected rather than blindly accepted.

Required evidence includes:

- Focused prompts tied to a specific page, file, feature, or problem
- At least one example of rejected AI output
- At least one corrected AI output
- At least one documented scope-control decision
- At least one documented architecture correction
- A short explanation of why the major project files exist
- Evidence that unrelated working behavior was protected during a requested change

## 2.5 GitHub Repository and Recovery Evidence

The student must maintain a GitHub repository containing:

- Meaningful commits
- Stable versions saved before major changes
- A readable project description
- No committed passwords, private keys, secrets, or private `.env` contents
- Evidence that the student understands how to inspect earlier work

### Required recovery demonstration

The student must complete and document at least one visible recovery action by:

1. Saving a stable commit.
2. Making or simulating a change that creates a meaningful problem.
3. Restoring or reverting to the previous stable version.
4. Confirming that the restored project works.
5. Identifying the commit or recovery action used.

Recovery must be demonstrated, not merely described.

## 2.6 Testing Record

The student must complete a testing record covering, where relevant:

- Navigation
- Links
- Buttons
- Forms
- Empty fields
- Invalid input
- Desktop layout
- Tablet layout
- Mobile layout
- Keyboard navigation
- Visible focus states
- Heading structure
- Color contrast
- Overflow and spacing
- Browser-console errors
- Production-build errors
- Live deployment behavior

The record must include at least one real defect that was found, corrected, and tested again.

## 2.7 Published Website

The student must provide evidence of:

- A successful production build
- A public deployment
- Testing of the live version
- Correction of deployment-specific problems when present
- A final comparison against the original Build Plan
- Domain connection only when applicable to the selected project

## 2.8 Structured Final Explanation

The student must answer these six questions:

1. What does the website do?
2. Who does it serve?
3. What was deliberately excluded from the first version?
4. What did AI initially get wrong?
5. What did the student correct and why?
6. What would the student improve in a later version?

The explanation must be specific to the completed project.

---

# 3. Coursework-Only Completion Evidence

Coursework-Only is a complete and legitimate path. It does not require the student to publish a website, but it cannot be completed through passive reading.

## 3.1 Complete Website Blueprint

The blueprint must include:

- Website purpose
- Intended audience
- Main visitor outcome
- First-version scope
- Features deliberately excluded
- Required pages
- Primary user flow
- Visual direction
- Content requirements

## 3.2 Proposed Modular File Map

The student must propose a maintainable project structure showing:

- One page component per proposed page file
- Page responsibilities
- Shared components
- Routes
- Shared styles and tokens
- Assets
- Configuration responsibilities

The student must explain why each major file or group exists and identify responsibilities that should not be combined.

## 3.3 Tool-Selection Reasoning

The student must explain which tools are appropriate for a basic website and reject tools or services that add unnecessary complexity.

This includes explaining why a basic website normally does not require a database, authentication system, backend service, or unrelated framework.

## 3.4 Controlled-AI Exercises

The student must complete exercises involving:

- Improving vague prompts
- Protecting existing work during changes
- Rejecting scope creep
- Correcting monolithic architecture
- Correcting duplicated styles or components
- Identifying exposed secrets or inappropriate API-key placement
- Rejecting unnecessary databases or services
- Correcting polished output that fails the stated user goal

Website Foundations may teach students to recognize that secrets and API keys do not belong in public client code. It does not teach students to set up or integrate application APIs; that belongs to a later program.

## 3.5 Testing Plan

The student must create a complete written testing plan covering:

- Expected behavior
- Navigation and links
- Forms and validation where relevant
- Desktop, tablet, and mobile layouts
- Keyboard access
- Focus states
- Heading structure
- Contrast and readability
- Browser and build errors
- Deployment verification
- Regression testing after corrections

### Required defect walkthrough

The student must complete at least one full written walkthrough of a realistic defect scenario that explains:

1. What the user or tester observes.
2. How the problem would be reproduced.
3. Which file or responsibility should be inspected first.
4. What information should be given to AI.
5. What must remain unchanged.
6. How the correction would be tested.
7. How the stable version would be protected or restored if the correction failed.

A checklist alone does not satisfy this requirement.

## 3.6 GitHub and Recovery Scenarios

The student must demonstrate understanding of:

- Meaningful commits
- Stable checkpoints
- Reviewing earlier versions
- Protecting secrets
- Reverting or restoring a failed change
- Confirming that a recovered project works

## 3.7 Structured Final Explanation

The Coursework-Only student must answer a parallel version of the same six questions:

1. What would the planned website do?
2. Who would it serve?
3. What would be deliberately excluded from the first version?
4. What did AI get wrong in the reviewed examples?
5. What was corrected and why?
6. What would be improved in a later version?

---

# 4. Required Human-Review Checkpoints

Website Foundations has three required human-review checkpoints for both learning paths. The evidence reviewed at each checkpoint is adapted to the path.

The program must not add routine human review to every chapter unless staffing capacity and review standards are formally expanded.

## 4.1 Website Plan or Blueprint Approval

This review occurs before substantial building or later cumulative architecture work.

For Guided Build-Along, the reviewer examines the Website Build Plan.

For Coursework-Only, the reviewer examines the website blueprint.

The reviewer checks:

- Is the purpose clear?
- Is the intended audience clear?
- Is the first version realistic?
- Are unnecessary features excluded?
- Does every proposed page serve a real purpose?
- Is the plan appropriate for Website Foundations?

## 4.2 Architecture or File-Map Checkpoint

For Guided Build-Along, this review occurs after the shared foundation and first meaningful page exist, but before the project multiplies into many pages.

For Coursework-Only, this review occurs after the proposed modular file map and early architecture-correction exercises are complete, before the later cumulative evidence is built on them.

The reviewer checks:

- Are page, component, route, and style responsibilities separated appropriately?
- Is one page component assigned to each page file?
- Is AI creating duplication or mixed responsibilities?
- Is a giant file beginning to form?
- Are shared design rules established or correctly proposed?
- Has unnecessary complexity been introduced?
- Can the student explain the major responsibilities?

Structural problems must be corrected before later work is approved.

## 4.3 Final Completion Review

The reviewer checks:

- The completed Build Plan or Coursework-Only blueprint
- Required page count or approved Guided equivalent
- Responsive behavior for Guided Build-Along
- Modular structure or proposed modular file map
- Controlled-AI evidence
- GitHub history or GitHub scenarios
- Recovery evidence
- Testing record or defect walkthrough
- Public deployment for Guided Build-Along
- Structured final explanation
- Accuracy of the completion claim

---

# 5. Required Assessment Pattern: Flawed AI Output

Students must repeatedly inspect, reject, and correct flawed AI output throughout Website Foundations.

These exercises must begin early and recur after the relevant concepts are taught.

Required scenario categories include:

- An entire website placed in `App.tsx`
- Multiple unrelated responsibilities placed in one file
- CSS duplicated across every page
- A basic website given an unnecessary database
- API keys or secrets placed in public frontend code
- Missing mobile behavior
- Buttons or links that do not work
- Invalid heading hierarchy
- Missing labels or keyboard focus
- Scope creep introduced by AI
- A broad rewrite that destroys working behavior
- Unnecessary frameworks, packages, or services
- A visually polished page that fails the original user goal
- A proposed fix that changes unrelated files
- A project that appears complete but cannot build or deploy

Students must be asked to determine:

1. What is wrong?
2. Why will it become a problem?
3. Which responsibility or file should own the correction?
4. What must remain unchanged?
5. What should AI be asked to do next?
6. How will the correction be tested?
7. How will stable work be protected?

---

# 6. Curriculum Derivation Rule

The high-level module map must be derived strictly from this Completion Standard.

Every proposed module must produce one or more of the required artifacts, judgments, or demonstrations in this document.

Every chapter must contribute to at least one required completion item.

A module or chapter must not be added merely because the topic appears in a traditional programming course.

The next planning document is the **Website Foundations High-Level Module Map**. It must define module outcomes and evidence without writing full chapter content.
