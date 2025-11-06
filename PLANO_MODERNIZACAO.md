# Plano de Modernização do Portfólio

## Sumário Executivo

Este plano propõe a modernização do portfólio mantendo a identidade visual e funcionalidades existentes, mas elevando a qualidade técnica através de melhorias arquiteturais, padrões de código mais robustos, otimizações de performance e uma stack tecnológica atualizada. 

O projeto atual já possui uma base sólida com React 19, TypeScript, Vite e estrutura modular, mas pode se beneficiar de melhorias em gerenciamento de estado, testes, acessibilidade, SEO e CI/CD. A estratégia de migração será incremental, permitindo deploy contínuo sem downtime.

A modernização está dividida em 6 sprints principais, com duração total estimada de 20-30 dias úteis, focando em melhorias incrementais que não quebrem funcionalidades existentes. Cada sprint possui tarefas claramente definidas com critérios de aceitação específicos.

---

## 1. Avaliação do Código Atual

### 1.1 Pontos Fortes

- **Arquitetura modular bem organizada**: Separação clara entre components, hooks, data e types
- **TypeScript bem implementado**: Tipagem consistente em toda aplicação
- **Estrutura de pastas escalável**: Fácil adicionar novas seções e componentes
- **Lazy loading implementado**: Componentes carregados sob demanda
- **Sistema de estilos organizado**: Tailwind + CSS customizado bem estruturado
- **Hooks personalizados reutilizáveis**: Boa separação de lógica de negócio
- **Animações performáticas**: Uso adequado de GSAP
- **Responsividade**: Design adaptável a diferentes dispositivos
- **Tema escuro/claro**: Sistema de temas funcional
- **Código limpo**: Componentes pequenos e focados (SRP respeitado)

### 1.2 Principais Problemas Identificados

1. **Gerenciamento de estado fragmentado**: Uso misto de Context API e useState local sem padrão claro
2. **Falta de testes E2E**: Apenas testes unitários básicos com Vitest
3. **Formulário de contato sem integração real**: Apenas simulação de envio
4. **SEO limitado**: Falta de meta tags dinâmicas, sitemap e structured data
5. **Acessibilidade incompleta**: Falta de ARIA labels, navegação por teclado e contraste adequado
6. **Performance**: Imagens não otimizadas (sem lazy loading avançado, WebP, ou CDN)
7. **CI/CD ausente**: Não há pipeline automatizado de deploy
8. **PWA não implementado**: Falta service worker e manifest.json
9. **Falta de monitoramento**: Sem analytics ou error tracking
10. **Dependências desatualizadas**: Algumas libs podem ter versões mais recentes estáveis

---

## 2. Critérios e Lógica de Decisão

### 2.1 Critérios de Avaliação

| Critério | Peso | Explicação |
|----------|------|------------|
| **Manutenibilidade** | 25% | Prioridade máxima: código deve ser fácil de entender e modificar por qualquer desenvolvedor |
| **Performance** | 20% | Crítico para portfólio: tempo de carregamento e interatividade impactam primeira impressão |
| **Escalabilidade** | 15% | Arquitetura deve suportar crescimento futuro sem refatorações massivas |
| **Developer Experience** | 15% | Ferramentas e padrões que aceleram desenvolvimento e reduzem bugs |
| **Acessibilidade** | 10% | WCAG 2.1 AA mínimo: inclusão e compliance legal |
| **SEO** | 10% | Visibilidade em mecanismos de busca é essencial para portfólio |
| **Custo** | 5% | Soluções devem ser economicamente viáveis (preferir opções gratuitas/tier free) |

### 2.2 Metodologia de Decisão

Cada tecnologia foi avaliada considerando:
- Compatibilidade com stack atual
- Curva de aprendizado da equipe
- Maturidade e estabilidade da biblioteca
- Performance e impacto no bundle size
- Custo de implementação e manutenção
- Suporte da comunidade e documentação

---

## 3. Stack Tecnológica Recomendada

### 3.1 Frontend

#### Stack Primária

- **Framework**: React 19.1.0
- **Build Tool**: Vite 5.4.0
- **Styling**: Tailwind CSS 3.4.0 + CSS Modules para componentes complexos
- **State Management**: Zustand 4.5.0 (leve) + React Query 5.0.0 (server state)
- **Routing**: React Router DOM 6.22.0
- **Animations**: GSAP 3.12.5 + Framer Motion 11.0.0 (alternativa leve)
- **Forms**: React Hook Form 7.51.0 + Zod 3.23.0 (validação)

#### Justificativa

- **React 19**: Mantém compatibilidade e traz melhorias de performance
- **Vite**: Continua sendo a melhor opção para build rápido
- **Zustand**: Mais simples que Redux e suficiente para estado global
- **React Query**: Gerencia cache e sincronização de dados do servidor
- **React Hook Form**: Reduz re-renders e melhora performance de formulários

#### Alternativas Consideradas

**Remix 2.0.0**
- ✅ Pros: SSR nativo, melhor SEO, data loading integrado
- ❌ Contras: Curva de aprendizado, ecossistema menor, migração mais complexa
- 💡 Quando considerar: Se SEO for prioridade absoluta e houver necessidade de SSR

