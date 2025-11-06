# Monitoramento e Alertas

## Vercel Analytics

O projeto está configurado com Vercel Analytics para tracking de:
- Page views
- Performance metrics
- Web Vitals (LCP, FID, CLS)

## Error Tracking

### ErrorBoundary
- Captura erros React em runtime
- Exibe mensagem amigável ao usuário
- Loga erros no console (em produção, integrar com Sentry)

### API Error Handling
- Rate limiting implementado (5 requisições/minuto)
- Validação de dados no backend
- Logs estruturados para debugging

## Próximos Passos

### Sentry Integration (Opcional)
Para tracking avançado de erros, adicionar Sentry:

```bash
npm install @sentry/react @sentry/tracing
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### Alertas
- Configurar alertas no Vercel Dashboard para:
  - Erros críticos (> 5% error rate)
  - Performance degradada (LCP > 2.5s)
  - Uptime monitoring

