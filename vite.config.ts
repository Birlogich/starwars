import { defineConfig } from "vitest/config"; 
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: "jsdom", 
    setupFiles: "./vitest.setup.ts", 
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "vite-plugin-svgr",
          transform(code, id) {
            if (id.endsWith(".svg")) {
              return {
                code: `export default ${JSON.stringify(code)};`,
                map: null,
              };
            }
          },
        },
      ],
    },
  },
});
