import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
 extend: {
      colors: {
        primary: '#FF8A1D',
        secondary: '#0355CC'
      },
      
  }},
  plugins: [daisyui],
}

