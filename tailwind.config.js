/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#1c9aa0',
          navy: '#0f3759',
        },
        factors: {
          time: '#1d4ed8',
          physical: '#7c3aed',
          mental: '#f97316',
          constraints: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
