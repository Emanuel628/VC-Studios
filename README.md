# Platinum VC Studios

**Website:** `platinumvcstudios.com`  
**Repository:** `Emanuel628/VC-Studios`  
**VC means:** Vibe Code  
**Product:** One connected course platform with separately gated learning programs  
**Current program:** Website Foundations  
**Current stage:** Website Foundations completion standard locked; high-level module mapping is next; landing and frontend authentication interfaces are implemented  
**Last fully audited:** August 2, 2026

## Source-of-Truth Order

This README records platform-wide and program-wide decisions.

The source-of-truth order is:

1. This README for platform, program, access, technology, design, and implementation decisions.
2. [`docs/website-foundations-completion-standard.md`](docs/website-foundations-completion-standard.md) for the exact Website Foundations completion evidence and review requirements.
3. Implemented code and configuration for what currently exists.

For Website Foundations, the locked Completion Standard controls if a general summary in this README is less specific.

Implemented code shows current behavior. It does not silently override a later approved decision. When code and an approved decision differ, the mismatch must be corrected or recorded as implementation debt.

Suggestions, examples, research findings, and working labels must not silently become requirements. Open decisions are listed explicitly near the end of this document.

The complete Website Foundations module and chapter sequence has **not** been approved. Full lesson content must not be invented before the high-level module map is approved.

---

# 1. Product Mission

Platinum VC Studios teaches people how to take a website or software idea from concept to a working, published product with AI assistance while maintaining human control over the result.

It is **not** a traditional programming or computer-science school. Students are not required to memorize syntax or become software engineers before they are allowed to build.

It is also **not** a “forget the code exists” product. Students must learn enough to:

- Understand the major responsibilities inside a project
- Recognize bad AI output
- Protect working behavior
- Reject unnecessary complexity
- Test results instead of trusting appearance
- Recover from mistakes
- Explain important decisions
- Finish and publish work they understand

The platform teaches students how to:

- Turn an idea into a realistic plan
- Define a controlled first version
- Choose appropriate tools
- Direct AI with clear, focused instructions
- Build one manageable page or feature at a time
- Organize work into maintainable files and responsibilities
- Recognize scope creep, destructive rewrites, weak architecture, and fake completeness
- Use GitHub to save, inspect, protect, and restore work
- Test and correct completed work
- Publish a working product
- Progress into more advanced product types through later programs

The product must not promise instant expertise, effortless success, guaranteed income, or professional software-engineering credentials.

> Platinum VC Studios teaches the practical process of planning, directing, testing, correcting, protecting, recovering, and launching products with AI assistance.

---

# 2. Terminology and Connected Program Model

Platinum VC Studios will feel like **one connected course journey**.

A **program** is an internally distinct, separately gated and purchasable section of that journey. Students should not be forced to navigate unrelated course products or restart their account and progress for every subject area.

Access is granted through server-controlled program entitlements, not by merely hiding links or React routes.

## 2.1 Program 1: Website Foundations

**Website Foundations is the locked name of the first program and the program being built now.**

It teaches students how to plan, build, organize, test, recover, and publish a professional responsive basic website with AI assistance.

Its exact completion evidence is locked in the Website Foundations Completion Standard.

## 2.2 Later Program: Web Applications and Data

A later separately gated program will extend the shared foundation into products that store data and use protected server behavior.

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

The final public name and curriculum are not locked.

## 2.3 Later Software and Desktop Program

A later separately gated program will teach installable software or desktop-application development.

The exact boundary between **software** and **desktop applications**, the framework, prerequisites, and final public name remain open.

## 2.4 Later Phone-Application Program

A later separately gated program will teach phone applications for iPhone and Android.

Its future scope may include mobile navigation, touch behavior, device permissions, storage, mobile testing, and store preparation. The exact curriculum and stack remain open.

## 2.5 Intended Progression

The working progression is:

1. Website Foundations
2. Web Applications and Data
3. A desktop/software specialization or a phone-application specialization

Desktop and phone development should not be placed in an artificial sequence when one is not a true prerequisite for the other.

