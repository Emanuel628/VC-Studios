import { expect, test } from '@playwright/test';

test.describe('Real login flow', () => {
  const email = `e2e-login-${Date.now()}@example.com`;
  const password = 'Abcdefgh1!';

  test('register, land on the dashboard, use the account page, log out, then log back in', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel('First name').fill('Ada');
    await page.getByLabel('Last name').fill('Lovelace');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Confirm password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();

    // Successful registration auto-signs in and redirects to the dashboard.
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('banner').getByRole('button', { name: 'Ada' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Welcome back/ })).toContainText('Ada');

    // The user menu links to the full account page.
    await page.getByRole('banner').getByRole('button', { name: 'Ada' }).click();
    await page.getByRole('menuitem', { name: 'Account settings' }).click();
    await expect(page).toHaveURL('/account');
    await expect(page.getByText('Ada Lovelace')).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page.getByText('Email not verified')).toBeVisible();

    // Logging out from a protected page correctly bounces to /login via the route guard.
    await page.getByRole('banner').getByRole('button', { name: 'Ada' }).click();
    await page.getByRole('menuitem', { name: 'Log out' }).click();
    await expect(page).toHaveURL('/login');

    // The logged-out state persists on the public site too, and both protected pages redirect.
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Start learning' })).toBeVisible();
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
    await page.goto('/account');
    await expect(page).toHaveURL('/login');

    // Log back in with the same credentials.
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('banner').getByRole('button', { name: 'Ada' })).toBeVisible();
  });

  test('a signed-out visitor is redirected away from the protected dashboard and account pages', async ({
    page,
  }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');

    await page.goto('/account');
    await expect(page).toHaveURL('/login');
  });
});