**Next.js 14.2.0**
- ✅ Pros: SSR/SSG, Image optimization nativa, ecossistema maduro
- ❌ Contras: Mais pesado, configuração mais complexa, overhead desnecessário para SPA
- 💡 Quando considerar: Se precisar de SSR ou SSG para melhor SEO

### 3.2 Backend

#### Stack Primária

- **Opção**: Serverless Functions (Vercel/Netlify Functions)
- **Runtime**: Node.js 20.x
- **Framework**: Sem framework (vanilla) ou Express.js 4.18.0

#### Justificativa

Para portfólio, serverless é ideal: escala automática, sem servidor para gerenciar, custo zero até certo limite. Funções para formulário de contato, analytics e webhooks.

#### Alternativas Consideradas

**Express.js + Railway/Render**
- ✅ Pros: Mais controle, melhor para APIs complexas
- ❌ Contras: Custo mensal, manutenção de servidor, overkill para portfólio
- 💡 Quando considerar: Se precisar de APIs mais complexas ou integrações pesadas

**Supabase/Firebase**
- ✅ Pros: Backend completo, banco de dados incluído, autenticação pronta
- ❌ Contras: Vendor lock-in, custo pode crescer, complexidade desnecessária
- 💡 Quando considerar: Se precisar de banco de dados ou autenticação de usuários

### 3.3 Banco de Dados

#### Stack Primária

- **Opção**: Sem banco de dados (dados estáticos)
- **Storage**: JSON files + Git

#### Justificativa

Portfólio não precisa de banco: dados são estáticos e mudam raramente. Usar arquivos JSON versionados no Git é suficiente.

#### Alternativas Consideradas

**Contentful/Sanity CMS**
- ✅ Pros: Interface visual, fácil atualização, API GraphQL
- ❌ Contras: Custo mensal, dependência externa, overkill para portfólio simples
- 💡 Quando considerar: Se cliente precisar atualizar conteúdo frequentemente sem conhecimento técnico

**GitHub API + Markdown**
- ✅ Pros: Gratuito, versionamento nativo, workflow familiar
- ❌ Contras: Requer conhecimento Git, menos flexível
- 💡 Quando considerar: Se quiser integrar projetos do GitHub automaticamente

### 3.4 Hosting

#### Stack Primária

- **Opção**: Vercel

#### Justificativa

Deploy automático do Git, CDN global, SSL gratuito, preview deployments, analytics integrado, serverless functions incluídas. Plano free generoso.

#### Alternativas Consideradas

**Netlify**
- ✅ Pros: Similar ao Vercel, form handling nativo, split testing
- ❌ Contras: Build times mais lentos, menos focado em Next.js
- 💡 Quando considerar: Se precisar de form handling sem código backend

**Cloudflare Pages**
- ✅ Pros: CDN rápido, gratuito ilimitado, workers integrados
- ❌ Contras: Menos features, ecossistema menor
- 💡 Quando considerar: Se performance global for prioridade absoluta

### 3.5 CI/CD

#### Stack Primária

- **Opção**: GitHub Actions
- **Workflow**: Lint → Test → Build → Deploy

#### Justificativa

Integrado ao GitHub, gratuito para repositórios públicos, fácil configuração, grande ecossistema de actions.

#### Alternativas Consideradas

**Vercel/Netlify CI nativo**
- ✅ Pros: Zero configuração, otimizado para frontend
- ❌ Contras: Menos flexível, vendor lock-in
- 💡 Quando considerar: Se quiser simplicidade máxima e não precisar de CI customizado

### 3.6 Monitoramento

#### Stack Primária

- **Opção**: Vercel Analytics + Sentry Free Tier

#### Justificativa

Vercel Analytics para métricas de performance e usuário. Sentry para error tracking e performance monitoring.

#### Alternativas Consideradas

**Google Analytics 4**
- ✅ Pros: Gratuito, familiar, integrações
- ❌ Contras: Privacy concerns, mais pesado, menos focado em performance
- 💡 Quando considerar: Se precisar de analytics detalhado de comportamento do usuário

---

## 4. Estrutura de Pastas e Arquivos Proposta

### 4.1 Estrutura Raiz

