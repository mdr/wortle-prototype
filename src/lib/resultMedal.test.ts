import { describe, expect, it } from "vitest"

import { getResultDescription, getResultMedal } from "./resultMedal"

describe("getResultMedal", () => {
  it("returns gold medal for correct on 1st attempt", () => {
    expect(getResultMedal(1, true)).toBe("🥇")
  })

  it("returns silver medal for correct on 2nd attempt", () => {
    expect(getResultMedal(2, true)).toBe("🥈")
  })

  it("returns bronze medal for correct on 3rd attempt", () => {
    expect(getResultMedal(3, true)).toBe("🥉")
  })

  it("returns bronze medal for correct on 4th+ attempt", () => {
    expect(getResultMedal(4, true)).toBe("🥉")
    expect(getResultMedal(10, true)).toBe("🥉")
  })

  it("returns X for incorrect answer", () => {
    expect(getResultMedal(1, false)).toBe("❌")
    expect(getResultMedal(3, false)).toBe("❌")
  })
})

describe("getResultDescription", () => {
  it("returns ordinal description for correct answers", () => {
    expect(getResultDescription({ attemptCount: 1, isCorrect: true })).toBe("Correct on 1st try")
    expect(getResultDescription({ attemptCount: 2, isCorrect: true })).toBe("Correct on 2nd try")
    expect(getResultDescription({ attemptCount: 3, isCorrect: true })).toBe("Correct on 3rd try")
    expect(getResultDescription({ attemptCount: 4, isCorrect: true })).toBe("Correct on 4th try")
  })

  it("returns 'Incorrect' for incorrect answers", () => {
    expect(getResultDescription({ attemptCount: 1, isCorrect: false })).toBe("Incorrect")
    expect(getResultDescription({ attemptCount: 3, isCorrect: false })).toBe("Incorrect")
  })
})
