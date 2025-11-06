import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Bem-vindo');
  });

  test('should navigate to 404 page for invalid route', async ({ page }) => {
    await page.goto('/invalid-route');
    await expect(page.locator('h1')).toContainText('404');
  });
});

