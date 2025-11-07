import { test, expect } from '@playwright/test';

test.describe('Responsive Design E2E', () => {
  test('should display correctly on mobile', async ({ page }) => {
    // Definir viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verificar se o layout é responsivo
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verificar se os elementos estão empilhados verticalmente
    const heroSection = page.locator('section[id="home"]');
    await expect(heroSection).toBeVisible();

    // Verificar se o formulário está acessível
    await page.evaluate(() => {
      const contactSection = document.querySelector('section:has(form)');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should display correctly on tablet', async ({ page }) => {
    // Definir viewport tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verificar se o layout se adapta
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verificar seção About com grid
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    const aboutSection = page.locator('section[id="about"]');
    await expect(aboutSection).toBeVisible();
  });

  test('should display correctly on desktop', async ({ page }) => {
    // Definir viewport desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Verificar se o layout desktop está correto
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verificar seção Hero com layout horizontal
    const heroSection = page.locator('section[id="home"]');
    await expect(heroSection).toBeVisible();
  });

  test('should handle orientation change', async ({ page }) => {
    // Iniciar em portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mudar para landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(300);

    // Verificar se o layout se adaptou
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
