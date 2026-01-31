/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom natural palette
        sage: {
          DEFAULT: "#6B9F7F",
          light: "#8FB89E",
          dark: "#4A7A5C",
          50: "#F0F7F2",
          100: "#E1EFE6",
          200: "#C3DFCD",
          300: "#8FB89E",
          400: "#6B9F7F",
          500: "#4A7A5C",
          600: "#3A6149",
          700: "#2D4D3A",
        },
        sky: {
          DEFAULT: "#7BA3B8",
          light: "#A3C1D1",
          dark: "#587A8C",
          50: "#F2F7F9",
          100: "#E5EFF3",
          200: "#C9DFE8",
          300: "#A3C1D1",
          400: "#7BA3B8",
          500: "#587A8C",
          600: "#456373",
        },
        cream: {
          DEFAULT: "#F5F1E8",
          light: "#FAF8F3",
          dark: "#E8E0D0",
          50: "#FDFCF9",
          100: "#FAF8F3",
          200: "#F5F1E8",
          300: "#E8E0D0",
          400: "#D9CDB5",
        },
        earth: {
          DEFAULT: "#8B7355",
          light: "#B8A089",
          dark: "#6B5640",
          50: "#F5F2EE",
          100: "#EBE5DD",
          200: "#D9CDB5",
          300: "#B8A089",
          400: "#8B7355",
          500: "#6B5640",
          600: "#524331",
        },
        gold: {
          DEFAULT: "#C9A962",
          light: "#E0CC99",
          dark: "#A68B4B",
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        elegant: "0 4px 20px -2px rgba(107, 159, 127, 0.15)",
        "elegant-lg": "0 8px 40px -4px rgba(107, 159, 127, 0.2)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
