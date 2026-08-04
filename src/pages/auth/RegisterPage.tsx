import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router';
import { AuthPageShell } from '../../components/auth/AuthPageShell';
import { FormField } from '../../components/auth/FormField';
import { FormStatus } from '../../components/auth/FormStatus';
import { PasswordField } from '../../components/auth/PasswordField';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { authClient } from '../../lib/authClient';
import { useRedirectWhenSignedIn } from '../../lib/useRedirectWhenSignedIn';
import { isPasswordValid } from '../../utils/password';
import styles from '../../styles/Auth.module.css';

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const initialValues: RegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!values.firstName.trim()) errors.firstName = 'Enter your first name.';
  if (!values.lastName.trim()) errors.lastName = 'Enter your last name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.';

  if (!values.password) errors.password = 'Create a password.';
  else if (!isPasswordValid(values.password)) errors.password = 'Your password must meet every requirement below.';

  if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password.';
  else if (values.password !== values.confirmPassword) errors.confirmPassword = 'The passwords do not match.';

  return errors;
}

export function RegisterPage() {
  useRedirectWhenSignedIn('/dashboard');
  const [values, setValues] = useState<RegisterValues>(initialValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordsDoNotMatch = Boolean(
    values.password && values.confirmPassword && values.password !== values.confirmPassword,
  );

  function updateField(field: keyof RegisterValues, value: string) {
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
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: `${values.firstName} ${values.lastName}`.trim(),
      firstName: values.firstName,
      lastName: values.lastName,
    });
    setIsSubmitting(false);

    if (error) {
      setStatus(error.message ?? 'That account could not be created. Try again.');
      return;
    }

    // Navigation happens reactively in the effect above once the session store updates.
  }

  return (
    <AuthPageShell
      eyebrow="Ready to begin?"
      title="Build something real."
      description="Create your account to save your progress, choose your learning path, and start turning your website idea into a professional, published website."
      supportingContent={
        <ul>
          <li>Choose the Guided Build-Along or Coursework-Only path.</li>
          <li>Return anytime and continue from where you left off.</li>
          <li>Keep your Website Foundations lessons, progress, and milestones together.</li>
        </ul>
      }
    >
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Account details</p>
        <h2>Create your account</h2>
        <p>Enter your details to get started.</p>
      </div>

      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.nameGrid}>
          <FormField
            id="first-name"
            label="First name"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            error={errors.firstName}
            required
          />
          <FormField
            id="last-name"
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        <FormField
          id="register-email"
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
          id="register-password"
          label="Password"
          name="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateField('password', event.target.value)}
          error={errors.password}
          required
        />

        <PasswordStrength password={values.password} />

        <PasswordField
          id="confirm-password"
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateField('confirmPassword', event.target.value)}
          error={errors.confirmPassword}
          required
        />

        {passwordsDoNotMatch && !errors.confirmPassword ? (
          <p className={styles.fieldError} role="alert">
            Passwords do not match.
          </p>
        ) : null}

        <button className={styles.submitButton} type="submit">
          Create account
        </button>

        <FormStatus message={status} />

        <p className={styles.formFooter}>
          By creating an account, you agree to our <Link to="/terms">Terms &amp; Conditions</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </form>

      <p className={styles.formFooter}>
        Need to recover an existing account? <Link to="/forgot-password">Reset your password</Link>
      </p>
    </AuthPageShell>
  );
}
