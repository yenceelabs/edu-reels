module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#a855f7',
          600: '#9333ea',
        },
        pink: {
          500: '#ec4899',
          600: '#db2777',
        },
      },
    },
  },
  plugins: [],
};
