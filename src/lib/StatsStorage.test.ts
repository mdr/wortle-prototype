import { describe, expect, it } from "vitest"

import { TestPuzzles, TestSpeciesIds } from "@/tests/playwright/testConstants.testUtils"
import { Iso8601Date } from "@/utils/brandedTypes"

import { calculateDailyStatsSummary } from "./dailyStatsSummary"
import { DailyResult, StatsStorage } from "./StatsStorage"
import { createMemoryStorage } from "./storage.testUtils"

describe("StatsStorage", () => {
  it("returns default stats when empty", () => {
    const storage = createMemoryStorage()
    const stats = new StatsStorage(storage).load()
    expect(stats).toEqual({ history: [] })
  })

  it("persists and loads stats", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-08"),
      puzzleId: TestPuzzles.daisy.id,
      result: DailyResult.PASS,
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.herbRobert.speciesId],
    })
    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-09"),
      guessedSpeciesIds: [TestSpeciesIds.feverfew],
    })

    expect(statsStorage.load()).toEqual({
      history: [
        {
          date: Iso8601Date("2026-06-08"),
          puzzleId: TestPuzzles.daisy.id,
          result: DailyResult.PASS,
          guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.herbRobert.speciesId],
        },
      ],
      dailyInProgress: {
        date: Iso8601Date("2026-06-09"),
        guessedSpeciesIds: [TestSpeciesIds.feverfew],
      },
    })
  })

  it("clears stored stats", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-08"),
      puzzleId: TestPuzzles.daisy.id,
      result: DailyResult.PASS,
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.herbRobert.speciesId],
    })

    statsStorage.clear()

    expect(statsStorage.load()).toEqual({ history: [] })
  })

  it("saves daily in-progress", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)

    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-08"),
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })

    expect(statsStorage.load()).toEqual({
      history: [],
      dailyInProgress: {
        date: Iso8601Date("2026-06-08"),
        guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
      },
    })
  })

  it("clears daily in-progress", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-08"),
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })

    statsStorage.clearDailyInProgress()

    expect(statsStorage.load()).toEqual({ history: [] })
  })

  it("records daily completion and clears in-progress", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-08"),
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })

    const result = statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-08"),
      puzzleId: TestPuzzles.daisy.id,
      result: DailyResult.PASS,
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.daisy.speciesId],
    })

    expect(result).toEqual({
      history: [
        {
          date: Iso8601Date("2026-06-08"),
          puzzleId: TestPuzzles.daisy.id,
          result: DailyResult.PASS,
          guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.daisy.speciesId],
        },
      ],
    })
  })

  it("replaces existing record for same date", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-08"),
      puzzleId: TestPuzzles.daisy.id,
      result: DailyResult.FAIL,
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })

    statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-08"),
      puzzleId: TestPuzzles.daisy.id,
      result: DailyResult.PASS,
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.daisy.speciesId],
    })

    expect(statsStorage.load().history).toHaveLength(1)
    expect(statsStorage.load().history[0]?.result).toBe(DailyResult.PASS)
  })

  it("keeps history sorted by date", () => {
    const storage = createMemoryStorage()
    const statsStorage = new StatsStorage(storage)
    statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-10"),
      puzzleId: TestPuzzles.daisy.id,
      result: DailyResult.PASS,
      guessedSpeciesIds: [TestPuzzles.daisy.speciesId],
    })
    statsStorage.recordDailyCompletion({
      date: Iso8601Date("2026-06-08"),
      puzzleId: TestPuzzles.herbRobert.id,
      result: DailyResult.PASS,
      guessedSpeciesIds: [TestPuzzles.herbRobert.speciesId],
    })

    const history = statsStorage.load().history
    expect(history.map((r) => r.date)).toEqual([Iso8601Date("2026-06-08"), Iso8601Date("2026-06-10")])
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
        puzzleId: TestPuzzles.daisy.id,
        result: DailyResult.PASS,
        guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.herbRobert.speciesId],
      },
      {
        date: Iso8601Date("2026-06-09"),
        puzzleId: TestPuzzles.herbRobert.id,
        result: DailyResult.PASS,
        guessedSpeciesIds: [TestPuzzles.herbRobert.speciesId],
      },
    ]

    expect(calculateDailyStatsSummary(history)).toEqual({
      played: 2,
      wins: 2,
      winRate: 1,
      currentStreak: 2,
      maxStreak: 2,
    })
  })

  it("breaks streaks on gaps or failures", () => {
    const history = [
      {
        date: Iso8601Date("2026-06-08"),
        puzzleId: TestPuzzles.daisy.id,
        result: DailyResult.PASS,
        guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil, TestPuzzles.herbRobert.speciesId],
      },
      {
        date: Iso8601Date("2026-06-10"),
        puzzleId: TestPuzzles.birdsEyePrimrose.id,
        result: DailyResult.FAIL,
        guessedSpeciesIds: [TestPuzzles.herbRobert.speciesId, TestSpeciesIds.feverfew, TestSpeciesIds.alexanders],
      },
    ]

    expect(calculateDailyStatsSummary(history)).toEqual({
      played: 2,
      wins: 1,
      winRate: 0.5,
      currentStreak: 0,
      maxStreak: 1,
    })
  })
})
