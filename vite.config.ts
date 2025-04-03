import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'public/assets'),
      '@styles': path.resolve(__dirname, 'src/app/styles'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@features': path.resolve(__dirname, 'src/features'),
    }
  }
})
