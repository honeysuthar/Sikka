/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sikka Gold — the "coin" theme
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Dark backgrounds
        dark: {
          50:  '#f8f8fc',
          100: '#e8e8f0',
          200: '#c8c8dc',
          300: '#9898b8',
          400: '#6868a0',
          500: '#484880',
          600: '#383870',
          700: '#282860',
          800: '#1a1a40',
          900: '#0f0f28',
          950: '#080814',
        },
        // Violet accent
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        // Emerald success
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Rose danger
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0f0f28 0%, #1a1a40 50%, #282860 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26,26,64,0.9) 0%, rgba(15,15,40,0.95) 100%)',
        'glow-gold': 'radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)',
        'glow-violet': 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #080814 0%, #0f0f28 40%, #1a1040 100%)',
        'coin-shine': 'linear-gradient(45deg, #fbbf24 0%, #fcd34d 30%, #fbbf24 50%, #d97706 70%, #f59e0b 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245, 158, 11, 0.3), 0 4px 24px rgba(245, 158, 11, 0.15)',
        'gold-sm': '0 0 10px rgba(245, 158, 11, 0.2)',
        'violet': '0 0 20px rgba(124, 58, 237, 0.3), 0 4px 24px rgba(124, 58, 237, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5)',
        'inner-gold': 'inset 0 1px 0 rgba(251, 191, 36, 0.2)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'coin-flip': 'coinFlip 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(245,158,11,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(245,158,11,0.6), 0 0 60px rgba(245,158,11,0.2)' },
        },
        coinFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg) scale(1.1)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
