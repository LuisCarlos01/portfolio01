/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-light': 'var(--color-bg-light)',
        'card-bg': 'var(--color-card-bg)',
        'text-light': 'var(--color-text-light)',
        'text-dark': 'var(--color-text-dark)',
        'border-color': 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

