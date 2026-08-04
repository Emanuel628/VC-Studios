import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { cookieJar, postJson, startTestServer } from './test/server-test-utils.js';

let baseURL: string;
let prisma: (typeof import('./auth.js'))['prisma'];
let lastSentOtps: (typeof import('./auth.js'))['lastSentOtps'];
let close: () => Promise<void>;

beforeAll(async () => {
  ({ baseURL, prisma, close } = await startTestServer());
  ({ lastSentOtps } = await import('./auth.js'));
});

afterAll(async () => {
  await close();
});

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
    const client = cookieJar(baseURL);

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

    const oldPasswordAttempt = await postJson(cookieJar(baseURL), '/api/auth/sign-in/email', { email, password });
    expect(oldPasswordAttempt.status).toBeGreaterThanOrEqual(400);

    const newPasswordClient = cookieJar(baseURL);
    const newPasswordSignIn = await postJson(newPasswordClient, '/api/auth/sign-in/email', {
      email,
      password: newPassword,
    });
    expect(newPasswordSignIn.status).toBe(200);

    const unauthenticatedDelete = await postJson(cookieJar(baseURL), '/api/auth/delete-user', {
      password: newPassword,
    });
    expect(unauthenticatedDelete.status).toBeGreaterThanOrEqual(400);

    const deleteResponse = await postJson(newPasswordClient, '/api/auth/delete-user', { password: newPassword });
    expect(deleteResponse.status).toBe(200);

    const afterDelete = await newPasswordClient.fetch('/api/me');
    expect(afterDelete.status).toBe(401);
  });
});
