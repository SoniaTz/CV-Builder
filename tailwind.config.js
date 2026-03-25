/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#60A5FA',
        background: '#FFFFFF',
        'secondary-bg': '#F9FAFB',
        text: '#111827',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
      },
      fontFamily: {
        cv: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