```
portfolio-luiscarlos/
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── .vscode/                # Configurações do VS Code
├── public/                 # Arquivos públicos estáticos
├── src/                    # Código fonte
├── e2e/                    # Testes end-to-end (Playwright)
├── docs/                   # Documentação adicional
├── scripts/                # Scripts utilitários
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 4.2 Estrutura Detalhada do `src/`

```
src/
├── components/
│   ├── atoms/              # Componentes básicos (Button, Input, Icon)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   └── Icon/
│   ├── molecules/          # Combinações de átomos (FormField, Card, Modal)
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── Modal/
│   ├── organisms/          # Componentes complexos (ContactForm, ProjectCard)
│   │   ├── ContactForm/
│   │   └── ProjectCard/
│   ├── templates/          # Estruturas de página (PageLayout, SectionLayout)
│   │   ├── PageLayout/
│   │   └── SectionLayout/
│   ├── sections/           # Seções do portfólio (mantém estrutura atual)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── hero/
│   │   ├── portfolio/
│   │   ├── resume/
│   │   ├── skills/
│   │   └── testimonials/
│   ├── common/             # Componentes compartilhados (mantém estrutura atual)
│   │   ├── AnimatedCard.tsx
│   │   ├── ImageWithFallback.tsx
│   │   └── lazy/
│   ├── layout/             # Layout components (Header, Footer, Navigation)
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── feedback/           # Error boundaries, loading states
│       └── ErrorBoundary.tsx
│
├── features/                # Agrupa por domínio (opcional, para projetos maiores)
│   ├── contact/
│   ├── portfolio/
│   └── resume/
│
├── hooks/                   # Hooks personalizados (mantém estrutura atual)
│   ├── useContactForm.ts
│   ├── useGSAPAnimation.ts
│   └── usePreloader.ts
│
├── services/                # API clients, external integrations
│   ├── contact/
│   │   ├── contactService.ts
│   │   ├── contactRepository.ts
│   │   └── contactService.test.ts
│   ├── analytics/
│   │   └── analyticsFacade.ts
│   └── repositories/
│       ├── projectsRepository.ts
│       └── contactRepository.ts
│
├── stores/                  # Zustand stores
│   ├── useThemeStore.ts
│   └── useSectionStore.ts
│
├── utils/                   # Funções utilitárias
│   ├── cn.ts                # className helper
│   ├── logger.ts
│   └── validators.ts
│
├── types/                   # Definições de tipos TypeScript (mantém estrutura atual)
│   ├── aboutTypes.ts
│   ├── contactTypes.ts
│   └── portfolioTypes.ts
│
├── constants/               # Configurações, enums
│   ├── config.ts
│   └── enums.ts
│
├── assets/                  # Images, fonts, icons
│   ├── images/
│   └── fonts/
│
├── styles/                  # Estilos globais (mantém estrutura atual)
│   ├── base/
│   ├── components/
│   └── animations/
│
├── pages/                   # Páginas da aplicação (mantém estrutura atual)
│   ├── Home.tsx
│   ├── About.tsx
│   └── NotFound.tsx
│
├── contexts/                # Contextos React (mantém estrutura atual)
│   ├── AppProviders.tsx
│   └── DarkModeContext.tsx
│
├── data/                    # Dados estáticos (mantém estrutura atual)
│   ├── aboutData.ts
│   ├── projectsData.ts
│   └── contactData.ts
│
├── __tests__/               # Testes unitários (mantém estrutura atual)
│   ├── App.test.tsx
│   ├── hooks/
│   └── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

### 4.3 Exemplos de Organização

**Componente Atômico**:
```
src/components/atoms/Button/
├── Button.tsx
├── Button.test.tsx
├── Button.stories.tsx
└── index.ts
```

**Serviço**:
```
src/services/contact/
├── contactService.ts
├── contactRepository.ts
└── contactService.test.ts
```

**Store**:
```
src/stores/
└── useThemeStore.ts
```

**Teste E2E**:
```
e2e/
├── contact.spec.ts
├── navigation.spec.ts
└── portfolio.spec.ts
```

---

## 5. Padrões de Projeto e Arquitetura

### 5.1 Atomic Design

**Descrição**: Organização de componentes em átomos, moléculas, organismos e templates.

**Mapeamento**:
- **Atoms**: Button, Input, Icon, Badge → componentes básicos reutilizáveis
- **Molecules**: FormField (Input + Label + Error), ProjectCard (Image + Title + Tags) → combinações de átomos
- **Organisms**: ContactForm, PortfolioSection → componentes complexos com lógica
- **Templates**: PageLayout, SectionLayout → estruturas de página

**Código Atual**: `ContactFormField` pode virar molécula, `Button` pode virar átomo

### 5.2 Container/Presenter Pattern

**Descrição**: Separação entre componentes de apresentação (dumb) e containers (smart).

**Mapeamento**:
- **Presenter**: Componentes em `components/` que recebem props e não têm lógica
- **Container**: Hooks customizados (`useContactForm`) que gerenciam estado e lógica

**Código Atual**: `ContactForm` já segue parcialmente: componente recebe dados do hook

### 5.3 Repository Pattern

**Descrição**: Abstração de acesso a dados através de repositórios.

**Mapeamento**:
- **Repository**: `src/services/repositories/projectsRepository.ts`, `contactRepository.ts`
- **Benefit**: Facilita migração futura para API real sem mudar componentes

**Código Atual**: `data/projectsData.ts` pode ser encapsulado em repository

### 5.4 Facade Pattern

**Descrição**: Interface simplificada para subsistemas complexos.

**Mapeamento**:
- **Facade**: `src/services/analytics/analyticsFacade.ts` (abstrai Vercel Analytics + Sentry)
- **Benefit**: Componentes não precisam conhecer detalhes de implementação

