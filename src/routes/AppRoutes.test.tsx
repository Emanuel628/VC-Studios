import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './AppRoutes';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('AppRoutes', () => {
  it('renders the landing page at /', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/website idea/i);
  });

  it('renders the register page at /register', () => {
    renderAt('/register');
    expect(screen.getByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
  });

  it('renders the forgot-password page at /forgot-password', () => {
    renderAt('/forgot-password');
    expect(screen.getByRole('heading', { name: /Where should we send the code/ })).toBeInTheDocument();
  });

  it('renders the terms page at /terms', () => {
    renderAt('/terms');
    expect(screen.getByRole('heading', { name: 'Terms & Conditions' })).toBeInTheDocument();
  });

  it('renders the privacy page at /privacy', () => {
    renderAt('/privacy');
    expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
  });

  it('redirects an unknown path to the landing page', () => {
    renderAt('/this-route-does-not-exist');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/website idea/i);
  });
});
