# Platinum VC Studios

**Website:** `platinumvcstudios.com`  
**Repository:** `Emanuel628/VC-Studios`  
**VC means:** Vibe Code  
**Product:** Responsive course platform for practical AI-assisted building  
**Current stage:** Website Foundations outcome locked; high-level module mapping is next; public and authentication frontend foundations are in development  
**Last audited:** August 2, 2026

## Purpose and Source-of-Truth Order

This README records the approved direction for the Platinum VC Studios product, programs, teaching method, access model, technology, design, and current implementation.

The source-of-truth order is:

1. This README for platform-wide and program-wide decisions.
2. [`docs/website-foundations-completion-standard.md`](docs/website-foundations-completion-standard.md) for the exact Website Foundations completion evidence and review requirements.
3. The implemented code and configuration for what currently exists.

When a general statement in this README conflicts with the locked Website Foundations Completion Standard, the Completion Standard controls for Website Foundations.

Suggestions, examples, working labels, and research directions must not silently become requirements. Open decisions are listed explicitly near the end of this document.

The complete Website Foundations module and chapter sequence has **not** been approved yet. Full lesson content must not be invented before the high-level module map is approved.

---

# 1. Product Mission

Platinum VC Studios teaches people how to take a website or software idea from concept to a working, published product with the help of AI while maintaining human control over the result.

It is **not** a traditional programming or computer-science school. Students are not required to memorize syntax or become software engineers before they are allowed to build.

It is also **not** a “forget the code exists” product. Students must learn enough to understand responsibilities, recognize bad AI output, protect working code, test results, recover from mistakes, and explain important decisions.

The platform teaches students how to:

- Turn an idea into a realistic plan
- Define a controlled first version
- Choose appropriate tools without unnecessary complexity
- Direct AI with clear, focused instructions
- Build one manageable page or feature at a time
- Organize work into maintainable files and responsibilities
- Recognize and reject bad architecture, scope creep, destructive rewrites, and fake completeness
- Use GitHub to save, inspect, protect, and restore work
- Test behavior instead of trusting appearance
- Publish a working product
- Progress into more advanced kinds of products through later programs

The product must be honest. It must not promise instant expertise, effortless success, guaranteed income, or professional software-engineering credentials.

> Platinum VC Studios teaches the practical process of planning, directing, testing, correcting, protecting, and launching products with AI assistance.

---

# 2. Connected Program Model

Platinum VC Studios will be one connected learning platform with separately gated programs.

Students should experience one clear roadmap rather than unrelated course products. Access is granted by program entitlement, not by hiding arbitrary pages in the browser.

## 2.1 Program 1: Website Foundations

**Website Foundations is the program being planned and built now.**

It teaches students how to plan, build, organize, test, recover, and publish a professional responsive basic website with AI assistance.

Its exact final evidence is locked in the Website Foundations Completion Standard.

## 2.2 Later Program: Web Applications and Data

A later program will extend the shared foundation into products that use real application data and protected server behavior.

Its intended subjects include:

- Databases
- Data models and relationships
- API keys
- Environment variables
- External APIs
- Authentication
- User accounts
- Backend services
- Transactional email
- Server deployment
- Permissions and protected information

The final program name and curriculum are not yet locked.

## 2.3 Later Software and Desktop Program

A later program will teach installable software or desktop-application development.

The exact boundary between the terms **software** and **desktop applications**, the selected framework, prerequisites, and final program name remain open.

## 2.4 Later Phone-Application Program

A later program will teach phone applications for iPhone and Android.

Its future scope may include mobile navigation, touch behavior, device permissions, mobile storage, testing, and store preparation. The exact curriculum and technical stack remain open.

## 2.5 Intended Progression

The working progression is:

1. Website Foundations
2. Web Applications and Data
3. A desktop/software specialization or a phone-application specialization

Desktop and phone development should not be forced into an artificial sequence when one is not a true prerequisite for the other.

The exact program names, boundaries, release order after the shared foundation, and prerequisites remain open until those programs are designed.

---

# 3. Website Foundations: Locked Scope

Website Foundations must produce a complete, useful capability. It is not an unfinished half-course that requires an immediate upgrade to become valuable.

A successful student may be told:

> You can now plan, build, organize, test, and publish a professional responsive website with AI assistance.

## 3.1 Required Guided Outcome

A Guided Build-Along student must produce:

- A reviewed Website Build Plan
- A purposeful homepage and at least two additional purposeful pages, unless a justified equivalent is approved
- A responsive desktop, tablet, and mobile website
- A modular project structure
- Evidence of focused prompts and corrected or rejected AI output
- A documented scope-control decision
- A documented architecture correction
- A GitHub repository with meaningful commits
- A visible revert or restore demonstration
- A testing record that includes at least one defect found, corrected, and retested
- A successful public deployment
- A structured final explanation

## 3.2 Required Coursework-Only Outcome

A Coursework-Only student must produce:

- A complete website blueprint
- A proposed modular file map
- Tool-selection reasoning
- Controlled-AI correction exercises
- A complete testing plan
- At least one full written defect walkthrough
- GitHub and recovery scenarios
- A structured final explanation parallel to the Guided path

Coursework-Only cannot be completed through passive reading.

## 3.3 Explicit Exclusions

Website Foundations does **not** teach or require:

- Databases
- Authentication
- User accounts
- Backend development
- Transactional email
- Application API integrations
- API-key management for application integrations
- Desktop-software development
- Phone-application development

Those capabilities belong to later programs.

---

# 4. Intended Student

Platinum VC Studios is for people who:

- Have a website or software idea
- Have little or no traditional programming experience
- Feel overwhelmed by technical language
- Do not know which tools to choose
- Have used AI builders but struggle to control the results
- Start projects but have difficulty finishing them
- Want practical understanding without attending coding school
- Need small, clear steps and a visible next action

Students must be treated as inexperienced, not incapable.

The platform must make it easy to:

- Begin
- Stop
- Return later
- Remember what was completed
- See the next meaningful action
- Continue without shame or unnecessary friction

---

# 5. Non-Negotiable Teaching Rules

## 5.1 Nothing Is Taught Once and Forgotten

This is the primary instructional rule.

> Every chapter must build directly on the foundation created by earlier chapters.

Every chapter must:

1. Reconnect the student to earlier work.
2. Explain why that work matters now.
3. Introduce one manageable new idea.
4. Show a clear worked example.
5. Give the student a practical way to use the idea.
6. Reuse relevant knowledge and habits.
7. Strengthen the student’s plan, judgment, or project.
8. Explain how the work prepares them for what comes next.

Once a skill is introduced, it must continue to appear where relevant.

Examples:

- GitHub continues to be used after it is introduced.
- Testing becomes part of later build work.
- Scope control returns whenever features are considered.
- File organization is enforced throughout the build.
- Accessibility returns during every relevant page review.
- Earlier concepts return in later checks and scenarios.
- Debugging, recovery, documentation, and security are recurring habits.

## 5.2 Teach One Primary New Idea at a Time

A chapter should have one clear purpose.

Do not introduce a framework, database, authentication system, API, deployment platform, and testing system in the same lesson. Supporting details should appear only when they help the student complete the chapter’s main outcome.

## 5.3 Explain Why the Lesson Matters

Every lesson must connect the new idea to:

- Work already completed
- A real decision or problem
- The student’s selected learning path
- The guided project when applicable
- The next stage of the program

Technical material must not be included merely because it appears in traditional coding courses.

## 5.4 Use New Knowledge Immediately

Each chapter must include a practical action, such as:

- Making a product decision
- Updating the Build Plan or Learning Plan
- Improving a prompt
- Inspecting and correcting flawed AI output
- Organizing a feature into appropriate files
- Completing a guided build step
- Testing a feature
- Saving a stable version
- Explaining why a choice is appropriate

## 5.5 Plan Before Prompting

The course must repeatedly enforce this order:

1. Define the problem.
2. Identify the intended user.
3. Decide what the first version must accomplish.
4. Separate essential features from later ideas.
5. Plan pages and user flow.
6. Identify the information the product needs.
7. Choose appropriate tools.
8. Establish architecture and file responsibilities.
9. Build one page or feature at a time.
10. Test completed work.
11. Save stable versions.
12. Review the complete experience before launch.

Opening an AI tool and asking it to “build my app” is not a professional build process.

## 5.6 Students Must Direct and Correct AI

The course is not a prompt library and must not train students to accept the first generated answer.

Students must learn to:

- Give relevant context
- State the goal and intended user
- Name the exact page, file, feature, or problem
- State what must remain unchanged
- Request one focused change at a time
- Provide screenshots, errors, and current files when useful
- Ask AI to inspect before editing
- Ask which files will be created or changed
- Reject unrelated changes
- Reject unnecessary dependencies and services
- Reject bloated features and generic design
- Reject monolithic files and mixed responsibilities
- Test the result
- Revert to a stable version when repeated patches make the project worse
- Begin with clean context when a conversation becomes confused

The student’s judgment is more important than the AI’s first answer.

## 5.7 Responsibility Recognition, Not Traditional Theory

Website Foundations must explain HTML, CSS, JavaScript, React, Vite, TypeScript, routes, pages, components, shared styles, local development, and deployment only to the depth needed for practical control.

The test for a foundational technical concept is:

> Does the student now understand what this responsibility does, where it belongs, and what bad AI output looks like?

The program must not drift into traditional programming lectures that do not improve the student’s ability to plan, inspect, direct, correct, test, or recover work.

## 5.8 Flawed AI Output Must Appear Early and Often

Students must repeatedly inspect, reject, and correct realistic bad output, including:

- An entire website placed in `App.tsx`
- Multiple unrelated responsibilities in one file
- Duplicated CSS or components
- Unnecessary databases or services
- Secrets placed in public frontend code
- Missing mobile behavior
- Broken controls
- Invalid accessibility structure
- Scope creep
- Destructive broad rewrites
- Unnecessary frameworks or packages
- Polished pages that fail the stated user goal
- Fixes that change unrelated files
- Projects that look finished but cannot build or deploy

These exercises are a core instructional method, not optional enrichment.

---

# 6. Course Writing and Voice

All course and product writing must be simple, natural, useful, and human.

This applies to lessons, narration, animations, examples, quizzes, project instructions, setup instructions, rubrics, feedback, buttons, navigation, validation, errors, help content, marketing, progress messages, and email.

Writing must:

- Use plain language
- Use complete, natural sentences
- Put the simple explanation before deeper detail
- Define technical terms when first introduced
- Use concrete examples
- Tell the student what to do next
- Explain real value rather than internal implementation details
- Avoid unnecessary jargon
- Avoid corporate, academic, robotic, or documentation-heavy language
- Avoid talking down to the student
- Avoid filler and canned encouragement
- Avoid exaggerated claims
- Avoid repetitive AI-style phrasing
- Avoid robotic strings of slogans, adjectives, nouns, or sentence fragments

**Avoid:**

> Plan. Prompt. Build. Launch.

**Use:**

> Learn how to plan a website, guide AI through the build, test your work, and publish it.

Raw AI-generated course or product copy must never be published without human review and rewriting.

---

# 7. Lesson Delivery and Chapter Pattern

## 7.1 No Instructor-Recorded Video Lessons

Platinum VC Studios will not use talking-head videos or instructor-recorded screen lessons.

The course will be a self-paced, page-by-page experience using:

- Written instruction
- Optional narration
- A written transcript or equivalent text
- Focused animation
- Interactive demonstrations where useful
- Worked examples
- Short practice activities
- Understanding checks
- Guided build steps when relevant
- Module projects or cumulative exercises
- One clear next action

Students must never be forced to wait for audio or animation before continuing.

## 7.2 Audio

Audio must be optional. Students must be able to read without it, pause, replay, skip, and continue at their own pace.

## 7.3 Animation

Animation must explain rather than decorate.

Website Foundations examples may include:

- How pages, routes, components, and shared styles relate
- What happens when work is committed and pushed to GitHub
- The difference between a vague prompt and a controlled prompt
- How a user moves through a website
- The difference between local and deployed versions

Later programs may use animation for databases, APIs, authentication, data movement, and environment variables. Those topics must not be inserted into Website Foundations merely because the platform may eventually teach them.

Do not use constant decorative motion, animated backgrounds, background music during instruction, busy visuals, long unskippable sequences, or animation that exists only to make the product appear expensive.

## 7.4 Standard Chapter Rhythm

A normal chapter should:

1. Reconnect to the previous work.
2. Explain one new idea.
3. Show a worked example, including weak output when useful.
4. Let the student apply the idea.
5. Retrieve relevant earlier knowledge.
6. Save, record, test, or explain the result.
7. Show one clear next action.

Support should gradually fade as the student becomes more capable. Early chapters may be highly guided; later chapters should require more independent judgment.

---

# 8. Assessment, Mastery, and Review

## 8.1 Every Chapter Ends With a Check

Every chapter must end with a short **Check Your Understanding** activity.

