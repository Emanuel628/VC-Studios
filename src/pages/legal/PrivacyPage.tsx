import { PublicPageShell } from '../../components/layout/PublicPageShell';
import styles from '../../styles/Legal.module.css';

export function PrivacyPage() {
  return (
    <PublicPageShell>
      <section className={`${styles.page} ${styles.hero}`} aria-labelledby="privacy-title">
        <p className={styles.eyebrow}>Legal</p>
        <h1 id="privacy-title">Privacy Policy</h1>
        <p className={styles.updated}>Last updated: August 2, 2026</p>
        <div className={styles.draftNotice}>
          This policy describes what the site actually does today, plus what it is planned to do once accounts,
          payments, and a backend exist. Sections about future data handling are clearly marked and are not active
          yet.
        </div>
      </section>

      <section className={`${styles.page} ${styles.body}`}>
        <h2>1. What this policy covers</h2>
        <p>
          This policy explains what information Platinum VC Studios collects through this website, why, and how it
          is handled. It applies to the public site and to the Website Foundations program.
        </p>

        <h2>2. What we collect today</h2>
        <p>
          The registration and forgot-password pages currently ask for a first name, last name, email, and password.
          As the site stands right now, that information is only validated in your browser to check formatting and
          password strength &mdash; it is not sent to a server, not stored, and not emailed anywhere. Closing the
          page or refreshing clears it.
        </p>
        <p>
          Loading this site also loads the Inter font from Google Fonts. Aside from that font request, the site does
          not currently run analytics, advertising trackers, or cookie-based tracking.
        </p>

        <h2>3. What we will collect once accounts exist</h2>
        <p>
          This section describes the intended future state and is not active yet. Once account creation is
          connected to a backend, we plan to store:
        </p>
        <ul>
          <li>Your name, email, and a securely hashed password (never a plain-text password)</li>
          <li>Session information needed to keep you signed in</li>
          <li>Your selected learning path, chapter and module progress, and Build Plan or Learning Plan entries</li>
          <li>Quiz and understanding-check results and submitted review evidence</li>
          <li>Program purchases and entitlements, so paid content stays properly gated</li>
        </ul>
        <p>
          This policy will be updated to reflect that change before it goes live, and the update will be reflected
          in the date at the top of this page.
        </p>

        <h2>4. Payments</h2>
        <p>
          Payment processing is not yet enabled. When purchases open, payments are intended to be handled by Stripe.
          Platinum VC Studios does not intend to store your full card number; Stripe handles that directly under its
          own privacy and security practices.
        </p>

        <h2>5. Email</h2>
        <p>
          The site does not send email today. Once enabled, transactional email &mdash; such as email verification
          and password reset &mdash; is planned to be sent through Resend. Course-progress reminder emails are
          planned to be optional, preference-controlled, and kept separate from any product-upgrade marketing. You
          will be able to manage those preferences and unsubscribe.
        </p>

        <h2>6. What we will never ask for</h2>
        <p>
          Platinum VC Studios will never ask you for the password, login, or recovery code to an outside account
          such as GitHub, Vercel, Railway, a domain provider, or your AI tool, and will never ask for a private API
          key, a deployment credential, or the contents of a private <code>.env</code> file. Those accounts and
          their credentials belong to you.
        </p>

        <h2>7. How information may be shared</h2>
        <p>
          We do not sell personal information. Once the features described in Section 3 are live, limited
          information may be shared with service providers strictly to operate the platform &mdash; for example,
          Stripe for payment processing, Resend for transactional and opted-in reminder email, and our hosting
          provider for the database and backend. Those providers only receive what they need to perform their
          service.
        </p>

        <h2>8. Data security</h2>
        <p>
          We intend to apply reasonable technical and organizational safeguards to protect stored information,
          including hashed passwords and access controls on backend systems. No method of storage or transmission
          is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>9. Data retention and deletion</h2>
        <p>
          Once accounts exist, you will be able to request deletion of your account. A refund, dispute, or access
          change may affect your program entitlements, but it is not intended to silently delete your earned lesson
          progress history. Until self-service deletion tools exist, you can request account or data deletion by
          contacting us directly.
        </p>

        <h2>10. Children&rsquo;s privacy</h2>
        <p>
          Platinum VC Studios is intended for users who are at least 16 years old, or younger users who have a
          parent or guardian&rsquo;s permission and involvement. We do not knowingly collect personal information
          from children outside of that.
        </p>

        <h2>11. Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct, or delete personal information we
          hold about you, or to object to certain processing. Until self-service account tools exist, you can
          exercise these rights by contacting us directly and we will respond as required by applicable law.
        </p>

        <h2>12. Changes to this policy</h2>
        <p>
          We may update this policy as the platform&rsquo;s features change, particularly as accounts, payments,
          and email are connected. Material changes will update the date at the top of this page.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about this policy, or requests about your personal information, can be sent to{' '}
          <a href="mailto:privacy@platinumvcstudios.com">privacy@platinumvcstudios.com</a>.
        </p>
      </section>
    </PublicPageShell>
  );
}
