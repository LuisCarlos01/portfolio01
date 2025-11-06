# Components Guide

> Guia completo de componentes base do design system, seguindo padrões Shadcn/UI e boas práticas de acessibilidade.

## 📋 Índice

- [Button](#button)
- [Card](#card)
- [Input](#input)
- [Textarea](#textarea)
- [Badge](#badge)
- [Modal](#modal)
- [FormField](#formfield)

---

## 🔘 Button

### Variantes

O componente Button suporta três variantes principais:

| Variante | Uso | Classes |
|----------|-----|---------|
| `primary` | Ação principal | `bg-primary text-primary-foreground hover:bg-primary-hover` |
| `secondary` | Ação secundária | `bg-secondary text-secondary-foreground hover:bg-secondary-hover` |
| `ghost` | Ação discreta | `bg-transparent hover:bg-card-bg` |

### Tamanhos

| Tamanho | Padding | Font Size | Uso |
|---------|---------|-----------|-----|
| `sm` | `px-3 py-1.5` | `text-sm` | Botões pequenos, inline |
| `md` | `px-4 py-2` | `text-base` | Padrão |
| `lg` | `px-6 py-3` | `text-lg` | Botões destacados |

### Exemplos

```tsx
import { Button } from '@/components/atoms/Button';

// Botão primário
<Button variant="primary" size="md">
  Salvar
</Button>

// Botão secundário
<Button variant="secondary" size="sm">
  Cancelar
</Button>

// Botão ghost
<Button variant="ghost" size="md">
  Ver mais
</Button>

// Botão com loading
<Button variant="primary" isLoading>
  Carregando...
</Button>

// Botão desabilitado
<Button variant="primary" disabled>
  Indisponível
</Button>
```

### Boas Práticas

✅ **Faça:**
- Use `primary` para ações principais
- Use `secondary` para ações alternativas
- Use `ghost` para ações menos importantes
- Sempre forneça texto descritivo
- Use `isLoading` durante operações assíncronas

❌ **Evite:**
- Usar mais de um botão `primary` por seção
- Botões sem texto (use ícones + aria-label)
- Botões muito pequenos em mobile
- Desabilitar sem feedback visual claro

### Acessibilidade

- ✅ Suporte completo a navegação por teclado
- ✅ Estados de foco visíveis
- ✅ ARIA labels para estados de loading
- ✅ Contraste adequado em todas as variantes

---

## 🃏 Card

### Estrutura

O componente Card fornece um container consistente para conteúdo agrupado.

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `children` | `ReactNode` | - | Conteúdo do card |
| `className` | `string` | - | Classes adicionais |
| `hover` | `boolean` | `false` | Efeito hover com scale |
| `onClick` | `() => void` | - | Handler de clique (torna card clicável) |

### Exemplos

```tsx
import { Card } from '@/components/molecules/Card';

// Card básico
<Card>
  <h3 className="text-heading-xl font-semibold mb-2">Título</h3>
  <p className="text-body-base text-foreground-secondary">
    Conteúdo do card
  </p>
</Card>

// Card com hover
<Card hover>
  <h3>Título</h3>
  <p>Hover para ver efeito</p>
</Card>

// Card clicável
<Card onClick={() => console.log('Clicked')}>
  <h3>Título</h3>
  <p>Clique no card</p>
</Card>

// Card customizado
<Card className="bg-primary/10 border-primary">
  <h3 className="text-primary">Card destacado</h3>
</Card>
```

### Padrão de Uso

```tsx
// Card de projeto
<Card hover onClick={() => navigateToProject(id)}>
  <div className="mb-4">
    <img src={image} alt={title} className="rounded-lg" />
  </div>
  <h3 className="text-heading-lg font-semibold mb-2">{title}</h3>
  <p className="text-body-sm text-foreground-secondary line-clamp-2">
    {description}
  </p>
</Card>

// Card de estatística
<Card>
  <div className="text-primary text-3xl mb-2">{icon}</div>
  <h4 className="text-heading-lg font-semibold mb-1">{title}</h4>
  <p className="text-body-lg font-bold text-primary">{value}</p>
</Card>
```

### Acessibilidade

- ✅ Suporte a navegação por teclado quando clicável
- ✅ Role e tabIndex apropriados
- ✅ Feedback visual em estados interativos

---

## 📝 Input

### Estados

O componente Input suporta diferentes estados:

| Estado | Visual | Uso |
|--------|--------|-----|
| Default | Borda padrão | Estado normal |
| Focus | Ring colorido | Quando focado |
| Error | Borda vermelha | Validação falhou |
| Disabled | Opacidade reduzida | Desabilitado |

### Exemplos

```tsx
import { Input } from '@/components/atoms/Input';

// Input básico
<Input
  type="text"
  placeholder="Digite seu nome"
  id="name"
/>

// Input com label e erro
<Input
  type="email"
  label="Email"
  error="Email inválido"
  id="email"
/>

// Input desabilitado
<Input
  type="text"
  disabled
  placeholder="Campo desabilitado"
/>

// Input com valor inicial
<Input
  type="text"
  defaultValue="Valor inicial"
/>
```

### Padrão de Uso

```tsx
// Formulário completo
<form className="space-y-4">
  <Input
    type="text"
    label="Nome completo"
    id="fullName"
    required
  />
  
  <Input
    type="email"
    label="Email"
    id="email"
    error={errors.email}
  />
  
  <Button type="submit" variant="primary">
    Enviar
  </Button>
</form>
```

### Acessibilidade

- ✅ Labels associados corretamente
- ✅ Estados de erro com aria-describedby
- ✅ Suporte a navegação por teclado
- ✅ Contraste adequado em todos os estados

---

## 📄 Textarea

### Uso

Similar ao Input, mas para textos longos.

### Exemplos

```tsx
import { Textarea } from '@/components/atoms/Textarea';

// Textarea básico
<Textarea
  placeholder="Digite sua mensagem..."
  rows={4}
/>

// Textarea com label e erro
<Textarea
  label="Mensagem"
  error="Mensagem muito curta"
  rows={6}
/>

// Textarea desabilitado
<Textarea
  disabled
  placeholder="Campo desabilitado"
/>
```

---

## 🏷️ Badge

### Variantes

| Variante | Uso | Visual |
|----------|-----|--------|
| `primary` | Destaque principal | Fundo primary |
| `secondary` | Destaque secundário | Fundo secondary |
| `success` | Sucesso | Fundo success |
| `warning` | Aviso | Fundo warning |
| `destructive` | Erro | Fundo destructive |

### Exemplos

```tsx
import { Badge } from '@/components/atoms/Badge';

// Badge primário
<Badge variant="primary">Novo</Badge>

// Badge de sucesso
<Badge variant="success">Ativo</Badge>

// Badge de aviso
<Badge variant="warning">Pendente</Badge>

// Badge de erro
<Badge variant="destructive">Erro</Badge>
```

---

## 🪟 Modal

### Estrutura

Componente modal para exibir conteúdo sobreposto.

### Exemplos

```tsx
import { Modal } from '@/components/molecules/Modal';

// Modal básico
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2 className="text-heading-2xl font-bold mb-4">Título do Modal</h2>
  <p className="text-body-base mb-6">
    Conteúdo do modal
  </p>
  <Button onClick={() => setIsOpen(false)}>Fechar</Button>
</Modal>

// Modal com ações
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Confirmar ação</h2>
  <p>Tem certeza que deseja continuar?</p>
  <div className="flex gap-4 mt-6">
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancelar
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirmar
    </Button>
  </div>
</Modal>
```

### Acessibilidade

- ✅ Foco gerenciado automaticamente
- ✅ Fechamento com ESC
- ✅ Backdrop clicável
- ✅ ARIA labels apropriados

---

## 📋 FormField

### Estrutura

Componente composto que combina Label + Input/Textarea + Error message.

### Exemplos

```tsx
import { FormField } from '@/components/molecules/FormField';

// FormField com Input
<FormField
  label="Nome completo"
  error="Nome é obrigatório"
  required
>
  <Input
    type="text"
    id="fullName"
    error={!!error}
  />
</FormField>

// FormField com Textarea
<FormField
  label="Mensagem"
  error={errors.message}
>
  <Textarea
    id="message"
    rows={4}
    error={!!errors.message}
  />
</FormField>
```

### Padrão de Uso

```tsx
// Formulário completo
<form className="space-y-6">
  <FormField
    label="Nome"
    error={errors.name}
    required
  >
    <Input
      type="text"
      id="name"
      error={!!errors.name}
    />
  </FormField>
  
  <FormField
    label="Email"
    error={errors.email}
    required
  >
    <Input
      type="email"
      id="email"
      error={!!errors.email}
    />
  </FormField>
  
  <FormField
    label="Mensagem"
    error={errors.message}
  >
    <Textarea
      id="message"
      rows={6}
      error={!!errors.message}
    />
  </FormField>
  
  <Button type="submit" variant="primary">
    Enviar
  </Button>
</form>
```

---

## 🎨 Padrões de Design

### Composição de Componentes

```tsx
// Card com múltiplos elementos
<Card hover>
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
        <Icon className="text-primary-foreground" />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-heading-lg font-semibold">Título</h3>
        <Badge variant="primary">Novo</Badge>
      </div>
      <p className="text-body-sm text-foreground-secondary mb-4">
        Descrição do card
      </p>
      <Button variant="ghost" size="sm">
        Ver mais
      </Button>
    </div>
  </div>
</Card>
```

### Grid de Cards

```tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} hover onClick={() => handleClick(item)}>
      {/* Conteúdo */}
    </Card>
  ))}
</div>
```

### Lista de Ações

```tsx
// Lista com ações
<div className="space-y-2">
  {actions.map((action) => (
    <div
      key={action.id}
      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-background-secondary transition-colors"
    >
      <div>
        <h4 className="text-heading-lg font-semibold">{action.title}</h4>
        <p className="text-body-sm text-foreground-secondary">
          {action.description}
        </p>
      </div>
      <Button variant="ghost" size="sm">
        Executar
      </Button>
    </div>
  ))}
</div>
```

---

## ✅ Checklist de Componentes

Ao criar ou usar componentes, verifique:

- [ ] Contraste adequado (WCAG AA mínimo)
- [ ] Estados de foco visíveis
- [ ] Suporte a navegação por teclado
- [ ] ARIA labels quando necessário
- [ ] Responsividade em mobile
- [ ] Consistência visual com design system
- [ ] Performance otimizada
- [ ] Documentação clara

---

## 🔗 Links Úteis

- [Design System](./DESIGN_SYSTEM.md) - Documentação completa
- [Tokens Reference](./TOKENS.md) - Referência de tokens
- [Shadcn/UI](https://ui.shadcn.com/) - Inspiração
- [WAI-ARIA](https://www.w3.org/WAI/ARIA/) - Diretrizes de acessibilidade

