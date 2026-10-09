/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['OPPOSans', 'sans-serif'],
      },
      spacing: {
        'safe-pc': '120px',
        'safe-m': '15px',
      }
    },
  },
  plugins: [],
}

