import React, { useState } from 'react';
import { useContactForm } from '@/hooks/useContactForm';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import type { ContactFormData } from '@/hooks/useContactForm';

export interface ContactFormProps {
  onSubmit?: (data: { success: boolean; message: string }) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    onSubmit: onSubmitData,
    errors,
    isSubmitting,
    reset,
  } = useContactForm();
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const onFormSubmit = async (data: ContactFormData) => {
    try {
      await onSubmitData(data);
      const result = {
        success: true,
        message: 'Mensagem enviada com sucesso!',
      };
      setSubmitResult(result);
      reset();
      if (onSubmit) {
        onSubmit(result);
      }
    } catch {
      const errorResult = {
        success: false,
        message: 'Erro ao enviar mensagem. Tente novamente.',
      };
      setSubmitResult(errorResult);
      if (onSubmit) {
        onSubmit(errorResult);
      }
    }
  };

  const handleSubmit = rhfHandleSubmit(onFormSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitResult && (
        <div
          className={`p-4 rounded-lg ${
            submitResult.success
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
          role="alert"
        >
          {submitResult.message}
        </div>
      )}

      <Input
        label="Nome"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Seu nome"
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="seu@email.com"
      />

      <Input
        label="Assunto"
        {...register('subject')}
        error={errors.subject?.message}
        placeholder="Assunto da mensagem"
      />

      <Textarea
        label="Mensagem"
        {...register('message')}
        error={errors.message?.message}
        placeholder="Sua mensagem aqui..."
        rows={6}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Enviar Mensagem
      </Button>
    </form>
  );
};
