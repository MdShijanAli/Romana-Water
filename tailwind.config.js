/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "*.{js,ts,jsx,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // my custom colors 
        'primary': '#003376', 
        'secondary': '#F9A524', 
        'third': '#374151', 
        'background': '#E7F0FD',
        'paragraph': '#1D306D',
      },
      fontSize: {
        // my custom font sizes 
        'h1': '36px',
        'paragraph': '15px',
         'h6': '16px',
      },
      boxShadow: {
        'bottom-right': '8px 8px 7px rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [require("daisyui")],
}

