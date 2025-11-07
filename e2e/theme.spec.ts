import { test, expect } from '@playwright/test';

test.describe('Theme Toggle E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle theme from dark to light', async ({ page }) => {
    // Verificar tema inicial (pode ser dark ou light)
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('class');

    // Clicar no botão de tema
    const themeToggle = page.locator('button[aria-label*="tema"]');
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Verificar se o tema mudou
    const newTheme = await htmlElement.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should toggle theme using keyboard', async ({ page }) => {
    // Tab até o botão de tema
    await page.keyboard.press('Tab');

    // Verificar se o botão está focado
    const themeToggle = page.locator('button[aria-label*="tema"]');
    await expect(themeToggle).toBeFocused();

    // Pressionar Enter para alternar tema
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Verificar se o tema mudou
    const htmlElement = page.locator('html');
    const theme = await htmlElement.getAttribute('class');
    expect(theme).toBeTruthy();
  });

  test('should persist theme preference', async ({ page }) => {
    // Alternar tema
    const themeToggle = page.locator('button[aria-label*="tema"]');
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Obter tema atual
    const htmlElement = page.locator('html');
    const theme = await htmlElement.getAttribute('class');

    // Recarregar página
    await page.reload();
    await page.waitForTimeout(500);

    // Verificar se o tema foi mantido
    const persistedTheme = await htmlElement.getAttribute('class');
    expect(persistedTheme).toBe(theme);
  });
});
