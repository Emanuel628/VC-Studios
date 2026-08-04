import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';

export async function startTestServer() {
  const { createApp } = await import('../index.js');
  const { prisma } = await import('../auth.js');

  const app = createApp();
  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;

  return {
    baseURL: `http://localhost:${port}`,
    prisma,
    async close() {
      await new Promise((resolve) => server.close(resolve));
      await prisma.$disconnect();
    },
  };
}

export function cookieJar(baseURL: string) {
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

export function postJson(client: ReturnType<typeof cookieJar>, path: string, body: unknown) {
  return client.fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}