The student must pass the check for the chapter to be marked mastered or counted toward verified completion.

However:

- A wrong answer must not permanently lock paid reading content.
- Students may continue reading and exploring.
- Unlimited retries should be available.
- There must be no artificial waiting period.
- Wrong answers must include an explanation and point back to the relevant lesson.
- Later checks should bring back important earlier concepts.
- Dependent guided-project stages may require earlier chapters to be mastered.

The exact passing score remains open.

## 8.2 Questions Must Test Judgment

Checks may require students to:

- Choose the best next step
- Correct a weak prompt
- Reject unnecessary complexity
- Identify a file or responsibility to inspect
- Correct flawed architecture
- Order build or recovery steps
- Diagnose a short error scenario
- Explain what must remain unchanged
- Plan how a correction will be tested

Trivia must not be mistaken for competence.

## 8.3 Practical Evidence Is Stronger Proof

Quizzes reinforce learning. Practical work is stronger evidence when a student chooses to build.

Coursework-Only students must still complete meaningful plans, corrections, scenarios, and cumulative exercises.

## 8.4 Three Website Foundations Human-Review Checkpoints

Website Foundations has only three required human-review checkpoints:

1. **Website Plan Approval** before substantial building
2. **Architecture Checkpoint** after the shared foundation and first meaningful page, before structural problems multiply
3. **Final Completion Review** against all required evidence

Routine human review must not be added to every chapter unless staffing capacity and review standards are formally expanded.

## 8.5 Feedback Must Be Actionable

Review feedback must explain:

1. What was done correctly
2. What is incomplete or incorrect
3. Why it matters
4. What should change
5. How the student can prove it was corrected

Generic feedback such as “good job” or “needs work” is not sufficient.

## 8.6 No AI Grading or Project Review

The platform will not use AI-provider APIs to grade quizzes or review student projects.

Non-AI automated checks may be used where they are reliable and transparent. Human judgment is reserved for the locked high-value review checkpoints.

## 8.7 Completion Must Be Honest

No label may claim that a student built, published, or launched a product unless the required evidence was actually completed and reviewed.

---

# 9. Two Valid Learning Paths

Every program may offer two valid participation paths when appropriate.

## 9.1 Guided Build-Along

For Website Foundations, the student chooses an approved basic website project and builds it one step at a time while completing the coursework.

Website Foundations guided projects must be:

- Beginner-manageable
- Large enough to demonstrate the complete website process
- Built gradually rather than generated all at once
- Structured to reuse earlier work
- Free of databases, authentication, backend services, and unnecessary application complexity
- Suitable for planning, prompting, architecture, GitHub, testing, recovery, and public deployment

The exact project catalog and default project remain open.

## 9.2 Coursework-Only

The student completes lessons, examples, practical exercises, corrections, understanding checks, and cumulative scenarios without publishing the guided project at that time.

This path must still include worked examples, decision exercises, prompt critiques, architecture exercises, defect scenarios, tool-selection reasoning, test planning, recovery scenarios, and cumulative evidence.

It must not become passive reading, and it must not be described as lazy or inferior.

## 9.3 Path Persistence

The platform should preserve the student’s selected path. The exact process for switching paths or beginning a guided project later remains open.

---

# 10. Student Plan

Every student maintains one central record throughout the program.

## 10.1 Website Foundations Build Plan

A Guided Website Foundations Build Plan may contain:

- Website name and purpose
- Problem or need being addressed
- Intended audience
- Main visitor outcome
- First-version scope
- Features intentionally excluded
- Required pages
- Primary user flow
- Visual direction
- Major content requirements
- File and responsibility plan
- Prompts used
- Rejected or corrected AI output
- Problems and corrections
- Decisions and reasons
- Testing checklist and results
- GitHub repository and milestone commits
- Recovery demonstration
- Deployment link
- Review feedback and resubmissions

Database plans, authentication, backend services, application API integrations, and transactional email do not belong in the Website Foundations Build Plan.

## 10.2 Coursework-Only Learning Plan

The Learning Plan contains the student’s goals, notes, decisions, sample blueprints, file maps, correction exercises, testing work, recovery scenarios, and understanding-check history.

It may later become a Build Plan if the student begins a guided project.

---

# 11. Chapter 1 Requirements

Chapter 1 is the formal introduction. It must not be a disposable welcome screen.

