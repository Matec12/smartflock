const Color = require("color");
const alpha = (clr, val) => Color(clr).alpha(val).rgb().string();
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

const colors = {
  primary: "#03440C",
  secondary: "#0e1133",
  success: "#54D62C",
  danger: "#FF4842",
  warning: "#FFC107",
  info: "#1890FF",
  light: "#f6f6f6",
  dark: "#4b4b4b"
};

const colorVariants = (color) => {
  return {
    "lighten-5": lighten(color, 0.05),
    "lighten-10": lighten(color, 0.1),
    "lighten-15": lighten(color, 0.15),
    "lighten-20": lighten(color, 0.2),
    "lighten-25": lighten(color, 0.25),
    "lighten-30": lighten(color, 0.3),
    "lighten-35": lighten(color, 0.35),
    "lighten-40": lighten(color, 0.4),
    "lighten-45": lighten(color, 0.45),
    "lighten-50": lighten(color, 0.5),
    "lighten-55": lighten(color, 0.55),
    "lighten-60": lighten(color, 0.6),
    "lighten-65": lighten(color, 0.65),
    "lighten-70": lighten(color, 0.7),
    "lighten-75": lighten(color, 0.75),
    "lighten-80": lighten(color, 0.8),
    "lighten-85": lighten(color, 0.85),
    "lighten-90": lighten(color, 0.9),
    "lighten-95": lighten(color, 0.95),
    DEFAULT: color,
    "darken-5": darken(color, 0.05),
    "darken-10": darken(color, 0.1),
    "darken-15": darken(color, 0.15),
    "darken-20": darken(color, 0.2),
    "darken-25": darken(color, 0.25),
    "darken-30": darken(color, 0.3),
    "darken-35": darken(color, 0.35),
    "darken-40": darken(color, 0.4),
    "darken-45": darken(color, 0.45),
    "darken-50": darken(color, 0.5),
    "darken-55": darken(color, 0.55),
    "darken-60": darken(color, 0.6),
    "darken-65": darken(color, 0.65),
    "darken-70": darken(color, 0.7),
    "darken-75": darken(color, 0.75),
    "darken-80": darken(color, 0.8),
    "darken-85": darken(color, 0.85),
    "darken-90": darken(color, 0.9),
    "darken-95": darken(color, 0.95),
    5: alpha(color, 0.05),
    10: alpha(color, 0.1),
    15: alpha(color, 0.15),
    20: alpha(color, 0.2),
    25: alpha(color, 0.25),
    30: alpha(color, 0.3),
    35: alpha(color, 0.35),
    40: alpha(color, 0.4),
    45: alpha(color, 0.45),
    50: alpha(color, 0.5),
    55: alpha(color, 0.55),
    60: alpha(color, 0.6),
    65: alpha(color, 0.65),
    70: alpha(color, 0.7),
    75: alpha(color, 0.75),
    80: alpha(color, 0.8),
    85: alpha(color, 0.85),
    90: alpha(color, 0.9),
    95: alpha(color, 0.95)
  };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "",
        input: "",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: colorVariants(colors.primary),
        secondary: colorVariants(colors.secondary),
        success: colorVariants(colors.success),
        danger: colorVariants(colors.danger),
        warning: colorVariants(colors.warning),
        info: colorVariants(colors.info),
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "#ffffff"
        },
        body: {
          DEFAULT: "#5e5e5e",
          dark: ""
        },
        background: {
          DEFAULT: "#ffffff",
          dark: ""
        },
        headings: {
          DEFAULT: "#383333",
          dark: ""
        },
        placeholder: {
          DEFAULT: "#a5a5a5"
        }
      },
      fontFamily: {
        Lato: "Lato, sans-serif"
      },
      keyframes: {
        ripple: {
          to: {
            transform: "scale(3)",
            opacity: 0
          }
        }
      },
      animation: {
        "button-ripple": "ripple 600ms linear"
      },
      screens: {
        xs: "0px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1536px"
      },
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@headlessui/tailwindcss")({ prefix: "ui" })
  ]
};
