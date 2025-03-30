/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rich-black': 'rgb(var(--color-rich-black) / <alpha-value>)',
        'oxford-blue': 'rgb(var(--color-oxford-blue) / <alpha-value>)',
        'yale-blue': 'rgb(var(--color-yale-blue) / <alpha-value>)',
        'mikado-yellow': 'rgb(var(--color-mikado-yellow) / <alpha-value>)',
        'gold': 'rgb(var(--color-gold) / <alpha-value>)',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};