/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "className",
  content: [
    "./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    fontFamily: {
      antipasto: ['AntipastoProRegular'],
      caviar: ['CaviarDreams'],
      caviarbold: ['CaviarDreamsBold'],
      josefinlight: ['JosefinSansLight'],
      josefinregular: ['JosefinSansRegular']
    }
  }
}