/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4', // cyan-500
        secondary: '#7c3aed', // violet-600
      },
      boxShadow: {
        'glow': '0 8px 30px rgba(124,58,237,0.12)'
      }
    },
  },
  plugins: [],
};