The final later-program names, boundaries, release order, and prerequisites remain open until those programs are designed.

---

# 3. Website Foundations: Locked Scope

Website Foundations must produce a complete, useful capability. It is not an unfinished half-course that requires an immediate upgrade to become valuable.

A successful student may be told:

> You can now plan, build, organize, test, and publish a professional responsive website with AI assistance.

## 3.1 Guided Build-Along Summary

A Guided student must produce:

- A reviewed Website Build Plan
- A purposeful homepage and at least two additional purposeful pages, unless a justified equivalent is approved
- A responsive desktop, tablet, and mobile website
- A modular project structure with one page component per page file
- Evidence of focused prompts and rejected or corrected AI output
- A documented scope-control decision
- A documented architecture correction
- A GitHub repository with meaningful commits
- A visible revert or restore demonstration
- A testing record with at least one defect found, corrected, and retested
- A successful public deployment
- A structured final explanation

## 3.2 Coursework-Only Summary

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
- API-key setup or management for application integrations
- Desktop-software development
- Phone-application development

Students may learn to recognize that secrets and API keys do not belong in public frontend code. They are not taught to configure application API integrations in Website Foundations.

Those capabilities belong to later separately gated programs.

---

# 4. Public Marketing Boundary

The primary public offer being sold and built now is Website Foundations.

Until later programs are released, public acquisition copy must not imply that the Website Foundations purchase teaches databases, backend development, general software, desktop applications, or phone applications.

The public website may explain the broader Platinum VC Studios roadmap and the future All-Access package, but it must clearly distinguish:

- What Website Foundations teaches now
- What is available now
- What is in development
- What is only planned
- What a particular purchase actually unlocks

No public pricing table, price claim, discount claim, or package value claim should be published until the exact amounts and terms are approved.

---

# 5. Intended Student

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

# 6. Non-Negotiable Teaching Rules

## 6.1 Nothing Is Taught Once and Forgotten

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

- GitHub continues after introduction.
- Testing becomes part of later work.
- Scope control returns whenever features are considered.
- File organization is enforced throughout the build.
- Accessibility returns during relevant page reviews.
- Earlier concepts return in later checks and scenarios.
- Debugging, recovery, documentation, and security become recurring habits.

## 6.2 Teach One Primary New Idea at a Time

A chapter should have one clear purpose.

Do not introduce a framework, database, authentication system, API, deployment platform, and testing system in one lesson. Supporting details should appear only when they help the chapter’s main outcome.

## 6.3 Explain Why the Lesson Matters

Every lesson must connect the new idea to:

- Work already completed
- A real decision or problem
- The selected learning path
- The Guided project when applicable
- The next stage of the program

Technical material must not be included merely because it appears in traditional coding courses.

## 6.4 Use New Knowledge Immediately

Each chapter must include a practical action, such as:

- Making a product decision
- Updating the Build Plan or Learning Plan
- Improving a prompt
- Inspecting and correcting flawed AI output
- Organizing a responsibility into appropriate files
- Completing a Guided build step
- Testing a feature
- Saving a stable version
- Explaining why a choice is appropriate

## 6.5 Plan Before Prompting

The program must repeatedly enforce this order:

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

## 6.6 Students Must Direct and Correct AI

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

## 6.7 Responsibility Recognition, Not Traditional Theory

Website Foundations explains HTML, CSS, JavaScript, React, Vite, TypeScript, routes, pages, components, shared styles, local development, and deployment only to the depth needed for practical control.

The test for a foundational technical concept is:

> Does the student understand what this responsibility does, where it belongs, and what bad AI output looks like?

The program must not drift into traditional programming lectures that do not improve the student’s ability to plan, inspect, direct, correct, test, or recover work.

## 6.8 Flawed AI Output Appears Early and Often

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

## 6.9 Support Fades as Competence Grows

Early chapters may be highly guided and use complete worked examples.

Later chapters should reduce the amount of step-by-step support and require more independent planning, correction, testing, and explanation.

---

# 7. Course Writing and Voice

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

