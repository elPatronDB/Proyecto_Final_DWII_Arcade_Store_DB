/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            black: '#111111',
            dark: '#222222', 
            gray: '#444444',
            light: '#f5f5f5'
          }
        }
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          arcade: {
            "primary": "#111111",
            "secondary": "#222222",
            "accent": "#00ffff",
            "neutral": "#444444",
            "base-100": "#000000",
          },
        },
      ],
    },
  }