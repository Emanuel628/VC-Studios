import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

let baseURL: string;
let server: ReturnType<typeof createServer>;
let createApp: (typeof import('./index.js'))['createApp'];
let prisma: (typeof import('./auth.js'))['prisma'];
let lastSentOtps: (typeof import('./auth.js'))['lastSentOtps'];

beforeAll(async () => {
  ({ createApp } = await import('./index.js'));
  ({ prisma, lastSentOtps } = await import('./auth.js'));

  const app = createApp();
  server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;
  baseURL = `http://localhost:${port}`;
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
  await prisma.$disconnect();
});

function cookieJar() {
  const cookies = new Map<string, string>();
  return {
    async fetch(path: string, init: RequestInit = {}) {
      const headers = new Headers(init.headers);
      if (cookies.size) {
        headers.set('cookie', [...cookies.entries()].map(([key, value]) => `${key}=${value}`).join('; '));
      }
      const response = await fetch(`${baseURL}${path}`, { ...init, headers });
      const setCookies =
        typeof response.headers.getSetCookie === 'function' ? response.headers.getSetCookie() : [];
      for (const setCookie of setCookies) {
        const pair = setCookie.split(';')[0];
        const separatorIndex = pair.indexOf('=');
        cookies.set(pair.slice(0, separatorIndex), pair.slice(separatorIndex + 1));
      }
      return response;
    },
  };
}

function postJson(client: ReturnType<typeof cookieJar>, path: string, body: unknown) {
  return client.fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('Better Auth proof of concept', () => {
  const email = `otp-flow-${Date.now()}@example.com`;
  const password = 'Abcdefgh1!';
  const newPassword = 'Newpassw0rd1!';

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it('rejects an unauthenticated request to the protected session endpoint', async () => {
    const response = await fetch(`${baseURL}/api/me`);
    expect(response.status).toBe(401);
  });

  it('covers the full register, verify, reset, and delete lifecycle', async () => {
    const client = cookieJar();

    const signUpResponse = await postJson(client, '/api/auth/sign-up/email', {
      email,
      password,
      name: 'Ada Lovelace',
      firstName: 'Ada',
      lastName: 'Lovelace',
    });
    expect(signUpResponse.status).toBe(200);
    const signUpBody = (await signUpResponse.json()) as { user: { emailVerified: boolean; firstName: string } };
    expect(signUpBody.user.emailVerified).toBe(false);
    expect(signUpBody.user.firstName).toBe('Ada');

    const sendVerifyResponse = await postJson(client, '/api/auth/email-otp/send-verification-otp', {
      email,
      type: 'email-verification',
    });
    expect(sendVerifyResponse.status).toBe(200);
    const verifyOtp = lastSentOtps.get(`${email}:email-verification`);
    expect(verifyOtp).toBeTruthy();

    const verifyResponse = await postJson(client, '/api/auth/email-otp/verify-email', {
      email,
      otp: verifyOtp,
    });
    expect(verifyResponse.status).toBe(200);

    const sessionResponse = await client.fetch('/api/me');
    expect(sessionResponse.status).toBe(200);
    const sessionBody = (await sessionResponse.json()) as { user: { email: string; emailVerified: boolean } };
    expect(sessionBody.user.email).toBe(email);
    expect(sessionBody.user.emailVerified).toBe(true);

    await postJson(client, '/api/auth/sign-out', {});
    const afterSignOut = await client.fetch('/api/me');
    expect(afterSignOut.status).toBe(401);

    const signInResponse = await postJson(client, '/api/auth/sign-in/email', { email, password });
    expect(signInResponse.status).toBe(200);

    const requestResetResponse = await postJson(client, '/api/auth/email-otp/request-password-reset', { email });
    expect(requestResetResponse.status).toBe(200);
    const resetOtp = lastSentOtps.get(`${email}:forget-password`);
    expect(resetOtp).toBeTruthy();

    const resetResponse = await postJson(client, '/api/auth/email-otp/reset-password', {
      email,
      otp: resetOtp,
      password: newPassword,
    });
    expect(resetResponse.status).toBe(200);

    const oldPasswordAttempt = await postJson(cookieJar(), '/api/auth/sign-in/email', { email, password });
    expect(oldPasswordAttempt.status).toBeGreaterThanOrEqual(400);

    const newPasswordClient = cookieJar();
    const newPasswordSignIn = await postJson(newPasswordClient, '/api/auth/sign-in/email', {
      email,
      password: newPassword,
    });
    expect(newPasswordSignIn.status).toBe(200);

    const unauthenticatedDelete = await postJson(cookieJar(), '/api/auth/delete-user', { password: newPassword });
    expect(unauthenticatedDelete.status).toBeGreaterThanOrEqual(400);

    const deleteResponse = await postJson(newPasswordClient, '/api/auth/delete-user', { password: newPassword });
    expect(deleteResponse.status).toBe(200);

    const afterDelete = await newPasswordClient.fetch('/api/me');
    expect(afterDelete.status).toBe(401);
  });
});
