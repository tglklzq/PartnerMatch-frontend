import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {VantResolver} from 'unplugin-vue-components/resolvers'
import path from 'path';
const resolve = (dir:string)=>path.resolve(__dirname,'.',dir)

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        })
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
        },

    },
    server: {
        port: 3000,
    }
})
