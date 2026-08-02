import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthPageShell } from '../../components/auth/AuthPageShell';
import { FormField } from '../../components/auth/FormField';
import { PasswordField } from '../../components/auth/PasswordField';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
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
  const [values, setValues] = useState<RegisterValues>(initialValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [status, setStatus] = useState('');

  function updateField(field: keyof RegisterValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('Review the highlighted fields before continuing.');
      return;
    }

    setStatus('Your information passed the page checks. Account creation will be connected when authentication is added.');
  }

  return (
    <AuthPageShell
      eyebrow="Create your account"
      title="Start with an experience that knows your name."
      description="We use your first name naturally throughout the course to welcome you back, guide your progress, and recognize important milestones."
      supportingContent={
        <ul>
          <li>Your name stays editable in account settings.</li>
          <li>Your password is checked before submission.</li>
          <li>We will never ask for your outside account passwords or private keys.</li>
        </ul>
      }
    >
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Account details</p>
        <h2>Create your Platinum VC Studios account</h2>
        <p>Enter the information you will use to access the course.</p>
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

        <button className={styles.submitButton} type="submit">
          Create account
        </button>

        {status ? (
          <p className={styles.formStatus} role="status">
            {status}
          </p>
        ) : null}
      </form>

      <p className={styles.formFooter}>
        Need to recover an existing account? <Link to="/forgot-password">Reset your password</Link>
      </p>
    </AuthPageShell>
  );
}
