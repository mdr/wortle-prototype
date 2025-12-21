import { describe, expect, it } from "vitest"
import { formatDate, formatDuration } from "./dateUtils"

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2025-12-21", "en-GB")).toBe("21 December 2025")
  })

  it("handles single digit day", () => {
    expect(formatDate("2025-01-05", "en-GB")).toBe("5 January 2025")
  })
})

describe("formatDuration", () => {
  it("formats hours and minutes", () => {
    const from = new Date("2025-01-01T10:00:00")
    const to = new Date("2025-01-01T15:30:00")
    expect(formatDuration(from, to)).toBe("5h 30m")
  })

  it("handles zero minutes", () => {
    const from = new Date("2025-01-01T10:00:00")
    const to = new Date("2025-01-01T12:00:00")
    expect(formatDuration(from, to)).toBe("2h 0m")
  })

  it("handles zero hours", () => {
    const from = new Date("2025-01-01T10:00:00")
    const to = new Date("2025-01-01T10:45:00")
    expect(formatDuration(from, to)).toBe("0h 45m")
  })

  it("handles durations over 24 hours", () => {
    const from = new Date("2025-01-01T10:00:00")
    const to = new Date("2025-01-02T14:30:00")
    expect(formatDuration(from, to)).toBe("28h 30m")
  })

  it("handles same time", () => {
    const time = new Date("2025-01-01T10:00:00")
    expect(formatDuration(time, time)).toBe("0h 0m")
  })
})
