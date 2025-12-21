import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import { visualizer } from "rollup-plugin-visualizer"
import path from "path"

const analyze = process.env.ANALYZE === "true"

export default defineConfig({
  plugins: [
    tanstackRouter({ routesDirectory: "./src/routes" }),
    react(),
    analyze &&
      visualizer({
        filename: "dist/stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: process.env.GITHUB_ACTIONS ? "/wortle-prototype/" : "/",
})
