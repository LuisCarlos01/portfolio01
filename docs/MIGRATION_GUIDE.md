# Guia de Migração para Novos Tokens

> Guia para migrar componentes do sistema antigo para o novo sistema de tokens HSL.

## 📋 Visão Geral

Este guia ajuda a migrar componentes que ainda usam classes antigas para o novo sistema de tokens baseado em HSL.

## 🔄 Mapeamento de Classes

### Cores de Background

| Antigo | Novo | Uso |
|--------|------|-----|
| `bg-bg-light` | `bg-background` | Fundo principal |
| `bg-bg-dark` | `bg-background` | Fundo principal (dark mode automático) |
| `bg-card-bg` | `bg-card` | Fundo de cards |
| `dark:bg-card-bg` | `bg-card` | Fundo de cards (dark mode automático) |

### Cores de Texto

| Antigo | Novo | Uso |
|--------|------|-----|
| `text-text-dark dark:text-text-light` | `text-foreground` | Texto principal |
| `text-text-light` | `text-foreground` | Texto principal |
| `text-gray-700 dark:text-gray-300` | `text-foreground-secondary` | Texto secundário |
| `text-gray-600 dark:text-gray-400` | `text-foreground-secondary` | Texto secundário |
| `text-gray-400 dark:text-gray-500` | `text-foreground-muted` | Texto terciário |
| `text-gray-300 dark:text-gray-400` | `text-foreground-muted` | Texto terciário |

### Cores de Borda

| Antigo | Novo | Uso |
|--------|------|-----|
| `border-border-color` | `border-border` | Bordas padrão |
| `border-border-color dark:border-border-color` | `border-border` | Bordas (dark mode automático) |

### Tipografia

| Antigo | Novo | Uso |
|--------|------|-----|
| `text-4xl md:text-5xl lg:text-6xl` | `text-display-lg md:text-display-xl lg:text-display-2xl` | Títulos hero |
| `text-4xl` | `text-heading-3xl` | Títulos grandes |
| `text-3xl` | `text-heading-2xl` | Títulos médios |
| `text-2xl` | `text-heading-xl` | Títulos pequenos |
| `text-xl` | `text-heading-lg` | Subtítulos |
| `text-lg` | `text-body-lg` | Texto grande |
| `text-base` | `text-body-base` | Texto padrão |
| `text-sm` | `text-body-sm` ou `text-label-base` | Texto pequeno |

### Transições

| Antigo | Novo | Uso |
|--------|------|-----|
| `duration-300` | `duration-base ease-in-out` | Transições padrão |
| `transition-colors duration-300` | `transition-colors duration-base ease-in-out` | Transições de cor |
| `transition-all duration-300` | `transition-all duration-base ease-in-out` | Transições gerais |

### Z-Index

| Antigo | Novo | Uso |
|--------|------|-----|
| `z-50` | `z-modal` | Modais |
| `z-[9999]` | `z-modal` ou valor customizado | Elementos sobrepostos |

## 📝 Exemplos de Migração

### Exemplo 1: Card Component

**Antes:**
```tsx
<div className="bg-card-bg dark:bg-card-bg rounded-lg p-6 shadow-lg border border-border-color">
  <h3 className="text-xl font-semibold text-text-dark dark:text-text-light">
    Título
  </h3>
  <p className="text-base text-gray-700 dark:text-gray-300">
    Conteúdo
  </p>
</div>
```

**Depois:**
```tsx
<div className="bg-card text-card-foreground rounded-lg p-6 shadow-md border border-border">
  <h3 className="text-heading-xl font-semibold text-card-foreground">
    Título
  </h3>
  <p className="text-body-base text-foreground-secondary">
    Conteúdo
  </p>
</div>
```

### Exemplo 2: Button Component

**Antes:**
```tsx
<button className="bg-primary text-white hover:bg-primary-dark transition-colors duration-300">
  Clique aqui
</button>
```

