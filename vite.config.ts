import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';
//TODO: Reconfigure build script with new changes
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background/background.ts"),
        content: resolve(__dirname, "src/content/content.ts"),
      },
      output: {
        entryFileNames: chunk => {
          if(chunk.name === "background") return "background/background.js"
          if(chunk.name === "content") return "content/content.js";
           if (chunk.name === "config") return "background/config.js";
          return "assets/[name].js"
        },
        format: 'es',
      }
    }
  },
})
