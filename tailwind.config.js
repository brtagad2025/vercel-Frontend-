/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0f1a',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
        'x-180': 'rotateX(180deg)',
      },
    },
  },
  plugins: [],
};