import { resolve } from 'path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import Inspect from 'vite-plugin-inspect'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    commonjs(),
    UniLayouts(),
    // Make sure it before `Uni()`
    Components({
      extensions: ['vue', 'md'],
      dts: 'src/components.d.ts',
    }),

    Uni(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:port/__inspect/ to see the inspector
    Inspect(),
  ],
})
