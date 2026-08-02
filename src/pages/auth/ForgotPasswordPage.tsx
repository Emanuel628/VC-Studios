import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { AuthPageShell } from '../../components/auth/AuthPageShell';
import { FormField } from '../../components/auth/FormField';
import styles from '../../styles/Auth.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setError('Enter your email address.');
      setStatus('');
      return;
    }

    if (!emailPattern.test(email)) {
      setError('Enter a valid email address.');
      setStatus('');
      return;
    }

    setError('');
    setStatus('Your email passed the page check. Code delivery will be connected when authentication is added.');
  }

  return (
    <AuthPageShell
      eyebrow="Password recovery"
      title="Get a code to reset your password."
      description="Enter the email connected to your Platinum VC Studios account. The recovery code will be sent there once authentication is connected."
      compact
    >
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Forgot password</p>
        <h2>Where should we send the code?</h2>
        <p>Use the email address connected to your account.</p>
      </div>

      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
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
            setError('');
            setStatus('');
          }}
          error={error}
          required
        />

        <button className={styles.submitButton} type="submit">
          Send code
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
