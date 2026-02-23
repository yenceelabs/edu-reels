// Import shared Yencee Labs tailwind preset
const preset = require("../packages/ui/tailwind/preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Keep popover for existing components
        popover: {
          DEFAULT: "hsl(var(--popover, var(--card)))",
          foreground: "hsl(var(--popover-foreground, var(--card-foreground)))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
