import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';

const PORT = Number(process.env.PORT ?? 3001);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5183';

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
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

    if (!session) {
      res.status(401).json({ error: 'Not signed in.' });
      return;
    }

    res.json(session);
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