# 8. Lesson Delivery and Chapter Pattern

## 8.1 No Instructor-Recorded Video Lessons

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

## 8.2 Audio

Audio must be optional. Students must be able to read without it, pause, replay, skip, and continue at their own pace.

## 8.3 Animation

Animation must explain rather than decorate.

Website Foundations examples may include:

- How pages, routes, components, and shared styles relate
- What happens when work is committed and pushed to GitHub
- The difference between a vague prompt and a controlled prompt
- How a user moves through a website
- The difference between local and deployed versions

Later programs may use animation for databases, APIs, authentication, data movement, and environment variables. Those topics must not be inserted into Website Foundations merely because the platform may eventually teach them.

Do not use constant decorative motion, animated backgrounds, background music during instruction, busy visuals, long unskippable sequences, or animation that exists only to make the product appear expensive.

## 8.4 Standard Chapter Rhythm

A normal chapter should:

1. Reconnect to previous work.
2. Explain one new idea.
3. Show a worked example, including weak output when useful.
4. Let the student apply the idea.
5. Retrieve relevant earlier knowledge.
6. Save, record, test, or explain the result.
7. Show one clear next action.

---

# 9. Assessment, Mastery, and Review

## 9.1 Every Chapter Ends With a Check

Every chapter must end with a short **Check Your Understanding** activity.

The student must pass the check for the chapter to be marked mastered or counted toward verified completion.

However:

- A wrong answer must not permanently lock paid reading content.
- Students may continue reading and exploring.
- Unlimited retries should be available.
- There must be no artificial waiting period.
- Wrong answers must include an explanation and point back to the relevant lesson.
- Later checks should bring back important earlier concepts.
- Dependent Guided stages may require earlier chapters to be mastered.

The exact passing score remains open.

## 9.2 Questions Must Test Judgment

Checks may require students to:

- Choose the best next step
- Correct a weak prompt
- Reject unnecessary complexity
- Identify a file or responsibility to inspect
- Correct flawed architecture
- Order build or recovery steps
- Diagnose an error scenario
- Explain what must remain unchanged
- Plan how a correction will be tested

Trivia must not be mistaken for competence.

## 9.3 Practical Evidence Is Stronger Proof

Quizzes reinforce learning. Practical work is stronger evidence when a student chooses to build.

Coursework-Only students must still complete meaningful plans, corrections, scenarios, and cumulative evidence.

## 9.4 Three Human-Review Checkpoints for Both Paths

Website Foundations has only three required human-review checkpoints. The evidence is adapted to the selected path.

1. **Website Plan or Blueprint Approval** before substantial Guided building or later cumulative Coursework-Only architecture work
2. **Architecture or File-Map Checkpoint** before structural mistakes become the foundation for later work
3. **Final Completion Review** against all required evidence

Routine human review must not be added to every chapter unless staffing capacity and review standards are formally expanded.

## 9.5 Feedback Must Be Actionable

Review feedback must explain:

1. What was done correctly
2. What is incomplete or incorrect
3. Why it matters
4. What should change
5. How the student can prove it was corrected

Generic feedback such as “good job” or “needs work” is not sufficient.

## 9.6 No AI Grading or Project Review

The platform will not use AI-provider APIs to grade quizzes or review student projects.

Non-AI automated checks may be used where they are reliable and transparent. Human judgment is reserved for the locked high-value review checkpoints.

## 9.7 Completion Must Be Honest

No label may claim that a student built, published, or launched a product unless the required evidence was completed and reviewed.

---

# 10. Two Valid Learning Paths

## 10.1 Guided Build-Along

For Website Foundations, the student chooses an approved basic website project and builds it one manageable step at a time while completing the program.

Guided projects must be:

- Beginner-manageable
- Large enough to demonstrate the complete website process
- Built gradually rather than generated all at once
- Structured to reuse earlier work
- Free of databases, authentication, backend services, and unnecessary application complexity
- Suitable for planning, prompting, architecture, GitHub, testing, recovery, and public deployment

The exact project catalog and default project remain open.

## 10.2 Coursework-Only

