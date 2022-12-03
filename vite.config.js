import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { vitePluginForArco } from '@arco-plugins/vite-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            react(),
            legacy({
                targets: ['defaults', 'IE 11']
            }),
            vitePluginForArco({
                theme: '@arco-themes/react-basement',
                style: 'css'
            })
        ],
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName: command === 'build' ? '[hash:base64:5]' : '[local]'
            },
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true
                }
            }
        },
        build: {
            target: 'esnext'
        },
        server: {
            hmr: {
                overlay: false
            }
        },
        resolve: {
            alias: {
                '@': '/src/'
            }
        }
    }
})
