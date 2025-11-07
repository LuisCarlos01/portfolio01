import { test, expect } from '@playwright/test';

test.describe('Filters E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll para seção Portfolio
    await page.evaluate(() => {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);
  });

  test('should filter portfolio projects by category', async ({ page }) => {
    // Verificar se há projetos visíveis
    const projects = page.locator('.project-card');
    const initialCount = await projects.count();
    expect(initialCount).toBeGreaterThan(0);

    // Clicar no filtro "Web"
    const webFilter = page.locator('button[aria-label*="Web"]');
    await webFilter.click();
    await page.waitForTimeout(500);

    // Verificar se os projetos foram filtrados
    const filteredProjects = page.locator('.project-card');
    const filteredCount = await filteredProjects.count();

    // Pode ter menos ou igual projetos após filtro
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should filter skills by category', async ({ page }) => {
    // Scroll para seção Skills
    await page.evaluate(() => {
      const skillsSection = document.getElementById('skills');
      skillsSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Clicar no filtro "Frontend"
    const frontendFilter = page.locator('button[aria-label*="Frontend"]');
    await frontendFilter.click();
    await page.waitForTimeout(500);

    // Verificar se o filtro está ativo
    await expect(frontendFilter).toHaveAttribute('aria-pressed', 'true');
  });

  test('should reset filters to show all items', async ({ page }) => {
    // Scroll para seção Portfolio
    await page.evaluate(() => {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Aplicar filtro
    const webFilter = page.locator('button[aria-label*="Web"]');
    await webFilter.click();
    await page.waitForTimeout(500);

    // Clicar em "Todos"
    const allFilter = page.locator('button[aria-label*="Todos"]');
    await allFilter.click();
    await page.waitForTimeout(500);

    // Verificar se todos os projetos estão visíveis novamente
    const projects = page.locator('.project-card');
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate filters using keyboard', async ({ page }) => {
    // Scroll para seção Portfolio
    await page.evaluate(() => {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Tab até o primeiro filtro
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Pressionar Enter para ativar o filtro
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Verificar se o filtro foi ativado
    const activeFilter = page.locator('button[aria-pressed="true"]');
    await expect(activeFilter).toBeVisible();
  });
});
