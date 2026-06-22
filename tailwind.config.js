/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5F0E8",
          50: "#FBF8F3",
          100: "#F5F0E8",
          200: "#E8DFCE",
        },
        charcoal: {
          DEFAULT: "#1C1C1A",
          800: "#2A2A27",
          700: "#3A3A36",
        },
        sage: {
          DEFAULT: "#5C7A6B",
          dark: "#465E52",
          light: "#7C9A8B",
        },
        amber: {
          DEFAULT: "#C47A2B",
          dark: "#A86420",
          light: "#D9963F",
        },
        stone: {
          warm: "#A89F92",
          cool: "#6B6760",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(28, 28, 26, 0.08)",
        lift: "0 18px 40px rgba(28, 28, 26, 0.14)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