By the end of Chapter 1, a Website Foundations student must understand:

- What Website Foundations teaches
- What it deliberately does not teach
- The exact capability the program is designed to produce
- How chapters build on earlier work
- How practical activities, checks, projects, and reviews work
- Why planning, testing, correction, saving, recovery, and modular organization recur
- The difference between Guided Build-Along and Coursework-Only
- Which external tools and accounts are required for the chosen path
- That the Platinum VC Studios platform itself was vibe coded
- What the student hopes to learn or build
- That later gated programs cover data, backend services, software or desktop applications, and phone applications

When the module map is approved, Chapter 1 must include a simple program journey that accurately reflects it.

## 11.1 Registration and Name Personalization

Registration must collect first name, last name, email, password, and password confirmation.

The first name must be stored in the future student profile and used naturally when the platform welcomes, guides, corrects, or recognizes the student.

Useful examples include return greetings, chapter introductions, progress summaries, milestone recognition, review feedback, and completion moments.

The name must not be inserted repeatedly into every paragraph or button.

## 11.2 The Platform Was Vibe Coded

Chapter 1 must clearly state:

> The very course platform you are using was vibe coded.

The explanation must be honest:

- The product began as an idea.
- Goals, rules, pages, architecture, design, and behavior were planned.
- AI assisted the work.
- Human judgment was required to reject bad ideas, control scope, organize files, revise language, test features, correct errors, protect data, and maintain consistency.
- The platform did not appear fully formed from one prompt.

Platinum VC Studios should be used as a recurring case study when it helps explain planning, design, architecture, GitHub, progress, testing, deployment, and correction. Later programs may also use it to explain authentication, databases, email, and protected server behavior.

Private credentials, security-sensitive details, and student data must never be exposed.

## 11.3 Choose a Path and Starting Point

Chapter 1 must:

- Explain Guided Build-Along
- Explain Coursework-Only
- Let the student choose a path
- Let guided students choose from the approved website project catalog once it exists
- Explain what tools and accounts will be needed
- Ask why the student enrolled
- Ask what they may want to build
- Ask what completing the program would help them accomplish
- Ask their current experience level
- Ask what currently feels confusing or difficult
- Create the first Build Plan or Learning Plan entry

---

# 12. Student-Owned Tools and Accounts

Platinum VC Studios will not provide or control the student’s external development accounts.

## 12.1 Website Foundations Tools

The Guided Website Foundations path will require or may require:

- **Visual Studio Code**
- **A preferred external AI tool or approved alternative**
- **GitHub**
- **An approved static website deployment service**
- **A domain provider**, only when the student chooses to connect a domain

The preferred AI tool and default student deployment service remain open.

Resend, PostgreSQL, Prisma, authentication services, backend hosting, and application API keys are not Website Foundations student requirements.

## 12.2 Later-Program Tools

Later programs may introduce Railway backend hosting, PostgreSQL, Prisma, Resend, authentication, environment variables, API keys, external APIs, desktop frameworks, mobile frameworks, and store tools when the curriculum requires them.

Students must be told what is needed early enough to prepare without being forced to create every outside account on the first day.

Setup should be separated into:

- Prepare now
- Needed later
- Only needed for certain programs or projects

## 12.3 Student-Owned AI Account

The student will use their own AI account outside Platinum VC Studios. It may be free or paid.

The course must explain the preferred tool, acceptable alternatives, possible free-plan limits, separate subscription costs, and the rule that students must never share passwords, payment information, private keys, or sensitive data.

## 12.4 External Account Responsibility

The student owns and controls all external accounts.

Platinum VC Studios must not request or store external-service passwords, AI logins, GitHub passwords, private API keys, deployment passwords, recovery codes, or private `.env` contents.

---

# 13. Progress, Encouragement, and Re-Engagement

The product should deliberately support motivation without manipulating students.

## 13.1 Encouragement Must Reflect Real Progress

Encouragement should recognize specific completed work, reduced uncertainty, corrected mistakes, recovered work, or earned capability.

Useful examples include:

- “Let’s go — your first website decision is complete.”
- “3 of 5 chapter steps complete — 60%.”
- “Two steps remain: test the mobile navigation, then save the stable version.”
- “You recovered a working version. That is part of building.”

“Let’s go” and other energetic language should be used at meaningful moments, not on every screen.

## 13.2 Progress Must Be Honest

Chapter progress must be based on defined actions rather than scrolling to the bottom of a page.

