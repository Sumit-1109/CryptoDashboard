import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Ensures correct relative paths in deployed static files
  plugins: [react()],
  build: {
    outDir: 'dist' // optional, default is 'dist'
  }
})