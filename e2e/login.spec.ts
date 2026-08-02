import { expect, test } from '@playwright/test';

test.describe('Real login flow', () => {
  const email = `e2e-login-${Date.now()}@example.com`;
  const password = 'Abcdefgh1!';

  test('register, land signed in, use the protected account page, log out, then log back in', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel('First name').fill('Ada');
    await page.getByLabel('Last name').fill('Lovelace');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Confirm password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();

    // Successful registration auto-signs in and redirects home.
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Welcome, Ada' })).toBeVisible();

    // Protected account page shows real session data.
    await page.getByRole('link', { name: 'Welcome, Ada' }).click();
    await expect(page).toHaveURL('/account');
    await expect(page.getByText('Ada Lovelace')).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page.getByText('Email not verified')).toBeVisible();

    // Logging out from the protected page correctly bounces to /login via the route guard.
    await page.getByRole('banner').getByRole('button', { name: 'Log out' }).click();
    await expect(page).toHaveURL('/login');

    // The logged-out state persists on the public site too.
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Start learning' })).toBeVisible();
    await page.goto('/account');
    await expect(page).toHaveURL('/login');

    // Log back in with the same credentials.
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Welcome, Ada' })).toBeVisible();
  });

  test('a signed-out visitor is redirected away from the protected account page', async ({ page }) => {
    await page.goto('/account');
    await expect(page).toHaveURL('/login');
  });
});
