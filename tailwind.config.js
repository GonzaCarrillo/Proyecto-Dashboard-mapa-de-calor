/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        institucional: {
          DEFAULT: '#1E3A8A',
          50: '#EFF3FC',
          100: '#DCE5F8',
          200: '#B9CBF1',
          300: '#8AA7E5',
          400: '#557DD4',
          500: '#3159BE',
          600: '#2445A0',
          700: '#1E3A8A',
          800: '#182F6E',
          900: '#132555',
        },
        jujuy: {
          DEFAULT: '#0284C7',
          50: '#EFF8FF',
          100: '#D9EEFF',
          200: '#B6DFFF',
          300: '#7BC8FF',
          400: '#37ADFF',
          500: '#0E92F0',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        critico: '#DC2626',
        alerta: '#F97316',
        optimo: '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 10px 30px -12px rgba(30, 58, 138, 0.35)',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.35s ease-out',
      },
    },
  },
  plugins: [],
}
