/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores usando tokens HSL
        background: 'hsl(var(--background))',
        'background-secondary': 'hsl(var(--background-secondary))',
        'background-muted': 'hsl(var(--background-muted))',
        'background-accent': 'hsl(var(--background-accent))',
        
        foreground: 'hsl(var(--foreground))',
        'foreground-secondary': 'hsl(var(--foreground-secondary))',
        'foreground-muted': 'hsl(var(--foreground-muted))',
        'foreground-accent': 'hsl(var(--foreground-accent))',
        
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
        
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'hsl(var(--secondary-hover))',
        },
        
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          hover: 'hsl(var(--destructive-hover))',
        },
        
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          hover: 'hsl(var(--warning-hover))',
        },
        
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          hover: 'hsl(var(--success-hover))',
        },
        
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        // Compatibilidade com sistema antigo
        'primary-dark': 'hsl(var(--primary-dark))',
        'primary-light': 'hsl(var(--primary-light))',
        'bg-dark': 'hsl(var(--background))',
        'bg-light': 'hsl(var(--background))',
        'card-bg': 'hsl(var(--card))',
        'text-light': 'hsl(var(--foreground))',
        'text-dark': 'hsl(var(--foreground))',
        'border-color': 'hsl(var(--border))',
      },
      
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      
      fontSize: {
        'display-2xl': ['var(--font-size-display-2xl)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'display-xl': ['var(--font-size-display-xl)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'display-lg': ['var(--font-size-display-lg)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'heading-3xl': ['var(--font-size-heading-3xl)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'heading-2xl': ['var(--font-size-heading-2xl)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'heading-xl': ['var(--font-size-heading-xl)', { lineHeight: 'var(--line-height-normal)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'heading-lg': ['var(--font-size-heading-lg)', { lineHeight: 'var(--line-height-normal)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'body-lg': ['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-relaxed)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'body-base': ['var(--font-size-body-base)', { lineHeight: 'var(--line-height-relaxed)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'body-sm': ['var(--font-size-body-sm)', { lineHeight: 'var(--line-height-normal)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'label-lg': ['var(--font-size-label-lg)', { lineHeight: 'var(--line-height-normal)', letterSpacing: 'var(--letter-spacing-wide)' }],
        'label-base': ['var(--font-size-label-base)', { lineHeight: 'var(--line-height-normal)', letterSpacing: 'var(--letter-spacing-wide)' }],
        'label-sm': ['var(--font-size-label-sm)', { lineHeight: 'var(--line-height-normal)', letterSpacing: 'var(--letter-spacing-wide)' }],
      },
      
      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      
      lineHeight: {
        tighter: 'var(--line-height-tighter)',
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },
      
      letterSpacing: {
        tighter: 'var(--letter-spacing-tighter)',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
      },
      
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
      
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        none: 'var(--shadow-none)',
        primary: 'var(--shadow-primary)',
        'primary-lg': 'var(--shadow-primary-lg)',
      },
      
      spacing: {
        '0.5': 'var(--spacing-0\.5)',
        '1.5': 'var(--spacing-1\.5)',
        '2.5': 'var(--spacing-2\.5)',
        '3.5': 'var(--spacing-3\.5)',
      },
      
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      
      transitionTimingFunction: {
        'in': 'var(--ease-in)',
        'out': 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        back: 'var(--ease-back)',
      },
      
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
      },
    },
  },
  plugins: [],
};

