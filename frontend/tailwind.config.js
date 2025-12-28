/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust paths based on your project
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // clean white
        foreground: "#1B5E20", // dark green for headings
        border: "#E0E0E0", // subtle gray borders
        muted: {
          DEFAULT: "#F5F5F5", // light gray background
          foreground: "#4A4A4A", // neutral text
        },
        primary: {
          DEFAULT: "#2E7D32", // main vibrant green
          foreground: "#FFFFFF", // white text on green
        },
        secondary: {
          DEFAULT: "#A5D6A7", // soft green
          foreground: "#1B5E20", // dark green text
        },
        accent: {
          DEFAULT: "#81C784", // accent green
          foreground: "#1B5E20",
        },
        card: "#FFFFFF", // white cards
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.12)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(to right, #2E7D32, #81C784)",
        "gradient-subtle": "linear-gradient(to right, #F1F8E9, #FFFFFF)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        "float": "float 3s ease-in-out infinite",
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
