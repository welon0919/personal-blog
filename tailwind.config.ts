/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 如果你是用 app/ 資料夾
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
  darkMode: "class",
  
};
export default config;
