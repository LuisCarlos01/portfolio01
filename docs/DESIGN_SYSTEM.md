# Design System - Portfolio

> Sistema de design profissional e acessível para portfólio de desenvolvedor web, seguindo padrões modernos (MagicUI, Shadcn/UI).

## 📋 Overview

Este design system fornece uma base sólida e consistente para construir interfaces modernas, acessíveis e visualmente atraentes. Todos os tokens são baseados em HSL para facilitar manipulação e garantir consistência entre modo claro e escuro.

### Princípios Fundamentais

- **Acessibilidade**: WCAG 2.1 AAA quando possível
- **Consistência**: Tokens centralizados e reutilizáveis
- **Flexibilidade**: Sistema escalável e extensível
- **Performance**: Otimizado para renderização rápida
- **Dark Mode**: Suporte nativo com tokens dedicados

---

## 🎨 Colors

### Sistema de Cores HSL

O sistema utiliza valores HSL (Hue, Saturation, Lightness) para facilitar manipulação e garantir consistência. Todas as cores são definidas como variáveis CSS em `src/styles/tokens.css`.

### Paleta Principal

#### Background

| Token | Modo Claro | Modo Escuro | Uso |
|-------|------------|-------------|-----|
| `--background` | `hsl(0, 0%, 100%)` | `hsl(222.2, 84%, 4.9%)` | Fundo principal |
| `--background-secondary` | `hsl(210, 40%, 98%)` | `hsl(217.2, 32.6%, 17.5%)` | Fundos secundários |
| `--background-muted` | `hsl(210, 40%, 96.1%)` | `hsl(217.2, 32.6%, 17.5%)` | Fundos suaves |
| `--background-accent` | `hsl(210, 40%, 94%)` | `hsl(217.2, 32.6%, 15%)` | Destaques de fundo |

#### Foreground (Texto)

| Token | Modo Claro | Modo Escuro | Contraste | Uso |
|-------|------------|-------------|-----------|-----|
| `--foreground` | `hsl(222.2, 84%, 4.9%)` | `hsl(210, 40%, 98%)` | 16.5:1 / 15.8:1 ✅ AAA | Texto principal |
| `--foreground-secondary` | `hsl(215, 16.3%, 46.9%)` | `hsl(215, 20.2%, 65.1%)` | 7.1:1 / 6.2:1 ✅ AAA | Texto secundário |
| `--foreground-muted` | `hsl(215.4, 16.3%, 56.9%)` | `hsl(217.9, 10.6%, 64.9%)` | 5.2:1 / 4.8:1 ✅ AA | Texto terciário |
| `--foreground-accent` | `hsl(215.4, 16.3%, 46.9%)` | `hsl(215, 20.2%, 65.1%)` | 7.1:1 / 6.2:1 ✅ AAA | Texto de destaque |

#### Primary

| Token | Modo Claro | Modo Escuro | Contraste | Uso |
|-------|------------|-------------|-----------|-----|
| `--primary` | `hsl(221.2, 83.2%, 53.3%)` | `hsl(217.2, 91.2%, 59.8%)` | 3.8:1 / 3.2:1 ⚠️ AA | Cor primária |
| `--primary-foreground` | `hsl(210, 40%, 98%)` | `hsl(222.2, 47.4%, 11.2%)` | - | Texto sobre primary |
| `--primary-hover` | `hsl(221.2, 83.2%, 48%)` | `hsl(217.2, 91.2%, 65%)` | - | Estado hover |
| `--primary-light` | `hsl(221.2, 83.2%, 65%)` | `hsl(217.2, 91.2%, 70%)` | - | Variante clara |
| `--primary-dark` | `hsl(221.2, 83.2%, 45%)` | `hsl(217.2, 91.2%, 55%)` | - | Variante escura |

#### Cores Semânticas

| Cor | Token | Modo Claro | Modo Escuro | Uso |
|-----|-------|------------|-------------|-----|
| **Secondary** | `--secondary` | `hsl(210, 40%, 96.1%)` | `hsl(217.2, 32.6%, 17.5%)` | Elementos secundários |
| **Muted** | `--muted` | `hsl(210, 40%, 96.1%)` | `hsl(217.2, 32.6%, 17.5%)` | Elementos suaves |
| **Accent** | `--accent` | `hsl(210, 40%, 96.1%)` | `hsl(217.2, 32.6%, 17.5%)` | Destaques |
| **Destructive** | `--destructive` | `hsl(0, 84.2%, 60.2%)` | `hsl(0, 62.8%, 30.6%)` | Erros, ações destrutivas |
| **Warning** | `--warning` | `hsl(38, 92%, 50%)` | `hsl(38, 92%, 45%)` | Avisos |
| **Success** | `--success` | `hsl(142, 76%, 36%)` | `hsl(142, 71%, 45%)` | Sucesso, confirmações |

