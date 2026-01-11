import { describe, expect, it } from "vitest"

import { getSpecies } from "@/lib/plants"
import { Puzzle, PuzzleId } from "@/lib/Puzzle"
import { getPuzzle } from "@/lib/puzzles"
import { Species, SpeciesId } from "@/lib/Species"
import { DailyResult, StatsStorage } from "@/lib/StatsStorage"
import { createMemoryStorage } from "@/lib/storage.testUtils"
import { Iso8601Date } from "@/utils/brandedTypes"

import { MAX_ATTEMPTS, PuzzleMode, PuzzleService } from "./PuzzleService"

const scheduledDate = Iso8601Date("2026-06-08")
const puzzleId = PuzzleId(40)
const getPuzzleData = (): { puzzle: Puzzle; correctSpecies: Species } => {
  const puzzle = getPuzzle(puzzleId)
  const correctSpecies = getSpecies(puzzle.speciesId)
  return { puzzle, correctSpecies }
}

const makePuzzleService = (options: Partial<{ mode: PuzzleMode; statsStorage: StatsStorage }> = {}): PuzzleService => {
  const { puzzle, correctSpecies } = getPuzzleData()
  return new PuzzleService(
    { puzzle, correctSpecies, scheduledDate },
    { mode: options.mode ?? PuzzleMode.REVIEW, statsStorage: options.statsStorage },
  )
}

