import type { KnipConfig } from "knip"

const config: KnipConfig = {
  entry: ["src/main.tsx", "src/routes/**/*.tsx"],
  project: ["src/**/*.{ts,tsx}"],
  ignore: ["src/routeTree.gen.ts"],
  ignoreDependencies: ["autoprefixer", "tailwindcss"],
  "playwright-ct": {
    config: [],
  },
}

export default config