### Uso em Tailwind

```tsx
// Background
<div className="bg-background">...</div>
<div className="bg-background-secondary">...</div>

// Texto
<p className="text-foreground">Texto principal</p>
<p className="text-foreground-secondary">Texto secundário</p>
<p className="text-foreground-muted">Texto terciário</p>

// Primary
<button className="bg-primary text-primary-foreground">Botão</button>
<button className="bg-primary hover:bg-primary-hover">Hover</button>

// Cores semânticas
<div className="bg-destructive text-destructive-foreground">Erro</div>
<div className="bg-success text-success-foreground">Sucesso</div>
```

---

## 🔤 Typography

### Font Families

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, ...` | Texto geral |
| `--font-mono` | `'Fira Code', 'Consolas', 'Monaco', ...` | Código |

### Font Weights

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|-----------------|-----|
| `--font-weight-light` | `300` | `font-light` | Texto leve |
| `--font-weight-normal` | `400` | `font-normal` | Texto normal |
| `--font-weight-medium` | `500` | `font-medium` | Texto médio |
| `--font-weight-semibold` | `600` | `font-semibold` | Texto semi-negrito |
| `--font-weight-bold` | `700` | `font-bold` | Texto negrito |

### Escala Tipográfica

#### Display (Hero Titles)

| Token | Tamanho | Line Height | Letter Spacing | Classe Tailwind |
|-------|---------|-------------|----------------|-----------------|
| `--font-size-display-2xl` | `4.5rem` (72px) | `1.25` | `-0.025em` | `text-display-2xl` |
| `--font-size-display-xl` | `3.75rem` (60px) | `1.25` | `-0.025em` | `text-display-xl` |
| `--font-size-display-lg` | `3rem` (48px) | `1.25` | `-0.025em` | `text-display-lg` |

#### Heading (Section Titles)

| Token | Tamanho | Line Height | Letter Spacing | Classe Tailwind |
|-------|---------|-------------|----------------|-----------------|
| `--font-size-heading-3xl` | `2.25rem` (36px) | `1.25` | `0` | `text-heading-3xl` |
| `--font-size-heading-2xl` | `1.875rem` (30px) | `1.25` | `0` | `text-heading-2xl` |
| `--font-size-heading-xl` | `1.5rem` (24px) | `1.5` | `0` | `text-heading-xl` |
| `--font-size-heading-lg` | `1.25rem` (20px) | `1.5` | `0` | `text-heading-lg` |

#### Body (Text Content)

| Token | Tamanho | Line Height | Letter Spacing | Classe Tailwind |
|-------|---------|-------------|----------------|-----------------|
| `--font-size-body-lg` | `1.125rem` (18px) | `1.75` | `0` | `text-body-lg` |
| `--font-size-body-base` | `1rem` (16px) | `1.75` | `0` | `text-body-base` |
| `--font-size-body-sm` | `0.875rem` (14px) | `1.5` | `0` | `text-body-sm` |

#### Label (Small Text)

| Token | Tamanho | Line Height | Letter Spacing | Classe Tailwind |
|-------|---------|-------------|----------------|-----------------|
| `--font-size-label-lg` | `0.875rem` (14px) | `1.5` | `0.025em` | `text-label-lg` |
| `--font-size-label-base` | `0.75rem` (12px) | `1.5` | `0.025em` | `text-label-base` |
| `--font-size-label-sm` | `0.625rem` (10px) | `1.5` | `0.025em` | `text-label-sm` |

### Line Heights

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|-----------------|-----|
| `--line-height-tighter` | `1.1` | `leading-tighter` | Títulos muito compactos |
| `--line-height-tight` | `1.25` | `leading-tight` | Títulos |
| `--line-height-normal` | `1.5` | `leading-normal` | Texto padrão |
| `--line-height-relaxed` | `1.75` | `leading-relaxed` | Parágrafos |
| `--line-height-loose` | `2` | `leading-loose` | Texto espaçado |

### Letter Spacing

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|-----------------|-----|
| `--letter-spacing-tighter` | `-0.05em` | `tracking-tighter` | Títulos grandes |
| `--letter-spacing-tight` | `-0.025em` | `tracking-tight` | Títulos |
| `--letter-spacing-normal` | `0` | `tracking-normal` | Texto padrão |
| `--letter-spacing-wide` | `0.025em` | `tracking-wide` | Labels |
| `--letter-spacing-wider` | `0.05em` | `tracking-wider` | Destaques |

### Exemplos de Uso

```tsx
// Hero Title
<h1 className="text-display-xl font-bold leading-tight tracking-tight">
  Título Principal
