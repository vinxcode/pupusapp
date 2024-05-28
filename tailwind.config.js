const { addDynamicIconSelectors } = require('@iconify/tailwind')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        transparent: 'transparent',
        'white': '#ffffff',
        'black': '#292F36',
        'red': "#FF6B6B",
        'yellow': "#FFE66D",
        'green': "#4ECDC4",
        'white-soft': "#F7FFF7",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      fontFamily: {
        'leagueSpartan': ['League Spartan', 'sans-serif'],
        'sanchez': ["Sanchez", "serif"]
      },
      backgroundImage: {
        'bg-img': "url('/bg.png')",
      }
    },
  },
  plugins: [addDynamicIconSelectors()],
};
