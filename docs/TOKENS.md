# Tokens Reference

> Referência completa de todos os tokens disponíveis no design system.

## 📋 Índice

- [Cores](#cores)
- [Tipografia](#tipografia)
- [Espaçamento](#espaçamento)
- [Bordas](#bordas)
- [Sombras](#sombras)
- [Animações](#animações)
- [Z-Index](#z-index)

---

## 🎨 Cores

### Background

```css
--background: hsl(0, 0%, 100%);                    /* Modo claro */
--background: hsl(222.2, 84%, 4.9%);              /* Modo escuro */

--background-secondary: hsl(210, 40%, 98%);
--background-muted: hsl(210, 40%, 96.1%);
--background-accent: hsl(210, 40%, 94%);
```

**Uso:**
```tsx
<div className="bg-background">...</div>
<div className="bg-background-secondary">...</div>
```

### Foreground (Texto)

```css
--foreground: hsl(222.2, 84%, 4.9%);               /* Modo claro */
--foreground: hsl(210, 40%, 98%);                  /* Modo escuro */

--foreground-secondary: hsl(215, 16.3%, 46.9%);
--foreground-muted: hsl(215.4, 16.3%, 56.9%);
--foreground-accent: hsl(215.4, 16.3%, 46.9%);
```

**Uso:**
```tsx
<p className="text-foreground">Texto principal</p>
<p className="text-foreground-secondary">Texto secundário</p>
<p className="text-foreground-muted">Texto terciário</p>
```

### Primary

```css
--primary: hsl(221.2, 83.2%, 53.3%);                /* Modo claro */
--primary: hsl(217.2, 91.2%, 59.8%);                /* Modo escuro */

--primary-foreground: hsl(210, 40%, 98%);
--primary-hover: hsl(221.2, 83.2%, 48%);
--primary-light: hsl(221.2, 83.2%, 65%);
--primary-dark: hsl(221.2, 83.2%, 45%);
```

**Uso:**
```tsx
<button className="bg-primary text-primary-foreground">...</button>
<button className="bg-primary hover:bg-primary-hover">...</button>
```

### Secondary

```css
--secondary: hsl(210, 40%, 96.1%);
--secondary-foreground: hsl(222.2, 47.4%, 11.2%);
--secondary-hover: hsl(210, 40%, 94%);
```

### Muted

```css
--muted: hsl(210, 40%, 96.1%);
--muted-foreground: hsl(215.4, 16.3%, 46.9%);
```

### Accent

```css
--accent: hsl(210, 40%, 96.1%);
--accent-foreground: hsl(222.2, 47.4%, 11.2%);
```

### Destructive (Error)

```css
--destructive: hsl(0, 84.2%, 60.2%);               /* Modo claro */
--destructive: hsl(0, 62.8%, 30.6%);                /* Modo escuro */

--destructive-foreground: hsl(210, 40%, 98%);
--destructive-hover: hsl(0, 72.2%, 50.6%);
```

**Uso:**
```tsx
<button className="bg-destructive text-destructive-foreground">
  Deletar
</button>
```

### Warning

```css
--warning: hsl(38, 92%, 50%);
--warning-foreground: hsl(26, 83.3%, 14.1%);
--warning-hover: hsl(38, 92%, 45%);
```

### Success

```css
--success: hsl(142, 76%, 36%);
--success-foreground: hsl(355.7, 100%, 97.3%);
--success-hover: hsl(142, 76%, 32%);
```

### Border & Input

```css
--border: hsl(214.3, 31.8%, 91.4%);                /* Modo claro */
--border: hsl(217.2, 32.6%, 17.5%);                 /* Modo escuro */

--input: hsl(214.3, 31.8%, 91.4%);
--ring: hsl(221.2, 83.2%, 53.3%);
```

### Card

```css
--card: hsl(0, 0%, 100%);                           /* Modo claro */
--card: hsl(222.2, 84%, 4.9%);                     /* Modo escuro */

--card-foreground: hsl(222.2, 84%, 4.9%);
```

---

## 🔤 Tipografia

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, ...;
--font-mono: 'Fira Code', 'Consolas', 'Monaco', ...;
```

**Uso:**
```tsx
<div className="font-sans">Texto padrão</div>
<code className="font-mono">Código</code>
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**Uso:**
```tsx
<p className="font-light">Texto leve</p>
<p className="font-normal">Texto normal</p>
<p className="font-bold">Texto negrito</p>
```

### Font Sizes - Display

```css
--font-size-display-2xl: 4.5rem;    /* 72px */
--font-size-display-xl: 3.75rem;    /* 60px */
--font-size-display-lg: 3rem;       /* 48px */
```

**Uso:**
```tsx
<h1 className="text-display-xl font-bold">Hero Title</h1>
```

### Font Sizes - Heading

```css
--font-size-heading-3xl: 2.25rem;   /* 36px */
--font-size-heading-2xl: 1.875rem;  /* 30px */
--font-size-heading-xl: 1.5rem;     /* 24px */
--font-size-heading-lg: 1.25rem;    /* 20px */
```

**Uso:**
```tsx
<h2 className="text-heading-2xl font-semibold">Section Title</h2>
```

### Font Sizes - Body

```css
--font-size-body-lg: 1.125rem;       /* 18px */
--font-size-body-base: 1rem;        /* 16px */
--font-size-body-sm: 0.875rem;      /* 14px */
```

**Uso:**
```tsx
<p className="text-body-base leading-relaxed">Texto corrido</p>
```

### Font Sizes - Label

```css
--font-size-label-lg: 0.875rem;     /* 14px */
--font-size-label-base: 0.75rem;    /* 12px */
--font-size-label-sm: 0.625rem;    /* 10px */
```

**Uso:**
```tsx
<label className="text-label-base font-medium">Label</label>
```

### Line Heights

```css
--line-height-tighter: 1.1;
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

**Uso:**
```tsx
<h1 className="leading-tight">Título</h1>
<p className="leading-relaxed">Parágrafo</p>
```

### Letter Spacing

```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
```

**Uso:**
```tsx
<h1 className="tracking-tight">Título</h1>
<label className="tracking-wide">Label</label>
```

---

## 📏 Espaçamento

### Spacing Scale

```css
--spacing-0: 0;
--spacing-0.5: 0.125rem;    /* 2px */
--spacing-1: 0.25rem;       /* 4px */
--spacing-1.5: 0.375rem;    /* 6px */
--spacing-2: 0.5rem;        /* 8px */
--spacing-2.5: 0.625rem;    /* 10px */
--spacing-3: 0.75rem;        /* 12px */
--spacing-3.5: 0.875rem;    /* 14px */
--spacing-4: 1rem;          /* 16px */
--spacing-5: 1.25rem;       /* 20px */
--spacing-6: 1.5rem;        /* 24px */
--spacing-7: 1.75rem;       /* 28px */
--spacing-8: 2rem;          /* 32px */
--spacing-9: 2.25rem;       /* 36px */
--spacing-10: 2.5rem;       /* 40px */
--spacing-11: 2.75rem;      /* 44px */
--spacing-12: 3rem;         /* 48px */
--spacing-14: 3.5rem;       /* 56px */
--spacing-16: 4rem;         /* 64px */
--spacing-20: 5rem;         /* 80px */
--spacing-24: 6rem;         /* 96px */
--spacing-28: 7rem;         /* 112px */
--spacing-32: 8rem;         /* 128px */
```

**Uso:**
```tsx
<div className="p-4">Padding 16px</div>
<div className="m-8">Margin 32px</div>
<div className="space-y-6">Espaçamento vertical 24px</div>
```

---

## 🔲 Bordas

### Border Width

```css
--border-width-0: 0;
--border-width-1: 1px;
--border-width-2: 2px;
--border-width-4: 4px;
```

**Uso:**
```tsx
<div className="border">Borda 1px</div>
<div className="border-2">Borda 2px</div>
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;        /* 4px */
--radius-md: 0.375rem;      /* 6px */
--radius-lg: 0.5rem;        /* 8px */
--radius-xl: 0.75rem;       /* 12px */
--radius-2xl: 1rem;        /* 16px */
--radius-3xl: 1.5rem;      /* 24px */
--radius-full: 9999px;
```

**Uso:**
```tsx
<div className="rounded-lg">Card</div>
<button className="rounded-full">Botão circular</button>
```

---

## 🌑 Sombras

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
--shadow-none: 0 0 #0000;
```

**Uso:**
```tsx
<div className="shadow-md">Card</div>
<div className="shadow-lg">Card destacado</div>
```

### Colored Shadows

```css
--shadow-primary: 0 10px 15px -3px hsl(var(--primary) / 0.3), 0 4px 6px -4px hsl(var(--primary) / 0.2);
--shadow-primary-lg: 0 20px 25px -5px hsl(var(--primary) / 0.3), 0 8px 10px -6px hsl(var(--primary) / 0.2);
```

**Uso:**
```tsx
<button className="bg-primary shadow-primary">Botão com sombra colorida</button>
```

---

## ⚡ Animações

### Durations

```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

**Uso:**
```tsx
<div className="transition-colors duration-base">...</div>
```

### Easings

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Uso:**
```tsx
<div className="transition-transform ease-out">...</div>
```

### Transitions

```css
--transition-base: all var(--duration-base) var(--ease-in-out);
--transition-colors: color var(--duration-base) var(--ease-in-out), background-color var(--duration-base) var(--ease-in-out), border-color var(--duration-base) var(--ease-in-out);
--transition-transform: transform var(--duration-base) var(--ease-out);
--transition-opacity: opacity var(--duration-base) var(--ease-in-out);
```

---

## 📚 Z-Index

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

**Uso:**
```tsx
<div className="z-modal">Modal</div>
<div className="z-tooltip">Tooltip</div>
```

---

## 🔗 Links Úteis

- [Design System](./DESIGN_SYSTEM.md) - Documentação completa
- [Components Guide](./COMPONENTS.md) - Guia de componentes

