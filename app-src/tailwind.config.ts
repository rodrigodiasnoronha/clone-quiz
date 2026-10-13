import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: { 50: '#FFF1F7', 100: '#FFE3F0', 200: '#FFC7E1', 300: '#FF9ECB', 400: '#F873AE', 500: '#EC4C93', 600: '#D63379' },
        lilac: { 50: '#F7F3FF', 100: '#EFE8FF', 200: '#DDD0FF', 300: '#C6B1FF', 400: '#A98BFA', 500: '#8E6CF0' },
        grape: { 500: '#7C4DDB', 600: '#6A3AC7', 700: '#5529A3', 800: '#3E1D78', 900: '#2A1452' },
        ink: { DEFAULT: '#2A1F3D', soft: '#6B6180', faint: '#A39BB3' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fredoka"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -10px rgb(85 41 163 / .22)',
        card: '0 2px 10px -2px rgb(85 41 163 / .10), 0 14px 32px -16px rgb(85 41 163 / .25)',
        glow: '0 10px 30px -8px rgb(236 76 147 / .55)',
      },
      borderRadius: { '4xl': '2rem' },
      backgroundImage: {
        'brand': 'linear-gradient(135deg, #F873AE 0%, #A98BFA 55%, #7C4DDB 100%)',
        'brand-soft': 'linear-gradient(160deg, #FFF1F7 0%, #F7F3FF 60%, #EFE8FF 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
