import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

// Serves the built frontend and proxies /api/* to the backend, so the browser only ever
// talks to this one origin. This is required on Railway: frontend and backend each get a
// *.up.railway.app subdomain, and up.railway.app is registered in the public suffix list -
// meaning they are different *sites* to a browser, not sibling subdomains. Safari (and
// increasingly other browsers) drop cross-site cookies outright regardless of SameSite, so a
// separately hosted backend can create a session but the browser will never keep it. Routing
// /api through this same origin makes the session cookie first-party instead.
export function createApp(apiProxyTarget) {
  const app = express();

  app.use(
    createProxyMiddleware({
      target: apiProxyTarget,
      changeOrigin: true,
      pathFilter: '/api',
    }),
  );

  app.use(express.static(distDir));
  app.get('*splat', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const apiProxyTarget = process.env.API_PROXY_TARGET;

  if (!apiProxyTarget) {
    throw new Error('API_PROXY_TARGET is required - set it to the backend service\'s public URL.');
  }

  const port = process.env.PORT ?? 3000;
  createApp(apiProxyTarget).listen(port, () => {
    console.log(`Platinum VC Studios frontend listening on port ${port}, proxying /api to ${apiProxyTarget}`);
  });
}
