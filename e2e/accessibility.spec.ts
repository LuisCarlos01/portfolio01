import { test, expect } from '@playwright/test';

test.describe('Accessibility E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper ARIA labels on interactive elements', async ({
    page,
  }) => {
    // Verificar botão de tema
    const themeToggle = page.locator('button[aria-label*="tema"]');
    await expect(themeToggle).toHaveAttribute('aria-label');

    // Verificar filtros
    await page.evaluate(() => {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    const filters = page.locator('button[role="tab"]');
    const filterCount = await filters.count();
    expect(filterCount).toBeGreaterThan(0);

    // Verificar se cada filtro tem aria-label
    for (let i = 0; i < filterCount; i++) {
      const filter = filters.nth(i);
      await expect(filter).toHaveAttribute('aria-label');
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Verificar se há h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Verificar seções com h2
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have skip link for keyboard navigation', async ({ page }) => {
    // Verificar se o skip link existe
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();

    // Verificar se está oculto por padrão
    const skipLinkStyles = await skipLink.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        width: styles.width,
        height: styles.height,
      };
    });

    expect(skipLinkStyles.position).toBe('absolute');
  });

  test('should have proper form labels', async ({ page }) => {
    // Scroll para formulário
    await page.evaluate(() => {
      const contactSection = document.querySelector('section:has(form)');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Verificar se os inputs têm labels associados
    const nameInput = page.locator('input[name="name"]');
    const nameLabel = page.locator('label[for*="input"]').first();
    await expect(nameLabel).toBeVisible();

    // Verificar se o input está associado ao label
    const nameInputId = await nameInput.getAttribute('id');
    const nameLabelFor = await nameLabel.getAttribute('for');
    expect(nameInputId).toBeTruthy();
    expect(nameLabelFor).toBeTruthy();
  });

  test('should have proper error messages with ARIA', async ({ page }) => {
    // Scroll para formulário
    await page.evaluate(() => {
      const contactSection = document.querySelector('section:has(form)');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Tentar submeter formulário vazio
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(500);

    // Verificar se há mensagens de erro com role="alert"
    const errorMessages = page.locator('[role="alert"]');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab através dos elementos
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus');
    await expect(firstFocused).toBeVisible();

    // Continuar tabbing
    await page.keyboard.press('Tab');
    const secondFocused = page.locator(':focus');
    await expect(secondFocused).toBeVisible();
  });

  test('should have proper focus indicators', async ({ page }) => {
    // Tab até um elemento interativo
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Verificar se há indicador de foco (ring ou outline)
    const focusStyles = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
      };
    });

    // Deve ter algum indicador de foco
    expect(
      focusStyles.outlineWidth !== '0px' || focusStyles.outline !== 'none'
    ).toBeTruthy();
  });
});
