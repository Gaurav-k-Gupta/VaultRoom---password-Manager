/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',  // Custom primary color (you can change this)
        secondary: '#F59E0B', // Custom secondary color (you can change this)
        accent: '#10B981',    // Accent color (you can change this)
        background: '#F3F4F6', // Light background color
        dark: '#1F2937',      // Dark text or background color
      },
    },
  },
  plugins: [],
}