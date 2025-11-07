import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';
import * as ContactService from '@/services/contactService';

// Mock do ContactService
vi.mock('@/services/contactService', () => ({
  ContactService: {
    submitForm: vi.fn(),
  },
}));

// Mock do useContactForm
vi.mock('@/hooks/useContactForm', () => ({
  useContactForm: () => ({
    register: (name: string) => ({
      name,
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }),
    handleSubmit: (fn: (data: unknown) => void) => (e: Event) => {
      e.preventDefault();
      fn({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message with enough characters to pass validation.',
      });
    },
    errors: {},
    isSubmitting: false,
    reset: vi.fn(),
  }),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /enviar mensagem/i })
    ).toBeInTheDocument();
  });

  it('calls onSubmit callback on successful submission', async () => {
    const mockOnSubmit = vi.fn();
    vi.mocked(ContactService.ContactService.submitForm).mockResolvedValue({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });

    render(<ContactForm onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByRole('button', {
      name: /enviar mensagem/i,
    });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        success: true,
        message: 'Mensagem enviada com sucesso!',
      });
    });
  });

  it('displays success message on successful submission', async () => {
    vi.mocked(ContactService.ContactService.submitForm).mockResolvedValue({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });

    render(<ContactForm />);
    const submitButton = screen.getByRole('button', {
      name: /enviar mensagem/i,
    });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Mensagem enviada com sucesso!')
      ).toBeInTheDocument();
    });
  });

  it('displays error message on failed submission', async () => {
    vi.mocked(ContactService.ContactService.submitForm).mockResolvedValue({
      success: false,
      message: 'Erro ao enviar mensagem.',
    });

    render(<ContactForm />);
    const submitButton = screen.getByRole('button', {
      name: /enviar mensagem/i,
    });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao enviar/i)).toBeInTheDocument();
    });
  });
});