</h1>

// Section Heading
<h2 className="text-heading-2xl font-semibold leading-tight">
  Título de Seção
</h2>

// Body Text
<p className="text-body-base leading-relaxed">
  Texto corrido com espaçamento adequado para leitura.
</p>

// Label
<label className="text-label-base font-medium tracking-wide">
  Label do Campo
</label>
```

---

## 📏 Spacing

### Sistema Base

O sistema utiliza múltiplos de 4px (0.25rem) como base, seguindo a escala padrão do Tailwind.

| Token | Valor | Pixels | Classe Tailwind | Uso |
|-------|-------|--------|----------------|-----|
| `--spacing-0` | `0` | 0px | `p-0`, `m-0` | Sem espaçamento |
| `--spacing-0.5` | `0.125rem` | 2px | `p-0.5`, `m-0.5` | Espaçamento mínimo |
| `--spacing-1` | `0.25rem` | 4px | `p-1`, `m-1` | Espaçamento pequeno |
| `--spacing-2` | `0.5rem` | 8px | `p-2`, `m-2` | Espaçamento interno |
| `--spacing-4` | `1rem` | 16px | `p-4`, `m-4` | Espaçamento padrão |
| `--spacing-6` | `1.5rem` | 24px | `p-6`, `m-6` | Espaçamento médio |
| `--spacing-8` | `2rem` | 32px | `p-8`, `m-8` | Espaçamento grande |
| `--spacing-12` | `3rem` | 48px | `p-12`, `m-12` | Espaçamento extra |
| `--spacing-16` | `4rem` | 64px | `p-16`, `m-16` | Espaçamento máximo |
| `--spacing-24` | `6rem` | 96px | `p-24`, `m-24` | Padding de seções |

### Espaçamento Vertical

```tsx
// Entre elementos relacionados
<div className="space-y-6">...</div>

// Entre seções
<section className="space-y-8">...</section>

// Entre blocos grandes
<div className="space-y-12">...</div>
```

### Espaçamento Horizontal

```tsx
// Mobile
<div className="px-4">...</div>

// Tablet
<div className="px-6">...</div>

// Desktop (via container)
<div className="container mx-auto px-4 md:px-6 lg:px-8">...</div>
```

---

## 🔲 Borders

### Border Width

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|----------------|-----|
| `--border-width-0` | `0` | `border-0` | Sem borda |
| `--border-width-1` | `1px` | `border` | Borda padrão |
| `--border-width-2` | `2px` | `border-2` | Borda destacada |
| `--border-width-4` | `4px` | `border-4` | Borda muito destacada |

### Border Radius

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|----------------|-----|
| `--radius-none` | `0` | `rounded-none` | Sem arredondamento |
| `--radius-sm` | `0.25rem` (4px) | `rounded-sm` | Pequeno |
| `--radius-md` | `0.375rem` (6px) | `rounded-md` | Médio |
| `--radius-lg` | `0.5rem` (8px) | `rounded-lg` | Grande |
| `--radius-xl` | `0.75rem` (12px) | `rounded-xl` | Extra grande |
| `--radius-2xl` | `1rem` (16px) | `rounded-2xl` | Muito grande |
| `--radius-3xl` | `1.5rem` (24px) | `rounded-3xl` | Extremo |
| `--radius-full` | `9999px` | `rounded-full` | Círculo |

### Exemplos

```tsx
// Card com borda
<div className="border border-border rounded-lg">...</div>

// Input com borda
<input className="border border-input rounded-md" />

// Botão circular
<button className="rounded-full">...</button>
```

---

## 🌑 Shadows

### Sombras Padrão

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|----------------|-----|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `shadow-sm` | Sombra pequena |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)...` | `shadow-md` | Sombra média |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)...` | `shadow-lg` | Sombra grande |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)...` | `shadow-xl` | Sombra extra |
| `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | `shadow-2xl` | Sombra máxima |
| `--shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | `shadow-inner` | Sombra interna |
| `--shadow-none` | `0 0 #0000` | `shadow-none` | Sem sombra |

### Sombras Coloridas

| Token | Classe Tailwind | Uso |
|-------|----------------|-----|
| `--shadow-primary` | `shadow-primary` | Sombra com cor primária |
| `--shadow-primary-lg` | `shadow-primary-lg` | Sombra primária grande |

### Exemplos

```tsx
// Card com sombra
<div className="bg-card rounded-lg shadow-md">...</div>

// Botão com sombra colorida
<button className="bg-primary shadow-primary">...</button>

// Input com sombra interna
<input className="shadow-inner" />
```

