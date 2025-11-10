import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';


// Were the environment variables set in the Dockerfile? That means we're in a Docker build.
const isDockerBuild = process.env.DOCKER_BUILD === 'true' || process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // Only include server config for development (not Docker builds)
   ...(isDockerBuild ? {} : {
        server: {
            proxy: {
                '^/weatherforecast': {
                    target: 'http://localhost:5000/',
                    secure: false
                }
            },
            port: 5173,
            https: false,
            fs: {
                strict: false,
                allow: ['src'],
            }
        }
    })
})
