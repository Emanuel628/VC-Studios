import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthPageShell } from '../../components/auth/AuthPageShell';
import { FormField } from '../../components/auth/FormField';
import { PasswordField } from '../../components/auth/PasswordField';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { authClient } from '../../lib/authClient';
import { isPasswordValid } from '../../utils/password';
import styles from '../../styles/Auth.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setErrors({ email: 'Enter your email address.' });
      return;
    }
    if (!emailPattern.test(email)) {
      setErrors({ email: 'Enter a valid email address.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    const { error } = await authClient.emailOtp.requestPasswordReset({ email });
    setIsSubmitting(false);

    if (error) {
      setStatus(error.message ?? 'Could not send a code. Try again.');
      return;
    }

    setStatus('');
    setStep('reset');
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!code.trim()) nextErrors.code = 'Enter the code from your email.';
    if (!password) nextErrors.password = 'Create a new password.';
    else if (!isPasswordValid(password)) nextErrors.password = 'Your password must meet every requirement below.';
    if (!confirmPassword) nextErrors.confirmPassword = 'Confirm your new password.';
    else if (password !== confirmPassword) nextErrors.confirmPassword = 'The passwords do not match.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const { error } = await authClient.emailOtp.resetPassword({ email, otp: code, password });
    setIsSubmitting(false);

    if (error) {
      setStatus(error.message ?? 'That code did not work. Request a new one and try again.');
      return;
    }

    navigate('/login');
  }

  if (step === 'reset') {
    return (
      <AuthPageShell
        eyebrow="Password recovery"
        title="Check your email for a code."
        description={`We sent a code to ${email}. Enter it below along with a new password.`}
        compact
      >
        <div className={styles.formHeading}>
          <p className={styles.eyebrow}>Reset password</p>
          <h2>Enter your code and new password</h2>
        </div>

        <form className={styles.authForm} onSubmit={handleResetPassword} noValidate>
          <FormField
            id="reset-code"
            label="Code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setErrors((current) => ({ ...current, code: '' }));
              setStatus('');
            }}
            error={errors.code}
            required
          />

          <PasswordField
            id="reset-password"
            label="New password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
              setErrors((current) => ({ ...current, password: '' }));
              setStatus('');
            }}
            error={errors.password}
            required
          />

          <PasswordStrength password={password} />

          <PasswordField
            id="reset-confirm-password"
            label="Confirm new password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(event.target.value);
              setErrors((current) => ({ ...current, confirmPassword: '' }));
              setStatus('');
            }}
            error={errors.confirmPassword}
            required
          />

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Resetting…' : 'Reset password'}
          </button>

          {status ? (
            <p className={styles.formStatus} role="status">
              {status}
            </p>
          ) : null}
        </form>

        <p className={styles.formFooter}>
          <button type="button" className={styles.linkButton} onClick={() => setStep('email')}>
            Use a different email
          </button>
        </p>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell
      eyebrow="Password recovery"
      title="Get a code to reset your password."
      description="Enter the email connected to your Platinum VC Studios account and we will send a recovery code there."
      compact
    >
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Forgot password</p>
        <h2>Where should we send the code?</h2>
        <p>Use the email address connected to your account.</p>
      </div>

      <form className={styles.authForm} onSubmit={handleSendCode} noValidate>
        <FormField
          id="recovery-email"
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrors({});
            setStatus('');
          }}
          error={errors.email}
          required
        />

        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send code'}
        </button>

        {status ? (
          <p className={styles.formStatus} role="status">
            {status}
          </p>
        ) : null}
      </form>

      <p className={styles.formFooter}>
        Creating a new account? <Link to="/register">Return to registration</Link>
      </p>
    </AuthPageShell>
  );
}
