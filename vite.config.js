import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Application-m-t-o/',
  plugins: [tailwindcss()],
})