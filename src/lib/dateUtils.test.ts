import { describe, expect, it } from "vitest"
import { formatDate } from "./dateUtils"

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2025-12-21", "en-GB")).toBe("21 December 2025")
  })

  it("handles single digit day", () => {
    expect(formatDate("2025-01-05", "en-GB")).toBe("5 January 2025")
  })
})
