# Portfolio01 - Modernização Completa

Repositório para a modernização completa do portfólio pessoal de Luis Carlos.

## 📋 Sobre o Projeto

Este repositório contém o plano completo de modernização do portfólio, incluindo:

- Análise detalhada do código atual
- Stack tecnológica recomendada
- Estrutura de pastas proposta
- Padrões arquiteturais
- Plano de refatoração em sprints
- Exemplos de código
- Checklist de qualidade
- Configuração de CI/CD

## 📚 Documentação

### Design System
- **[DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** - Sistema de design completo (estilo MagicUI/Shadcn)
- **[TOKENS.md](./docs/TOKENS.md)** - Referência completa de tokens HSL
- **[COMPONENTS.md](./docs/COMPONENTS.md)** - Guia de componentes base
- **[MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md)** - Guia de migração para novos tokens

### Planejamento
- **[PLANO_MODERNIZACAO.md](./PLANO_MODERNIZACAO.md)** - Documento completo em Markdown (RFC)
- **[PLANO_MODERNIZACAO.json](./PLANO_MODERNIZACAO.json)** - Dados estruturados em JSON

## 🚀 Próximos Passos

1. Revisar o plano de modernização
2. Configurar ambiente de desenvolvimento
3. Iniciar Sprint 0: Setup e Configuração Base
4. Seguir o plano de refatoração incremental

## 📦 Stack Tecnológica

- **Frontend**: React 19.1.0 + TypeScript + Vite
- **Styling**: Tailwind CSS 3.4.0 + Design System HSL
- **State Management**: Zustand 4.5.0 + React Query 5.0.0
- **Forms**: React Hook Form 7.51.0 + Zod 3.23.0
- **Testing**: Vitest 1.0.0 + Playwright 1.40.0
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions

## 🎨 Design System

O projeto utiliza um **Design System profissional** baseado em tokens HSL, seguindo padrões modernos (MagicUI, Shadcn/UI):

- ✅ **Sistema de tokens HSL completo** - Cores, tipografia, espaçamento, sombras
- ✅ **Dark mode nativo** - Suporte automático via tokens
- ✅ **Acessibilidade WCAG 2.1 AA/AAA** - Contraste adequado e navegação por teclado
- ✅ **100% dos componentes migrados** - Todos os componentes usam os novos tokens
- ✅ **Documentação completa** - Guias e referências detalhadas

Consulte a [documentação do Design System](./docs/DESIGN_SYSTEM.md) para mais detalhes.

## 📝 Estrutura do Projeto

```
portfolio01/
├── .github/workflows/     # GitHub Actions
├── docs/                   # Documentação do Design System
│   ├── DESIGN_SYSTEM.md    # Sistema de design completo
│   ├── TOKENS.md           # Referência de tokens
│   ├── COMPONENTS.md       # Guia de componentes
│   └── MIGRATION_GUIDE.md  # Guia de migração
├── src/
│   ├── styles/
│   │   ├── tokens.css      # Tokens HSL do design system
│   │   └── index.css       # Estilos globais
│   └── components/         # Componentes React (100% migrados)
├── PLANO_MODERNIZACAO.md   # Plano completo em Markdown
└── PLANO_MODERNIZACAO.json # Dados estruturados
```

## 🔗 Links

- [Repositório GitHub](https://github.com/LuisCarlos01/portfolio01)
- [Plano de Modernização](./PLANO_MODERNIZACAO.md)

## 📄 Licença

Este projeto está sob a licença MIT.

