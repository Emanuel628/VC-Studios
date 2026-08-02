import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { Nav } from './Nav';

const { useSessionMock } = vi.hoisted(() => ({ useSessionMock: vi.fn() }));

vi.mock('../../lib/authClient', () => ({
  authClient: { signOut: vi.fn() },
  useSession: useSessionMock,
}));

function renderNav() {
  return render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>,
  );
}

describe('Nav', () => {
  it('shows "Start learning" when there is no session', () => {
    useSessionMock.mockReturnValue({ data: null });
    renderNav();
    expect(screen.getByRole('link', { name: 'Start learning' })).toBeInTheDocument();
  });

  it('falls back to "Start learning" instead of crashing when session data has no user', () => {
    // Regression test: if /api/* ever gets an unexpected response (e.g. a rewrite rule
    // serving index.html instead of JSON), session data can come back truthy but without
    // a `user` field. The Nav must not crash on `session.user.firstName` in that case.
    useSessionMock.mockReturnValue({ data: {} });
    renderNav();
    expect(screen.getByRole('link', { name: 'Start learning' })).toBeInTheDocument();
  });

  it('shows the signed-in state when a real session with a user exists', () => {
    useSessionMock.mockReturnValue({
      data: { user: { firstName: 'Ada', email: 'ada@example.com' } },
    });
    renderNav();
    expect(screen.getByRole('link', { name: 'Welcome, Ada' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });
});
