import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Aramayus Art
        'inca-gold':    '#C8860A',
        'andean-black': '#1A0A00',
        'wiphala-red':  '#8B1A1A',
        'coca-green':   '#2D5A3D',
        'textile-purple': '#7B5EA7',
        'wool-cream':   '#F5F0E8',
        'warm-mid':     '#F0EBE0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        sans:    ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'andean-pattern': "repeating-linear-gradient(90deg,#C8860A 0px,#C8860A 8px,#8B1A1A 8px,#8B1A1A 16px,#2D5A3D 16px,#2D5A3D 24px,#7B5EA7 24px,#7B5EA7 32px,#1A0A00 32px,#1A0A00 40px,#7B5EA7 40px,#7B5EA7 48px,#2D5A3D 48px,#2D5A3D 56px,#8B1A1A 56px,#8B1A1A 64px)",
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}

export default config
