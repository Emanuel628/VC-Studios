import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { startTestServer } from './test/server-test-utils.js';

// Override before any other module reads it. Simulates a real Railway deployment,
// where BETTER_AUTH_URL is an https URL rather than dev's http://localhost.
process.env.BETTER_AUTH_URL = 'https://backend.example.com';

let baseURL: string;
let prisma: (typeof import('./auth.js'))['prisma'];
let close: () => Promise<void>;

beforeAll(async () => {
  ({ baseURL, prisma, close } = await startTestServer());
});

afterAll(async () => {
  await close();
});

describe('cross-origin session cookie', () => {
  const email = `cookie-attrs-${Date.now()}@example.com`;

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it('sets SameSite=None on the session cookie once BETTER_AUTH_URL is https', async () => {
    const response = await fetch(`${baseURL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password: 'Abcdefgh1!', name: 'Ada Lovelace', firstName: 'Ada', lastName: 'Lovelace' }),
    });
    expect(response.status).toBe(200);

    const setCookies = response.headers.getSetCookie();
    const sessionCookie = setCookies.find((cookie) => cookie.includes('session_token'));
    expect(sessionCookie).toBeTruthy();
    expect(sessionCookie).toMatch(/SameSite=None/i);
  });
});