**Depois:**
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-base ease-in-out">
  Clique aqui
</button>
```

### Exemplo 3: Input Component

**Antigo:**
```tsx
<input className="bg-bg-light dark:bg-card-bg text-text-dark dark:text-text-light border-border-color focus:ring-primary" />
```

**Depois:**
```tsx
<input className="bg-background text-foreground border-input focus:ring-ring" />
```

## ✅ Checklist de Migração

Ao migrar um componente, verifique:

- [ ] Substituir `bg-bg-light/dark` por `bg-background`
- [ ] Substituir `bg-card-bg` por `bg-card`
- [ ] Substituir `text-text-dark/light` por `text-foreground`
- [ ] Substituir `text-gray-*` por `text-foreground-*`
- [ ] Substituir `border-border-color` por `border-border`
- [ ] Atualizar classes de tipografia para usar tokens
- [ ] Atualizar transições para usar `duration-base ease-in-out`
- [ ] Remover classes `dark:*` desnecessárias (dark mode automático)
- [ ] Testar em modo claro e escuro
- [ ] Verificar contraste (WCAG AA mínimo)

## 🎯 Componentes Migrados

### ✅ Componentes Base
- [x] Button
- [x] Card
- [x] Input
- [x] Textarea

### ✅ Componentes Comuns
- [x] SectionTitle
- [x] Preloader

### ✅ Componentes Moleculares
- [x] FormField
- [x] Modal

### ✅ Seção Hero
- [x] HeroTitle
- [x] HeroSubtitle
- [x] HeroContent
- [x] SocialLinks

### ✅ Seção About
- [x] AboutHeader
- [x] AboutContent
- [x] AboutStats
- [x] ServiceCard
- [x] ServiceModal
- [x] ServicesList
- [x] index.tsx

### ✅ Seção Skills
- [x] SkillCard
- [x] SkillDetailModal
- [x] CategoryFilter
- [x] index.tsx

### ✅ Seção Portfolio
- [x] ProjectCard
- [x] ProjectModal
- [x] ProjectsList
- [x] CategoryFilter
- [x] index.tsx

### ✅ Páginas e Contextos
- [x] Home.tsx
- [x] NotFound.tsx
- [x] AppProviders.tsx

### ✅ Componentes Opcionais
- [x] ImageWithFallback (migrado para usar tokens)

### ℹ️ Componentes com Durações Específicas (OK manter)
- [ ] HeroImage (usa duration-500/700 para animações específicas - OK manter)
- [ ] AboutImage (usa duration-500/700 para animações específicas - OK manter)

## ✅ Status Final da Migração

**100% dos componentes migrados!**

Todos os componentes do projeto agora usam o novo design system de tokens. Os componentes HeroImage e AboutImage mantêm durações específicas (duration-500/700) para animações de imagem, o que é apropriado e não precisa ser alterado.

## 🔍 Como Encontrar Componentes para Migrar

Use o comando grep para encontrar componentes que ainda usam classes antigas:

```bash
# Encontrar componentes com classes antigas
grep -r "bg-card-bg\|text-text-dark\|text-text-light\|border-border-color" src/components

# Encontrar componentes com classes gray
grep -r "text-gray-\|bg-gray-" src/components
```

## 📚 Referências

- [Design System](./DESIGN_SYSTEM.md) - Documentação completa
- [Tokens Reference](./TOKENS.md) - Referência de tokens
- [Components Guide](./COMPONENTS.md) - Guia de componentes

## 💡 Dicas

1. **Migre gradualmente**: Não precisa migrar tudo de uma vez
2. **Teste sempre**: Verifique em modo claro e escuro após cada migração
3. **Mantenha compatibilidade**: O sistema antigo ainda funciona, então não há pressa
4. **Use os tokens**: Prefira sempre usar tokens ao invés de valores hardcoded
5. **Documente mudanças**: Se criar novos padrões, documente no design system

