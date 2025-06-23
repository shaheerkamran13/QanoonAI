import type { Config } from "tailwindcss";
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        myColor: "#F6E05E",
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'popup': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        popup2: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'popup': 'popup 0.2s ease-out forwards',
        'popup2': 'popup 0.3s ease-out',
      },
      transitionDelay: {
        '200': '200ms', // Add a delay utility
        '300': '300ms', // Add a delay utility
      },
    },
  },
  plugins: [tailwindScrollbarHide], // Add tailwind-scrollbar-hide],
};



export default config;