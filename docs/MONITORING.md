# Guia de Monitoramento

## Configuração do Sentry

O Sentry está configurado para error tracking e performance monitoring.

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente:

```env
VITE_SENTRY_DSN=your_sentry_dsn_here
```

### Alertas Configurados

O Sentry está configurado com os seguintes alertas:

1. **Erros Críticos**: Alertas automáticos para erros não tratados
2. **Performance**: Monitoramento de transações lentas (> 3s)
3. **Replay**: Gravação de sessões com erros (100% das sessões com erro)

### Dashboard

Acesse o dashboard do Sentry em: https://sentry.io

### Configuração de Alertas

Para configurar alertas adicionais:

1. Acesse o Sentry Dashboard
2. Vá em Settings > Alerts
3. Configure alertas para:
   - Erros críticos (severity: error)
   - Performance degradada
   - Taxa de erro alta

### Filtros de Erros

O Sentry está configurado para ignorar:

- Erros de rede conhecidos (NetworkError, Failed to fetch)
- Erros não críticos

Para adicionar mais filtros, edite `src/utils/sentry.ts`.

## Vercel Analytics

O Vercel Analytics está configurado automaticamente e coleta:

- Métricas de performance (FCP, LCP, CLS, TTFB)
- Métricas de Web Vitals
- Dados de navegação

Acesse o dashboard em: https://vercel.com/analytics

## Uptime Monitoring

Para configurar uptime monitoring:

1. Use serviços como:
   - UptimeRobot (gratuito)
   - Pingdom
   - StatusCake

2. Configure checks para:
   - Homepage (https://luiscarlos.dev)
   - API endpoint (https://luiscarlos.dev/api/contact)

## Métricas Recomendadas

Monitore as seguintes métricas:

- **Performance**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Erros**: Taxa de erro < 0.1%
- **Uptime**: > 99.9%
- **Cobertura de Testes**: > 80%
