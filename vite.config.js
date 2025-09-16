import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
    root: 'resources',
    server: {
        open: (process.env.IS_CONTAINER !== "TRUE"),
        hmr: true,
        host: true,
        port: 5173
    },
    resolve: {
        alias: {
            '@fa': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free')
        },
    },
    build: {
        outDir: '../public',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: [
                "./resources/index.html"
            ],
            output: {
                assetFileNames: 'src/[name].[hash][extname]',
                entryFileNames: 'src/[name].[hash].js',
                chunkFileNames: 'src/[name].[hash].js',
            }
        }
    }
})
