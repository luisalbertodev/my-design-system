import { test, expect } from '@playwright/test';

test.describe('Modal E2E', () => {
  const storyUrl =
    'http://localhost:6006/iframe.html?id=project-molecules-modal--scrollable-modal&viewMode=story';

  test('Should open modal on trigger button click', async ({ page }) => {
    await page.goto(storyUrl);

    const openButton = page.getByRole('button', { name: /open scrollable modal/i });
    await openButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    await expect(modal).toHaveAttribute('aria-modal', 'true');
    await expect(modal).toHaveAttribute('aria-labelledby');
  });

  test('Should close modal when clicking the close button', async ({ page }) => {
    await page.goto(storyUrl);

    const openButton = page.getByRole('button', { name: /open scrollable modal/i });
    await openButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    const modalButtonClose = page.getByRole('button', { name: /close modal/i });
    await modalButtonClose.click();

    await expect(modal).not.toBeVisible();
  });

  test('Should close modal on Escape key press', async ({ page }) => {
    await page.goto(storyUrl);

    const openButton = page.getByRole('button', { name: /open scrollable modal/i });
    await openButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal).not.toBeVisible();
  });

  test('Should focus first interactive element inside modal', async ({ page }) => {
    await page.goto(storyUrl);

    const openButton = page.getByRole('button', { name: /open scrollable modal/i });
    await openButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    const firtstInteractiveElement = modal.locator('button').first();
    await expect(firtstInteractiveElement).toBeFocused();
  });

  test('Should close modal when clicking outside', async ({ page }) => {
    await page.goto(storyUrl);

    const openButton = page.getByRole('button', { name: /open scrollable modal/i });
    await openButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    await page.mouse.click(10, 10); // clicking outside modal

    await expect(modal).not.toBeVisible();
  });
});
