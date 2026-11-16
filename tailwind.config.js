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
      },
      maxWidth: {
        'site': '1920px'
      }
    },
  },
  plugins: [],
}

