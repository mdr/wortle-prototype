import { getSpecies } from "@/lib/plants"
import { PuzzleId } from "@/lib/Puzzle"
import { getPuzzle } from "@/lib/puzzles"
import { findFirstDateForPuzzle } from "@/lib/schedule"
import { SpeciesId } from "@/lib/Species"
import { Iso8601Date } from "@/utils/brandedTypes"

export interface TestPuzzle {
  id: PuzzleId
  speciesId: SpeciesId
  correctAnswer: string
  scheduledDate: Iso8601Date | undefined
}

const createTestPuzzle = (puzzleId: PuzzleId): TestPuzzle => {
  const puzzle = getPuzzle(puzzleId)
  const species = getSpecies(puzzle.speciesId)
  const scheduledDate = findFirstDateForPuzzle(puzzleId)
  return {
    id: puzzleId,
    speciesId: puzzle.speciesId,
    correctAnswer: species.commonNames[0],
    scheduledDate,
  }
}

export const TestPuzzles = {
  daisy: createTestPuzzle(PuzzleId(40)),
  herbRobert: createTestPuzzle(PuzzleId(41)),
  birdsEyePrimrose: createTestPuzzle(PuzzleId(42)),
  devilsBitScabious: createTestPuzzle(PuzzleId(43)),
  tansy: createTestPuzzle(PuzzleId(44)),
} as const

export const TestSpeciesIds = {
  alexanders: SpeciesId("2cd4p9h.21r"),
  birdsFootTrefoil: SpeciesId("2cd4p9h.1e3"),
  feverfew: SpeciesId("2cd4p9h.yhw"),
  fieldScabious: SpeciesId("2cd4p9h.xyv"),
} as const
