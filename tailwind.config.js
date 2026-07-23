/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#102F73",
        electric: "#3157D5",
        magenta: "#C500C7",
        purple: "#7B3FF2",
        teal: "#218F91",
        yellow: "#FFDB3D",
        pink: "#F9E4F8",
        lightblue: "#EAF0FF",
        lightteal: "#E4F5F3",
        appbg: "#F7F7FB",
        ink: "#171923",
        muted: "#667085",
        line: "#E4E7EC",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(16, 47, 115, 0.12)",
        card: "0 1px 2px rgba(16,24,40,0.05), 0 8px 24px -12px rgba(16,47,115,0.10)",
      },
    },
  },
  plugins: [],
};
