import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactService } from '../contactService';
import { contactRepository } from '../repositories/contactRepository';
import type { ContactFormData } from '@/hooks/useContactForm';

// Mock do contactRepository
vi.mock('../repositories/contactRepository', () => ({
  contactRepository: {
    submit: vi.fn(),
  },
}));

// Mock do logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ContactService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit form successfully', async () => {
    const mockData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters.',
    };

    vi.mocked(contactRepository.submit).mockResolvedValue({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });

    const result = await ContactService.submitForm(mockData);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Mensagem enviada com sucesso!');
    expect(contactRepository.submit).toHaveBeenCalledWith(mockData);
  });

  it('should handle repository errors', async () => {
    const mockData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters.',
    };

    const errorMessage = 'Network error';
    vi.mocked(contactRepository.submit).mockRejectedValue(
      new Error(errorMessage)
    );

    const result = await ContactService.submitForm(mockData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(errorMessage);
  });

  it('should handle generic errors', async () => {
    const mockData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters.',
    };

    vi.mocked(contactRepository.submit).mockRejectedValue('Unknown error');

    const result = await ContactService.submitForm(mockData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Erro ao enviar mensagem');
  });
});
