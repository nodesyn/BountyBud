/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          dark: '#0060df',
        },
        secondary: {
          DEFAULT: '#ff4081',
          dark: '#c60055',
        },
        background: {
          light: '#ffffff',
          dark: '#121212',
        },
        surface: {
          light: '#f5f5f5',
          dark: '#1e1e1e',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 