The student completes lessons, examples, practical exercises, corrections, understanding checks, and cumulative scenarios without publishing the Guided website.

This path must include worked examples, decision exercises, prompt critiques, architecture exercises, defect scenarios, tool-selection reasoning, test planning, recovery scenarios, and cumulative evidence.

It must not become passive reading and must not be described as lazy or inferior.

## 10.3 Equal Treatment and Path Persistence

The two learning paths must receive equal visual weight until the student selects one. Neither receives a preferred border, background, badge, or recommendation by default.

The platform should preserve the selected path.

The exact process for switching paths, beginning a Guided project later, or carrying earlier Coursework-Only evidence forward remains open. Public copy must not promise a no-restart transition until that process is approved and implemented.

---

# 11. Student Plan

Every student maintains one central record throughout the program.

## 11.1 Website Foundations Build Plan

A Guided Build Plan may contain:

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

## 11.2 Coursework-Only Learning Plan

The Learning Plan contains the student’s goals, notes, decisions, sample blueprints, file maps, correction exercises, testing work, recovery scenarios, and understanding-check history.

It may later become a Build Plan only after the path-transition process is approved.

---

# 12. Chapter 1 and Authentication Entry Requirements

Chapter 1 is the formal introduction. It must not be a disposable welcome screen.

By the end of Chapter 1, a Website Foundations student must understand:

- What Website Foundations teaches
- What it deliberately does not teach
- The exact capability the program is designed to produce
- How chapters build on earlier work
- How practical activities, checks, projects, and reviews work
- Why planning, testing, correction, saving, recovery, and modular organization recur
- The difference between Guided Build-Along and Coursework-Only
- Which outside tools and accounts are required for the selected path
- That the Platinum VC Studios platform itself was vibe coded
- What the student hopes to learn or build
- That later gated programs cover data, backend services, software or desktop applications, and phone applications

When the module map is approved, Chapter 1 must include an accurate program journey without inventing a chapter count.

## 12.1 Registration and Name Personalization

Registration collects:

- First name
- Last name
- Email
- Password
- Password confirmation

The first name must be stored in the future student profile and used naturally when the platform welcomes, guides, corrects, or recognizes the student.

Useful examples include return greetings, chapter introductions, progress summaries, milestone recognition, review feedback, and completion moments.

The name must not be inserted repeatedly into every paragraph or button.

## 12.2 Registration Interface Requirements

The registration interface includes:

- A visible password-strength indicator
- A multi-stage colored strength bar
- Live password criteria
- Show or hide password controls
- Password-match validation
- Field-level validation
- A **Create account** CTA

The current frontend criteria are:

- At least eight characters
- One uppercase letter
- One lowercase letter
- One number
- One symbol

These are current interface behavior, not the final server-side password policy. The final authentication implementation must choose and enforce one policy consistently on both frontend and backend.

## 12.3 Forgot-Password Interface Requirements

The forgot-password page asks for email only and uses a **Send code** CTA.

The current page validates the email on the frontend. It does not yet generate or send a recovery code.

## 12.4 The Platform Was Vibe Coded

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

## 12.5 Choose a Path and Starting Point

Chapter 1 must:

- Explain Guided Build-Along
- Explain Coursework-Only
- Let the student choose a path
- Let Guided students choose from the approved website project catalog once it exists
- Explain what tools and accounts will be needed
- Ask why the student enrolled
- Ask what they may want to build
- Ask what completing the program would help them accomplish
- Ask their current experience level
- Ask what currently feels confusing or difficult
- Create the first Build Plan or Learning Plan entry

---

# 13. Student-Owned Tools and Accounts

Platinum VC Studios will not provide or control the student’s external development accounts.

## 13.1 Website Foundations Tools

The Guided path will require or may require:

- **Visual Studio Code**
- **A preferred external AI tool or approved alternative**
- **GitHub**
- **Vercel**, the default frontend deployment service
- **Railway**, an approved alternative frontend deployment service
- **A domain provider**, only when the student chooses to connect a custom domain

