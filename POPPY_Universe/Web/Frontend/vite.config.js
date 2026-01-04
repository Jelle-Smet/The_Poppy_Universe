import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  define: {
    __VUE_PROD_DEVTOOLS__: true,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
  },
})