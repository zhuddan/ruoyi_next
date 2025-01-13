import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import compression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import './seed-eslint-globals.mjs'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // const env =
  loadEnv(mode, process.cwd())
  const isBuild = command === 'build'
  /**
   * @type  {import('vite').UserConfig['plugins']}
   */
  const plugins = [
    vue(),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dirs: [
        './src/composables',
        './src/tools',
      ],
      dts: './src/auto-import.d.ts',
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: isBuild,
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    }),
  ]
  if (isBuild) {
    plugins.push(compression({
      ext: '.gz',
      deleteOriginFile: false,
    }))
  }
  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
    },
  }
})
