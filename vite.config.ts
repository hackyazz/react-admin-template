import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {lingui} from '@lingui/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: ["macros"]
      }
    }),
    lingui(),
  ],
  server: {
    host: true,
    port: 8888
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // sass配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/sassConfig.scss";`
      }
    }
  }
})