**Código Atual**: `Logger` pode ser expandido para facade de monitoramento

### 5.5 Strategy Pattern

**Descrição**: Algoritmos intercambiáveis (validação, formatação, animação).

**Mapeamento**:
- **Validation**: Zod schemas como estratégias de validação
- **Animation**: GSAP vs Framer Motion como estratégias intercambiáveis

**Código Atual**: Validação em `useContactForm` pode usar Zod strategies

### 5.6 Custom Hooks Pattern

**Descrição**: Lógica reutilizável encapsulada em hooks.

**Mapeamento**:
- **Current**: `useContactForm`, `useGSAPAnimation`, `usePreloader`
- **Improvement**: Padronizar retorno de hooks, adicionar error boundaries

---

## 6. Plano de Refatoração Passo a Passo

### Sprint 0: Setup e Configuração Base (3-5 dias)

#### Tarefa S0-T1: Configurar Zustand e React Query
- **Complexidade**: Baixa
- **Descrição**: Instalar dependências e configurar stores básicos
- **Critérios de Aceitação**:
  - Zustand instalado e configurado
  - React Query Provider configurado no AppProviders
  - Store de tema migrado para Zustand
  - Testes passando

#### Tarefa S0-T2: Configurar React Hook Form + Zod
- **Complexidade**: Baixa
- **Descrição**: Substituir validação manual por Zod schemas
- **Critérios de Aceitação**:
  - React Hook Form instalado
  - Zod instalado e configurado
  - Schema de validação criado para ContactForm
  - Formulário funcionando com nova validação

#### Tarefa S0-T3: Setup de testes E2E com Playwright
- **Complexidade**: Média
- **Descrição**: Configurar Playwright e criar primeiros testes
- **Critérios de Aceitação**:
  - Playwright instalado e configurado
  - Pasta `e2e/` criada
  - Teste básico de navegação funcionando
  - CI configurado para rodar E2E

#### Tarefa S0-T4: Configurar GitHub Actions CI/CD
- **Complexidade**: Média
- **Descrição**: Criar workflow de CI/CD básico
- **Critérios de Aceitação**:
  - `.github/workflows/ci.yml` criado
  - Pipeline: lint → test → build
  - Deploy automático em push para main
  - Preview deployments em PRs

### Sprint 1: Refatoração de Componentes e Estado (5-7 dias)

#### Tarefa S1-T1: Migrar para Atomic Design
- **Complexidade**: Alta
- **Descrição**: Reorganizar componentes seguindo Atomic Design
- **Critérios de Aceitação**:
  - Pasta `atoms/` criada com Button, Input, Icon
  - Pasta `molecules/` criada com FormField, Card
  - Componentes existentes refatorados
  - Imports atualizados em toda aplicação
  - Testes atualizados e passando

#### Tarefa S1-T2: Migrar estado global para Zustand
- **Complexidade**: Média
- **Descrição**: Substituir Context API por Zustand onde apropriado
- **Critérios de Aceitação**:
  - Store de tema migrado
  - Store de seções migrado
  - Performance melhorada (menos re-renders)
  - Testes atualizados

#### Tarefa S1-T3: Refatorar ContactForm com React Hook Form
- **Complexidade**: Média
- **Descrição**: Migrar formulário para React Hook Form + Zod
- **Critérios de Aceitação**:
  - Formulário usando React Hook Form
  - Validação com Zod schemas
  - Performance melhorada
  - Testes unitários e E2E passando

#### Tarefa S1-T4: Implementar Repository Pattern para dados
- **Complexidade**: Baixa
- **Descrição**: Criar repositories para abstrair acesso a dados
- **Critérios de Aceitação**:
  - `projectsRepository` criado
  - `contactRepository` criado
  - Componentes usando repositories
  - Facilita migração futura para API

### Sprint 2: Performance e Otimizações (4-6 dias)

#### Tarefa S2-T1: Otimizar imagens (WebP, lazy loading avançado)
- **Complexidade**: Média
- **Descrição**: Converter imagens para WebP e implementar lazy loading inteligente
- **Critérios de Aceitação**:
  - Todas imagens convertidas para WebP
  - Fallback para navegadores antigos
  - Lazy loading com Intersection Observer
  - Redução de 40%+ no tamanho de imagens

#### Tarefa S2-T2: Implementar code splitting avançado
- **Complexidade**: Média
- **Descrição**: Otimizar bundle splitting e preload de rotas críticas
- **Critérios de Aceitação**:
  - Bundle analisado e otimizado
  - Chunks menores que 200KB
  - Preload de rotas críticas
  - Lighthouse Performance score > 90

#### Tarefa S2-T3: Implementar PWA
- **Complexidade**: Média
- **Descrição**: Adicionar service worker e manifest.json
- **Critérios de Aceitação**:
  - `manifest.json` configurado
  - Service worker funcionando
  - Offline support básico
  - Installable como app
  - Lighthouse PWA score > 90

