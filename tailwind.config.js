/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "*.{js,ts,jsx,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx,html}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // my custom colors 
        'primary': '#333333', 
        'secondary': '#ED1C24', 
        'third': '#F7EBEC', 
        'background': '#E7F0FD',
        'paragraph': '#1D306D',
        'footerBG': '#26292E',
        'footerBottom': '#36393F',
        'footerText': '#cacaca'
      },
      fontSize: {
        // my custom font sizes 
        'h1': '36px',
        'h2': '25px',
        'paragraph': '15px',
         'h5': '16px',
        'h6': '14px',
        'p': '12px',
        'h3': '13px',
         'h4': '18px'
      },
      boxShadow: {
        'bottom-right': '8px 8px 7px rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('preline/plugin'),
  ],
}

