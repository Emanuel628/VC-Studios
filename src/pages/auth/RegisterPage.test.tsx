import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { authClient } from '../../lib/authClient';
import { RegisterPage } from './RegisterPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>,
  );
}

describe('RegisterPage', () => {
  it('shows field validation errors when submitted empty', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('Enter your first name.')).toBeInTheDocument();
    expect(screen.getByText('Enter your last name.')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Create a password.')).toBeInTheDocument();
    expect(screen.getByText('Confirm your password.')).toBeInTheDocument();
  });

  it('flags mismatched passwords', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText('First name'), 'Ada');
    await user.type(screen.getByLabelText('Last name'), 'Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Password'), 'Abcdefgh1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Different1!');
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('The passwords do not match.')).toBeInTheDocument();
  });

  it('links to the Terms and Privacy pages', () => {
    renderPage();

    expect(screen.getByRole('link', { name: 'Terms & Conditions' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });

  it('shows an error message instead of failing silently when the server is unreachable', async () => {
    // Regression test: a Railway-hosted frontend with no VITE_API_URL set returns its SPA
    // fallback HTML for API requests, which authClient throws trying to parse as JSON. Without
    // a try/catch, that exception was unhandled and the form did nothing at all on submit.
    const originalSignUpEmail = authClient.signUp.email;
    authClient.signUp.email = vi.fn().mockRejectedValueOnce(new Error('Failed to fetch'));
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText('First name'), 'Ada');
    await user.type(screen.getByLabelText('Last name'), 'Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Password'), 'Abcdefgh1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Abcdefgh1!');
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      await screen.findByText('Could not reach the server. Check your connection and try again.'),
    ).toBeInTheDocument();

    authClient.signUp.email = originalSignUpEmail;
  });
});
