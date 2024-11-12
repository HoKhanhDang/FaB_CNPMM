/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      /^bg-/,
      /^text-/,
    ],
  },
  theme: {
    extend: {
      colors: {
        'main': '#1E1E1E',
        'main-bg': '#F1F1F3',
        'sidebar': '#0C2556',
        'primary': '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
        'pending': '#FFD700',
        'cancelled': '#F42B3D',
        'processing': '#DB7E06',
        'delivered': '#4CAF50',
        'delivering': '#0ADAD9',
        'packed': '#FFC107',
        'recipe': '#FDF79A',
        'recipe-bg': '#FAED37',
        'off': '#74868A',
      },
    },
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateX(-10%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'translateX(0)',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
      'spin-fast': 'spin 1s linear infinite',
      'bounce-slow': 'bounce 2s infinite',
    }
  },
  plugins: [],
}