#### Tarefa S2-T4: Otimizar animações GSAP
- **Complexidade**: Baixa
- **Descrição**: Reduzir uso de animações pesadas e usar will-change
- **Critérios de Aceitação**:
  - Animações usando GPU
  - `will-change` aplicado onde necessário
  - Performance de animações melhorada
  - Sem jank em dispositivos móveis

### Sprint 3: Acessibilidade e SEO (4-5 dias)

#### Tarefa S3-T1: Melhorar acessibilidade (WCAG 2.1 AA)
- **Complexidade**: Alta
- **Descrição**: Adicionar ARIA labels, navegação por teclado, contraste
- **Critérios de Aceitação**:
  - Todos componentes com ARIA labels
  - Navegação completa por teclado
  - Contraste mínimo 4.5:1
  - Screen reader testado
  - Lighthouse Accessibility score > 95

#### Tarefa S3-T2: Implementar SEO completo
- **Complexidade**: Média
- **Descrição**: Meta tags dinâmicas, sitemap, structured data
- **Critérios de Aceitação**:
  - `react-helmet-async` instalado
  - Meta tags dinâmicas por página
  - `sitemap.xml` gerado
  - `robots.txt` configurado
  - Structured data (JSON-LD) implementado
  - Lighthouse SEO score > 95

#### Tarefa S3-T3: Adicionar analytics e error tracking
- **Complexidade**: Baixa
- **Descrição**: Configurar Vercel Analytics e Sentry
- **Critérios de Aceitação**:
  - Vercel Analytics configurado
  - Sentry configurado
  - Error boundaries melhorados
  - Métricas sendo coletadas

### Sprint 4: Backend e Integrações (3-5 dias)

#### Tarefa S4-T1: Implementar API serverless para formulário
- **Complexidade**: Média
- **Descrição**: Criar função serverless para envio de email
- **Critérios de Aceitação**:
  - API route criada (Vercel/Netlify)
  - Integração com serviço de email (Resend/SendGrid)
  - Validação no backend
  - Rate limiting implementado
  - Testes E2E do fluxo completo

#### Tarefa S4-T2: Configurar monitoramento e alertas
- **Complexidade**: Baixa
- **Descrição**: Configurar Sentry alerts e Vercel Analytics
- **Critérios de Aceitação**:
  - Alertas configurados para erros críticos
  - Dashboard de métricas acessível
  - Uptime monitoring configurado

### Sprint 5: Testes e Qualidade (5-7 dias)

#### Tarefa S5-T1: Aumentar cobertura de testes unitários
- **Complexidade**: Alta
- **Descrição**: Atingir 80%+ de cobertura
- **Critérios de Aceitação**:
  - Cobertura > 80%
  - Todos componentes críticos testados
  - Hooks testados
  - Services testados
  - CI bloqueando se cobertura < 80%

#### Tarefa S5-T2: Criar suite completa de testes E2E
- **Complexidade**: Alta
- **Descrição**: Testes E2E para fluxos críticos
- **Critérios de Aceitação**:
  - Teste de navegação entre seções
  - Teste de formulário de contato
  - Teste de filtros de portfólio
  - Teste de tema escuro/claro
  - Teste de responsividade
  - CI rodando E2E em PRs

#### Tarefa S5-T3: Configurar lint-staged e husky
- **Complexidade**: Baixa
- **Descrição**: Pre-commit hooks para qualidade
- **Critérios de Aceitação**:
  - husky instalado
  - lint-staged configurado
  - Pre-commit: lint + format + test
  - Commits bloqueados se testes falharem

### 6.1 Estratégia de Migração

**Abordagem**: Incremental com feature flags

**Passos**:
1. Criar branch `feature/modernization`
2. Implementar mudanças em pequenos PRs
3. Usar feature flags para testar em produção
4. Deploy gradual: 10% → 50% → 100% de tráfego
5. Rollback rápido se necessário
6. Monitorar métricas durante migração

**Downtime**: Zero - deploy incremental com Vercel previews

---

## 7. Exemplos de Código

### 7.1 Componente Atômico com Testes

```typescript
// src/components/atoms/Button/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
            'bg-secondary text-white hover:bg-secondary-dark': variant === 'secondary',
            'bg-transparent hover:bg-card-bg': variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin" aria-hidden="true">⏳</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

```typescript
// src/components/atoms/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
  });
});
```

### 7.2 Serviço com Repository Pattern

```typescript
// src/services/contact/contactService.ts
import { z } from 'zod';
import { contactRepository } from './contactRepository';
import logger from '@/utils/logger';

const ContactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(20, 'Mensagem deve ter pelo menos 20 caracteres'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export class ContactService {
  static async submitForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Validar dados
      const validatedData = ContactFormSchema.parse(data);
      
      // Enviar para API
      const result = await contactRepository.submit(validatedData);
      
      logger.info('Contact form submitted successfully', { email: validatedData.email });
      
      return {
        success: true,
        message: 'Mensagem enviada com sucesso! Responderei em breve.',
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Contact form validation failed', { errors: error.errors });
        return {
          success: false,
          message: error.errors[0].message,
        };
      }
      
      logger.error('Contact form submission failed', { error });
      return {
        success: false,
        message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      };
    }
  }
}
```

```typescript
// src/services/contact/contactRepository.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const contactRepository = {
  async submit(data: ContactFormData) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};
