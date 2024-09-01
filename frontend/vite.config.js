// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                secure: false, // we are using http, not https
                //changeOrigin: true,
            },
        },
    },
    plugins: [react()],
});
