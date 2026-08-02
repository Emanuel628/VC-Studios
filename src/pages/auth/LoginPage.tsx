import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthPageShell } from '../../components/auth/AuthPageShell';
import { FormField } from '../../components/auth/FormField';
import { PasswordField } from '../../components/auth/PasswordField';
import { authClient } from '../../lib/authClient';
import styles from '../../styles/Auth.module.css';

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.';

  if (!values.password) errors.password = 'Enter your password.';

  return errors;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof LoginValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('Review the highlighted fields before continuing.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    setIsSubmitting(false);

    if (error) {
      setStatus(error.message ?? 'That email and password did not match. Try again.');
      return;
    }

    navigate('/');
  }

  return (
    <AuthPageShell
      eyebrow="Welcome back"
      title="Continue where you left off."
      description="Sign in to return to your Website Foundations progress."
      compact
    >
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Account</p>
        <h2>Sign in</h2>
        <p>Enter your email and password.</p>
      </div>

      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
        <FormField
          id="login-email"
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          error={errors.email}
          required
        />

        <PasswordField
          id="login-password"
          label="Password"
          name="password"
          autoComplete="current-password"
          value={values.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateField('password', event.target.value)}
          error={errors.password}
          required
        />

        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>

        {status ? (
          <p className={styles.formStatus} role="status">
            {status}
          </p>
        ) : null}
      </form>

      <p className={styles.formFooter}>
        Forgot your password? <Link to="/forgot-password">Reset it</Link>
      </p>
      <p className={styles.formFooter}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </AuthPageShell>
  );
}
