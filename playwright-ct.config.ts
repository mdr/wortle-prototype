import { defineConfig, devices } from "@playwright/experimental-ct-react"
import path from "path"

export default defineConfig({
  testDir: "./src/tests/playwright/scenarios",
  testMatch: "*.iwft.tsx",
  snapshotDir: "./src/tests/playwright/snapshots",
  timeout: 10000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
    ctViteConfig: {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "."),
        },
      },
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
