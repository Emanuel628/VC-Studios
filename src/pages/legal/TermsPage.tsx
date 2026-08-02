import { PublicPageShell } from '../../components/layout/PublicPageShell';
import styles from '../../styles/Legal.module.css';

export function TermsPage() {
  return (
    <PublicPageShell>
      <section className={`${styles.page} ${styles.hero}`} aria-labelledby="terms-title">
        <p className={styles.eyebrow}>Legal</p>
        <h1 id="terms-title">Terms &amp; Conditions</h1>
        <p className={styles.updated}>Last updated: August 2, 2026</p>
        <div className={styles.draftNotice}>
          This is a working draft that describes the site as it actually operates today. Sections covering
          payments, dispute resolution, and governing law are placeholders and are not final until they are
          reviewed and approved as a locked business and legal decision.
        </div>
      </section>

      <section className={`${styles.page} ${styles.body}`}>
        <h2>1. What Platinum VC Studios is</h2>
        <p>
          Platinum VC Studios (&ldquo;VC&rdquo; stands for Vibe Code) teaches people how to take a website or
          software idea from concept to a working, published product with AI assistance while keeping human
          judgment and control over the result. The program currently being built and offered is{' '}
          <strong>Website Foundations</strong>, which teaches planning, building, organizing, testing, recovering,
          and publishing a professional responsive website. It does not teach databases, authentication, backend
          development, or application API integrations. Those belong to later, separately gated programs.
        </p>
        <p>
          Platinum VC Studios is not a traditional programming or computer-science school, and it does not promise
          instant expertise, effortless success, guaranteed income, or professional software-engineering
          credentials.
        </p>

        <h2>2. Who can use this site</h2>
        <p>
          You must be at least 16 years old to create an account, or have the permission of a parent or guardian who
          agrees to these terms on your behalf. If you are creating an account for an organization, you confirm that
          you have the authority to accept these terms on its behalf.
        </p>

        <h2>3. Accounts</h2>
        <p>
          Registration currently asks for your first name, last name, email, and a password. As the site stands
          today, the registration and password-reset pages only validate what you type in your browser &mdash; no
          account is created, stored, or emailed anywhere yet. This page will be kept accurate as account creation,
          sessions, and password recovery are connected to a real backend.
        </p>
        <p>Once accounts are live, you agree to:</p>
        <ul>
          <li>Provide accurate registration information and keep it up to date</li>
          <li>Keep your password confidential and use a unique, reasonably strong password</li>
          <li>Notify us if you believe your account has been accessed without your permission</li>
          <li>Use one account per person, unless we approve otherwise in writing</li>
        </ul>

        <h2>4. Programs, access, and learning paths</h2>
        <p>
          Platinum VC Studios is one connected course journey made up of separately gated programs. Buying access
          to one program does not grant access to another. An All-Access option is intended for students who want
          the full planned collection, but its exact terms, price, and included programs are not final and will be
          described accurately at the time it is offered.
        </p>
        <p>
          Within Website Foundations, you may choose the <strong>Guided Build-Along</strong> path, where you build an
          approved website project alongside the lessons, or the <strong>Coursework-Only</strong> path, where you
          complete the same lessons, exercises, and understanding checks without publishing a project. Both paths
          are treated as equally valid ways to complete the program.
        </p>
        <p>
          No pricing, discount, or package-value claim is final until the exact amounts and terms are approved and
          published on this site.
        </p>

        <h2>5. Your own tools and accounts</h2>
        <p>
          Platinum VC Studios does not provide or control the outside accounts you use to build your project, such
          as GitHub, your code editor, your chosen AI tool, Vercel, Railway, or a domain provider. You are
          responsible for those accounts, their costs, and their own terms of service.
        </p>
        <p>
          We will never ask you to share an outside account password, AI login, GitHub password, private API key,
          deployment credential, recovery code, or the contents of a private <code>.env</code> file. If anyone
          claiming to represent Platinum VC Studios asks you for these, do not provide them and contact us.
        </p>

        <h2>6. No AI grading and no embedded AI assistant</h2>
        <p>
          The Platinum VC Studios platform itself does not connect to an AI provider through an API. It does not run
          your prompts, generate your project&rsquo;s code, or use AI to grade quizzes or review your submitted
          work. Human reviewers handle the program&rsquo;s required review checkpoints. The AI tool you use to build
          your own project is separate, is owned and controlled by you, and is governed by that tool&rsquo;s own
          terms.
        </p>

        <h2>7. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for anything unlawful or to infringe someone else&rsquo;s rights</li>
          <li>Attempt to access another student&rsquo;s account, data, or in-progress work</li>
          <li>Interfere with or disrupt the site, its infrastructure, or its normal operation</li>
          <li>Copy, resell, or redistribute paid lesson content without our permission</li>
          <li>Misrepresent your identity or your progress through the program</li>
        </ul>

        <h2>8. Content and ownership</h2>
        <p>
          Lesson content, course materials, branding, and the Platinum VC Studios platform itself belong to
          Platinum VC Studios. Access to paid lesson content is personal to your account and is not transferable.
        </p>
        <p>
          The website or project you build during a Guided path is yours. We do not claim ownership over the
          projects students create while working through the course.
        </p>

        <h2>9. Payments and refunds</h2>
        <p>
          Payment processing is not yet enabled on this site. When purchases are enabled, payments are intended to be
          handled through Stripe, and Platinum VC Studios will maintain its own records of your order and program
          access separately from your lesson progress. Exact prices, any payment-plan options, upgrade-credit
          rules, and the refund policy are not final and will be published here before purchases open.
        </p>

        <h2>10. Termination</h2>
        <p>
          You may stop using the site at any time. We may suspend or terminate access to an account that violates
          these terms, is used fraudulently, or is required to be restricted by law. Where reasonably possible, we
          will explain why. A refund, dispute, or access change may affect program entitlements, but it will not
          silently delete your earned lesson progress history.
        </p>

        <h2>11. No guarantee of outcomes</h2>
        <p>
          Completing a program teaches you a practical process and produces the evidence described in that
          program&rsquo;s completion standard. It does not guarantee a job, income, client work, or any particular
          result from a website or product you build.
        </p>

        <h2>12. Disclaimer and limitation of liability</h2>
        <p>
          The site and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
          without warranties of any kind, to the fullest extent permitted by law. To the fullest extent permitted by
          law, Platinum VC Studios is not liable for indirect, incidental, or consequential damages arising from
          your use of the site or the programs it offers. Nothing in these terms is intended to limit rights that
          cannot be limited under applicable law.
        </p>

        <h2>13. Changes to these terms</h2>
        <p>
          We may update these terms as the platform&rsquo;s features change, particularly as accounts, payments,
          and later programs are built. Material changes will update the date at the top of this page, and where
          reasonably practical, we will provide additional notice before a change takes effect.
        </p>

        <h2>14. Governing law</h2>
        <p>
          The governing law and jurisdiction for these terms have not been finalized and will be added here once
          decided.
        </p>

        <h2>15. Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:support@platinumvcstudios.com">support@platinumvcstudios.com</a>.
        </p>
      </section>
    </PublicPageShell>
  );
}