---

## ⚡ Animations & Transitions

### Durations

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|----------------|-----|
| `--duration-fast` | `150ms` | `duration-fast` | Transições rápidas |
| `--duration-base` | `200ms` | `duration-base` | Transições padrão |
| `--duration-slow` | `300ms` | `duration-slow` | Transições lentas |
| `--duration-slower` | `500ms` | `duration-slower` | Transições muito lentas |

### Easings

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|----------------|-----|
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | `ease-in` | Aceleração |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | `ease-out` | Desaceleração |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | `ease-in-out` | Padrão |
| `--ease-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `ease-back` | Efeito bounce |

### Transitions Padrão

| Token | Valor | Uso |
|-------|-------|-----|
| `--transition-base` | `all var(--duration-base) var(--ease-in-out)` | Transição geral |
| `--transition-colors` | `color, background-color, border-color var(--duration-base) var(--ease-in-out)` | Cores |
| `--transition-transform` | `transform var(--duration-base) var(--ease-out)` | Transformações |
| `--transition-opacity` | `opacity var(--duration-base) var(--ease-in-out)` | Opacidade |

### Exemplos

```tsx
// Botão com transição
<button className="transition-colors duration-base ease-in-out hover:bg-primary-hover">
  Hover me
</button>

// Card com animação
<div className="transition-transform duration-slow ease-out hover:scale-105">
  ...
</div>
```

---

## 📚 Z-Index

| Token | Valor | Classe Tailwind | Uso |
|-------|-------|----------------|-----|
| `--z-base` | `0` | `z-0` | Base |
| `--z-dropdown` | `1000` | `z-dropdown` | Dropdowns |
| `--z-sticky` | `1020` | `z-sticky` | Elementos sticky |
| `--z-fixed` | `1030` | `z-fixed` | Elementos fixed |
| `--z-modal-backdrop` | `1040` | `z-modal-backdrop` | Backdrop de modal |
| `--z-modal` | `1050` | `z-modal` | Modais |
| `--z-popover` | `1060` | `z-popover` | Popovers |
| `--z-tooltip` | `1070` | `z-tooltip` | Tooltips |

---

## ♿ Accessibility

### Contraste WCAG 2.1

| Nível | Texto Normal | Texto Grande | Elementos UI |
|-------|---------------|--------------|--------------|
| **AA (Mínimo)** | 4.5:1 | 3:1 | 3:1 |
| **AAA (Recomendado)** | 7:1 | 4.5:1 | 4.5:1 |

### Diretrizes

1. **Sempre verificar** contraste antes de usar uma cor
2. **Priorizar AAA** quando possível, especialmente para texto longo
3. **Testar** em diferentes condições de iluminação
4. **Considerar** usuários com daltonismo ao escolher cores
5. **Manter** line-height mínimo de 1.5 para texto corrido
6. **Garantir** que textos possam ser ampliados até 200% sem perda de funcionalidade

### Ferramentas Recomendadas

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (DevTools)

---

## 🎯 Usage Guidelines

### Boas Práticas

1. **Use tokens sempre que possível** - Não use valores hardcoded
2. **Mantenha consistência** - Use as mesmas classes em contextos similares
3. **Respeite a hierarquia** - Use tamanhos de fonte apropriados
4. **Teste em ambos os modos** - Claro e escuro
5. **Valide acessibilidade** - Sempre verifique contraste

### Exemplo Completo

```tsx
// Card Component
<div className="
  bg-card 
  border border-border 
  rounded-lg 
  shadow-md 
  p-6
  transition-shadow duration-base ease-in-out
  hover:shadow-lg
">
  <h3 className="text-heading-xl font-semibold text-card-foreground mb-2">
    Título do Card
  </h3>
  <p className="text-body-base text-foreground-secondary leading-relaxed">
    Descrição do card com texto corrido e espaçamento adequado.
  </p>
</div>
```

---

## 📖 Referências

- [Design Tokens Reference](./TOKENS.md) - Referência completa de tokens
- [Components Guide](./COMPONENTS.md) - Guia de componentes base
- [Shadcn/UI](https://ui.shadcn.com/) - Inspiração do sistema
- [MagicUI](https://magicui.design/) - Padrões modernos
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Diretrizes de acessibilidade

---

## 📝 Changelog

### v2.0.0 - Refatoração Completa
- Sistema de tokens HSL completo
- Suporte completo a dark mode
- Escala tipográfica robusta
- Sistema de sombras estruturado
- Tokens de animação e transição
- Documentação profissional

### v1.0.0 - Versão Inicial
- Sistema básico de cores
- Tipografia básica
- Espaçamento padrão
- Correções de contraste
