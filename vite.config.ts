/* eslint-disable quotes */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import topLevelAwait from 'vite-plugin-top-level-await'
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动导入Icon图标
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      resolvers: [
        IconsResolver({
          // 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
          prefix: 'icon',
          // 指定collection，即指定为elementplus图标集ep
          enabledCollections: ['ep']
        }),
        ElementPlusResolver({ importStyle: 'sass' })
      ]
    }),
    Icons({
      autoInstall: true
    }),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2.自动导入定制化样式文件进行样式覆盖
        additionalData: `@use "@/assets/css/index.scss" as *;`
      }
    }
  }
})
