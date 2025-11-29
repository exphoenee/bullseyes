import { defineConfig } from 'vite'
import path from 'path'

const repoName = '/bullseyes/'

export default defineConfig({
  base: repoName,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist'
  }
})