Vercel is the primary deployment path taught in Website Foundations. Railway may also be used because it can deploy the frontend and provide a generated public URL quickly. A student should not be required to deploy the same project to both services.

The preferred external AI tool remains open.

Resend, PostgreSQL, Prisma, authentication services, backend development, and application API keys are not Website Foundations student requirements.

## 13.2 Later-Program Tools

Later programs may introduce Railway backend hosting, PostgreSQL, Prisma, Resend, authentication, environment variables, API keys, external APIs, desktop frameworks, mobile frameworks, and store tools when required.

Students must be told what is needed early enough to prepare without being forced to create every outside account on the first day.

Setup should be separated into:

- Prepare now
- Needed later
- Only needed for certain programs or projects

## 13.3 Student-Owned AI Account

The student uses their own AI account outside Platinum VC Studios. It may be free or paid.

The course must explain the preferred tool, acceptable alternatives, possible free-plan limits, separate subscription costs, and the rule that students must never share passwords, payment information, private keys, or sensitive data.

## 13.4 External Account Responsibility

The student owns and controls all outside accounts.

Platinum VC Studios must not request or store outside-service passwords, AI logins, GitHub passwords, private API keys, deployment passwords, recovery codes, or private `.env` contents.

---

# 14. Progress, Encouragement, and Re-Engagement

The product should deliberately support motivation without manipulating students.

## 14.1 Encouragement Reflects Real Progress

Encouragement should recognize specific completed work, reduced uncertainty, corrected mistakes, recovered work, or earned capability.

Useful examples include:

- “Let’s go — your first website decision is complete.”
- “3 of 5 chapter steps complete — 60%.”
- “Two steps remain: test the mobile navigation, then save the stable version.”
- “You recovered a working version. That is part of building.”

“Let’s go” and other energetic language should be used at meaningful moments, not on every screen.

## 14.2 Progress Must Be Honest

Chapter progress must be based on defined actions rather than scrolling to the bottom of a page.

Possible required actions include:

- Reading the explanation
- Reviewing the worked example
- Completing the practical activity
- Passing the check
- Saving or recording the result

Program, module, chapter, lesson-step, and Guided-project progress should remain distinguishable.

## 14.3 No Shame or Punitive Engagement

Do not use punitive streaks, fake urgency, fake scarcity, guilt, comparison with other students, lost earned progress, or messages that imply the student failed because life interrupted the course.

## 14.4 Reminder Emails

Course-progress reminders and encouragement emails must be optional, preference-controlled, and separate from product-upgrade marketing.

Inactivity should be based on the absence of meaningful course activity, not merely the absence of a login or a background page load.

A reminder should:

- Refer to the exact program and next incomplete activity
- Preserve the student’s progress
- Use a direct resume link
- Reduce the next step when useful
- Avoid guilt and surveillance-style language
- Include unsubscribe and preference controls

A candidate inactivity sequence to test is approximately 3–4 days, 7 days, 14 days, and 30 days. This cadence is **not locked** and must be tested rather than assumed effective.

After a final pause-or-continue message, automatic inactivity reminders should stop unless the student returns or chooses continued reminders.

## 14.5 Measure Meaningful Return

Reminder experiments must measure return to meaningful activity, chapter progress, completion, unsubscribe rate, and complaints—not merely email opens.

A persistent control group should be maintained while the reminder system is evaluated.

---

# 15. Program Access, Purchases, and Upgrades

## 15.1 One Journey, Separate Entitlements

The platform presents one connected roadmap while granting access separately for each program.

Website Foundations may be purchased on its own. Later programs may be purchased when the student is ready.

The roadmap may show locked later programs with an honest description, availability status, and upgrade option, but protected lesson content must not be sent to an unauthorized client.

## 15.2 All-Access Package

An All-Access package must be offered from the beginning for students who want the complete planned program collection.

When later programs are unfinished, the offer must clearly distinguish:

- Available now
- In development
- Planned
- What future access is actually included

The platform must never imply that unreleased content is immediately available.

The final public package name is open.

## 15.3 Upgrade Opportunities