Possible required actions include reading the explanation, reviewing the worked example, completing the practical activity, passing the check, and saving or recording the result.

Program, module, chapter, lesson-step, and guided-project progress should remain distinguishable.

## 13.3 No Shame or Punitive Engagement

Do not use punitive streaks, fake urgency, fake scarcity, guilt, comparison with other students, lost earned progress, or messages that imply the student has failed because life interrupted the course.

## 13.4 Reminder Emails

Course-progress reminders and encouragement emails must be optional, preference-controlled, and separate from product-upgrade marketing.

A reminder should:

- Refer to the exact program and next incomplete activity
- Preserve the student’s progress
- Use a direct resume link
- Reduce the next step when useful
- Avoid guilt and surveillance-style language
- Include the required unsubscribe and preference controls

A candidate inactivity sequence to test is approximately 3–4 days, 7 days, 14 days, and 30 days. This cadence is **not locked** and must be tested rather than assumed effective.

After a final pause-or-continue message, automatic inactivity reminders should stop unless the student returns or chooses continued reminders.

## 13.5 Measure Meaningful Return

Reminder experiments must measure return to meaningful activity, chapter progress, completion, unsubscribe rate, and complaints—not merely email opens.

A persistent control group should be maintained while the reminder system is evaluated.

---

# 14. Program Access, Purchases, and Upgrades

## 14.1 One Connected Journey, Separate Entitlements

The platform will present one connected roadmap while granting access separately for each program.

Website Foundations may be purchased on its own. Later programs may be purchased when the student is ready.

## 14.2 All-Access Package

An All-Access package must be offered from the beginning for students who want the complete planned program collection.

When later programs are unfinished, the offer must clearly distinguish:

- Available now
- In development
- Planned
- What future access is actually included

The platform must never imply that unreleased content is immediately available.

## 14.3 Upgrade Opportunities

Upgrade options may appear in restrained, relevant places:

- The initial program comparison
- The student roadmap or catalog
- A quiet “what comes next” section near the end of a program
- The program-completion page
- A locked-program transition page

The strongest upgrade offer should appear after the student’s completed capability and evidence are recognized.

Course-support reminders must not be disguised sales emails.

## 14.4 Credit for Earlier Purchases

A student who buys Website Foundations and later upgrades to a larger package should receive eligible credit for earlier qualifying purchases rather than paying for the same access twice.

The exact credit formula, eligibility period, refund interaction, and regional pricing rules remain open.

## 14.5 Access Enforcement

Stripe is the planned payment processor. Platinum VC Studios must maintain its own server-side order and entitlement records.

The future access model should separate:

- Programs
- Commerce products and prices
- Product-to-program entitlement mappings
- Orders
- User entitlements
- Lesson and project progress
- Processed payment events

Paid lesson content and protected resources must be enforced on the server. Hiding a link, button, route, or section in React is not access control.

Payment success must be verified server-side before access is granted. Refunds, disputes, and reversed payments must be able to update entitlements without deleting earned progress records.

## 14.6 Pricing Details Still Open

The following remain open:

- Final public program names
- Exact prices
- One-time versus any future payment-plan options
- All-Access terms
- Future-update promises
- Refund policy
- Taxes and regional pricing
- Upgrade-credit formula
- Release timing for later programs

---

# 15. No AI API Integration

This is a locked product decision.

The Platinum VC Studios platform will not connect to OpenAI, Anthropic, Google, or another AI provider through an API.

It will not include an embedded AI assistant, run student prompts, generate guided-project code inside the course, request or store AI API keys, proxy AI usage, or use AI APIs to grade quizzes or review projects.

The platform was built with AI assistance, and students use their own external AI tools, but the production course platform itself does not call AI-provider APIs.

---

# 16. Modular Architecture Rule

This is a major non-negotiable rule for Platinum VC Studios and every guided project.

> An application will not be built inside one massive file.

The codebase must be organized into focused responsibilities from the beginning.

Do not combine interface markup, styling, route definitions, authentication, database access, API calls, validation, state management, and business logic inside one giant file.

Unacceptable examples include:

- The entire application living in `App.tsx`
- Every page and route living in one file
- Registration, login, password reset, and verification combined into one giant component
- Database or server logic buried inside a visual page
- One enormous stylesheet controlling unrelated areas
- Keeping a giant file merely because AI generated it
- Copying the same interface or logic instead of sharing it

