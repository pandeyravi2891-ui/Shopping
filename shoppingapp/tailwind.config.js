/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      backgroundImage: {
        'hero': `radial-gradient(ellipse at top right, rgba(249,115,22,0.12) 0%, transparent 50%),
                 radial-gradient(ellipse at bottom left, rgba(245,158,11,0.10) 0%, transparent 50%),
                 linear-gradient(135deg, #fff7ed 0%, #fffbf0 50%, #fff7ed 100%)`,
        'premium': 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 30%, #fff7ed 60%, #fef9f0 100%)',
        'gradient-orange': 'linear-gradient(135deg, #f97316, #f59e0b, #ef4444)',
        'gradient-premium': 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f97316 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.7), 0 0 80px rgba(249, 115, 22, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.35), 0 0 60px rgba(249, 115, 22, 0.15)',
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.35), 0 0 60px rgba(245, 158, 11, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
