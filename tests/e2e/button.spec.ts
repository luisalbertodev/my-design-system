import { test, expect } from '@playwright/test';

test.describe('Button E2E', () => {
  const storyUrl =
    'http://localhost:6006/iframe.html?id=project-atoms-button--button-primary&viewMode=story';

  test('Should render the Primary button and respond to click', async ({ page }) => {
    await page.goto(storyUrl);

    const button = page.getByRole('button', { name: /button text/i });

    await expect(button).toBeVisible();
    await button.click();
  });
});
