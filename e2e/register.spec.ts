import { expect, test } from '@playwright/test';

test.describe('Register page', () => {
  test('shows validation errors when submitted empty', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByText('Enter your first name.')).toBeVisible();
    await expect(page.getByText('Review the highlighted fields before continuing.')).toBeVisible();
  });

  test('links to Terms and Privacy from the consent line', async ({ page }) => {
    await page.goto('/register');
    const termsLink = page.getByRole('link', { name: 'Terms & Conditions' });
    const privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    await expect(termsLink).toHaveAttribute('href', '/terms');
    await expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
