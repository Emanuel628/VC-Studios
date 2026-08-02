import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5183',
  },
  webServer: [
    {
      command: 'npm --prefix server run dev:test-db',
      url: 'http://localhost:3001/',
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
    {
      command: 'npm run dev -- --port 5183 --strictPort',
      url: 'http://localhost:5183',
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
  ],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
