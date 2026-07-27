import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        cyan: {
          50: '#e0f7fa',
          100: '#b3e5fc',
          200: '#81d4fa',
          300: '#4fd3e5',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
          950: '#004d52',
        },
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 188, 212, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 188, 212, 0.4)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.glass': {
          '@apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-glass': {},
        },
        '.glass-dark': {
          '@apply bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl shadow-glass': {},
        },
        '.glass-button': {
          '@apply glass hover:bg-white/20 transition-all duration-300 cursor-pointer': {},
        },
        '.card-overlay': {
          '@apply absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl': {},
        },
      });
    },
  ],
};
export default config;
