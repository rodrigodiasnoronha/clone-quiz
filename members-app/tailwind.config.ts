import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // rosa intenso da identidade (referência visual)
        rose: { 50: '#FFF0F6', 100: '#FFE1EE', 200: '#FFC2DD', 300: '#FF93C1', 400: '#FF5FA2', 500: '#F03E8A', 600: '#D82775', 700: '#B01A5F' },
        // malva rosado para superfícies secundárias
        lilac: { 50: '#FCF4F8', 100: '#F8E7F0', 200: '#F0D0E1', 300: '#E3B1CD', 400: '#CF8BB4', 500: '#B0628F' },
        // tons de amora para textos de destaque e gradientes
        grape: { 400: '#E0569D', 500: '#C42A78', 600: '#A61F66', 700: '#861852', 800: '#5E1240', 900: '#3D0C2B' },
        // ameixa escura dos cabeçalhos
        plum: { 600: '#6E2457', 700: '#551B45', 800: '#3D1333', 900: '#2A0C23', 950: '#1C0818' },
        ink: { DEFAULT: '#2B1626', soft: '#6E5A68', faint: '#A8939F' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fredoka"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -10px rgb(134 24 82 / .22)',
        card: '0 2px 10px -2px rgb(134 24 82 / .08), 0 14px 32px -16px rgb(134 24 82 / .22)',
        glow: '0 10px 28px -8px rgb(240 62 138 / .55)',
      },
      borderRadius: { '4xl': '2rem' },
      backgroundImage: {
        'brand': 'linear-gradient(135deg, #FF6FAE 0%, #F03E8A 55%, #D82775 100%)',
        'brand-soft': 'linear-gradient(170deg, #FFF0F6 0%, #FFF6FA 50%, #FBEFF6 100%)',
        'night': 'radial-gradient(120% 90% at 80% 0%, #6E2457 0%, #3D1333 45%, #2A0C23 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
