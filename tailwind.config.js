/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          900: "#0a0a0f",
          800: "#11121a",
          700: "#181a26",
          600: "#1f2233",
          500: "#2a2e44",
        },
        accent: {
          DEFAULT: "#6366f1",
          glow: "#818cf8",
        },
        mint: "#34d399",
        gold: "#fbbf24",
        rose: "#fb7185",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.45)",
        card: "0 8px 30px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
