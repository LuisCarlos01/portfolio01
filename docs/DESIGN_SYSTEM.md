# Sistema de Design - Portfolio

Este documento define as diretrizes de design para o portfólio, incluindo paleta de cores, tipografia, espaçamento e regras de acessibilidade.

## Paleta de Cores

### Modo Claro

| Elemento | Cor | Código Hex | Uso |
|---------|-----|------------|-----|
| Background | Branco | `#FFFFFF` | Fundo principal da aplicação |
| Texto Principal | Azul Escuro | `#0F172A` | Títulos e texto de maior destaque |
| Texto Secundário | Cinza Médio | `#4B5563` | Subtítulos e texto de importância média |
| Texto Terciário | Cinza Escuro | `#374151` | Corpo de texto e parágrafos |
| Primary | Azul | `#3B82F6` | Links, botões e elementos interativos |
| Primary Dark | Azul Escuro | `#2563EB` | Estados hover e elementos ativos |
| Primary Light | Azul Claro | `#60A5FA` | Estados de foco e destaques |

### Modo Escuro

| Elemento | Cor | Código Hex | Uso |
|---------|-----|------------|-----|
| Background | Azul Escuro | `#0F172A` | Fundo principal da aplicação |
| Texto Principal | Cinza Claro | `#F1F5F9` | Títulos e texto de maior destaque |
| Texto Secundário | Cinza Médio | `#9CA3AF` | Subtítulos e texto de importância média |
| Texto Terciário | Cinza Claro | `#D1D5DB` | Corpo de texto e parágrafos |
| Primary | Azul | `#3B82F6` | Links, botões e elementos interativos |
| Primary Dark | Azul Escuro | `#2563EB` | Estados hover e elementos ativos |
| Primary Light | Azul Claro | `#60A5FA` | Estados de foco e destaques |

### Variáveis CSS

As cores são definidas como variáveis CSS em `src/styles/index.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;
  --color-bg-dark: #0f172a;
  --color-bg-light: #ffffff;
  --color-card-bg: #1e293b;
  --color-text-light: #f1f5f9;
  --color-text-dark: #0f172a;
  --color-border: #334155;
}
```

## Regras de Contraste WCAG 2.1

### Níveis de Conformidade

- **AA (Mínimo)**: Requerido para acessibilidade básica
- **AAA (Recomendado)**: Meta para melhor experiência de usuário

### Requisitos de Contraste

| Tipo de Texto | Tamanho | Contraste Mínimo AA | Contraste Meta AAA |
|---------------|---------|---------------------|-------------------|
| Texto Normal | < 18px | 4.5:1 | 7:1 |
| Texto Grande | ≥ 18px ou ≥ 14px bold | 3:1 | 4.5:1 |
| Texto de Interface | Qualquer | 3:1 | 4.5:1 |
| Elementos Não-Textuais | - | 3:1 | - |

### Verificação de Contraste

Sempre verifique o contraste usando ferramentas como:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- DevTools do navegador (Lighthouse)

### Exemplos de Contraste Atual

#### Modo Claro
- **Texto Principal** (`#0F172A` sobre `#FFFFFF`): ~16.5:1 ✅ AAA
- **Texto Secundário** (`#4B5563` sobre `#FFFFFF`): ~7.1:1 ✅ AAA
- **Texto Terciário** (`#374151` sobre `#FFFFFF`): ~8.2:1 ✅ AAA
- **Primary** (`#3B82F6` sobre `#FFFFFF`): ~3.8:1 ⚠️ AA (melhorar para AAA)

#### Modo Escuro
- **Texto Principal** (`#F1F5F9` sobre `#0F172A`): ~15.8:1 ✅ AAA
- **Texto Secundário** (`#9CA3AF` sobre `#0F172A`): ~6.2:1 ✅ AAA
- **Texto Terciário** (`#D1D5DB` sobre `#0F172A`): ~8.5:1 ✅ AAA
- **Primary** (`#3B82F6` sobre `#0F172A`): ~3.2:1 ⚠️ AA (melhorar para AAA)

## Tipografia

### Fonte Principal

- **Família**: Inter (sans-serif)
- **Fallback**: sans-serif
- **Carregamento**: Google Fonts ou sistema local

### Hierarquia Tipográfica

#### Título H1 (Hero)
- **Tamanho**: `2.5rem` (40px) mobile → `3rem` (48px) tablet → `3.75rem` (60px) desktop
- **Peso**: `font-bold` (700)
- **Line-height**: `leading-tight` (1.25)
- **Letter-spacing**: `tracking-tight` (-0.025em)
- **Uso**: Título principal da seção Hero

#### Subtítulo H2
- **Tamanho**: `1.25rem` (20px) mobile → `1.5rem` (24px) desktop
- **Peso**: `font-semibold` (600)
- **Line-height**: `leading-normal` (1.5)
- **Uso**: Subtítulos de seções e títulos secundários

