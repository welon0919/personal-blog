/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 如果你是用 app/ 資料夾
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "selector",
};
export default config;