describe("PuzzleService", () => {
  describe("hydration", () => {
    it("hydrates completed daily puzzles from stats", () => {
      const storage = createMemoryStorage()
      const statsStorage = new StatsStorage(storage)
      statsStorage.save({
        history: [
          {
            date: scheduledDate,
            puzzleId,
            result: DailyResult.PASS,
            guessedSpeciesIds: [SpeciesId(12), SpeciesId(14)],
          },
        ],
      })

      const service = makePuzzleService({ mode: PuzzleMode.DAILY, statsStorage })

      expect(service.state.attempts).toHaveLength(2)
      expect(service.state.attempts[1]?.isCorrect).toBe(true)
      expect(service.state.gaveUp).toBe(false)
      expect(service.state.incorrectFeedbackText).toBeUndefined()
      expect(service.state.selectedSpecies).toBeUndefined()
    })

    it("marks gave up when daily stats show a failure before max attempts", () => {
      const storage = createMemoryStorage()
      const statsStorage = new StatsStorage(storage)
      statsStorage.save({
        history: [
          {
            date: scheduledDate,
            puzzleId,
            result: DailyResult.FAIL,
            guessedSpeciesIds: [SpeciesId(12)],
          },
        ],
      })

      const service = makePuzzleService({ mode: PuzzleMode.DAILY, statsStorage })

      expect(service.state.attempts).toHaveLength(1)
      expect(service.state.gaveUp).toBe(true)
    })

    it("does not mark gave up when daily failure uses all attempts", () => {
      const storage = createMemoryStorage()
      const statsStorage = new StatsStorage(storage)
      statsStorage.save({
        history: [
          {
            date: scheduledDate,
            puzzleId,
            result: DailyResult.FAIL,
            guessedSpeciesIds: [SpeciesId(12), SpeciesId(2), SpeciesId(3)],
          },
        ],
      })

      const service = makePuzzleService({ mode: PuzzleMode.DAILY, statsStorage })

      expect(service.state.attempts).toHaveLength(MAX_ATTEMPTS)
      expect(service.state.gaveUp).toBe(false)
    })

    it("ignores stats hydration for review mode", () => {
      const storage = createMemoryStorage()
      const statsStorage = new StatsStorage(storage)
      statsStorage.save({
        history: [
          {
            date: scheduledDate,
            puzzleId,
            result: DailyResult.PASS,
            guessedSpeciesIds: [SpeciesId(14)],
          },
        ],
      })

      const service = makePuzzleService({ mode: PuzzleMode.REVIEW, statsStorage })

      expect(service.state.attempts).toHaveLength(0)
      expect(service.state.gaveUp).toBe(false)
    })
  })

  describe("selectSpecies", () => {
    it("updates selected species and clears incorrect feedback", () => {
      const service = makePuzzleService()

      service.submitGuess(SpeciesId(12))
      expect(service.state.incorrectFeedbackText).toBeDefined()

      service.selectSpecies(SpeciesId(12))
      expect(service.state.selectedSpecies?.id).toBe(SpeciesId(12))
      expect(service.state.incorrectFeedbackText).toBeUndefined()
    })
  })

  describe("chooseDifferentPlant", () => {
    it("clears selected species and incorrect feedback", () => {
      const service = makePuzzleService()

      service.selectSpecies(SpeciesId(12))
      service.submitGuess(SpeciesId(12))

      service.chooseDifferentPlant()
      expect(service.state.selectedSpecies).toBeUndefined()
      expect(service.state.incorrectFeedbackText).toBeUndefined()
    })
  })

  describe("submitGuess", () => {
    it("records a correct attempt and returns true", () => {
      const { correctSpecies } = getPuzzleData()
      const service = makePuzzleService()

      const result = service.submitGuess(correctSpecies.id)

      expect(result).toBe(true)
      expect(service.state.attempts).toHaveLength(1)
      expect(service.state.attempts[0]?.isCorrect).toBe(true)
      expect(service.state.selectedSpecies).toBeUndefined()
      expect(service.state.incorrectFeedbackText).toBeUndefined()
    })

    it("records an incorrect attempt and returns false", () => {
      const service = makePuzzleService()

      const result = service.submitGuess(SpeciesId(12))

      expect(result).toBe(false)
      expect(service.state.attempts).toHaveLength(1)
      expect(service.state.attempts[0]?.isCorrect).toBe(false)
      expect(service.state.incorrectFeedbackText).toBeDefined()
    })
  })

  describe("giveUp", () => {
    it("marks the puzzle as gave up and records stats in daily mode", () => {
      const statsStorage = new StatsStorage(createMemoryStorage())
      const service = makePuzzleService({ mode: PuzzleMode.DAILY, statsStorage })

      service.submitGuess(SpeciesId(12))
      service.giveUp()

      expect(service.state.gaveUp).toBe(true)
      expect(service.state.selectedSpecies).toBeUndefined()
      expect(service.state.incorrectFeedbackText).toBeUndefined()
      expect(statsStorage.load().history).toEqual([
        {
          date: scheduledDate,
          puzzleId,
          result: DailyResult.FAIL,
          guessedSpeciesIds: [SpeciesId(12)],
        },
      ])
    })
  })

  describe("selectImageIndex", () => {
    it("sets the current image index", () => {
      const service = makePuzzleService()

      service.selectImageIndex(2)

      expect(service.state.imageGalleryIndex).toBe(2)
    })

    it("throws for out-of-bounds indices", () => {
      const { puzzle } = getPuzzleData()
      const service = makePuzzleService()
      const outOfBoundsIndex = puzzle.images.length + 2

      expect(() => service.selectImageIndex(outOfBoundsIndex)).toThrow("Invalid image index")
    })
  })

  describe("goToNextImage", () => {
    it("advances and wraps the image index", () => {
      const { puzzle } = getPuzzleData()
      const service = makePuzzleService()

      service.goToNextImage()
      expect(service.state.imageGalleryIndex).toBe(1)

      service.selectImageIndex(puzzle.images.length - 1)
      service.goToNextImage()
      expect(service.state.imageGalleryIndex).toBe(0)
    })
  })

  describe("goToPreviousImage", () => {
    it("moves back and wraps the image index", () => {
      const { puzzle } = getPuzzleData()
      const service = makePuzzleService()

      service.goToPreviousImage()
      expect(service.state.imageGalleryIndex).toBe(puzzle.images.length - 1)

      service.selectImageIndex(1)
      service.goToPreviousImage()
      expect(service.state.imageGalleryIndex).toBe(0)
    })
  })

  describe("enterFullscreenImageMode", () => {
    it("sets fullscreen image mode to true", () => {
      const service = makePuzzleService()

      service.enterFullscreenImageMode()

      expect(service.state.isFullscreenImageMode).toBe(true)
    })
  })

  describe("exitFullscreenImageMode", () => {
    it("sets fullscreen image mode to false", () => {
      const service = makePuzzleService()

      service.enterFullscreenImageMode()
      service.exitFullscreenImageMode()

      expect(service.state.isFullscreenImageMode).toBe(false)
    })
  })
})