Applications should use focused files for pages, routes, layouts, auth screens, shared components, feature components, navigation, forms, validation, hooks, state, API clients, backend handlers, database access, business rules, types, configuration, utilities, styles, tokens, and tests as relevant.

The goal is not hundreds of meaningless files. The goal is clear responsibility, maintainability, reuse, and testability.

Before AI builds a substantial feature, students should request:

1. The responsibilities involved
2. The files it plans to create or change
3. A brief purpose for each file
4. A step-by-step build order

Development has now begun. The current frontend structure uses dedicated `pages`, `components`, `routes`, `styles`, and `utils` responsibilities. The final expanded repository tree will evolve deliberately as backend, data, commerce, and course features are added.

---

# 17. Approved Platform Technology and Current Implementation

This section describes the Platinum VC Studios platform itself, not the required stack for every student project.

## 17.1 Current Frontend

The current platform frontend uses:

- React
- Vite
- TypeScript
- React Router
- CSS Modules
- Shared design tokens and global foundation styles

Current routes include:

- `/` — landing page
- `/register` — registration interface
- `/forgot-password` — forgot-password interface

The registration and forgot-password forms currently provide frontend validation only. They do not yet create accounts, send codes, or communicate with a backend.

## 17.2 Current Deployment Configuration

The repository currently includes Railway deployment support for the frontend:

- Railpack builder
- `npm run build`
- `npm run start`
- Static single-page fallback through `serve`
- `/` health check

Railway is the configured deployment target in the current repository. Vercel is not currently configured for this platform frontend.

## 17.3 Future Backend

The approved backend direction is:

- Node.js
- Express
- TypeScript
- Railway hosting

The future API will handle protected responsibilities such as accounts, sessions, progress, quiz results, submissions, reviews, permissions, purchases, entitlements, reminders, and transactional-email requests.

## 17.4 Database

The approved database direction is:

- PostgreSQL hosted on Railway
- Prisma for schema definitions, migrations, and TypeScript database access

Platinum VC Studios will not use Supabase for its database, authentication, storage, or backend platform.

## 17.5 Authentication

Authentication must be server-controlled and use Railway PostgreSQL.

Better Auth remains the leading candidate, but it is not final until a focused proof of concept confirms registration, login, sessions, verification, password reset, protected routes, and account deletion work cleanly with Express and Railway.

## 17.6 Transactional and Reminder Email

Resend is the approved email service direction for verification, password reset, submission confirmation, review notifications, and opted-in course reminders.

The Resend API key must exist only on the backend. Transactional messages and optional course or marketing messages must remain correctly separated.

## 17.7 Testing

Frontend, backend, and complete user-flow testing are required. The exact testing libraries remain open.

---

# 18. Professional Product and Design Standard

Platinum VC Studios must be built like a real production product from a professional technology company.

It is not a temporary prototype, collection of disconnected mockups, generic course template, or polished interface with fake production behavior.

A page is not finished merely because it looks good in one screenshot.

The product must include, where relevant:

- Predictable navigation
- A consistent design system
- Responsive desktop, tablet, and mobile behavior
- Accessible contrast and readable typography
- Keyboard access and visible focus states
- Real loading, empty, success, error, disabled, and permission states
- Helpful validation and recovery messages
- Secure sessions, data, and secrets
- Reliable progress saving and restoration
- Working controls
- Tested critical flows
- Reasonable performance
- Clear privacy, support, account, and deletion experiences
- Maintainable code and a deliberate release process

## 18.1 Locked Visual Direction

The design is modern, spacious, restrained, credible, approachable, mature, and human.

Locked principles include:

- Strong visual hierarchy
- Simple page structures
- Intentional alignment
- Controlled content widths
- Typography sized for hierarchy rather than drama
- One obvious primary action at a time
- Lesson content as the visual priority
- Cards only when content genuinely needs a boundary

## 18.2 Locked Foundation Tokens

The current approved foundation is:

- Background: `#F9F8F6`
- Primary text: `#121212`
- Secondary text: `#4A4A4A`
- Border: `#E8E6E2`
- Accent: `#2F5D5E`
- Accent hover: `#274E4F`
- Silver: `#A8ADB0`, decorative only
- White: `#FFFFFF`
- Font: Inter
- Button radius: `8px`
- Surface radius: `12px`
- Main content width: `1100px`

The brand name is text-only until a logo mark is approved.

