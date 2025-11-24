/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'growth-green': '#22c55e',
        'growth-green-light': '#86efac',
        'growth-green-dark': '#16a34a',
        'cta-purple': '#6b21a8',
        'cta-purple-dark': '#581c87',
        'fluorescent-green': '#10b981',
        'fluorescent-yellow': '#fbbf24',
        'neon-cyan': '#06b6d4',
        'bg-light': '#fafafa',
        'bg-white': '#ffffff',
        'card-shadow': 'rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(to bottom, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.05))',
        'purple-texture': 'linear-gradient(135deg, #6b21a8 0%, #581c87 100%)',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'button': '0 4px 12px rgba(251, 191, 36, 0.4)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'chart-flow': 'chart-flow 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'chart-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      fontFamily: {
        'sans': ['Hiragino Kaku Gothic Pro', 'Hiragino Sans', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
