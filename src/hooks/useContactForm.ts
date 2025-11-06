import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(20, 'Mensagem deve ter pelo menos 20 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const useContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implementar chamada de API
      // eslint-disable-next-line no-console
      console.log('Form data:', data);
      reset();
      return { success: true, message: 'Mensagem enviada com sucesso!' };
    } catch {
      return {
        success: false,
        message: 'Erro ao enviar mensagem. Tente novamente.',
      };
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    reset,
  };
};
