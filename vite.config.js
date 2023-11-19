import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        contact: resolve(__dirname, 'pages/contact.html'),

        style: resolve(__dirname, 'style.css'), 
        tailwind: resolve(__dirname, 'tailwind.config.js'), 
        main: resolve(__dirname, 'main.js'),
      },
    },
  },
})