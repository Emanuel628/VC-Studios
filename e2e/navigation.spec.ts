import { expect, test } from '@playwright/test';

test.describe('Landing page nav anchors', () => {
  test('each nav link scrolls to a distinct section', async ({ page }) => {
    await page.goto('/');

    const anchors = ['how-it-works', 'learning-paths', 'about-course'];
    const positions: number[] = [];

    for (const id of anchors) {
      await expect(page.locator(`#${id}`)).toBeAttached();
      const box = await page.locator(`#${id}`).boundingBox();
      expect(box).not.toBeNull();
      positions.push(box!.y);
    }

    // Every section sits at a distinct vertical position - no two nav links land in the same place.
    expect(new Set(positions).size).toBe(positions.length);
  });

  test('clicking each nav link scrolls the page to that section', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Primary navigation"] a');
    const scrollPositions = new Set<number>();

    for (let i = 0; i < (await nav.count()); i++) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await nav.nth(i).click();
      await page.waitForTimeout(200);
      scrollPositions.add(await page.evaluate(() => window.scrollY));
    }

    expect(scrollPositions.size).toBe(await nav.count());
  });
});
