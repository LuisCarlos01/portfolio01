import { test, expect } from '@playwright/test';

test.describe('Navigation E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to sections using scroll', async ({ page }) => {
    // Verificar se a seção hero está visível
    const heroSection = page.locator('section[id="home"]');
    await expect(heroSection).toBeVisible();

    // Scroll para seção About
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);
    const aboutSection = page.locator('section[id="about"]');
    await expect(aboutSection).toBeInViewport();

    // Scroll para seção Skills
    await page.evaluate(() => {
      const skillsSection = document.getElementById('skills');
      skillsSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);
    const skillsSection = page.locator('section[id="skills"]');
    await expect(skillsSection).toBeInViewport();

    // Scroll para seção Portfolio
    await page.evaluate(() => {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);
    const portfolioSection = page.locator('section[id="portfolio"]');
    await expect(portfolioSection).toBeInViewport();
  });

  test('should use skip link for accessibility', async ({ page }) => {
    // Tab para focar no skip link
    await page.keyboard.press('Tab');

    // Verificar se o skip link está visível quando focado
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();

    // Pressionar Enter para ativar o skip link
    await page.keyboard.press('Enter');

    // Verificar se o foco foi para o main content
    await page.waitForTimeout(300);
    const mainContent = page.locator('main[id="main-content"]');
    await expect(mainContent).toBeInViewport();
  });

  test('should navigate using keyboard', async ({ page }) => {
    // Tab através dos elementos interativos
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Theme toggle
    await page.keyboard.press('Tab'); // Primeiro elemento do main

    // Verificar se algum elemento está focado
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