```

### 7.3 Teste Unitário de Serviço

```typescript
// src/services/contact/contactService.test.ts
import { describe, it, expect, vi } from 'vitest';
import { ContactService } from './contactService';
import { contactRepository } from './contactRepository';

vi.mock('./contactRepository');

describe('ContactService', () => {
  it('should submit form with valid data', async () => {
    const mockData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters.',
    };
    
    vi.mocked(contactRepository.submit).mockResolvedValue({ success: true });
    
    const result = await ContactService.submitForm(mockData);
    
    expect(result.success).toBe(true);
    expect(contactRepository.submit).toHaveBeenCalledWith(mockData);
  });

  it('should reject invalid email', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test',
      message: 'This is a test message.',
    };
    
    const result = await ContactService.submitForm(invalidData);
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Email inválido');
  });

  it('should handle API errors gracefully', async () => {
    vi.mocked(contactRepository.submit).mockRejectedValue(new Error('API Error'));
    
    const result = await ContactService.submitForm({
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Valid message with enough characters.',
    });
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Erro ao enviar');
  });
});
```

### 7.4 Teste E2E com Playwright

```typescript
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#contact"]');
    await page.waitForSelector('[data-testid="contact-form"]');
  });

  test('should submit form successfully', async ({ page }) => {
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john@example.com');
    await page.fill('[name="subject"]', 'Test Subject');
    await page.fill('[name="message"]', 'This is a test message with enough characters to pass validation.');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 5000 });
    expect(await page.locator('[name="name"]').inputValue()).toBe('');
  });

  test('should show validation errors', async ({ page }) => {
    await page.fill('[name="email"]', 'invalid-email');
    await page.blur('[name="email"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    expect(await page.locator('[data-testid="email-error"]').textContent()).toContain('Email inválido');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator('[name="name"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[name="email"]')).toBeFocused();
  });
});
```

---

## 8. Checklist de Qualidade

### 8.1 Linting e Formatação

- **ESLint 8.57.0+**: TypeScript ESLint recommended + React hooks
- **Regras**: Max warnings: 0 em CI
- **Auto-fix**: Pre-commit hook
- **Prettier 3.6.0+**: Configuração padronizada, format on save no VS Code

### 8.2 Type Safety

- **TypeScript 5.2.0+**: Strict mode ativado
- **No `any`**: Permitido apenas com `@ts-expect-error` e comentário
- **Type check**: `tsc --noEmit` em CI

### 8.3 Testes

- **Unitários**: Vitest 1.0.0+
- **E2E**: Playwright 1.40.0+
- **Cobertura mínima**: 80%
- **Caminhos críticos testados**:
  - Formulário de contato
  - Navegação entre seções
  - Filtros de portfólio
  - Tema escuro/claro

### 8.4 Performance

- **Lighthouse Score**: > 90 em todas métricas
- **Bundle Size**: < 200KB inicial (gzipped)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### 8.5 Acessibilidade

- **WCAG Level**: AA (2.1)
- **Lighthouse Score**: > 95
- **Navegação por teclado**: 100% funcional
- **Screen Reader**: Testado com NVDA/JAWS
- **Contraste de cores**: Mínimo 4.5:1
- **ARIA Labels**: Todos componentes interativos

### 8.6 SEO

- **Lighthouse Score**: > 95
- **Meta Tags**: Dinâmicas por página
- **Sitemap**: `sitemap.xml` gerado
- **Robots.txt**: Configurado
- **Structured Data**: JSON-LD implementado
- **Open Graph**: Tags para redes sociais
- **Canonical URLs**: Configuradas

### 8.7 PWA

- **Manifest**: `manifest.json` completo
- **Service Worker**: Implementado
- **Offline Support**: Básico funcionando
- **Installable**: Score > 90
- **Icons**: Todos tamanhos (192x192, 512x512)

### 8.8 Segurança

- **Dependencies**: Audit regular (`npm audit`)
- **Env Vars**: Nunca commitadas
- **CSP**: Content Security Policy configurado
- **HTTPS**: Obrigatório em produção

---

## 9. CI/CD e Hosting

### 9.1 Pipeline CI/CD

**Ferramenta**: GitHub Actions

**Workflow**: `.github/workflows/ci.yml`

**Estágios**:

1. **Lint** (`npm run lint`)
   - Bloquear merge se falhar

2. **Format Check** (`npm run format:check`)
   - Warning apenas

3. **Type Check** (`tsc --noEmit`)
   - Bloquear merge se falhar

4. **Unit Tests** (`npm run test:coverage`)
   - Bloquear merge se falhar
   - Threshold: 80% cobertura

5. **E2E Tests** (`npm run test:e2e`)
   - Bloquear merge se falhar
   - Rodar apenas em Pull Requests

6. **Build** (`npm run build`)
   - Bloquear merge se falhar

7. **Deploy Preview**
   - Vercel CLI deploy
   - Em Pull Requests
   - Cria Preview URL

8. **Deploy Production**
   - Vercel CLI deploy --prod
   - Em Push para main
   - Requer aprovação manual ou auto após testes

### 9.2 Scripts Recomendados

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:coverage": "vitest --coverage",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

### 9.3 Hosting Recomendado

**Vercel** (Recomendado)
- Deploy automático do Git
- CDN global
- SSL gratuito
- Preview deployments
- Analytics integrado
- Serverless functions incluídas
- Plano free generoso

---

## 10. Riscos, Trade-offs e Pontos de Atenção

### 10.1 Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Quebra de funcionalidades durante migração | Média | Alto | Testes E2E completos, feature flags, deploy gradual, rollback plan |
| Aumento de complexidade com novas libs | Baixa | Médio | Escolher libs simples (Zustand vs Redux), documentação clara, code reviews |
| Performance piorar com novas abstrações | Baixa | Médio | Benchmarks antes/depois, profiling contínuo, otimizações incrementais |
| Dependências desatualizadas ou vulneráveis | Média | Médio | Dependabot configurado, atualizações regulares, audit em CI |
| Falta de conhecimento da equipe | Média | Alto | Documentação detalhada, pair programming, treinamentos, escolher techs com curva suave |
| Custo de hosting aumentar | Baixa | Baixo | Usar tier free (Vercel/Netlify), monitorar uso, otimizar recursos |

### 10.2 Trade-offs Principais

#### Zustand vs Redux vs Context API
- **Escolhido**: Zustand
- **Pros**: Mais simples, menos boilerplate, melhor performance, TypeScript first
- **Contras**: Menos features avançadas, ecossistema menor
- **Racional**: Portfólio não precisa de Redux. Zustand é suficiente e mais simples.

#### React Hook Form vs Formik
- **Escolhido**: React Hook Form
- **Pros**: Melhor performance, menos re-renders, API mais simples
- **Contras**: Menos features out-of-box
- **Racional**: Performance é crítica. React Hook Form é mais leve.

#### Playwright vs Cypress
- **Escolhido**: Playwright
- **Pros**: Mais rápido, suporta múltiplos browsers, melhor para CI
- **Contras**: Menos popular, curva de aprendizado
- **Racional**: Playwright é mais moderno e performático para CI/CD.

#### Vercel vs Netlify
- **Escolhido**: Vercel
- **Pros**: Melhor para React, deploy mais rápido, analytics integrado
- **Contras**: Vendor lock-in
- **Racional**: Vercel é otimizado para React e oferece melhor DX.

### 10.3 Pontos de Atenção

1. **Composição de Time/Skill**: Garantir que a equipe tenha conhecimento básico das tecnologias escolhidas antes de iniciar
2. **Migração Incremental**: Não tentar migrar tudo de uma vez - fazer em pequenos PRs
3. **Testes Contínuos**: Rodar testes em cada etapa da migração
4. **Monitoramento**: Acompanhar métricas de performance e erros durante toda migração
5. **Documentação**: Manter documentação atualizada com cada mudança

---

## 11. Comandos Práticos e Templates

### 11.1 Scripts NPM/CLI Recomendados

```bash
# Desenvolvimento
npm run dev                    # Iniciar servidor de desenvolvimento
npm run build                  # Build de produção
npm run preview                # Preview do build

