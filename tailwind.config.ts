import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: {
          DEFAULT: '#13111C',
          elevated: '#1A1726',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          glow: '#DDD6FE',
        },
        text: {
          DEFAULT: '#FFFFFF',
          muted: '#A1A1AA',
        },
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        sans: ['Pretendard', 'sans-serif'],
        body: ['Pretendard', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0A0A0F 0%, #13111C 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.5)',
      },
      animation: {
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
