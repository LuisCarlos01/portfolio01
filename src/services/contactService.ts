import { contactRepository } from './repositories/contactRepository';
import type { ContactFormData } from '@/hooks/useContactForm';
import { logger } from '@/utils/logger';

export class ContactService {
  static async submitForm(
    data: ContactFormData
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await contactRepository.submit(data);
      logger.info('Contact form submitted successfully', {
        email: data.email,
      });
      return {
        success: result.success,
        message: result.message || 'Mensagem enviada com sucesso!',
      };
    } catch (error) {
      logger.error('Contact form submission failed', { error });
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      };
    }
  }
}

