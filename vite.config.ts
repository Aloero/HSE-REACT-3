import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Я в code server работаю, чтобы видеть сайт, его нужно вывести в интернет

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/absproxy/8080/', 
  server: {
    host: '127.0.0.1',
    port: 8080,
    allowedHosts: ["82-202-136-95.sslip.io"]
  }
})