# Qualidade de Código
npm run lint                   # Rodar ESLint
npm run lint:fix               # Corrigir problemas do ESLint
npm run format                 # Formatar código com Prettier
npm run format:check           # Verificar formatação
npm run type-check             # Verificar tipos TypeScript

# Testes
npm run test                   # Rodar testes unitários
npm run test:coverage          # Testes com cobertura
npm run test:e2e               # Rodar testes E2E
npm run test:e2e:ui            # Rodar testes E2E com UI

# Git Hooks
npm run prepare                # Instalar husky hooks
```

### 11.2 Template de Commit Message

**Formato**: Conventional Commits

```
type(scope): description

[corpo opcional]

[footer opcional]
```

**Exemplos**:
```
feat(contact): add form validation with Zod
fix(portfolio): correct image lazy loading
refactor(components): migrate to atomic design
perf(images): convert to WebP format
test(contact): add E2E tests for form submission
docs(readme): update installation instructions
chore(deps): update dependencies
```

**Tipos**:
- `feat`: Nova feature
- `fix`: Correção de bug
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Adição/atualização de testes
- `docs`: Documentação
- `chore`: Tarefas de manutenção
- `style`: Formatação (não afeta código)
- `ci`: Mudanças em CI/CD

### 11.3 Template de Pull Request

```markdown
## Descrição

[Descrição clara do que foi implementado]

## Tipo de Mudança

- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] ♻️ Refatoração
- [ ] 📝 Documentação
- [ ] ⚡ Performance
- [ ] ♿ Acessibilidade

## Checklist

- [ ] Código segue padrões do projeto
- [ ] Testes unitários adicionados/atualizados
- [ ] Testes E2E adicionados/atualizados (se aplicável)
- [ ] Documentação atualizada
- [ ] Lint passando
- [ ] Type check passando
- [ ] Build passando
- [ ] Screenshots (se UI mudou)

