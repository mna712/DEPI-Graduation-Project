/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        
        primary: "#fea928", 
        secondary:"#6BA368", // الأخضر الزيتوني
        background: "#F7F6F3", // الكريم الفاتح
        highlight: "#F6C445", // الأصفر الذهبي
        textPrimary: "#c7b5b559", // الرمادي الغامق
        darkBg: "#1C1F26", // خلفية الـ dark mode
        darkPrimary: "#6BCB77", // اللون الأساسي في dark mode
        darkText: "#E6E6E6", // النص في dark mode
        
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 18px rgba(0,0,0,0.06)", // ظل ناعم للعناصر
      },
      
      
    },
  },
  plugins: [],
};
