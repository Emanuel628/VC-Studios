import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { cookieJar, postJson, startTestServer } from './test/server-test-utils.js';

let baseURL: string;
let prisma: (typeof import('./auth.js'))['prisma'];
let close: () => Promise<void>;

beforeAll(async () => {
  ({ baseURL, prisma, close } = await startTestServer());
});

afterAll(async () => {
  await close();
});

type NotificationsResponse = {
  notifications: Array<{ id: string; message: string; read: boolean; createdAt: string }>;
  unreadCount: number;
};

describe('notifications', () => {
  const email = `notifications-${Date.now()}@example.com`;

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it('rejects unauthenticated requests', async () => {
    const getResponse = await fetch(`${baseURL}/api/notifications`);
    expect(getResponse.status).toBe(401);

    const postResponse = await fetch(`${baseURL}/api/notifications/read`, { method: 'POST' });
    expect(postResponse.status).toBe(401);
  });

  it('creates a real notification only when a badge is newly earned, and marking read clears the count', async () => {
    const client = cookieJar(baseURL);

    await postJson(client, '/api/auth/sign-up/email', {
      email,
      password: 'Abcdefgh1!',
      name: 'Ada Lovelace',
      firstName: 'Ada',
      lastName: 'Lovelace',
    });

    const afterSignup = (await (await client.fetch('/api/notifications')).json()) as NotificationsResponse;
    expect(afterSignup.unreadCount).toBe(1);
    expect(afterSignup.notifications).toHaveLength(1);
    expect(afterSignup.notifications[0].message).toBe('You earned the "Getting Started" badge.');
    expect(afterSignup.notifications[0].read).toBe(false);

    await postJson(client, '/api/learning-path', { path: 'GUIDED' });

    const afterPath = (await (await client.fetch('/api/notifications')).json()) as NotificationsResponse;
    expect(afterPath.unreadCount).toBe(2);
    expect(afterPath.notifications).toHaveLength(2);
    expect(afterPath.notifications[0].message).toBe('You earned the "Path Chosen" badge.');

    // Re-choosing the same path again must not fire a second "Path Chosen" notification -
    // the badge is already earned.
    await postJson(client, '/api/learning-path', { path: 'COURSEWORK' });
    const afterSecondChoice = (await (await client.fetch('/api/notifications')).json()) as NotificationsResponse;
    expect(afterSecondChoice.unreadCount).toBe(2);
    expect(afterSecondChoice.notifications).toHaveLength(2);

    const markReadResponse = await client.fetch('/api/notifications/read', { method: 'POST' });
    expect(markReadResponse.status).toBe(200);

    const afterMarkRead = (await (await client.fetch('/api/notifications')).json()) as NotificationsResponse;
    expect(afterMarkRead.unreadCount).toBe(0);
    expect(afterMarkRead.notifications.every((n) => n.read)).toBe(true);
  });
});
