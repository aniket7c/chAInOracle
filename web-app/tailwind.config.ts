import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#6366f1", // Indigo
        secondary: "#14b8a6", // Teal
        accent: "#f59e0b", // Amber
        background: "#0f172a", // Dark navy
        neonPink: "#ff4ecd",
        electricBlue: "#4fd1c5",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        display: ["'Orbitron'", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 12px rgba(255, 78, 205, 0.8)",
        innerGlow: "inset 0 0 8px rgba(79, 209, 197, 0.6)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px #ff4ecd" },
          "50%": { boxShadow: "0 0 20px #ff4ecd" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "60%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 1.5s infinite ease-in-out",
        "bounce-in": "bounce-in 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
