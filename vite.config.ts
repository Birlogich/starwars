import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr()],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'vite-plugin-svgr',
          transform(code, id) {
            if (id.endsWith('.svg')) {
              return {
                code: `export default ${JSON.stringify(code)};`,
                map: null
              };
            }
          },
        },
      ],
    },
  },
})
