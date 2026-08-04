import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { EmailVerifiedBadge } from '../../components/account/EmailVerifiedBadge';
import { FormField } from '../../components/auth/FormField';
import { FormStatus } from '../../components/auth/FormStatus';
import { PasswordField } from '../../components/auth/PasswordField';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { authClient, useSession } from '../../lib/authClient';
import authStyles from '../../styles/Auth.module.css';
import styles from '../../styles/Account.module.css';

export function AccountPage() {
  const navigate = useNavigate();
  const { data: session, refetch } = useSession();
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyStatus, setVerifyStatus] = useState('');
  const [verifySent, setVerifySent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!session?.user) {
    return null;
  }

  const { user } = session;

  async function handleLogout() {
    await authClient.signOut();
    navigate('/');
  }

  async function handleSendVerificationCode() {
    setVerifyStatus('Sending…');
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: user.email,
      type: 'email-verification',
    });
    setVerifySent(!error);
    setVerifyStatus(error ? (error.message ?? 'Could not send a code. Try again.') : 'Code sent. Check your email.');
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!verifyCode.trim()) {
      setVerifyStatus('Enter the code from your email.');
      return;
    }

    setIsVerifying(true);
    const { error } = await authClient.emailOtp.verifyEmail({ email: user.email, otp: verifyCode });
    setIsVerifying(false);

    if (error) {
      setVerifyStatus(error.message ?? 'That code did not work. Send a new one and try again.');
      return;
    }

    setVerifyCode('');
    setVerifySent(false);
    setVerifyStatus('Email verified.');
    await refetch();
  }

  async function handleDeleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!deletePassword) {
      setDeleteError('Enter your password to confirm.');
      return;
    }

    setIsDeleting(true);
    const { error } = await authClient.deleteUser({ password: deletePassword });
    setIsDeleting(false);

    if (error) {
      setDeleteError(error.message ?? 'That password did not match. Try again.');
      return;
    }

    navigate('/');
  }

  return (
    <PublicPageShell>
      <div className={`${styles.page} ${styles.main}`}>
        <h1>Your account</h1>
        <p className={styles.subtitle}>This is the one protected page in Website Foundations today.</p>

        <section className={styles.card} aria-labelledby="account-details-title">
          <h2 id="account-details-title">Account details</h2>
          <dl>
            <div className={styles.row}>
              <dt>Name</dt>
              <dd>
                {user.firstName} {user.lastName}
              </dd>
            </div>
            <div className={styles.row}>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>

          <EmailVerifiedBadge verified={user.emailVerified} />

          {!user.emailVerified ? (
            <div className={styles.verifySection}>
              {!verifySent ? (
                <button
                  type="button"
                  className={authStyles.submitButton}
                  onClick={handleSendVerificationCode}
                >
                  Send verification code
                </button>
              ) : (
                <form className={authStyles.authForm} onSubmit={handleVerifyCode} noValidate>
                  <FormField
                    id="verify-code"
                    label="Verification code"
                    name="verifyCode"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={verifyCode}
                    onChange={(event) => setVerifyCode(event.target.value)}
                    required
                  />
                  <button className={authStyles.submitButton} type="submit" disabled={isVerifying}>
                    {isVerifying ? 'Verifying…' : 'Verify email'}
                  </button>
                </form>
              )}

              <FormStatus message={verifyStatus} className={styles.verifyStatus} />
            </div>
          ) : null}
        </section>

        <section className={styles.card} aria-labelledby="session-title">
          <h2 id="session-title">Session</h2>
          <p>You are signed in on this device.</p>
          <button type="button" className={authStyles.submitButton} onClick={handleLogout}>
            Log out
          </button>
        </section>

        <section className={`${styles.card} ${styles.dangerCard}`} aria-labelledby="delete-account-title">
          <h2 id="delete-account-title">Delete account</h2>
          <p>This permanently deletes your account. This cannot be undone.</p>
          <form className={authStyles.authForm} onSubmit={handleDeleteAccount} noValidate>
            <PasswordField
              id="delete-password"
              label="Confirm your password"
              name="deletePassword"
              autoComplete="current-password"
              value={deletePassword}
              onChange={(event) => {
                setDeletePassword(event.target.value);
                setDeleteError('');
              }}
              error={deleteError}
              required
            />
            <button type="submit" className={styles.dangerButton} disabled={isDeleting}>
              {isDeleting ? 'Deleting…' : 'Delete account'}
            </button>
          </form>
        </section>
      </div>
    </PublicPageShell>
  );
}
