import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: resolve('src'),
    build: {
        outDir: resolve('dist'),
    },
})
