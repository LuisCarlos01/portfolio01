import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Schema de validação
const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(20, 'Mensagem deve ter pelo menos 20 caracteres'),
});

// Rate limiting simples (em produção, usar Redis ou similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requisições por minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(req: VercelRequest): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  }

  try {
    // Validação dos dados
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.errors,
      });
    }

    const { name, email, subject, message } = validationResult.data;

    // Log para debugging (permitido em serverless functions)
    // eslint-disable-next-line no-console
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: clientIP,
    });

    // Simula envio de email
    // Em produção, usar Resend ou SendGrid aqui
    const emailSent = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'contact@luiscarlos.dev',
      from: process.env.FROM_EMAIL || 'noreply@luiscarlos.dev',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>Nova mensagem do portfólio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (!emailSent) {
      return res.status(500).json({
        error: 'Failed to send email. Please try again later.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

// Função simulada de envio de email
// Em produção, substituir por integração real com Resend/SendGrid
async function sendEmail({
  to,
  from,
  subject,
  html,
}: {
  to: string;
  from: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  // Se RESEND_API_KEY estiver configurado, usar Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Resend error:', error);
        return false;
      }

      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Resend import/execution error:', error);
      return false;
    }
  }

  // Fallback: apenas loga (para desenvolvimento)
  // eslint-disable-next-line no-console
  console.log('Email would be sent:', { to, from, subject });
  return true;
}

