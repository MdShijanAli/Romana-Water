import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        career: resolve(__dirname, 'pages/career.html'),
        companyProfile: resolve(__dirname, 'pages/company-profile.html'),
        products: resolve(__dirname, 'pages/products.html'),
        privacyPolicy: resolve(__dirname, 'pages/privacy-policy.html'),
        returnRefund: resolve(__dirname, 'pages/return-refund.html'),
        termandcondition: resolve(__dirname, 'pages/termandcondition.html'),

        style: resolve(__dirname, 'style.css'), 
        tailwind: resolve(__dirname, 'tailwind.config.js'), 
        main: resolve(__dirname, 'main.js'),
      },
    },
  },
})