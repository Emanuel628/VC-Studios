import { expect, test } from '@playwright/test';

test.describe('Footer', () => {
  test('links to Terms and Privacy work end to end', async ({ page }) => {
    await page.goto('/');

    const termsLink = page.locator('footer a', { hasText: 'Terms & Conditions' });
    const privacyLink = page.locator('footer a', { hasText: 'Privacy Policy' });
    await expect(termsLink).toHaveAttribute('href', '/terms');
    await expect(privacyLink).toHaveAttribute('href', '/privacy');

    await termsLink.click();
    await expect(page).toHaveURL('/terms');
    await expect(page.locator('h1')).toHaveText('Terms & Conditions');

    // The standardized public shell (nav + skip link) is present on the legal page too.
    await expect(page.locator('header a', { hasText: 'Platinum VC Studios' })).toBeVisible();
    await expect(page.getByText('Skip to main content')).toBeAttached();
  });
});
