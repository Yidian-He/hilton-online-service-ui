import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        define: {
            'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
            'process.env.BASE64_CREDENTIALS': JSON.stringify(env.BASE64_CREDENTIALS)
        },
        server: {
            allowedHosts: [ process.env.VITE_API_URL || 'http://localhost:3000' ],
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || 'http://localhost:3000',
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy, options) => {
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            proxyReq.setHeader('Authorization', `Basic ${env.BASE64_CREDENTIALS}`);
                        });
                    }
                }
            }
        },
        preview: {
            port: 5173,
            allowedHosts: [ process.env.VITE_API_URL ||'http://18.142.178.56:3000' ],
        },
    }
});
