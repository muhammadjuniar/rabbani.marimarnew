import { fileURLToPath, URL } from 'node:url'

import { defineConfig, splitVendorChunkPlugin  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx(), splitVendorChunkPlugin()],
  //base: "/main/", //main path/subfolder
  //json: {
     // stringify: true,
  //},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['*', '.js', '.vue', '.json','.mjs','.ts','.css','.html','.jsx','.cjs','.tsx','.mts','.cts'],
  },
  server: {
    watch: {
      usePolling: true,
    },
    //open: "/index.html",
  },
  //root: "src",
  //publicDir: "./public",
  build: {
    brotliSize: false,
    sourcemap: false,
    productionSourceMap: false,
    cssSourceMap: false,
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      input: {
        app: './index.html',
      },
      output: {
        chunkFileNames: 'app/rabbani-dprd-[hash].js',
        entryFileNames: 'app/rabbani-dprd-[name]-[hash].js',
        
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|psd|tif?f|raw|bmp|heif|eps|webp)$/.test(name ?? '')){
              return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(svg|ico)$/.test(name ?? '')){
              return 'assets/icons/[name]-[hash][extname]';
          }

          if (/\.(mov|mpe?g|mpeg1|mpeg2|mpeg4|mp4|avi|wmv|mpegps|flv|3gp?p|webm)$/.test(name ?? '')){
              return 'assets/videos/[name]-[hash][extname]';
          }
          if (/\.(mp3|wav|wma|pcm|aiff|aac)$/.test(name ?? '')){
              return 'assets/audios/[name]-[hash][extname]';
          }
          if (/\.(doc|docx|xls|xlsx|ppt|pptx|txt|pdf)$/.test(name ?? '')){
              return 'assets/documents/[name]-[hash][extname]';
          }
          if (/\.(ttf|otf)$/.test(name ?? '')){
              return 'assets/fonts/[name][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
              return 'assets/styles/[name]-[hash][extname]';   
          }

          if (/\.js$/.test(name ?? '')) {
              return 'assets/scripts/[name]-[hash][extname]';   
          }

          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    }
  },
})
