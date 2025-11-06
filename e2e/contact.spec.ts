import { test, expect } from '@playwright/test';

test.describe('Contact Form E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página que contém o formulário
    // Assumindo que há uma rota /contact ou que o formulário está na home
    await page.goto('/');
  });

  test('should submit contact form with valid data', async ({ page }) => {
    // Preencher formulário
    await page.fill('input[name="name"]', 'João Silva');
    await page.fill('input[name="email"]', 'joao@example.com');
    await page.fill('input[name="subject"]', 'Teste de contato');
    await page.fill('textarea[name="message"]', 'Esta é uma mensagem de teste para verificar o funcionamento do formulário de contato.');

    // Submeter formulário
    await page.click('button[type="submit"]');

    // Aguardar mensagem de sucesso
    await expect(page.locator('text=Mensagem enviada com sucesso')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show validation errors for invalid data', async ({ page }) => {
    // Tentar submeter formulário vazio
    await page.click('button[type="submit"]');

    // Verificar mensagens de erro
    await expect(page.locator('text=Nome deve ter pelo menos 3 caracteres')).toBeVisible();
    await expect(page.locator('text=Email inválido')).toBeVisible();
  });

  test('should handle rate limiting', async ({ page }) => {
    const fillAndSubmit = async () => {
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="subject"]', 'Test');
      await page.fill('textarea[name="message"]', 'This is a test message with enough characters to pass validation.');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000); // Aguardar resposta
    };

    // Enviar múltiplas requisições rapidamente
    for (let i = 0; i < 6; i++) {
      await fillAndSubmit();
    }

    // Verificar se rate limit foi aplicado
    await expect(
      page.locator('text=Too many requests')
    ).toBeVisible({ timeout: 5000 });
  });
});

