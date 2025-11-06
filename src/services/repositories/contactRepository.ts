import type { ContactFormData } from '@/hooks/useContactForm';

export interface ContactRepository {
  submit(
    data: ContactFormData
  ): Promise<{ success: boolean; message?: string }>;
}

class ContactRepositoryImpl implements ContactRepository {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    // Em desenvolvimento, usar URL local; em produção, usar URL da Vercel
    this.apiUrl =
      apiUrl ||
      (import.meta.env.DEV
        ? 'http://localhost:3000/api/contact'
        : '/api/contact');
  }

  async submit(
    data: ContactFormData
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        `Failed to submit contact form: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

// Exportar instância singleton
export const contactRepository: ContactRepository = new ContactRepositoryImpl(
  import.meta.env.VITE_API_URL
);
