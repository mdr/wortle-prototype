import { describe, expect, it } from "vitest"

import { TestPuzzles, TestSpeciesIds } from "@/tests/playwright/testConstants.testUtils"
import { Iso8601Date } from "@/utils/brandedTypes"

import { calculateDailyStatsSummary } from "./dailyStatsSummary"
import { DailyResult } from "./StatsStorage"
import { createDailyPuzzleRecord, createStatsStorage } from "./StatsStorage.testUtils"

describe("StatsStorage", () => {
  it("returns default stats when empty", () => {
    const statsStorage = createStatsStorage()
    expect(statsStorage.load()).toEqual({ history: [] })
  })

  it("persists and loads stats", () => {
    const statsStorage = createStatsStorage()
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
    const statsStorage = createStatsStorage()
    statsStorage.recordDailyCompletion(createDailyPuzzleRecord())

    statsStorage.clear()

    expect(statsStorage.load()).toEqual({ history: [] })
  })

  it("saves daily in-progress", () => {
    const statsStorage = createStatsStorage()

    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-08"),
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })

    expect(statsStorage.load()).toMatchObject({
      dailyInProgress: {
        date: Iso8601Date("2026-06-08"),
        guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
      },
    })
  })

  it("clears daily in-progress", () => {
    const statsStorage = createStatsStorage()
    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-08"),
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })

    statsStorage.clearDailyInProgress()

    expect(statsStorage.load()).toEqual({ history: [] })
  })

  it("records daily completion and clears in-progress", () => {
    const statsStorage = createStatsStorage()
    statsStorage.saveDailyInProgress({
      date: Iso8601Date("2026-06-08"),
      guessedSpeciesIds: [TestSpeciesIds.birdsFootTrefoil],
    })
    const record = createDailyPuzzleRecord()

    statsStorage.recordDailyCompletion(record)

    expect(statsStorage.load().dailyInProgress).toBeUndefined()
    expect(statsStorage.load().history).toEqual([record])
  })

  it("replaces existing record for same date", () => {
    const statsStorage = createStatsStorage()
    const date = Iso8601Date("2026-06-08")
    statsStorage.recordDailyCompletion(createDailyPuzzleRecord({ date, result: DailyResult.FAIL }))

    statsStorage.recordDailyCompletion(createDailyPuzzleRecord({ date, result: DailyResult.PASS }))

    expect(statsStorage.load().history).toHaveLength(1)
    expect(statsStorage.load().history[0]?.result).toBe(DailyResult.PASS)
  })

  it("keeps history sorted by date", () => {
    const statsStorage = createStatsStorage()
    const earliest = Iso8601Date("2026-06-08")
    const middle = Iso8601Date("2026-06-09")
    const latest = Iso8601Date("2026-06-10")
    statsStorage.recordDailyCompletion(createDailyPuzzleRecord({ date: middle }))
    statsStorage.recordDailyCompletion(createDailyPuzzleRecord({ date: latest }))
    statsStorage.recordDailyCompletion(createDailyPuzzleRecord({ date: earliest }))

    const history = statsStorage.load().history
    expect(history.map((r) => r.date)).toEqual([earliest, middle, latest])
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
      createDailyPuzzleRecord({ date: Iso8601Date("2026-06-08"), result: DailyResult.PASS }),
      createDailyPuzzleRecord({ date: Iso8601Date("2026-06-09"), result: DailyResult.PASS }),
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
      createDailyPuzzleRecord({ date: Iso8601Date("2026-06-08"), result: DailyResult.PASS }),
      createDailyPuzzleRecord({ date: Iso8601Date("2026-06-10"), result: DailyResult.FAIL }),
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
