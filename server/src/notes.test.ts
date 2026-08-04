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

function putJson(client: ReturnType<typeof cookieJar>, path: string, body: unknown) {
  return client.fetch(path, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('module notes', () => {
  const email = `notes-${Date.now()}@example.com`;

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it('rejects unauthenticated requests', async () => {
    const getResponse = await fetch(`${baseURL}/api/notes/0`);
    expect(getResponse.status).toBe(401);

    const putResponse = await fetch(`${baseURL}/api/notes/0`, { method: 'PUT' });
    expect(putResponse.status).toBe(401);
  });

  it('rejects an out-of-range module index', async () => {
    const client = cookieJar(baseURL);
    await postJson(client, '/api/auth/sign-up/email', {
      email,
      password: 'Abcdefgh1!',
      name: 'Ada Lovelace',
      firstName: 'Ada',
      lastName: 'Lovelace',
    });

    const tooHigh = await client.fetch('/api/notes/9');
    expect(tooHigh.status).toBe(400);

    const negative = await client.fetch('/api/notes/-1');
    expect(negative.status).toBe(400);

    const notANumber = await client.fetch('/api/notes/abc');
    expect(notANumber.status).toBe(400);
  });

  it('starts empty, saves real content, and keeps each module independent', async () => {
    const client = cookieJar(baseURL);
    await postJson(client, '/api/auth/sign-in/email', { email, password: 'Abcdefgh1!' });

    const empty = await (await client.fetch('/api/notes/2')).json();
    expect(empty).toEqual({ content: '' });

    const saveResponse = await putJson(client, '/api/notes/2', { content: 'My plan: build a bakery site.' });
    expect(saveResponse.status).toBe(200);
    expect(await saveResponse.json()).toEqual({ content: 'My plan: build a bakery site.' });

    const reread = await (await client.fetch('/api/notes/2')).json();
    expect(reread).toEqual({ content: 'My plan: build a bakery site.' });

    // A different module's notes are unaffected.
    const otherModule = await (await client.fetch('/api/notes/3')).json();
    expect(otherModule).toEqual({ content: '' });

    // Saving again overwrites rather than duplicating.
    await putJson(client, '/api/notes/2', { content: 'Updated plan.' });
    const updated = await (await client.fetch('/api/notes/2')).json();
    expect(updated).toEqual({ content: 'Updated plan.' });
  });
});
