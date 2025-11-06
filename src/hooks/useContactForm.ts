import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ContactService } from '@/services/contactService';

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
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    const result = await ContactService.submitForm(data);
    if (result.success) {
      reset();
    } else {
      throw new Error(result.message);
    }
  };

  return {
    register,
    handleSubmit: rhfHandleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    reset,
  };
};
