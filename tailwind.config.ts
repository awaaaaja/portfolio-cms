import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        cyan: {
          50: "#ffe3f4",
          100: "#ffc2e8",
          200: "#ff8fd5",
          300: "#ff47bd",
          400: "#f50ea2",
          500: "#db0689",
          600: "#b30070",
          700: "#8c0a5c",
          800: "#660748",
          900: "#440a31",
          950: "#29021f"
        }
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(245, 14, 162, 0.16), 0 10px 32px -8px rgba(245, 14, 162, 0.32)",
        glass: "0 20px 60px -12px rgba(2, 10, 26, 0.65)"
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        "grid-pan": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(72px)" }
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" }
        }
      },
      animation: {
        "float-y": "float-y 6s ease-in-out infinite",
        "grid-pan": "grid-pan 16s linear infinite",
        blink: "blink 1s step-end infinite"
      }
    }
  },
  plugins: [animate, typography]
};

export default config;