## 18.3 What the Design Must Avoid

Do not use:

- Dramatic or neon color
- Purple-and-blue AI gradients
- Glowing backgrounds
- Glassmorphism
- Decorative floating blobs
- Giant headlines
- Heavy shadows
- Random charts or fake metrics
- Gimmicky motion
- Bloated navigation
- Overcomplicated layouts
- Generic startup slogans
- Robotic buzzword strings
- Rounded cards as the default layout
- Giant outer containers that make the entire website one card

The final logo mark and tagline remain open. The foundation palette is no longer an open decision.

---

# 19. Quality Checks

## 19.1 Chapter

A chapter is not approved unless it:

- Builds on earlier work
- Introduces one primary new idea
- Explains why it matters
- Uses simple human language
- Includes a worked example
- Gives every student a practical action
- Includes a guided build step when relevant
- Reuses earlier knowledge
- Ends with a Check Your Understanding activity
- Provides corrective explanations
- Updates the student’s plan or project when appropriate
- Makes the next action clear

## 19.2 Module

A module is not approved unless it:

- Produces evidence required by the Completion Standard
- Has one clear cumulative outcome
- Uses chapters in a logical order
- Reinforces earlier modules
- Provides meaningful evidence for both paths
- Protects guided students from building on a broken foundation
- Leaves work stable, saved, and modular
- Moves the student closer to independent judgment

## 19.3 Product Feature

A page or feature is not production-ready unless it:

- Supports a real user goal
- Fits the information architecture
- Uses the shared design system
- Uses appropriate dedicated files
- Does not mix unrelated interface, routing, auth, data, integration, and business responsibilities
- Reuses existing components and utilities
- Works responsively
- Handles relevant loading, empty, success, error, validation, disabled, and permission states
- Meets accessibility expectations
- Avoids robotic copy and unnecessary decoration
- Preserves data and progress correctly
- Protects private data and secrets
- Has been tested through the complete flow
- Feels coherent with the rest of the platform

---

# 20. Decisions That Remain Open

The following have not been finalized:

- Website Foundations high-level module map
- Exact module and chapter count
- Full chapter sequence
- Exact website project catalog and default project
- Rules for changing learning paths or projects
- Catch-up process for starting a guided project later
- Preferred external AI tool and approved alternatives
- Default student website deployment service
- Exact final names and boundaries of later programs
- Whether “software” and “desktop applications” are one program or separate concepts
- Final release order after the shared web-application foundation
- Exact public prices
- Payment-plan options, if any
- All-Access terms and future-update promises
- Refund, tax, regional-pricing, and upgrade-credit policies
- Final authentication library after proof of concept
- Exact testing libraries
- Exact chapter passing score
- Whether project checkpoints hard-gate later guided work beyond the locked architecture requirement
- Human-review turnaround times and resubmission limits
- Which reliable non-AI checks may be automated
- Final reminder cadence, default preference, and experiment design
- Completion labels, certificates, or badges beyond the locked Website Foundations claim
- Later-program capstones
- Final logo mark and tagline
- Final expanded backend and commerce repository structure

---

# 21. Next Planning and Build Phase

The Website Foundations Completion Standard is locked.

The next curriculum document is the **Website Foundations High-Level Module Map**.

The work should proceed in this order:

1. Derive each module directly from required completion evidence.
2. Define one cumulative outcome for each module.
3. Map Guided and Coursework-Only evidence for each module.
4. Place the three human-review checkpoints at the correct stages.
5. Confirm that every module reuses earlier skills.
6. Divide approved modules into focused chapters.
7. Define the practical action and Check Your Understanding activity for each chapter.
8. Build one complete pilot module.
9. Observe real beginners using it without intervention.
10. Correct the lesson pattern, workload, language, progress messages, and support level.
11. Scale the corrected pattern across the remaining program.
12. Beta test the full student journey before public release.

Platform foundation work may continue in parallel for shared public pages, authentication preparation, accessibility, routing, and design-system components. It must not invent unapproved lesson content, assessments, program claims, prices, or backend behavior.

No page, chapter, animation, quiz, setup task, project, upgrade prompt, or reminder should exist merely to fill space.

---

# Core Standard

> Every chapter introduces one manageable new idea, connects it to prior learning, gives every student a practical way to use it, offers a guided build step when relevant, reinforces earlier skills, checks understanding without punishing curiosity, and leaves the student better prepared to build independently.