/// <reference types='vitest' />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/web",

  server: {
    port: 4200,
    host: "localhost",
  },

  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(["*.md"]), svgr()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/web",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