## Testes

[Como testar as mudanças]

## Screenshots (se aplicável)

[Adicionar screenshots]

## Relacionado

[Issues relacionadas: #123]
```

### 11.4 Template de Issue

```markdown
## Descrição

[Descrição detalhada]

## Critérios de Aceitação

- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Estimativa

[Baixa/Média/Alta]

## Labels

[feature, enhancement, bug, etc.]
```

---

## 12. Suposições e Premissas

1. **Projeto é SPA**: Single Page Application e não precisa de SSR inicialmente
2. **Formulário de contato**: Será integrado com serviço de email (Resend/SendGrid) via API serverless
3. **Dados estáticos**: Dados do portfólio continuarão sendo estáticos (JSON files) por enquanto
4. **Conhecimento da equipe**: Equipe tem conhecimento básico de React e TypeScript
5. **Orçamento**: Permite uso de serviços gratuitos (Vercel free tier, Sentry free tier)
6. **Autenticação**: Não há necessidade de autenticação de usuários no momento
7. **Atualização de conteúdo**: Portfólio será atualizado esporadicamente (não precisa de CMS imediatamente)
8. **Suporte a navegadores**: Suporte a navegadores modernos (últimas 2 versões de Chrome, Firefox, Safari, Edge)

---

## 13. Artefatos de Entrega

### 13.1 Pull Requests (Caminho de Revisão)

1. **PR #1**: Setup base (Sprint 0)
2. **PR #2**: Atomic Design migration (Sprint 1)
3. **PR #3**: State management migration (Sprint 1)
4. **PR #4**: Performance optimizations (Sprint 2)
5. **PR #5**: Accessibility improvements (Sprint 3)
6. **PR #6**: SEO implementation (Sprint 3)
7. **PR #7**: Backend integration (Sprint 4)
8. **PR #8**: Test coverage increase (Sprint 5)

### 13.2 Documentação a Ser Criada

- `README.md` atualizado
- `ARCHITECTURE.md` (documentação de arquitetura)
- `CONTRIBUTING.md` (guia de contribuição)
- `DEPLOYMENT.md` (guia de deploy)
- `TESTING.md` (guia de testes)

### 13.3 Templates de Issue

Template básico para issues de feature/enhancement (ver seção 11.4)

---

## 14. Requisitos de Versão

### 14.1 Versões Mínimas Recomendadas

- **Node**: >=18.0.0 (recomendado: 20.x LTS)
- **npm**: >=9.0.0
- **React**: ^19.1.0
- **TypeScript**: ^5.2.0
- **Vite**: ^5.4.0
- **Zustand**: ^4.5.0
- **React Query**: ^5.0.0
- **React Hook Form**: ^7.51.0
- **Zod**: ^3.23.0
- **Playwright**: ^1.40.0
- **Vitest**: ^1.0.0

---

## 15. Mini-Plano de Testes

### 15.1 Frameworks Sugeridos

- **Unitários**: Vitest 1.0.0+
- **E2E**: Playwright 1.40.0+

### 15.2 Casos de Teste Críticos

#### Caso 1: Formulário de Contato
- **Descrição**: Validar envio completo do formulário de contato
- **Cenários**:
  - Envio com dados válidos deve retornar sucesso
  - Validação de email inválido deve mostrar erro
  - Validação de campos obrigatórios deve funcionar
  - Rate limiting deve prevenir spam

#### Caso 2: Navegação entre Seções
- **Descrição**: Validar navegação suave entre seções do portfólio
- **Cenários**:
  - Click em link de navegação deve scrollar para seção correta
  - Navegação por teclado deve funcionar
  - URLs devem atualizar corretamente
  - Scroll deve ser suave e animado

#### Caso 3: Filtros de Portfólio
- **Descrição**: Validar sistema de filtros de projetos
- **Cenários**:
  - Filtro por categoria deve mostrar apenas projetos da categoria
  - Múltiplos filtros devem funcionar em conjunto
  - Reset de filtros deve mostrar todos projetos
  - Contador de projetos deve atualizar corretamente

---

## Conclusão

Este plano de modernização fornece uma estratégia clara e incremental para elevar a qualidade técnica do portfólio mantendo a identidade visual e funcionalidades existentes. A abordagem focada em sprints pequenos e bem definidos permite implementação gradual sem risco de quebra de funcionalidades.

A stack tecnológica recomendada prioriza simplicidade, performance e manutenibilidade, escolhendo ferramentas modernas mas estáveis que oferecem melhor developer experience sem adicionar complexidade desnecessária.

A estratégia de migração incremental com feature flags e deploy gradual garante zero downtime e permite rollback rápido se necessário. O foco em testes (unitários e E2E) e qualidade de código garante que cada mudança seja segura e bem testada antes de chegar em produção.

---

**Versão**: 1.0  
**Data**: 2024  
**Autor**: Plano de Modernização - Portfólio Luis Carlos

