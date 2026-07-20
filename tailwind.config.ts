import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F9F8",
          100: "#D9EEEB",
          200: "#B6DDD8",
          300: "#8BC6BF",
          400: "#5EA9A0",
          500: "#3F8B84",
          600: "#32716B",
          700: "#285B56",
          800: "#1E4541",
          900: "#122C2A",
        },

        sand: {
          50: "#F8FBFB",
          100: "#EEF5F4",
          200: "#DFE9E8",
          300: "#CCD9D7",
          400: "#AABCB9",
        },

        charcoal: {
          DEFAULT: "#1B2323",
          light: "#293333",
          muted: "#6B7A7A",
        },

        strike: {
          DEFAULT: "#bfbfbf80",
          hover: "#bfbfbf90",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        hero: ["var(--font-libre)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-left": "slideLeft 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
