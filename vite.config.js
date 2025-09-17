import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  root: 'resources',
  plugins: [react()],
  resolve: {
    alias: {
      '@fa': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free')
    },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: './resources/index.html',
      output: {
        assetFileNames: 'src/[name].[hash][extname]',
        entryFileNames: 'src/[name].[hash].js',
        chunkFileNames: 'src/[name].[hash].js',
      }
    }
  },
  server: {
    open: process.env.IS_CONTAINER !== "TRUE",
    hmr: true,
    host: true,
    port: 5173
  }
})