Upgrade options may appear in restrained, relevant places:

- Initial program comparison
- Student roadmap or catalog
- A quiet “what comes next” section near the end of a program
- The program-completion page
- A locked-program transition page

The strongest upgrade offer should appear only after the student’s completed capability and evidence are recognized.

Course-support reminders must not be disguised sales emails.

## 15.4 Credit for Earlier Purchases

A student who buys Website Foundations and later upgrades to a larger package should receive eligible credit for earlier qualifying purchases rather than paying for the same access twice.

The exact formula, eligibility period, refund interaction, and regional pricing rules remain open.

## 15.5 Progress Survives Purchases and Access Changes

Purchases and entitlements must remain separate from lesson and project progress.

An upgrade unlocks additional programs without resetting earlier work.

A refund, dispute, or access revocation may change entitlements, but it must not silently delete the student’s earned progress history.

## 15.6 Access Enforcement

Stripe is the planned payment processor. Platinum VC Studios maintains its own server-side order and entitlement records.

The future model separates:

- Programs
- Commerce products and prices
- Product-to-program entitlement mappings
- Orders
- User entitlements
- Lesson and project progress
- Processed payment events

Paid lesson content and protected resources must be enforced on the server. Hiding a link, button, route, or section in React is not access control.

Payment success must be verified server-side before access is granted. Refunds, disputes, and reversed payments must be able to update entitlements.

## 15.7 Pricing Details Still Open

The following remain open:

- Final public names for later programs
- Final public name for the All-Access package
- Exact prices
- One-time payment versus any payment-plan options
- All-Access terms
- Future-update promises
- Refund policy
- Taxes and regional pricing
- Upgrade-credit formula
- Release timing for later programs

The name **Website Foundations** is locked and is not part of the open naming decision.

---

# 16. No AI API Integration

This is a locked product decision.

The Platinum VC Studios platform will not connect to OpenAI, Anthropic, Google, or another AI provider through an API.

It will not:

- Include an embedded AI assistant
- Run student prompts
- Generate Guided-project code inside the course
- Request or store AI-provider API keys
- Proxy AI usage
- Use AI APIs to grade quizzes
- Use AI APIs to review projects

The platform was built with AI assistance, and students use their own outside AI tools, but the production course platform does not call AI-provider APIs.

Later programs may teach students how to use non-AI application APIs and API keys. That does not change the platform’s no-AI-API decision.

---

# 17. Modular Architecture Rule

This is a major non-negotiable rule for Platinum VC Studios and every Guided project.

> An application will not be built inside one massive file.

The codebase must be organized into focused responsibilities from the beginning.

## 17.1 One Page Per File

Every distinct route-level page or screen must have its own dedicated page file.

Registration, login, forgot password, verification, reset password, account settings, lessons, dashboards, and other pages must not be combined into one giant page component.

## 17.2 Responsibilities Stay Focused

Do not combine interface markup, styling, route definitions, authentication, database access, API calls, validation, state management, and business logic inside one giant file.

Unacceptable examples include:

- The entire application living in `App.tsx`
- Every page and route living in one file
- All authentication pages combined into one giant component
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

The current frontend follows this rule with dedicated `pages`, `components`, `routes`, `styles`, and `utils` responsibilities.

The final expanded repository tree will evolve deliberately as backend, data, commerce, and course features are added.

---

# 18. Approved Platform Technology and Current Implementation

This section describes the Platinum VC Studios platform itself, not the required stack for every student project.

## 18.1 Current Frontend

The current platform frontend uses:

- React
- Vite
- TypeScript
- React Router
- CSS Modules
- Shared design tokens and global foundation styles

Current routes are:

- `/` — Website Foundations landing page
- `/register` — registration interface
- `/forgot-password` — forgot-password interface

The landing page now markets Website Foundations specifically. It does not promise that the entry program teaches general software, databases, desktop applications, or phone applications.

## 18.2 Current Authentication Interface State

The registration and forgot-password pages currently provide frontend validation only.

They do not yet:

- Create accounts
- Store student profiles
- Create sessions
- Verify email addresses
- Generate recovery codes
- Send email
- Communicate with a backend

Their development-state messages must remain honest until those behaviors exist.

## 18.3 Frontend Hosting Decision and Current Configuration

**Vercel is the primary production frontend host for Platinum VC Studios.**

Railway remains an approved alternative frontend host. It may be used for quick previews, temporary deployments, fallback hosting, or projects where its generated public URL and unified deployment experience are useful.

The repository currently contains Railway frontend deployment configuration:

- Railpack builder
- `npm run build`
- `npm run start`
- Static single-page fallback through `serve`
- `/` health check

That current Railway configuration does not change the primary Vercel decision. Vercel deployment configuration must be added before the platform frontend is treated as production-ready. The Railway configuration may remain only when it is intentionally supported as a secondary deployment path.

The Platinum VC Studios backend and PostgreSQL database remain hosted on Railway.

## 18.4 Future Backend

The approved backend direction is:

- Node.js
- Express
- TypeScript
- Railway hosting

The future API will handle protected responsibilities such as accounts, sessions, progress, quiz results, submissions, reviews, permissions, purchases, entitlements, reminders, and transactional-email requests.

## 18.5 Database

The approved database direction is:

- PostgreSQL hosted on Railway
- Prisma for schema definitions, migrations, and TypeScript database access

Platinum VC Studios will not use Supabase for its database, authentication, storage, or backend platform.

## 18.6 Authentication

Authentication must be server-controlled and use Railway PostgreSQL.

Better Auth remains the leading candidate, but it is not final until a focused proof of concept confirms registration, login, sessions, verification, password reset, protected routes, and account deletion work cleanly with Express and Railway.

The final server-side password policy must be chosen with the authentication proof of concept and kept consistent with the frontend criteria.

## 18.7 Transactional and Reminder Email

Resend is the approved email-service direction for verification, password reset, submission confirmation, review notifications, and opted-in course reminders.

The Resend API key must exist only on the backend. Transactional messages, optional course reminders, and product marketing must remain correctly separated.

## 18.8 Testing

Frontend, backend, and complete user-flow testing are required. The exact testing libraries remain open.

## 18.9 Deployment Instruction Research System

The repository includes a deployment-research system for Website Foundations:

- [`tools/deployment_research/`](tools/deployment_research/) contains the official-source crawler and change detector.
- [`docs/deployment/`](docs/deployment/) contains the candidate Vercel and Railway student guides, structured provider map, and verification protocol.
- [`.github/workflows/deployment-docs-watch.yml`](.github/workflows/deployment-docs-watch.yml) performs a recurring official-documentation check.

The crawler uses an explicit first-party source allowlist, checks `robots.txt`, rate limits requests, stores normalized snapshots, and flags documentation changes for human review. It does not log into dashboards or automatically publish lesson changes.

A deployment guide is not final course material until the authenticated dashboard flow is manually verified with a clean test account, the real deployment succeeds, nested routes are tested, and a beginner completes the instructions without undocumented help.

---

# 19. Professional Product and Design Standard

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

## 19.1 Locked Visual Direction

The visual direction is inspired by the clarity and restraint of the M.R.S. Medical Services project.

The design must feel:

- Modern
- Spacious
- Restrained
- Credible
- Approachable
- Mature
- Human

Locked principles include:

- Strong visual hierarchy
- Simple page structures
- Intentional alignment
- Controlled content widths
- Typography sized for hierarchy rather than drama
- One obvious primary action at a time
- Lesson content as the visual priority
- Cards only when content genuinely needs a boundary
- Equal visual treatment for both learning paths before selection

The public Who/What content should use typography, spacing, and dividers rather than surrounding each column with a card.

## 19.2 Locked Foundation Tokens

The approved foundation is:

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

The brand name remains text-only until a logo mark is approved.

## 19.3 What the Design Must Avoid

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
- Preferential styling on one learning path before selection

The final logo mark and tagline remain open. The foundation palette is not open.

---

# 20. Quality Checks

## 20.1 Chapter

A chapter is not approved unless it:

- Builds on earlier work
- Introduces one primary new idea
- Explains why it matters
- Uses simple human language
- Includes a worked example
- Gives every student a practical action
- Includes a Guided build step when relevant
- Reuses earlier knowledge
- Ends with a Check Your Understanding activity
- Provides corrective explanations
- Updates the student’s plan or project when appropriate
- Makes the next action clear

## 20.2 Module

A module is not approved unless it:

- Produces evidence required by the Completion Standard
- Has one clear cumulative outcome
- Uses chapters in a logical order
- Reinforces earlier modules
- Provides meaningful evidence for both paths
- Protects students from building on a broken foundation
- Leaves work stable, saved, and modular
- Moves the student closer to independent judgment

## 20.3 Product Feature

A page or feature is not production-ready unless it:

- Supports a real user goal
- Fits the information architecture
- Uses the shared design system
- Uses one dedicated page file for each page or screen
- Uses focused supporting components and utilities
- Does not mix unrelated interface, routing, auth, data, integration, and business responsibilities
- Works responsively
- Handles relevant loading, empty, success, error, validation, disabled, and permission states
- Meets accessibility expectations
- Avoids robotic copy and unnecessary decoration
- Preserves data and progress correctly
- Protects private data and secrets
- Has been tested through the complete flow
- Feels coherent with the rest of the platform

---

# 21. Decisions That Remain Open

The following have not been finalized:

- Website Foundations high-level module map
- Exact module and chapter count
- Full chapter sequence
- Exact website project catalog and default project
- Rules for changing learning paths or projects
- Catch-up process for beginning a Guided project later
- Preferred external AI tool and approved alternatives
- Exact final names and boundaries of later programs
- Whether “software” and “desktop applications” are one program or separate concepts
- Final release order after the shared web-application foundation
- Exact public prices
- Payment-plan options, if any
- Final public name and terms for the All-Access package
- Future-update promises
- Refund, tax, regional-pricing, and upgrade-credit policies
- Final authentication library after proof of concept
- Final server-side password policy
- Exact testing libraries
- Exact chapter passing score
- Whether project checkpoints hard-gate later Guided work beyond the locked architecture requirement
- Human-review turnaround times and resubmission limits
- Which reliable non-AI checks may be automated
- Final reminder cadence, default preference, and experiment design
- Completion labels, certificates, or badges beyond the locked Website Foundations claim
- Later-program capstones
- Final logo mark and tagline
- Final expanded backend and commerce repository structure

The primary platform frontend host and the default Website Foundations deployment service are no longer open decisions: both use Vercel, with Railway approved as an alternative frontend deployment service.

---

# 22. Next Planning and Build Phase

The Website Foundations Completion Standard is locked.

The next curriculum document is the **Website Foundations High-Level Module Map**.

The work should proceed in this order:

1. Derive each module directly from required completion evidence.
2. Define one cumulative outcome for each module.
3. Map Guided and Coursework-Only evidence for each module.
4. Place the three path-equivalent human-review checkpoints at the correct stages.
5. Confirm that every module reuses earlier skills.
6. Divide approved modules into focused chapters.
7. Define the practical action and Check Your Understanding activity for each chapter.
8. Build one complete pilot module.
9. Observe real beginners using it without intervention.
10. Correct the lesson pattern, workload, language, progress messages, and support level.
11. Scale the corrected pattern across the remaining program.
12. Beta test the full student journey before public release.

Platform foundation work may continue in parallel for public pages, authentication preparation, accessibility, routing, design-system components, Vercel deployment configuration, and deployment-guide verification. It must not invent unapproved lesson content, assessments, program claims, prices, chapter counts, path-transition promises, or backend behavior.

No page, chapter, animation, quiz, setup task, project, upgrade prompt, or reminder should exist merely to fill space.

---

# Core Standard

> Every chapter introduces one manageable new idea, connects it to prior learning, gives every student a practical way to use it, offers a Guided build step when relevant, reinforces earlier skills, checks understanding without punishing curiosity, and leaves the student better prepared to build independently.
