import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
      animation: {
        scan: 'scan 1s linear infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          900: '#1a1b26',
          800: '#24283b',
        },
      },
    },
  },
  plugins: [],
};
export default config;
