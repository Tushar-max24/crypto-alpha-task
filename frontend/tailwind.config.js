module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#020617",        // very dark
        "card-dark": "#020617",
        "accent": "#22d3ee",         // cyan
        "accent-soft": "#0ea5e9",
      },
      backgroundImage: {
        "grid-sci":
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)",
      },
      boxShadow: {
        "neon": "0 0 20px rgba(34,211,238,0.5)",
      }
    }
  },
  plugins: []
};
