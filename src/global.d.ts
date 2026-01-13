import { type TestHooks } from "@/lib/TestHooks"

declare global {
  interface Window {
    testHooks?: TestHooks
  }
}
