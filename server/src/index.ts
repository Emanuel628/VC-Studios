import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { auth, prisma } from './auth.js';
import { getDashboardData, getNotifications, markNotificationsRead, recordActivity } from './gamification.js';

const PORT = Number(process.env.PORT ?? 3001);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5183';

async function requireSession(req: express.Request, res: express.Response) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session) {
    res.status(401).json({ error: 'Not signed in.' });
    return null;
  }

  return session;
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: CLIENT_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );

  // Better Auth must be mounted before express.json() - it parses its own body.
  app.all('/api/auth/*splat', toNodeHandler(auth));

  app.use(express.json());

  app.get('/api/me', async (req, res) => {
    const session = await requireSession(req, res);
    if (!session) return;

    res.json(session);
  });

  app.get('/api/dashboard', async (req, res) => {
    const session = await requireSession(req, res);
    if (!session) return;

    const data = await getDashboardData(prisma, session.user.id);
    res.json(data);
  });

  app.post('/api/learning-path', async (req, res) => {
    const session = await requireSession(req, res);
    if (!session) return;

    const { path } = req.body ?? {};
    if (path !== 'GUIDED' && path !== 'COURSEWORK') {
      res.status(400).json({ error: 'path must be "GUIDED" or "COURSEWORK".' });
      return;
    }

    const existing = await prisma.user.findUniqueOrThrow({
      where: { id: session.user.id },
      select: { learningPath: true },
    });

    await prisma.user.update({ where: { id: session.user.id }, data: { learningPath: path } });

    if (!existing.learningPath) {
      const label = path === 'GUIDED' ? 'Guided Build-Along' : 'Coursework-Only';
      await recordActivity(prisma, session.user.id, 'LEARNING_PATH_CHOSEN', 25, `Chose the ${label} path`);
    }

    res.json({ learningPath: path });
  });

  app.get('/api/notifications', async (req, res) => {
    const session = await requireSession(req, res);
    if (!session) return;

    const data = await getNotifications(prisma, session.user.id);
    res.json(data);
  });

  app.post('/api/notifications/read', async (req, res) => {
    const session = await requireSession(req, res);
    if (!session) return;

    await markNotificationsRead(prisma, session.user.id);
    res.json({ ok: true });
  });

  app.get('/', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Platinum VC Studios server listening on port ${PORT}`);
  });
}
