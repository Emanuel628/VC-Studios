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

type DashboardResponse = {
  learningPath: string | null;
  points: number;
  streak: number;
  checkpoints: { total: number; passed: number; items: Array<{ key: string; label: string; passed: boolean }> };
  badges: Array<{ key: string; label: string; description: string; earned: boolean }>;
  recentActivity: Array<{ type: string; message: string; points: number; createdAt: string }>;
};

describe('dashboard and learning path', () => {
  const email = `dashboard-${Date.now()}@example.com`;
  const password = 'Abcdefgh1!';

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it('rejects unauthenticated requests to both endpoints', async () => {
    const dashboardResponse = await fetch(`${baseURL}/api/dashboard`);
    expect(dashboardResponse.status).toBe(401);

    const pathResponse = await postJson(cookieJar(baseURL), '/api/learning-path', { path: 'GUIDED' });
    expect(pathResponse.status).toBe(401);
  });

  it('awards real signup activity, then real learning-path activity, never fabricating either', async () => {
    const client = cookieJar(baseURL);

    await postJson(client, '/api/auth/sign-up/email', {
      email,
      password,
      name: 'Ada Lovelace',
      firstName: 'Ada',
      lastName: 'Lovelace',
    });

    const afterSignup = await client.fetch('/api/dashboard');
    expect(afterSignup.status).toBe(200);
    const afterSignupBody = (await afterSignup.json()) as DashboardResponse;

    expect(afterSignupBody.learningPath).toBeNull();
    expect(afterSignupBody.points).toBe(10);
    expect(afterSignupBody.streak).toBe(1);
    expect(afterSignupBody.checkpoints).toEqual({
      total: 3,
      passed: 0,
      items: [
        { key: 'PLAN_OR_BLUEPRINT_APPROVAL', label: 'Plan or blueprint approval', passed: false },
        { key: 'ARCHITECTURE_OR_FILE_MAP', label: 'Architecture or file-map checkpoint', passed: false },
        { key: 'FINAL_COMPLETION_REVIEW', label: 'Final completion review', passed: false },
      ],
    });
    const gettingStarted = afterSignupBody.badges.find((b) => b.key === 'GETTING_STARTED');
    expect(gettingStarted?.earned).toBe(true);
    expect(afterSignupBody.badges.filter((b) => b.earned)).toHaveLength(1);
    expect(afterSignupBody.recentActivity).toHaveLength(1);
    expect(afterSignupBody.recentActivity[0]).toMatchObject({ type: 'ACCOUNT_CREATED', points: 10 });

    const invalidPath = await postJson(client, '/api/learning-path', { path: 'NOT_A_PATH' });
    expect(invalidPath.status).toBe(400);

    const choosePath = await postJson(client, '/api/learning-path', { path: 'GUIDED' });
    expect(choosePath.status).toBe(200);
    expect(await choosePath.json()).toEqual({ learningPath: 'GUIDED' });

    const afterPath = await client.fetch('/api/dashboard');
    const afterPathBody = (await afterPath.json()) as DashboardResponse;
    expect(afterPathBody.learningPath).toBe('GUIDED');
    expect(afterPathBody.points).toBe(35);
    expect(afterPathBody.badges.find((b) => b.key === 'LEARNING_PATH_CHOSEN')?.earned).toBe(true);
    expect(afterPathBody.recentActivity[0]).toMatchObject({ type: 'LEARNING_PATH_CHOSEN', points: 25 });

    // Re-selecting a path updates the choice but must not double-award points for
    // something the user already did once.
    const changePath = await postJson(client, '/api/learning-path', { path: 'COURSEWORK' });
    expect(changePath.status).toBe(200);

    const afterChange = await client.fetch('/api/dashboard');
    const afterChangeBody = (await afterChange.json()) as DashboardResponse;
    expect(afterChangeBody.learningPath).toBe('COURSEWORK');
    expect(afterChangeBody.points).toBe(35);
  });
});
