import { expect, test } from '@playwright/test';

test.describe('Routing', () => {
  const routes: Array<{ path: string; heading: RegExp | string }> = [
    { path: '/', heading: /website idea/i },
    { path: '/register', heading: 'Build something real.' },
    { path: '/forgot-password', heading: /Get a code to reset your password/ },
    { path: '/terms', heading: 'Terms & Conditions' },
    { path: '/privacy', heading: 'Privacy Policy' },
  ];

  for (const { path, heading } of routes) {
    test(`${path} responds 200 and renders its heading`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toContainText(heading);
    });
  }

  test('an unknown route redirects to the landing page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1').first()).toContainText(/website idea/i);
  });
});
