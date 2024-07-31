/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-custom": "#2593FF",
        "red-custom": "#ff0000",
        "green-custom": "#1ddb16",
        "white-custom": "#ffffff",
        // Next.js 다크 모드 색상 조합 추가
        "custom-dark-bg": "#121212",
        "custom-dark-text": "#e5e7eb",
        "custom-dark-accent": "#3b82f6",
        // 밝은 모드 색상 조합
        "custom-light-bg": "#ffffff",
        "custom-light-text": "#1f2937",
        "custom-light-accent": "#3b82f6",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