#### Corpo de Texto
- **Tamanho**: `1rem` (16px) mobile → `1.125rem` (18px) desktop
- **Peso**: `font-normal` (400)
- **Line-height**: `leading-relaxed` (1.75)
- **Uso**: Parágrafos e conteúdo textual

#### Texto Pequeno
- **Tamanho**: `0.875rem` (14px)
- **Peso**: `font-normal` (400)
- **Line-height**: `leading-normal` (1.5)
- **Uso**: Labels, captions e informações secundárias

### Classes Tailwind Recomendadas

```tsx
// Título Principal
className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"

// Subtítulo
className="text-xl md:text-2xl font-semibold"

// Corpo de Texto
className="text-base md:text-lg font-normal leading-relaxed"

// Texto Pequeno
className="text-sm font-normal"
```

## Espaçamento

### Sistema de Espaçamento Base

O projeto utiliza um sistema baseado em múltiplos de 4px (0.25rem):

| Escala | Valor | Uso |
|--------|-------|-----|
| 1x | `0.25rem` (4px) | Espaçamento mínimo |
| 2x | `0.5rem` (8px) | Espaçamento interno pequeno |
| 4x | `1rem` (16px) | Espaçamento padrão |
| 6x | `1.5rem` (24px) | Espaçamento entre elementos relacionados |
| 8x | `2rem` (32px) | Espaçamento entre seções |
| 12x | `3rem` (48px) | Espaçamento entre blocos grandes |

### Espaçamento Vertical

- **Entre elementos relacionados**: `space-y-6` (1.5rem / 24px)
- **Entre seções**: `space-y-8` (2rem / 32px)
- **Entre blocos grandes**: `space-y-12` (3rem / 48px)

### Espaçamento Horizontal

- **Mobile**: `px-4` (1rem / 16px)
- **Tablet**: `px-6` (1.5rem / 24px)
- **Desktop**: Padding automático via container

### Padding de Seções

- **Vertical**: `py-24` (6rem / 96px) para seções principais
- **Horizontal**: Responsivo conforme breakpoints

## Diretrizes de Acessibilidade

### Contraste de Cores

1. **Sempre verificar** o contraste antes de usar uma cor
2. **Priorizar AAA** quando possível, especialmente para texto longo
3. **Testar** em diferentes condições de iluminação
4. **Considerar** usuários com daltonismo ao escolher cores

### Tipografia

1. **Não usar** tamanhos menores que 14px para texto legível
2. **Manter** line-height mínimo de 1.5 para texto corrido
3. **Evitar** textos em maiúsculas extensos (dificulta leitura)
4. **Garantir** que textos possam ser ampliados até 200% sem perda de funcionalidade

### Estados Interativos

1. **Foco visível**: Todos os elementos interativos devem ter estado de foco claro
2. **Hover**: Manter contraste adequado mesmo em estados hover
3. **Active**: Fornecer feedback visual claro para ações
4. **Disabled**: Usar opacidade reduzida mas manter legibilidade

### Leitores de Tela

1. **Semântica HTML**: Usar elementos semânticos corretos (h1, h2, p, etc.)
2. **ARIA Labels**: Adicionar labels descritivos quando necessário
3. **Alt Text**: Sempre fornecer texto alternativo para imagens
4. **Landmarks**: Usar elementos de navegação semânticos

## Boas Práticas de UX

### Hierarquia Visual

1. **Tamanho**: Elementos mais importantes devem ser maiores
2. **Peso**: Usar variação de peso de fonte para criar hierarquia
3. **Cor**: Elementos primários devem ter maior contraste
4. **Espaçamento**: Mais espaço ao redor indica maior importância

### Consistência

1. **Cores**: Usar a paleta definida consistentemente
2. **Tipografia**: Manter hierarquia tipográfica em toda aplicação
3. **Espaçamento**: Seguir o sistema de espaçamento definido
4. **Componentes**: Reutilizar componentes existentes quando possível

### Performance

1. **Fontes**: Carregar apenas pesos e estilos necessários
2. **Cores**: Usar variáveis CSS para facilitar manutenção
3. **Animações**: Respeitar `prefers-reduced-motion`
4. **Contraste**: Otimizar para diferentes dispositivos e condições

## Ferramentas Recomendadas

### Verificação de Contraste
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- Lighthouse (DevTools)

### Testes de Acessibilidade
- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

### Design e Prototipagem
- [Figma](https://www.figma.com/) - Para criar designs acessíveis
- [Stark](https://www.getstark.co/) - Plugin Figma para verificação de contraste

## Changelog

### 2024 - Versão Inicial
- Definição da paleta de cores para modo claro e escuro
- Estabelecimento de regras de contraste WCAG 2.1
- Criação da hierarquia tipográfica
- Definição do sistema de espaçamento
- Correção de problemas de contraste na seção Hero

