import { describe, expect, it } from "vitest"

import { Iso8601Date } from "@/utils/brandedTypes"

import { calculateDailyStatsSummary } from "./dailyStatsSummary"
import { PuzzleId } from "./Puzzle"
import { SpeciesId } from "./Species"
import { DailyResult, StatsSnapshot, StatsStorage } from "./StatsStorage"
import { createMemoryStorage } from "./storage.testUtils"

describe("StatsStorage", () => {
  it("returns default stats when empty", () => {
    const storage = createMemoryStorage()
    const stats = new StatsStorage(storage).load()
    expect(stats.history).toHaveLength(0)
  })

  it("persists and loads stats", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    const snapshot: StatsSnapshot = {
      history: [
        {
          date: Iso8601Date("2026-06-08"),
          puzzleId: PuzzleId(40),
          result: DailyResult.PASS,
          guessedSpeciesIds: [SpeciesId("2cd4p9h.1e3"), SpeciesId("2cd4p9h.8nb")],
        },
      ],
    }

    statsStorage.save(snapshot)

    expect(statsStorage.load()).toEqual(snapshot)
  })

  it("clears stored stats", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.save({
      history: [
        {
          date: Iso8601Date("2026-06-08"),
          puzzleId: PuzzleId(40),
          result: DailyResult.PASS,
          guessedSpeciesIds: [SpeciesId("2cd4p9h.1e3"), SpeciesId("2cd4p9h.8nb")],
        },
      ],
    })

    statsStorage.clear()

    expect(statsStorage.load().history).toHaveLength(0)
  })
})

describe("calculateDailyStatsSummary", () => {
  it("returns empty summary when history is empty", () => {
    const summary = calculateDailyStatsSummary([])
    expect(summary).toEqual({
      played: 0,
      wins: 0,
      winRate: 0,
      currentStreak: 0,
      maxStreak: 0,
    })
  })

  it("counts consecutive passes as streaks", () => {
    const history = [
      {
        date: Iso8601Date("2026-06-08"),
        puzzleId: PuzzleId(40),
        result: DailyResult.PASS,
        guessedSpeciesIds: [SpeciesId("2cd4p9h.1e3"), SpeciesId("2cd4p9h.8nb")],
      },
      {
        date: Iso8601Date("2026-06-09"),
        puzzleId: PuzzleId(41),
        result: DailyResult.PASS,
        guessedSpeciesIds: [SpeciesId("2cd4p9h.8nb")],
      },
    ]

    const summary = calculateDailyStatsSummary(history)
    expect(summary.played).toBe(2)
    expect(summary.wins).toBe(2)
    expect(summary.currentStreak).toBe(2)
    expect(summary.maxStreak).toBe(2)
  })

  it("breaks streaks on gaps or failures", () => {
    const history = [
      {
        date: Iso8601Date("2026-06-08"),
        puzzleId: PuzzleId(40),
        result: DailyResult.PASS,
        guessedSpeciesIds: [SpeciesId("2cd4p9h.1e3"), SpeciesId("2cd4p9h.8nb")],
      },
      {
        date: Iso8601Date("2026-06-10"),
        puzzleId: PuzzleId(42),
        result: DailyResult.FAIL,
        guessedSpeciesIds: [SpeciesId("2cd4p9h.8nb"), SpeciesId("2cd4p9h.yhw"), SpeciesId("2cd4p9h.21r")],
      },
    ]

    const summary = calculateDailyStatsSummary(history)
    expect(summary.currentStreak).toBe(0)
    expect(summary.maxStreak).toBe(1)
  })
})
