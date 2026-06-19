import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site also works when opening dist/index.html
  // directly from the filesystem (file://).
  base: './',
  // viteSingleFile inlines JS + CSS into index.html so the build can be opened
  // by double-clicking dist/index.html (no module CORS issues on file://).
  // The hero video stays as a separate file referenced next to index.html.
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
